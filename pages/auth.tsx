import axios from "axios";
import { useCallback, useState } from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import Input from "@/components/Input";
import "../styles/global.css";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [variant, setVariant] = useState("login");
  const [loading, setLoading] = useState(false);

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    );
  }, []);

  const login = useCallback(async () => {
    setLoading(true);
    try {
      const response = await signIn("credentials", {
        email,
        password,
        callbackUrl: "/profiles",
      });
      if (response?.error) {
        console.error(response.error);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [email, password]);

  const register = useCallback(async () => {
    setLoading(true);
    try {
      await axios.post("/api/register", {
        email,
        name,
        password,
      });
      login();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [email, name, password, login]);

  return (
    <div className="relative h-screen w-full bg-cover bg-center bg-no-repeat bg-[url('/images/hero.jpg')]">
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-60 backdrop-blur-lg"></div>
      <div className="relative flex justify-center items-center h-full">
        <div className="bg-black bg-opacity-75 px-8 py-16 sm:px-16 md:px-32 lg:w-96 w-full rounded-lg shadow-lg transform transition duration-500 ease-in-out hover:scale-105">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={200}
            height={100}
            className="mx-auto mb-8 animate__animated animate__fadeIn"
          />
          <h2 className="text-white text-3xl font-semibold text-center mb-6 animate__animated animate__fadeIn">
            {variant === "login" ? "Sign In" : "Sign Up"}
          </h2>
          <div className="flex flex-col gap-6 animate__animated animate__fadeIn">
            {variant === "register" && (
              <Input
                label="Username"
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-gray-800 border-none focus:ring-2 focus:ring-red-600 text-white rounded-lg p-3 transition"
              />
            )}
            <Input
              label="Email"
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-800 border-none focus:ring-2 focus:ring-red-600 text-white rounded-lg p-3 transition"
            />
            <Input
              label="Password"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-800 border-none focus:ring-2 focus:ring-red-600 text-white rounded-lg p-3 transition"
            />
          </div>
          <button
            onClick={variant === "login" ? login : register}
            className="w-full py-3 text-white bg-red-600 rounded-md mt-6 hover:bg-red-700 transition transform hover:scale-105"
            disabled={loading}
          >
            {loading ? (
              <span className="animate__animated animate__bounceIn">Loading...</span>
            ) : (
              variant === "login" ? "Login" : "Sign Up"
            )}
          </button>
          <div className="flex justify-center gap-8 mt-6 animate__animated animate__fadeIn">
            <div
              onClick={() => signIn("google", { callbackUrl: "/profiles" })}
              className="w-12 h-12 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
            >
              <FcGoogle size={30} />
            </div>
            <div
              onClick={() => signIn("github", { callbackUrl: "/profiles" })}
              className="w-12 h-12 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
            >
              <FaGithub size={30} />
            </div>
          </div>
          <p className="text-neutral-500 mt-6 text-center">
            {variant === "login" ? "New to Netflix?" : "Already have an account?"}
            <span
              onClick={toggleVariant}
              className="text-white ml-1 hover:underline cursor-pointer"
            >
              {variant === "login" ? "Sign up now" : "Log in"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
