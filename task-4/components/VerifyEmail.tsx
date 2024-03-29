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
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const codeInputs = useRef<(HTMLInputElement | null)[]>([]);
  const [verifyEmailMutation, { isLoading, error, data }] =
    useVerifyEmailMutation();
  const Email = useSelector((state: RootState) => state.user.email);

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
      await verifyEmailMutation({
        OTP: verificationCodeString,
        Email: Email,
      }).unwrap();
      dispatch(setUserData(data));
      localStorage.setItem("accessToken", data?.data.accessToken as string);
      localStorage.setItem("refreshToken", data?.data.refreshToken as string);
      toast.success("Email verified successfully!");
      setTimeout(() => {
        router.push("/job");
      }, 2000);
    } catch (error) {
      console.log("error", error);
      toast.error("Failed to verify email. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen font-epilogue text-base text-[#202430] text-opacity-50">
      {isLoading && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-600 opacity-50 z-50 flex items-center justify-center">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-800 h-32 w-32"></div>
        </div>
      )}
      <div className="bg-white flex flex-col w-[409px] gap-12">
        <h1 className="font-poppins text-[32px] leading-9 text-center text-[#25324B]">
          Verify Email
        </h1>
        <p className="">
          We've sent a verification code to the email address you provided. To
          complete the verification process, please enter the code here.
        </p>
        <div className="flex flex-col pt-12 gap-12">
          <div className="flex flex-col gap-5">
            <div className="flex mb-4 gap-8">
              {[0, 1, 2, 3].map((index) => (
                <input
                  key={index}
                  ref={(el) => (codeInputs.current[index] = el)}
                  type="text"
                  maxLength={1}
                  value={verificationCode[index]}
                  onChange={(e) => handleCodeChange(index, e.target.value)}
                  className="w-[70px] h-12 border-2 border-gray-300 rounded-md text-center mr-2"
                />
              ))}
            </div>
            <p className="text-center">
              You can request to{" "}
              <button
                className="text-[#4640DE] hover:underline"
                onClick={handleResendCode}
                disabled={isResendDisabled}
              >
                Resend code
              </button>{" "}
              in{" "}
              <div className="text-[#4640DE] hover">
                0:{resendTimer.toString().padStart(2, "0")}
              </div>
            </p>
          </div>
          <button
            className="w-full disabled:opacity-50 py-2 px-4 border border-transparent rounded-[80px] shadow-sm text-sm font-bold text-white bg-[#4640DE] hover:bg-[#4640DE] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={isContinueDisabled}
            onClick={handleContinue}
          >
            Continue
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default VerifyEmail;
