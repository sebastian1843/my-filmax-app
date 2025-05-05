// components/AuthForm.tsx
import React, { useState } from "react";
import Input from "@/components/Input";
import styles from "./AuthForm.module.css"; // Importación correcta

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) setEmailError("El correo es obligatorio.");
    else setEmailError("");

    if (!password) setPasswordError("La contraseña es obligatoria.");
    else setPasswordError("");

    if (email && password) {
      console.log("Formulario enviado");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles["auth-form"]}>
      <Input
        label="Email"
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={emailError}
      />
      <Input
        label="Password"
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={passwordError}
      />
      <button
        type="submit"
        className="w-full py-3 text-white bg-red-600 rounded-md mt-6 hover:bg-red-700 transition"
      >
        Submit
      </button>
    </form>
  );
};

export default AuthForm;
