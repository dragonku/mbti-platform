"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Briefcase, Book, Heart, Music, Gamepad2, Palette, Star, RefreshCw } from "lucide-react";

interface Recommendation {
  id: string;
  title: string;
  description: string;
  category: string;
  matchPercentage: number;
  reason: string;
  tags: string[];
}

// interface UserPreferences {
//   mbtiType: string;
//   interests: string[];
//   careerStage: string;
//   favoriteGenres: string[];
// }

const categories = [
  { id: "career", name: "직업", icon: <Briefcase className="w-5 h-5" />, color: "bg-blue-500" },
  { id: "books", name: "도서", icon: <Book className="w-5 h-5" />, color: "bg-green-500" },
  { id: "hobbies", name: "취미", icon: <Heart className="w-5 h-5" />, color: "bg-red-500" },
  { id: "music", name: "음악", icon: <Music className="w-5 h-5" />, color: "bg-purple-500" },
  { id: "games", name: "게임", icon: <Gamepad2 className="w-5 h-5" />, color: "bg-orange-500" },
  { id: "art", name: "예술", icon: <Palette className="w-5 h-5" />, color: "bg-pink-500" }
];

// MBTI별 추천 데이터
const mbtiRecommendations = {
  ENFP: {
    career: [
      { title: "마케팅 전문가", description: "창의적인 아이디어로 브랜드를 알리는 일", matchPercentage: 95, reason: "ENFP의 창의성과 사람들과의 소통 능력이 뛰어나게 발휘됩니다", tags: ["창의적", "소통", "유연함"] },
      { title: "상담사", description: "사람들의 마음을 이해하고 도와주는 일", matchPercentage: 92, reason: "타인에 대한 깊은 이해와 공감 능력이 핵심입니다", tags: ["공감", "상담", "인간관계"] },
      { title: "기업가", description: "새로운 아이디어로 사업을 시작하는 일", matchPercentage: 88, reason: "혁신적인 사고와 모험 정신이 필요한 분야입니다", tags: ["혁신", "리더십", "모험"] }
    ],
    books: [
      { title: "자기계발서", description: "개인 성장과 발전을 위한 책들", matchPercentage: 90, reason: "새로운 가능성을 탐구하는 ENFP 성향에 적합합니다", tags: ["성장", "동기부여", "영감"] },
      { title: "심리학", description: "인간의 마음과 행동을 다룬 책들", matchPercentage: 87, reason: "사람에 대한 깊은 이해를 원하는 성향과 맞습니다", tags: ["인간이해", "심리", "통찰"] },
      { title: "여행기", description: "다양한 문화와 경험을 담은 책들", matchPercentage: 85, reason: "새로운 경험과 모험을 좋아하는 성향에 부합합니다", tags: ["모험", "문화", "경험"] }
    ],
    hobbies: [
      { title: "사진 촬영", description: "순간을 포착하고 창의적으로 표현하기", matchPercentage: 93, reason: "창의적 표현과 새로운 시각 발견에 적합합니다", tags: ["창의성", "예술", "탐험"] },
      { title: "여행", description: "새로운 장소를 탐험하고 경험하기", matchPercentage: 95, reason: "새로운 경험과 만남을 좋아하는 ENFP에게 완벽합니다", tags: ["모험", "경험", "문화"] },
      { title: "요리", description: "창의적인 레시피로 요리 만들기", matchPercentage: 82, reason: "실험적이고 창의적인 활동을 즐기는 성향에 맞습니다", tags: ["창의성", "실험", "나눔"] }
    ]
  },
  INTJ: {
    career: [
      { title: "전략 기획자", description: "장기적인 계획과 전략을 수립하는 일", matchPercentage: 96, reason: "체계적 사고와 미래 지향적 관점이 강점입니다", tags: ["전략", "분석", "계획"] },
      { title: "소프트웨어 개발자", description: "논리적 사고로 프로그램을 개발하는 일", matchPercentage: 94, reason: "논리적 문제 해결과 체계적 접근이 필요한 분야입니다", tags: ["논리", "시스템", "혁신"] },
      { title: "연구원", description: "깊이 있는 연구로 새로운 지식을 창출하는 일", matchPercentage: 92, reason: "독립적이고 체계적인 연구 능력이 뛰어납니다", tags: ["연구", "분석", "독립성"] }
    ],
    books: [
      { title: "철학서", description: "깊이 있는 사고와 통찰을 다룬 책들", matchPercentage: 94, reason: "깊은 사고와 본질적 이해를 추구하는 성향에 적합합니다", tags: ["철학", "통찰", "본질"] },
      { title: "과학서", description: "과학적 원리와 발견을 다룬 책들", matchPercentage: 91, reason: "체계적이고 논리적인 지식 탐구에 관심이 높습니다", tags: ["과학", "논리", "탐구"] },
      { title: "전략서", description: "전략과 계획에 관한 책들", matchPercentage: 89, reason: "장기적 사고와 체계적 접근을 좋아하는 성향과 맞습니다", tags: ["전략", "계획", "체계"] }
    ],
    hobbies: [
      { title: "체스", description: "전략적 사고를 요하는 보드게임", matchPercentage: 95, reason: "깊은 전략적 사고와 계획 능력이 필요한 활동입니다", tags: ["전략", "논리", "계획"] },
      { title: "독서", description: "다양한 지식과 통찰을 얻는 활동", matchPercentage: 93, reason: "깊이 있는 학습과 사고를 즐기는 성향에 적합합니다", tags: ["지식", "통찰", "독립"] },
      { title: "프로그래밍", description: "논리적 사고로 문제를 해결하는 활동", matchPercentage: 90, reason: "체계적이고 논리적인 문제 해결을 선호합니다", tags: ["논리", "창조", "시스템"] }
    ]
  }
};

export default function RecommendationsPage() {
  const { data: session } = useSession();
  const [selectedCategory, setSelectedCategory] = useState("career");
  const [userMBTI, setUserMBTI] = useState<string>("ENFP");
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // 사용자 MBTI 가져오기 (실제로는 API 호출)
    const savedResult = localStorage.getItem('mbtiHistory');
    if (savedResult) {
      const history = JSON.parse(savedResult);
      if (history.length > 0) {
        setUserMBTI(history[0].result);
      }
    }
  }, []);

  useEffect(() => {
    generateRecommendations();
  }, [selectedCategory, userMBTI]); // eslint-disable-line react-hooks/exhaustive-deps

  const generateRecommendations = async () => {
    setLoading(true);
    
    // 실제로는 AI/알고리즘 기반 추천 API 호출
    setTimeout(() => {
      const mbtiData = mbtiRecommendations[userMBTI as keyof typeof mbtiRecommendations];
      if (mbtiData && mbtiData[selectedCategory as keyof typeof mbtiData]) {
        const categoryRecs = mbtiData[selectedCategory as keyof typeof mbtiData];
        setRecommendations(categoryRecs.map((rec, index) => ({
          id: `${selectedCategory}_${index}`,
          category: selectedCategory,
          ...rec
        })));
      } else {
        setRecommendations([]);
      }
      setLoading(false);
    }, 1000);
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
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                개인화된 추천을 받으려면 먼저 로그인해주세요.
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              개인화 추천 서비스
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">
              당신의 MBTI 유형에 맞는 맞춤형 추천을 받아보세요
            </p>
            <div className="inline-flex items-center bg-blue-100 dark:bg-blue-900/30 px-4 py-2 rounded-full">
              <span className="text-blue-800 dark:text-blue-300 font-medium">
                현재 MBTI: {userMBTI}
              </span>
            </div>
          </div>

          {/* Category Selection */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">추천 카테고리</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`p-6 rounded-lg transition-all duration-200 ${
                    selectedCategory === category.id
                      ? `${category.color} text-white shadow-lg transform scale-105`
                      : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-md"
                  }`}
                >
                  <div className="flex flex-col items-center space-y-2">
                    {category.icon}
                    <span className="font-medium">{category.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                {categories.find(c => c.id === selectedCategory)?.name} 추천
              </h2>
              <button
                onClick={generateRecommendations}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                <span>새로고침</span>
              </button>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-700 p-6">
                    <div className="animate-pulse">
                      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-3"></div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
                      <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendations.map((rec) => (
                  <div key={rec.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-700 p-6 hover:shadow-xl dark:hover:shadow-gray-600 transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                        {rec.title}
                      </h3>
                      <div className="flex items-center bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full">
                        <Star className="w-3 h-3 text-green-600 dark:text-green-400 mr-1" />
                        <span className="text-xs font-medium text-green-600 dark:text-green-400">
                          {rec.matchPercentage}%
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {rec.description}
                    </p>
                    
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg mb-4">
                      <p className="text-sm text-blue-800 dark:text-blue-300">
                        <strong>추천 이유:</strong> {rec.reason}
                      </p>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {rec.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-700 p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              더 정확한 추천을 원하시나요?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              선호도 설정을 통해 더욱 개인화된 추천을 받아보세요
            </p>
            <div className="space-x-4">
              <Link
                href="/test"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                MBTI 재테스트
              </Link>
              <Link
                href="/recommendations/preferences"
                className="inline-block bg-gray-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors"
              >
                선호도 설정
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}