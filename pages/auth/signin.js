// pages/auth/signin.js

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/router";

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // Para manejar errores

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false, // Desactiva el redireccionamiento automático
    });

    if (res?.error) {
      setError("Credenciales incorrectas. Intenta de nuevo.");
    } else {
      // Redirige si el inicio de sesión es exitoso
      router.push("/");
    }
  };

  return (
    <div className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/background-movie.jpg')" }}>
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="flex justify-center items-center min-h-screen relative z-10">
        <div className="w-full max-w-md p-8 bg-white bg-opacity-80 shadow-lg rounded-lg">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Iniciar sesión</h2>

          {error && (
            <p className="text-red-500 text-center mb-4 transition-all duration-300 transform opacity-100">{error}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                required
                aria-label="Email"
                aria-describedby="email-help"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                required
                aria-label="Password"
                aria-describedby="password-help"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 text-white py-3 rounded-md hover:bg-red-700 transition duration-300 transform hover:scale-105"
            >
              Iniciar sesión
            </button>
          </form>

          {/* Opciones adicionales */}
          <div className="mt-4 text-center text-gray-600">
            <p className="text-sm">
              ¿No tienes una cuenta? <a href="/signup" className="text-blue-600 hover:underline">Crear una cuenta</a>
            </p>
            <p className="text-sm">
              ¿Olvidaste tu contraseña? <a href="/forgot-password" className="text-blue-600 hover:underline">Recuperar contraseña</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
