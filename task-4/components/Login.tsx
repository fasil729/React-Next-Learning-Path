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
    <div className="flex border items-center justify-end h-screen font-epilogue text-base text-[#202430] text-opacity-50 p-56">
      <div className="bg-white w-[408px] flex flex-col gap-6">
        <h1 className="font-poppins text-[32px] leading-9 text-center text-[#25324B]">
          Welcome Back,
        </h1>
        <div className="flex justify-between">
          <hr className="border-t border-gray-300 w-[108px] mr-2" />
          <hr className="border-t border-gray-300 w-[108px] mr-2" />
        </div>
        <form
          className="w-fill text-sm  flex flex-col gap-3"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-1">
            <label
              htmlFor="email"
              className="block font-semibold text-[#515B6F]"
            >
              Email Address
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="Enter email address"
              className="w-full p-2 mb-4 border border-gray-300 rounded font-normal"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="password"
              className="block font-semibold text-[#515B6F]"
            >
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
          </div>
          <button
            type="submit"
            className="w-full  py-4 px-4 border border-transparent rounded-[80px] shadow-sm text-sm font-bold text-white bg-primary-20 hover:bg-[#4640DE] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
        {error && (
          <div className="text-red-500 px-4 py-2 mb-4">Invalid Cridentials</div>
        )}
        <p>
          Don't have an account?{" "}
          <a href="/signup" className=" text-primary-20">
            Sign Up
          </a>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
