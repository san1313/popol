import type { Metadata } from "next";
import "../styles/globals.css";
import SideBar from '@/containers/main/SideBar';
import React from 'react';
import Main from "@/containers/main/Main";

export const metadata: Metadata = {
  title: "배창우 포트폴리오",
  description: "개발자 배창우의 포트폴리오입니다.",
};

export const viewport = "width=device-width, initial-scale=1, user-scalable=no";

export default function RootLayout({ children }: { children: React.ReactNode; }) {
  return (
    <html lang="en">
      <body>
          <Main>{children}</Main>
          <SideBar />
      </body>
    </html>
  );
}
