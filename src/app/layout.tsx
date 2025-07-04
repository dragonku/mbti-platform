import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthSessionProvider from "@/components/SessionProvider";
import Navigation from "@/components/Navigation";
import { ThemeProvider } from "@/contexts/ThemeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MBTI 통합 플랫폼",
  description: "자신을 이해하고 타인과 더 나은 관계를 맺을 수 있도록 돕는 종합 MBTI 서비스",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors`}
      >
        <ThemeProvider>
          <AuthSessionProvider>
            <Navigation />
            {children}
          </AuthSessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
