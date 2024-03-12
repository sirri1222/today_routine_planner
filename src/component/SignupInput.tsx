"use client";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import InputButton from "./share/InputButton";
import { loginInputDate } from "@/dummydata/dummydata";
import TextFieldInput from "./share/TextFieldInput";

const defaultTheme = createTheme();

const SignupInput = () => {
  const router = useRouter;
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
    const email = data.get("email") as any;
    const password = data.get("password") as any;
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) {
        alert("아이디와 비밀번호를 확인해주세요");
      } else {
        alert("회원가입에 성공하였습니다.");
        router.push("/");
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
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
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
          <Typography component="h1" variant="h5">
            회원가입
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextFieldInput inputdata={loginInputDate[0]} />
              </Grid>
              <Grid item xs={12}>
                <TextFieldInput inputdata={loginInputDate[1]} />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="개인정보 수집에 동의합니다"
                />
              </Grid>
            </Grid>
            <InputButton buttonName={"회원가입"} />

            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  로그인하러하기
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignupInput;
