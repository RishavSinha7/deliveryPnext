'use client';

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { login } from "./actions";

const Login: React.FC = () => {
  const router = useRouter();
  const [role, setRole] = useState<"admin" | "vendor">("admin");
  const [state, loginAction] = useActionState(login, undefined);

  return (
    <div
      className="w-screen h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/authbg.jpg')" }}
    >
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 2.6, ease: "easeOut" }}
        className="bg-white/10 backdrop-blur-lg shadow-lg rounded-2xl flex flex-col md:flex-row w-full max-w-5xl overflow-hidden"
      >
        {/* Left Side: Logo */}
        <div className="w-full md:w-1/2 bg-white/10 flex items-center justify-center py-16 px-6">
          <Image
            src="/authlogo.jpg"
            alt="Logo"
            width={300}
            height={200}
            className="max-w-xs w-full h-auto"
          />
        </div>

        {/* Right Side: Login Form */}
        <div className="w-full md:w-1/2 flex items-center justify-center px-6 py-8">
          <div className="w-full max-w-md rounded-2xl shadow-lg p-8">
            <div className="flex justify-center mb-6 gap-2">
              <button
                onClick={() => setRole("admin")}
                className={`px-5 py-2 rounded text-sm ${
                  role === "admin"
                    ? "bg-green-600 text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                Admin
              </button>
              <button
                onClick={() => setRole("vendor")}
                className={`px-5 py-2 rounded text-sm ${
                  role === "vendor"
                    ? "bg-purple-600 text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                Vendor
              </button>
            </div>

            <form className="flex flex-col gap-4" action={loginAction}>
              <input
                name="email"
                type="text"
                placeholder="Login id"
                className="w-full bg-white px-4 py-2 rounded border border-gray-300 text-black font-bold focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              {state?.errors?.email && (
                <p className="text-red-500">{state.errors.email}</p>
              )}

              <input
                name="password"
                type="password"
                placeholder="Login password"
                className="w-full bg-white px-4 py-2 rounded border border-gray-300 text-black font-bold focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              {state?.errors?.password && (
                <p className="text-red-500">{state.errors.password}</p>
              )}

              <SubmitButton />

              <div className="text-right text-sm mt-[-10px]">
                <a href="#" className="text-blue-600 hover:underline">
                  Forget your password?
                </a>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      type="submit"
      className="w-full bg-purple-600 text-white py-2 rounded-full hover:bg-purple-700 transition duration-200 disabled:opacity-50"
    >
      {pending ? "Logging in..." : "Login"}
    </button>
  );
}

export default Login;
