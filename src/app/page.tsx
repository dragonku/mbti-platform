"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-800 dark:text-gray-100 mb-6">
            MBTI 통합 플랫폼
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            자신을 이해하고 타인과 더 나은 관계를 맺을 수 있도록 돕는 
            종합 MBTI 서비스입니다.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-700 p-6 hover:shadow-xl dark:hover:shadow-gray-600 transition-shadow">
              <div className="text-3xl mb-4">🎮</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">게임화된 테스트</h3>
              <p className="text-gray-600 dark:text-gray-400">재미있는 상황별 선택으로 진행하는 MBTI 테스트</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-700 p-6 hover:shadow-xl dark:hover:shadow-gray-600 transition-shadow">
              <div className="text-3xl mb-4">💝</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">궁합 분석</h3>
              <p className="text-gray-600 dark:text-gray-400">친구, 연인, 가족과의 관계를 더 깊이 이해하세요</p>
            </div>
            
            <Link href="/community" className="block">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-700 p-6 hover:shadow-xl dark:hover:shadow-gray-600 transition-shadow">
                <div className="text-3xl mb-4">👥</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">커뮤니티</h3>
                <p className="text-gray-600 dark:text-gray-400">같은 MBTI 타입의 사람들과 소통하고 교류하세요</p>
              </div>
            </Link>
            
            <Link href="/recommendations" className="block">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-700 p-6 hover:shadow-xl dark:hover:shadow-gray-600 transition-shadow">
                <div className="text-3xl mb-4">🎯</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">개인화 추천</h3>
                <p className="text-gray-600 dark:text-gray-400">당신의 MBTI에 맞는 직업, 취미, 도서를 추천받으세요</p>
              </div>
            </Link>
          </div>
          
          <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
            <Link
              href="/test"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              MBTI 테스트 시작하기
            </Link>
            {session ? (
              <Link
                href="/profile"
                className="inline-block bg-purple-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
              >
                내 프로필 보기
              </Link>
            ) : (
              <Link
                href="/auth/signup"
                className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                무료 회원가입
              </Link>
            )}
            <Link
              href="/about"
              className="inline-block bg-gray-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors"
            >
              서비스 소개
            </Link>
          </div>

          {session && (
            <div className="mt-8 p-4 bg-blue-100 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded-lg">
              <p className="text-blue-800 dark:text-blue-200">
                안녕하세요, <strong>{session.user?.name || session.user?.email}</strong>님! 
                오늘도 MBTI 플랫폼을 이용해주셔서 감사합니다.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
