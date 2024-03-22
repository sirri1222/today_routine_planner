"use client";
import * as React from "react";
import { supabase } from "../../lib/supabase";
import { useRouter } from "next/navigation";
import emailStore from "@/stores/emailStore";
import LoginAndSignupForm from "./LoginAndSignupForm";
import { useState } from "react";
import { AlertTitle, Modal } from "@mui/material";

const LoginAndSignupContainer = ({ type }: { type: string }) => {
  const { useremail, setEmail } = emailStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isSumitted, setIsSumitted] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const router = useRouter();

  const authMethod = type === "login" ? "signInWithPassword" : "signUp";

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    const data = new FormData(event.currentTarget);
    const email = data.get("email") as string;
    const password = data.get("password") as string;
    try {
      const { error } = await supabase.auth[authMethod]({
        email,
        password,
      });
      if (error) {
        setError(error.message);
      } else {
        alert(`${type === "login" ? "로그인 성공" : "회원가입 완료"}`);
        setIsSumitted(true);
        setEmail(email);
        router.push(`${type === "login" ? "/routinemain" : "/"}`);
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      {error && (
        <h1 className="bg-white flex justify-center items-center">
          유효하지 않은 아이디 입니다.
        </h1>
      )}
      <LoginAndSignupForm handleSubmit={handleSubmit} type={type} />
    </div>
  );
};

export default LoginAndSignupContainer;
