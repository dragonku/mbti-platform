"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

export default function Navigation() {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  // 인증 페이지에서는 네비게이션을 숨김
  if (pathname?.startsWith('/auth/')) {
    return null;
  }

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-xl font-bold text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              MBTI 플랫폼
            </Link>
            <div className="hidden md:flex space-x-6">
              <Link
                href="/"
                className={`text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors ${
                  pathname === '/' ? 'text-blue-600 dark:text-blue-400 font-medium' : ''
                }`}
              >
                홈
              </Link>
              <Link
                href="/test"
                className={`text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors ${
                  pathname === '/test' ? 'text-blue-600 dark:text-blue-400 font-medium' : ''
                }`}
              >
                테스트
              </Link>
              <Link
                href="/about"
                className={`text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors ${
                  pathname === '/about' ? 'text-blue-600 dark:text-blue-400 font-medium' : ''
                }`}
              >
                소개
              </Link>
              <Link
                href="/community"
                className={`text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors ${
                  pathname?.startsWith('/community') ? 'text-blue-600 dark:text-blue-400 font-medium' : ''
                }`}
              >
                커뮤니티
              </Link>
              <Link
                href="/recommendations"
                className={`text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors ${
                  pathname?.startsWith('/recommendations') ? 'text-blue-600 dark:text-blue-400 font-medium' : ''
                }`}
              >
                추천
              </Link>
              {session && (
                <Link
                  href="/profile"
                  className={`text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors ${
                    pathname === '/profile' ? 'text-blue-600 dark:text-blue-400 font-medium' : ''
                  }`}
                >
                  프로필
                </Link>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            {status === "loading" ? (
              <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
            ) : session ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  {session.user?.image ? (
                    <Image
                      src={session.user.image}
                      alt="Profile"
                      width={32}
                      height={32}
                      className="h-8 w-8 rounded-full"
                    />
                  ) : (
                    <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                      {session.user?.name?.charAt(0) || session.user?.email?.charAt(0) || "U"}
                    </div>
                  )}
                  <span className="text-sm text-gray-700 dark:text-gray-300 hidden sm:block">
                    {session.user?.name || session.user?.email}
                  </span>
                </div>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="text-sm text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                >
                  로그아웃
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  href="/auth/signin"
                  className="text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  로그인
                </Link>
                <Link
                  href="/auth/signup"
                  className="bg-blue-600 dark:bg-blue-700 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
                >
                  회원가입
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}