"use client";
import { useSignupMutation } from "@/lib/features/auth/api/authapislice";
import { setUserEmail } from "@/lib/features/auth/userSlice";
import Image from "next/image";
import Link from "next/link";
import {  useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
 

const SignUp: React.FC = () => {
  const [signupMutation, { isLoading, error, data}] = useSignupMutation();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });


  const router = useRouter();
  const dispatch = useDispatch()


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userData = {
      name: formData.fullName,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      role: "student", // Assuming role is fixed for signup
    };

    

    try {
      await signupMutation(userData).unwrap();
      dispatch(setUserEmail(userData.email));
      toast.success("Signup successful. Redirecting to verify email page...");
      setTimeout(() => {
        router.push("/verifyemail");
        
      }, 2000);
    } catch (err) {
      toast.error(err.data.message);
    }
  };
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-6">
      {isLoading && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-600 opacity-50 z-50 flex items-center justify-center">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
        </div>
      )}
      
      <h1 className="text-3xl font-bold mb-6">Sign Up Today!</h1>
      <div className="flex items-center mb-6">
        <Image src="/google-logo.svg" alt="Google Logo" width={24} height={24} className="mr-2" />
        <span>Sign Up with Google</span>
      </div>
      <div className="flex items-center mb-6">
        <hr className="border-t border-gray-300 flex-grow mr-2" />
        <span>Or Sign Up with Email</span>
        <hr className="border-t border-gray-300 flex-grow ml-2" />
      </div>
      {error && (
        <div className="border-red-500 text-red-500 px-4 py-2 mb-4">
          {error.data?.message}
        </div>
      )}
       <form className="w-full max-w-sm" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Continue
          </button>
        </form>
      <p className="text-sm mt-6">
        Already have an account?{" "}
        <Link href="/login" className="text-purple-600 hover:underline">
          Login
        </Link>
      </p>
      <p className="text-xs mt-6">
        By clicking 'Continue', you acknowledge that you have read and accepted
        our{" "}
        <Link href="/terms" className="text-purple-600 hover:underline">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="text-purple-600 hover:underline">
          Privacy Policy
        </Link>
      </p>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
