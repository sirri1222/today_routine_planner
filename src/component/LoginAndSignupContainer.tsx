"use client";
import * as React from "react";
import { supabase } from "../lib/supabase";
import { useRouter } from "next/navigation";
import emailStore from "@/stores/emailStore";
import LoginAndSignupForm from "./LoginAndSignupForm";

const LoginAndSignupContainer = ({ type }: { type?: string }) => {
  const { setEmail } = emailStore();
  const router = useRouter();
  const authMethod = type === "login" ? "signInWithPassword" : "signUp";
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email") as string;
    const password = data.get("password") as string;

    try {
      const { error } = await supabase.auth[authMethod]({
        email,
        password,
      });
      if (error) {
        `${
          type === "login"
            ? console.error("로그인 실패:", error.message)
            : console.error("회원가입 실패:", error.message)
        }`;
      } else {
        alert(`${type === "login" ? "로그인 성공" : "회원가입 완료"}`);

        setEmail(email);
        router.push(`${type === "login" ? "/routinemain" : "/"}`);
      }
    } catch (error) {
      console.log(error);
    }
  };
 

  return (
    <>
      <LoginAndSignupForm
        handleSubmit={handleSubmit}
        type={type}
      />
    </>
  );
};

export default LoginAndSignupContainer;
