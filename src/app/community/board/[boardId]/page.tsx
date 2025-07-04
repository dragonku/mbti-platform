"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { ArrowLeft, Plus, MessageCircle, Heart, Eye } from "lucide-react";

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

const boardInfo = {
  free: {
    title: "자유게시판",
    description: "자유롭게 이야기해요",
    allowAnonymous: false
  },
  advice: {
    title: "고민상담",
    description: "익명으로 고민을 나누세요",
    allowAnonymous: true
  },
  relationships: {
    title: "인간관계",
    description: "관계에 대한 고민과 조언",
    allowAnonymous: false
  },
  trending: {
    title: "인기글",
    description: "지금 가장 많이 읽히는 글",
    allowAnonymous: false
  }
};

// 더미 데이터
const mockPosts: Post[] = [
  {
    id: "1",
    title: "MBTI 테스트 결과가 바뀌었어요",
    content: "몇 달 전에는 INFP였는데 지금은 ENFP가 나왔어요. 이럴 수도 있나요?",
    author: "익명",
    authorId: "user1",
    createdAt: "2024-01-15T10:30:00Z",
    views: 234,
    likes: 12,
    comments: 8,
    isAnonymous: false
  },
  {
    id: "2",
    title: "직장에서 MBTI 활용법",
    content: "팀원들과 더 잘 소통하기 위해 MBTI를 활용하고 있어요. 경험 공유해주세요!",
    author: "김민수",
    authorId: "user2",
    createdAt: "2024-01-15T09:15:00Z",
    views: 189,
    likes: 15,
    comments: 12,
    isAnonymous: false
  },
  {
    id: "3",
    title: "연애에서 MBTI 궁합이 정말 중요할까요?",
    content: "현재 사귀는 분과 궁합이 별로 안 좋다고 나오는데... 실제로는 어떤지 궁금해요",
    author: "익명",
    authorId: "user3",
    createdAt: "2024-01-15T08:45:00Z",
    views: 456,
    likes: 23,
    comments: 18,
    isAnonymous: true
  }
];

export default function BoardPage() {
  const { data: session } = useSession();
  const params = useParams();
  const boardId = params.boardId as string;
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const currentBoard = boardInfo[boardId as keyof typeof boardInfo];

  useEffect(() => {
    // 실제로는 API 호출
    setTimeout(() => {
      setPosts(mockPosts);
      setLoading(false);
    }, 1000);
  }, [boardId]);

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
                게시판을 이용하려면 먼저 로그인해주세요.
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

  if (!currentBoard) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl dark:shadow-gray-700 p-8">
              <div className="text-6xl mb-6">❓</div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                게시판을 찾을 수 없습니다
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
            <div className="flex items-center mb-4">
              <Link
                href="/community"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors mr-4"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                  {currentBoard.title}
                </h1>
                <p className="text-gray-600 dark:text-gray-300 mt-1">
                  {currentBoard.description}
                </p>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                총 {posts.length}개의 게시글
              </div>
              <Link
                href={`/community/board/${boardId}/write`}
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
                  href={`/community/board/${boardId}/${post.id}`}
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
                      <span>{post.isAnonymous ? "익명" : post.author}</span>
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