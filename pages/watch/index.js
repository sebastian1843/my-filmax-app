// /pages/auth/index.js
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Realizamos la autenticación usando next-auth con las credenciales.
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Email o contraseña incorrectos.");
    } else {
      // Redirigir al usuario al home o página de inicio
      window.location.href = "/";
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black">
      {/* Fondo de imagen */}
      <div className="absolute top-0 left-0 right-0 bottom-0 z-0">
        <img
          src="/images/netflix-background.jpg"
          alt="Netflix Background"
          className="object-cover w-full h-full opacity-40"
        />
      </div>

      {/* Formulario de login */}
      <div className="z-10 w-full max-w-md mx-auto p-8 bg-black bg-opacity-75 rounded-lg shadow-lg">
        <h1 className="text-3xl text-white font-bold mb-6">Inicia sesión</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Campo de email */}
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 rounded-md bg-gray-800 text-white placeholder-gray-400"
            required
          />

          {/* Campo de contraseña */}
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-4 rounded-md bg-gray-800 text-white placeholder-gray-400"
            required
          />

          {/* Mostrar error si existe */}
          {error && <div className="text-red-500 text-sm">{error}</div>}

          {/* Botón de login */}
          <button
            type="submit"
            className="w-full py-3 bg-red-600 text-white rounded-md font-bold hover:bg-red-700"
          >
            Iniciar sesión
          </button>
        </form>

        <div className="mt-4 text-center text-white">
          <p>¿No tienes cuenta? <a href="/auth/signup" className="text-red-600 hover:underline">Regístrate</a></p>
        </div>
      </div>
    </div>
  );
}
