"use client";

import { useState, useEffect, useRef } from "react";
import { useVerifyEmailMutation } from "@/lib/features/auth/api/authapislice";
import { AppDispatch, RootState } from "@/lib/store";

import { useDispatch, useSelector } from "react-redux";

import { setUserData } from "@/lib/features/auth/userSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";


const VerifyEmail = () => {
  const [verificationCode, setVerificationCode] = useState(["", "", "", ""]);
  const [resendTimer, setResendTimer] = useState(30);
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [isContinueDisabled, setIsContinueDisabled] = useState(true);
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()

  const codeInputs = useRef<(HTMLInputElement | null)[]>([]);
  const [verifyEmailMutation, { isLoading, error, data}] = useVerifyEmailMutation();
  const Email = useSelector((state: RootState) => state.user.email)
  
  useEffect(() => {
    const interval = setInterval(() => {
      if (resendTimer > 0) {
        setResendTimer((prev) => prev - 1);
      } else {
        setIsResendDisabled(false);
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [resendTimer]);

  const handleCodeChange = (index: number, value: string) => {
    const newVerificationCode = [...verificationCode];
    newVerificationCode[index] = value;
    setVerificationCode(newVerificationCode);

    if (newVerificationCode.every((code) => code.length === 1)) {
      setIsContinueDisabled(false);
    } else {
      setIsContinueDisabled(true);
    }

    if (value !== "" && index < codeInputs.current.length - 1) {
      codeInputs.current[index + 1]?.focus();
    }
  };

  const handleResendCode = () => {
    setIsResendDisabled(true);
    setResendTimer(30);
    setVerificationCode(["", "", "", ""]);
    codeInputs.current[0]?.focus();
    setIsContinueDisabled(true);
  };

  

  const handleContinue = async () => {
    const verificationCodeString = verificationCode.join("");
    try {
      await verifyEmailMutation({ OTP: verificationCodeString, Email: Email }).unwrap();
      dispatch(setUserData(data));
      localStorage.setItem("accessToken", data?.data.accessToken as string);
      localStorage.setItem("refreshToken", data?.data.refreshToken as string);
      toast.success("Email verified successfully!");
      setTimeout(() => {
        router.push("/job");
        
      }, 2000);
    } catch (error) {
      console.log("error", error)
      toast.error("Failed to verify email. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      {isLoading && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-600 opacity-50 z-50 flex items-center justify-center">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
        </div>
      )}
      <div className="bg-white p-8 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">Verify Email</h1>
        <p className="text-gray-600 mb-6">
          We've sent a verification code to the email address you provided. To
          complete the verification process, please enter the code here.
        </p>
        <div className="flex mb-4">
          {[0, 1, 2, 3].map((index) => (
            <input
              key={index}
              ref={(el) => (codeInputs.current[index] = el)}
              type="text"
              maxLength={1}
              value={verificationCode[index]}
              onChange={(e) => handleCodeChange(index, e.target.value)}
              className="w-10 h-10 border border-gray-300 rounded text-center mr-2"
            />
          ))}
        </div>
        <p className="text-gray-600 mb-6">
          You can request to{" "}
          <button
            className="text-purple-600 hover:underline"
            onClick={handleResendCode}
            disabled={isResendDisabled}
          >
            Resend code
          </button>{" "}
          in{" "}
          <span className="text-purple-600 hover">
            0:{resendTimer.toString().padStart(2, "0")}
          </span>
        </p>
        <button
          className="bg-purple-600 text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={isContinueDisabled}
          onClick={handleContinue}
        >
          Continue
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default VerifyEmail;
