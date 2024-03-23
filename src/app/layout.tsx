import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Head from "next/head";

import SessionProvider from "@/component/auth/SessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "루틴플래너",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Head>
        <title>planner</title>
        <meta
          name="description"
          content="Awesome todoapp to store your awsome todos"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <html lang="ko">
        <body className={inter.className}>
          <SessionProvider>{children}</SessionProvider>
        </body>
      </html>
    </>
  );
}
