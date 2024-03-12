"use client";
import * as React from "react";
import Button from "@mui/material/Button";
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
const Login = () => {
  const { useremail, setEmail } = emailStore();
  const router = useRouter();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email") as any;
    const password = data.get("password") as string;
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        console.error("로그인 실패:", error.message);
      } else {
        console.log("로그인 성공:", email);
        setEmail(email);
        router.push("/routinemain");
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
              {loginInputDate.map((inputdata, i) => (
                <TextFieldInput inputdata={inputdata} key={i} />
              ))}

              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="기억하기"
              />
             <InputButton buttonName={"로그인"} />
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    비밀번호 찾기
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"회원가입"}
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

export default Login;
