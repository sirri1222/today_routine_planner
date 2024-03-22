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
import { loginInputDate, titledata } from "@/dummydata/dummydata";
import TextFieldInput from "./TextFieldInput";
import InputButton from "../InputButton";

const LoginAndSignupForm = ({
  type,
  handleSubmit,
}: {
  type: string;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
}) => {
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
              <p className="flex justify-center">{`${
                type === "login" ? "로그인 페이지" : "회원가입 페이지"
              }`}</p>
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
                    {`${
                      type === "login"
                        ? "회원가입 하러 가기"
                        : "로그인 하러 가기"
                    }`}
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

export default LoginAndSignupForm;
