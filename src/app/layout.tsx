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
  title: "MBTI 통합 플랫폼 | 성격유형 테스트와 개인화 추천",
  description: "무료 MBTI 테스트, 궁합 분석, 커뮤니티, 개인화 추천 서비스. 자신을 이해하고 타인과 더 나은 관계를 맺을 수 있도록 돕는 종합 MBTI 플랫폼입니다.",
  keywords: ["MBTI", "성격테스트", "심리테스트", "MBTI테스트", "성격유형", "궁합분석", "개인화추천", "커뮤니티"],
  authors: [{ name: "MBTI 통합 플랫폼" }],
  creator: "MBTI 통합 플랫폼",
  publisher: "MBTI 통합 플랫폼",
  openGraph: {
    title: "MBTI 통합 플랫폼 | 성격유형 테스트와 개인화 추천",
    description: "무료 MBTI 테스트, 궁합 분석, 커뮤니티, 개인화 추천 서비스",
    type: "website",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "MBTI 통합 플랫폼",
    description: "무료 MBTI 테스트, 궁합 분석, 커뮤니티, 개인화 추천 서비스",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
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
