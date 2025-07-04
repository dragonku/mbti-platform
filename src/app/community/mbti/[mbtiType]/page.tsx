"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { ArrowLeft, Plus, MessageCircle, Heart, Eye, Users, TrendingUp } from "lucide-react";

interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  authorId: string;
  createdAt: string;
  views: number;
  likes: number;
  comments: number;
  isAnonymous: boolean;
}

const mbtiInfo = {
  enfp: { name: "활동가", color: "bg-green-500", description: "열정적이고 창의적인 사람" },
  enfj: { name: "선도자", color: "bg-blue-500", description: "카리스마 있고 영감을 주는 지도자" },
  entp: { name: "논쟁가", color: "bg-purple-500", description: "지적인 호기심이 많은 사상가" },
  entj: { name: "지휘관", color: "bg-red-500", description: "대담하고 의지가 강한 지도자" },
  esfp: { name: "엔터테이너", color: "bg-yellow-500", description: "즉흥적이고 열정적인 사람" },
  esfj: { name: "집정관", color: "bg-pink-500", description: "따뜻하고 양심적인 협력자" },
  estp: { name: "경영자", color: "bg-orange-500", description: "지각이 뛰어나고 현실적인 사람" },
  estj: { name: "관리자", color: "bg-indigo-500", description: "실용적이고 사실에 근거한 지도자" },
  infp: { name: "중재자", color: "bg-emerald-500", description: "이상주의적이고 충성스러운 사람" },
  infj: { name: "옹호자", color: "bg-violet-500", description: "창의적이고 통찰력 있는 영감가" },
  intp: { name: "논리술사", color: "bg-cyan-500", description: "혁신적이고 독특한 사상가" },
  intj: { name: "건축가", color: "bg-slate-500", description: "상상력이 풍부하고 전략적인 사상가" },
  isfp: { name: "모험가", color: "bg-lime-500", description: "유연하고 매력적인 예술가" },
  isfj: { name: "수호자", color: "bg-teal-500", description: "따뜻하고 헌신적인 보호자" },
  istp: { name: "장인", color: "bg-amber-500", description: "대담하고 실용적인 실험가" },
  istj: { name: "논리주의자", color: "bg-stone-500", description: "실용적이고 사실에 근거한 신뢰할 수 있는 사람" }
};

// 더미 데이터
const mockPosts: Post[] = [
  {
    id: "1",
    title: "ENFP 특징 중에 공감되는 것들",
    content: "저는 정말 새로운 아이디어에 흥미를 많이 느끼는 편이에요. 다들 어떠신가요?",
    author: "김활동",
    authorId: "user1",
    createdAt: "2024-01-15T10:30:00Z",
    views: 145,
    likes: 23,
    comments: 12,
    isAnonymous: false
  },
  {
    id: "2",
    title: "직장에서 ENFP로 살아가기",
    content: "규칙적인 업무보다는 창의적인 일을 좋아하는데, 현실적으로는 쉽지 않네요...",
    author: "박에너지",
    authorId: "user2",
    createdAt: "2024-01-15T09:15:00Z",
    views: 289,
    likes: 18,
    comments: 15,
    isAnonymous: false
  },
  {
    id: "3",
    title: "ENFP 친구들과의 모임 후기",
    content: "드디어 오프라인 모임을 가졌어요! 정말 즐거웠습니다 ㅎㅎ",
    author: "이즐거움",
    authorId: "user3",
    createdAt: "2024-01-15T08:45:00Z",
    views: 178,
    likes: 34,
    comments: 8,
    isAnonymous: false
  }
];

export default function MBTIBoardPage() {
  const { data: session } = useSession();
  const params = useParams();
  const mbtiType = (params.mbtiType as string)?.toUpperCase();
  const mbtiTypeKey = mbtiType?.toLowerCase() as keyof typeof mbtiInfo;
  
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [memberCount] = useState(142); // 임시 회원 수

  const currentMBTI = mbtiInfo[mbtiTypeKey];

  useEffect(() => {
    // 실제로는 API 호출
    setTimeout(() => {
      setPosts(mockPosts);
      setLoading(false);
    }, 1000);
  }, [mbtiType]);

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
                MBTI 게시판을 이용하려면 먼저 로그인해주세요.
              </p>
              <Link
                href="/auth/signin"
                className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                로그인하기
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!currentMBTI) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl dark:shadow-gray-700 p-8">
              <div className="text-6xl mb-6">❓</div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                잘못된 MBTI 타입입니다
              </h1>
              <Link
                href="/community"
                className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                커뮤니티로 돌아가기
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
      return "오늘";
    } else if (diffDays === 2) {
      return "어제";
    } else if (diffDays <= 7) {
      return `${diffDays - 1}일 전`;
    } else {
      return date.toLocaleDateString("ko-KR");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center mb-6">
              <Link
                href="/community"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors mr-4"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full ${currentMBTI.color} mr-4`}></div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                    {mbtiType} - {currentMBTI.name}
                  </h1>
                  <p className="text-gray-600 dark:text-gray-300 mt-1">
                    {currentMBTI.description}
                  </p>
                </div>
              </div>
            </div>

            {/* MBTI Board Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-700 p-4">
                <div className="flex items-center">
                  <Users className="w-6 h-6 text-blue-500 mr-3" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">활동 멤버</h3>
                    <p className="text-lg font-bold text-blue-600 dark:text-blue-400">{memberCount}명</p>
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-700 p-4">
                <div className="flex items-center">
                  <MessageCircle className="w-6 h-6 text-green-500 mr-3" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">총 게시글</h3>
                    <p className="text-lg font-bold text-green-600 dark:text-green-400">{posts.length}개</p>
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-700 p-4">
                <div className="flex items-center">
                  <TrendingUp className="w-6 h-6 text-purple-500 mr-3" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">오늘 활동</h3>
                    <p className="text-lg font-bold text-purple-600 dark:text-purple-400">12개</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {mbtiType} 멤버들과 소통해보세요!
              </div>
              <Link
                href={`/community/mbti/${mbtiTypeKey}/write`}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                글쓰기
              </Link>
            </div>
          </div>

          {/* Posts List */}
          <div className="space-y-4">
            {loading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-700 p-6">
                    <div className="animate-pulse">
                      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-3"></div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/community/mbti/${mbtiTypeKey}/${post.id}`}
                  className="block bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-700 p-6 hover:shadow-xl dark:hover:shadow-gray-600 transition-shadow"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 flex-1">
                      {post.title}
                    </h3>
                    <div className="text-sm text-gray-500 dark:text-gray-400 ml-4">
                      {formatDate(post.createdAt)}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                    {post.content}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center">
                        <div className={`w-3 h-3 rounded-full ${currentMBTI.color} mr-1`}></div>
                        {post.isAnonymous ? "익명" : post.author}
                      </span>
                      <div className="flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        {post.views}
                      </div>
                      <div className="flex items-center">
                        <Heart className="w-4 h-4 mr-1" />
                        {post.likes}
                      </div>
                      <div className="flex items-center">
                        <MessageCircle className="w-4 h-4 mr-1" />
                        {post.comments}
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>

          {/* Pagination */}
          <div className="mt-8 flex justify-center">
            <div className="flex space-x-2">
              <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                이전
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                1
              </button>
              <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                2
              </button>
              <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                3
              </button>
              <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                다음
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}