"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { ArrowLeft, Heart, MessageCircle, Eye, Flag, Edit, Trash2 } from "lucide-react";

interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  authorId: string;
  createdAt: string;
  views: number;
  likes: number;
  isLiked: boolean;
  isAnonymous: boolean;
}

interface Comment {
  id: string;
  content: string;
  author: string;
  authorId: string;
  createdAt: string;
  isAnonymous: boolean;
  likes: number;
  isLiked: boolean;
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
const mockPost: Post = {
  id: "1",
  title: "MBTI 테스트 결과가 바뀌었어요",
  content: `몇 달 전에는 INFP였는데 지금은 ENFP가 나왔어요. 이럴 수도 있나요?

처음에 테스트 했을 때는 확실히 내향적이라고 생각했는데, 최근에 다시 해보니 외향적으로 나오더라구요. 

혹시 MBTI 결과가 바뀔 수도 있는 건가요? 아니면 제가 잘못 이해하고 있는 걸까요?

같은 경험 있으신 분들 조언 부탁드려요!`,
  author: "김민지",
  authorId: "user1",
  createdAt: "2024-01-15T10:30:00Z",
  views: 234,
  likes: 12,
  isLiked: false,
  isAnonymous: false
};

const mockComments: Comment[] = [
  {
    id: "1",
    content: "저도 비슷한 경험이 있어요! ISFJ에서 ESFJ로 바뀌었거든요. 사람은 변할 수 있다고 생각해요.",
    author: "익명",
    authorId: "user2",
    createdAt: "2024-01-15T11:15:00Z",
    isAnonymous: true,
    likes: 3,
    isLiked: false
  },
  {
    id: "2",
    content: "MBTI는 참고용으로만 보시는 게 좋을 것 같아요. 상황이나 기분에 따라 답변이 달라질 수 있거든요.",
    author: "박서준",
    authorId: "user3",
    createdAt: "2024-01-15T12:30:00Z",
    isAnonymous: false,
    likes: 8,
    isLiked: true
  }
];

export default function PostDetailPage() {
  const { data: session } = useSession();
  const params = useParams();
  const boardId = params.boardId as string;
  const postId = params.postId as string;
  
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [isCommentAnonymous, setIsCommentAnonymous] = useState(false);
  const [loading, setLoading] = useState(true);

  const currentBoard = boardInfo[boardId as keyof typeof boardInfo];

  useEffect(() => {
    // 실제로는 API 호출
    setTimeout(() => {
      setPost(mockPost);
      setComments(mockComments);
      setLoading(false);
    }, 1000);
  }, [postId]);

  const handleLike = async () => {
    if (!post) return;
    
    // 실제로는 API 호출
    setPost({
      ...post,
      likes: post.isLiked ? post.likes - 1 : post.likes + 1,
      isLiked: !post.isLiked
    });
  };

  const handleCommentLike = async (commentId: string) => {
    setComments(comments.map(comment => 
      comment.id === commentId 
        ? {
            ...comment,
            likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
            isLiked: !comment.isLiked
          }
        : comment
    ));
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newComment.trim()) {
      alert("댓글 내용을 입력해주세요.");
      return;
    }

    // 실제로는 API 호출
    const newCommentObj: Comment = {
      id: String(comments.length + 1),
      content: newComment,
      author: isCommentAnonymous ? "익명" : session?.user?.name || "사용자",
      authorId: session?.user?.email || "user",
      createdAt: new Date().toISOString(),
      isAnonymous: isCommentAnonymous,
      likes: 0,
      isLiked: false
    };

    setComments([...comments, newCommentObj]);
    setNewComment("");
    setIsCommentAnonymous(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("ko-KR");
  };

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl dark:shadow-gray-700 p-8">
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-6"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!post || !currentBoard) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl dark:shadow-gray-700 p-8">
              <div className="text-6xl mb-6">❓</div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                게시글을 찾을 수 없습니다
              </h1>
              <Link
                href={`/community/board/${boardId}`}
                className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                게시판으로 돌아가기
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <Link
                href={`/community/board/${boardId}`}
                className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors mr-4"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-lg font-medium text-gray-600 dark:text-gray-400">
                  {currentBoard.title}
                </h1>
              </div>
            </div>
          </div>

          {/* Post */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl dark:shadow-gray-700 p-8 mb-8">
            <div className="flex justify-between items-start mb-6">
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                  {post.title}
                </h1>
                <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                  <span>{post.isAnonymous ? "익명" : post.author}</span>
                  <span>{formatDate(post.createdAt)}</span>
                  <div className="flex items-center">
                    <Eye className="w-4 h-4 mr-1" />
                    {post.views}
                  </div>
                </div>
              </div>
              
              {session?.user?.email === post.authorId && (
                <div className="flex space-x-2">
                  <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            <div className="prose dark:prose-invert max-w-none mb-6">
              <div className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                {post.content}
              </div>
            </div>

            {/* Post Actions */}
            <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-4">
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleLike}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    post.isLiked
                      ? "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400"
                      : "bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600"
                  }`}
                >
                  <Heart className={`w-4 h-4 ${post.isLiked ? "fill-current" : ""}`} />
                  <span>{post.likes}</span>
                </button>
                <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
                  <MessageCircle className="w-4 h-4" />
                  <span>{comments.length}</span>
                </div>
              </div>
              
              <button className="flex items-center space-x-2 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                <Flag className="w-4 h-4" />
                <span>신고</span>
              </button>
            </div>
          </div>

          {/* Comments */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl dark:shadow-gray-700 p-8">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6">
              댓글 {comments.length}개
            </h2>

            {/* Comment Form */}
            <form onSubmit={handleCommentSubmit} className="mb-8">
              {currentBoard.allowAnonymous && (
                <div className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    id="commentAnonymous"
                    checked={isCommentAnonymous}
                    onChange={(e) => setIsCommentAnonymous(e.target.checked)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor="commentAnonymous" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                    익명으로 작성하기
                  </label>
                </div>
              )}
              
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="댓글을 입력하세요..."
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 resize-none mb-4"
              />
              
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  댓글 작성
                </button>
              </div>
            </form>

            {/* Comments List */}
            <div className="space-y-6">
              {comments.map((comment) => (
                <div key={comment.id} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-b-0">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center space-x-3">
                      <span className="font-medium text-gray-800 dark:text-gray-100">
                        {comment.isAnonymous ? "익명" : comment.author}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(comment.createdAt)}
                      </span>
                    </div>
                    
                    {session?.user?.email === comment.authorId && (
                      <div className="flex space-x-2">
                        <button className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                          <Edit className="w-3 h-3" />
                        </button>
                        <button className="text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                  
                  <p className="text-gray-700 dark:text-gray-300 mb-3 whitespace-pre-wrap">
                    {comment.content}
                  </p>
                  
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handleCommentLike(comment.id)}
                      className={`flex items-center space-x-1 text-sm transition-colors ${
                        comment.isLiked
                          ? "text-red-600 dark:text-red-400"
                          : "text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400"
                      }`}
                    >
                      <Heart className={`w-3 h-3 ${comment.isLiked ? "fill-current" : ""}`} />
                      <span>{comment.likes}</span>
                    </button>
                    <button className="text-sm text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                      신고
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}