"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import emailStore from "@/stores/emailStore";
import LoginAndSignupForm from "./LoginAndSignupForm";
import { useState } from "react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import TodayRoutine from "../TodayRoutine";
const LoginAndSignupContainer = ({ type }: { type: string }) => {
  const { setEmail } = emailStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isSumitted, setIsSumitted] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const router = useRouter();
  const session = useSession();
  const supabase = useSupabaseClient();
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
        alert("유효하지 않은 아이디 입니다.");
      } else {
        alert(`${type === "login" ? "로그인 성공" : "회원가입 완료"}`);
        setIsSumitted(true);
        if (session?.access_token !== undefined) {
          setEmail(session.access_token);
        } else {
          console.error("Access token is undefined");
        }
        router.push(`${type === "login" ? "/routinemain" : "/"}`);
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        alert("유효하지 않은 아이디 입니다.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="relative">
        <LoginAndSignupForm handleSubmit={handleSubmit} type={type} />
      </div>
    </>
  );
};

export default LoginAndSignupContainer;
