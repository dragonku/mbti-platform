"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
// import { useState } from "react";
import { MessageCircle, Users, Heart, TrendingUp, Lock, Globe } from "lucide-react";

const mbtiTypes = [
  { type: "ENFP", name: "활동가", color: "bg-green-500", count: 142 },
  { type: "ENFJ", name: "선도자", color: "bg-blue-500", count: 98 },
  { type: "ENTP", name: "논쟁가", color: "bg-purple-500", count: 156 },
  { type: "ENTJ", name: "지휘관", color: "bg-red-500", count: 87 },
  { type: "ESFP", name: "엔터테이너", color: "bg-yellow-500", count: 124 },
  { type: "ESFJ", name: "집정관", color: "bg-pink-500", count: 113 },
  { type: "ESTP", name: "경영자", color: "bg-orange-500", count: 91 },
  { type: "ESTJ", name: "관리자", color: "bg-indigo-500", count: 78 },
  { type: "INFP", name: "중재자", color: "bg-emerald-500", count: 201 },
  { type: "INFJ", name: "옹호자", color: "bg-violet-500", count: 167 },
  { type: "INTP", name: "논리술사", color: "bg-cyan-500", count: 134 },
  { type: "INTJ", name: "건축가", color: "bg-slate-500", count: 89 },
  { type: "ISFP", name: "모험가", color: "bg-lime-500", count: 145 },
  { type: "ISFJ", name: "수호자", color: "bg-teal-500", count: 132 },
  { type: "ISTP", name: "장인", color: "bg-amber-500", count: 76 },
  { type: "ISTJ", name: "논리주의자", color: "bg-stone-500", count: 94 }
];

const communityBoards = [
  {
    id: "free",
    title: "자유게시판",
    description: "자유롭게 이야기해요",
    icon: <Globe className="w-5 h-5" />,
    posts: 1247,
    todayPosts: 23,
    isPublic: true
  },
  {
    id: "advice",
    title: "고민상담",
    description: "익명으로 고민을 나누세요",
    icon: <Lock className="w-5 h-5" />,
    posts: 892,
    todayPosts: 15,
    isPublic: false
  },
  {
    id: "relationships",
    title: "인간관계",
    description: "관계에 대한 고민과 조언",
    icon: <Heart className="w-5 h-5" />,
    posts: 634,
    todayPosts: 18,
    isPublic: true
  },
  {
    id: "trending",
    title: "인기글",
    description: "지금 가장 많이 읽히는 글",
    icon: <TrendingUp className="w-5 h-5" />,
    posts: 156,
    todayPosts: 8,
    isPublic: true
  }
];

export default function CommunityPage() {
  const { data: session } = useSession();
  // const [selectedCategory, setSelectedCategory] = useState("all");

  if (!session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl dark:shadow-gray-700 p-8">
              <div className="text-6xl mb-6">🔐</div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                로그인이 필요합니다
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                커뮤니티 기능을 이용하려면 먼저 로그인해주세요.
              </p>
              <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
                <Link
                  href="/auth/signin"
                  className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  로그인하기
                </Link>
                <Link
                  href="/auth/signup"
                  className="inline-block bg-gray-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors"
                >
                  회원가입하기
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              MBTI 커뮤니티
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              같은 MBTI 타입의 사람들과 소통하고 경험을 나누어요
            </p>
          </div>

          {/* Community Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-700 p-6">
              <div className="flex items-center">
                <Users className="w-8 h-8 text-blue-500 mr-3" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">활성 사용자</h3>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">2,847</p>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-700 p-6">
              <div className="flex items-center">
                <MessageCircle className="w-8 h-8 text-green-500 mr-3" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">오늘 글</h3>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">64</p>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-700 p-6">
              <div className="flex items-center">
                <Heart className="w-8 h-8 text-red-500 mr-3" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">총 게시글</h3>
                  <p className="text-2xl font-bold text-red-600 dark:text-red-400">12,493</p>
                </div>
              </div>
            </div>
          </div>

          {/* General Community Boards */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">일반 게시판</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {communityBoards.map((board) => (
                <Link
                  key={board.id}
                  href={`/community/board/${board.id}`}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-700 p-6 hover:shadow-xl dark:hover:shadow-gray-600 transition-shadow"
                >
                  <div className="flex items-center mb-3">
                    <div className="text-blue-500 mr-3">
                      {board.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                      {board.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    {board.description}
                  </p>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">
                      총 {board.posts.toLocaleString()}개
                    </span>
                    <span className="text-blue-600 dark:text-blue-400">
                      오늘 +{board.todayPosts}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* MBTI Type Boards */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">MBTI 타입별 게시판</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {mbtiTypes.map((mbti) => (
                <Link
                  key={mbti.type}
                  href={`/community/mbti/${mbti.type.toLowerCase()}`}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-700 p-6 hover:shadow-xl dark:hover:shadow-gray-600 transition-shadow"
                >
                  <div className="flex items-center mb-3">
                    <div className={`w-4 h-4 rounded-full ${mbti.color} mr-3`}></div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                      {mbti.type}
                    </h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    {mbti.name}
                  </p>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">
                      {mbti.count}명 활동
                    </span>
                    <span className="text-blue-600 dark:text-blue-400">
                      참여하기 →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}