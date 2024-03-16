"use client";
import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { supabase } from "../lib/supabase";
import { useRouter } from "next/navigation";
import emailStore from "@/emailStore";
import { loginInputDate, titledata } from "@/dummydata/dummydata";
import TextFieldInput from "./share/TextFieldInput";
import InputButton from "./share/InputButton";
const LoginAndSignup = ({ type }: { type: string }) => {
  const { setEmail } = emailStore();

  const router = useRouter();
  const authMethod = type === "login" ? "signInWithPassword" : "signUp";
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email") as string;
    const password = data.get("password") as string;

    try {
      const { data, error } = await supabase.auth[authMethod]({
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
  const defaultTheme = createTheme();

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              <div className="flex flex-col justify-center">
                {titledata.map((title, i) => (
                  <p key={i} className="text-2xl">
                    {title.title}
                    <span className="text-sm">{title.subtitle}</span>
                  </p>
                ))}
              </div>
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <p>{`${type === "login" ? "로그인" : "회원가입"}`}</p>
              {loginInputDate.map((inputdata, i) => (
                <TextFieldInput inputdata={inputdata} key={i} />
              ))}

              {type === "login" ? (
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="기억하기"
                />
              ) : (
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="개인정보 수집에 동의합니다"
                />
              )}
              <InputButton
                buttonName={`${type === "login" ? "로그인" : "회원가입"}`}
              />
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    {`${type === "login" ? "비밀번호 찾기" : ""}`}
                  </Link>
                </Grid>
                <Grid item>
                  <Link
                    href={`${type === "login" ? "/signup" : "/"}`}
                    variant="body2"
                  >
                    {`${type === "login" ? "회원가입" : "로그인"}`}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default LoginAndSignup;
