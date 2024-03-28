"use client";
import React, { useState } from "react";
import { useSigninMutation } from "@/lib/features/auth/api/authapislice";
import { useDispatch } from "react-redux";
import { setUserData, setUserEmail } from "@/lib/features/auth/userSlice";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signinMutation, { isLoading, error, data }] = useSigninMutation();
  const dispatch = useDispatch();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signinMutation({ email, password }).unwrap();
      dispatch(setUserData(data?.data));
      dispatch(setUserEmail(email));
      localStorage.setItem("accessToken", data?.data.accessToken as string);
      localStorage.setItem("refreshToken", data?.data.refreshToken as string);
      toast.success("Login successful. Redirecting...");
      setTimeout(() => {
        router.push("/job");
        
      }, 2000);
      
    } catch (error) {
      toast.error("Failed to login. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4 text-center">Welcome Back</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email" className="block mb-2">
            Email Address
          </label>
          <input
            type="text"
            id="email"
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="Enter email address"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
          <label htmlFor="password" className="block mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handleChange}
            placeholder="Enter password"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
          <button
            type="submit"
            className="bg-[#4640DE] text-white px-4 py-2 rounded w-full mb-4"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
        {error && (
          <div className="text-red-500 px-4 py-2 mb-4">
            Invalid Cridentials
          </div>
        )}
        <p className="text-center text-gray-600">
          Don't have an account?{" "}
          <a href="/signup" className="text-[#4640DE]">
            Sign Up
          </a>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;

