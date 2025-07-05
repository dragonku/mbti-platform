"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { ArrowLeft, Share2, Download, Heart } from "lucide-react";

function ResultContent() {
  const searchParams = useSearchParams();
  const [mbti, setMbti] = useState("");
  const [scores, setScores] = useState<{ [key: string]: number }>({});
  const [percentages, setPercentages] = useState<{ [key: string]: number }>({});
  const [timeSpent, setTimeSpent] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const mbtiParam = searchParams.get('mbti');
    const scoresParam = searchParams.get('scores');
    const percentagesParam = searchParams.get('percentages');
    const timeSpentParam = searchParams.get('timeSpent');
    
    if (mbtiParam && scoresParam && percentagesParam) {
      setMbti(mbtiParam);
      setScores(JSON.parse(scoresParam));
      setPercentages(JSON.parse(percentagesParam));
      setTimeSpent(timeSpentParam ? parseInt(timeSpentParam) : 0);
    }
    setLoading(false);
  }, [searchParams]);

  const getMBTIDescription = (mbti: string) => {
    const descriptions: { [key: string]: { title: string; description: string; traits: string[]; careers: string[] } } = {
      'ENFP': {
        title: '활동가 - 열정적이고 창의적인 사람',
        description: '상상력이 풍부하고 열정적이며 호기심이 많은 자유로운 영혼입니다. 새로운 아이디어와 가능성을 탐구하는 것을 좋아합니다.',
        traits: ['창의적이고 열정적', '사교적이고 친근함', '융통성 있고 개방적', '타인에 대한 진정한 관심'],
        careers: ['상담사', '작가', '마케터', '기자', '교사', '예술가']
      },
      'ENFJ': {
        title: '선도자 - 카리스마 있고 영감을 주는 지도자',
        description: '타인의 잠재력을 발견하고 격려하는 천부적인 지도자입니다. 사람들을 하나로 모으고 공동의 목표를 향해 이끄는 능력이 뛰어납니다.',
        traits: ['카리스마 있는 리더십', '타인에 대한 깊은 이해', '이상주의적', '설득력 있는 의사소통'],
        careers: ['교사', '상담사', '정치인', 'HR 전문가', '코치', '사회복지사']
      },
      'ENTP': {
        title: '논쟁가 - 지적인 호기심이 많은 사상가',
        description: '창의적이고 논리적인 사고를 통해 새로운 아이디어를 탐구하는 것을 즐깁니다. 토론과 지적인 도전을 좋아합니다.',
        traits: ['혁신적이고 창의적', '논리적 사고력', '유연하고 적응력 좋음', '지적 호기심이 강함'],
        careers: ['발명가', '컨설턴트', '변호사', '과학자', '기업가', '분석가']
      },
      'ENTJ': {
        title: '지휘관 - 대담하고 의지가 강한 지도자',
        description: '효율성과 성과를 중시하며, 장기적인 목표를 설정하고 달성하는데 뛰어난 능력을 보입니다. 자연스러운 리더십을 발휘합니다.',
        traits: ['강력한 리더십', '전략적 사고', '결단력 있음', '목표 지향적'],
        careers: ['CEO', '관리자', '변호사', '투자자', '컨설턴트', '군인']
      },
      'ESFP': {
        title: '엔터테이너 - 즉흥적이고 열정적인 사람',
        description: '삶을 즐기고 다른 사람들과 함께 시간을 보내는 것을 좋아합니다. 순간을 소중히 여기며 긍정적인 에너지를 전파합니다.',
        traits: ['사교적이고 활발함', '즉흥적이고 유연함', '실용적', '낙천적이고 친근함'],
        careers: ['연예인', '판매원', '이벤트 기획자', '여행 가이드', '운동선수', '요리사']
      },
      'ESFJ': {
        title: '집정관 - 따뜻하고 양심적인 협력자',
        description: '다른 사람들의 필요를 민감하게 파악하고 도움을 주려고 노력합니다. 조화롭고 안정적인 환경을 만드는데 뛰어납니다.',
        traits: ['협력적이고 지지적', '책임감이 강함', '세심하고 배려심 많음', '전통과 질서를 중시'],
        careers: ['간호사', '교사', '사회복지사', '비서', '고객서비스', '행정직']
      },
      'ESTP': {
        title: '경영자 - 지각이 뛰어나고 현실적인 사람',
        description: '현재에 집중하며 실용적인 해결책을 찾는데 능숙합니다. 에너지가 넘치고 행동 지향적입니다.',
        traits: ['행동 지향적', '현실적이고 실용적', '적응력이 뛰어남', '사교적이고 활동적'],
        careers: ['영업', '경영자', '운동선수', '응급구조사', '경찰', '기업가']
      },
      'ESTJ': {
        title: '관리자 - 실용적이고 사실에 근거한 지도자',
        description: '체계적이고 효율적인 방식으로 일을 처리하며, 전통과 질서를 중시합니다. 책임감이 강하고 신뢰할 수 있습니다.',
        traits: ['조직적이고 체계적', '책임감이 강함', '결단력 있음', '전통적 가치 중시'],
        careers: ['관리자', '군인', '경찰', '회계사', '판사', '은행원']
      },
      'INFP': {
        title: '중재자 - 이상주의적이고 충성스러운 사람',
        description: '깊은 가치관을 가지고 있으며, 자신과 타인의 성장을 중시합니다. 조화롭고 진정성 있는 관계를 추구합니다.',
        traits: ['이상주의적', '창의적이고 상상력 풍부', '개인적 가치 중시', '적응력 있고 개방적'],
        careers: ['작가', '상담사', '예술가', '심리학자', '사회복지사', '번역가']
      },
      'INFJ': {
        title: '옹호자 - 창의적이고 통찰력 있는 영감가',
        description: '깊은 통찰력과 강한 직관력을 가지고 있습니다. 타인을 이해하고 돕는 것에서 만족을 느끼며, 의미 있는 목표를 추구합니다.',
        traits: ['통찰력 있고 직관적', '이상주의적이고 원칙적', '창의적이고 독창적', '타인에 대한 깊은 이해'],
        careers: ['상담사', '작가', '심리학자', '교사', '연구원', '종교인']
      },
      'INTP': {
        title: '논리술사 - 혁신적이고 독특한 사상가',
        description: '논리적 분석과 이론적 탐구를 즐기며, 복잡한 문제를 해결하는데 뛰어난 능력을 보입니다. 독립적이고 지적 호기심이 강합니다.',
        traits: ['논리적이고 분석적', '독창적이고 혁신적', '독립적', '지적 호기심이 강함'],
        careers: ['연구원', '프로그래머', '수학자', '철학자', '과학자', '분석가']
      },
      'INTJ': {
        title: '건축가 - 상상력이 풍부하고 전략적인 사상가',
        description: '장기적인 비전을 가지고 체계적으로 목표를 달성하는 전략가입니다. 독립적이고 결단력이 있으며, 높은 기준을 추구합니다.',
        traits: ['전략적이고 미래 지향적', '독립적이고 결단력 있음', '완벽주의적', '체계적이고 조직적'],
        careers: ['전략 기획자', '연구원', '건축가', '투자자', '컨설턴트', '과학자']
      },
      'ISFP': {
        title: '모험가 - 유연하고 매력적인 예술가',
        description: '조화롭고 평화로운 환경을 추구하며, 자신의 가치관에 따라 살아갑니다. 미적 감각이 뛰어나고 창의적입니다.',
        traits: ['조화로움을 추구', '유연하고 적응력 좋음', '심미적 감각 뛰어남', '개인적 가치 중시'],
        careers: ['예술가', '디자이너', '사진작가', '음악가', '요리사', '수의사']
      },
      'ISFJ': {
        title: '수호자 - 따뜻하고 헌신적인 보호자',
        description: '타인의 안녕을 위해 헌신하며, 책임감이 강하고 신뢰할 수 있습니다. 전통과 안정을 중시하며 세심한 배려를 보입니다.',
        traits: ['헌신적이고 책임감 강함', '세심하고 배려심 많음', '신뢰할 수 있음', '전통적 가치 중시'],
        careers: ['간호사', '교사', '상담사', '도서관사서', '행정직', '의료진']
      },
      'ISTP': {
        title: '장인 - 대담하고 실용적인 실험가',
        description: '손으로 만들고 탐구하는 것을 좋아하며, 실용적인 해결책을 찾는데 뛰어납니다. 독립적이고 융통성이 있습니다.',
        traits: ['실용적이고 현실적', '독립적', '문제 해결 능력 뛰어남', '적응력 있고 유연함'],
        careers: ['엔지니어', '기술자', '조종사', '의료진', '요리사', '운동선수']
      },
      'ISTJ': {
        title: '논리주의자 - 실용적이고 사실에 근거한 신뢰할 수 있는 사람',
        description: '체계적이고 신뢰할 수 있으며, 전통과 질서를 중시합니다. 책임감이 강하고 꾸준히 목표를 달성해 나갑니다.',
        traits: ['체계적이고 조직적', '책임감이 강함', '신뢰할 수 있음', '전통과 질서 중시'],
        careers: ['회계사', '은행원', '법무사', '공무원', '의사', '관리자']
      }
    };
    
    return descriptions[mbti] || {
      title: '알 수 없는 유형',
      description: '',
      traits: [],
      careers: []
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">결과를 분석하는 중...</p>
        </div>
      </div>
    );
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}분 ${remainingSeconds}초`;
  };

  if (!mbti || Object.keys(scores).length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">결과를 찾을 수 없습니다</h1>
          <Link href="/test" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            테스트 다시하기
          </Link>
        </div>
      </div>
    );
  }

  const description = getMBTIDescription(mbti);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* 헤더 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl dark:shadow-gray-700 p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <Link 
                href="/test"
                className="flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                테스트로 돌아가기
              </Link>
              <div className="flex space-x-4">
                <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Share2 className="w-4 h-4 mr-2" />
                  공유하기
                </button>
                <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  <Download className="w-4 h-4 mr-2" />
                  저장하기
                </button>
              </div>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg p-8 mb-6">
                <h1 className="text-4xl font-bold mb-4">🎉 테스트 완료!</h1>
                <div className="text-6xl font-bold mb-4">{mbti}</div>
                <h2 className="text-2xl font-semibold mb-2">{description.title}</h2>
                <div className="text-sm opacity-80">
                  완료 시간: {formatTime(timeSpent)} | 총 40문항
                </div>
              </div>

              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                {description.description}
              </p>
            </div>
          </div>

          {/* 시각적 차트 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-700 p-8 mb-8">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 text-center">
              📊 당신의 성향 분석
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* E/I 차원 */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-300">에너지 방향</h4>
                <div className="relative">
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                    <span>내향형 (I)</span>
                    <span>외향형 (E)</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-6">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-blue-500 h-6 rounded-full flex items-center justify-center text-white text-sm font-bold"
                      style={{ width: `${percentages.E || 0}%` }}
                    >
                      {mbti[0] === 'E' ? `${percentages.E}% E` : `${percentages.I}% I`}
                    </div>
                  </div>
                </div>
              </div>

              {/* S/N 차원 */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-300">인식 방식</h4>
                <div className="relative">
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                    <span>감각형 (S)</span>
                    <span>직관형 (N)</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-6">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-emerald-500 h-6 rounded-full flex items-center justify-center text-white text-sm font-bold"
                      style={{ width: `${Math.max(percentages.S || 0, percentages.N || 0)}%` }}
                    >
                      {mbti[1] === 'S' ? `${percentages.S}% S` : `${percentages.N}% N`}
                    </div>
                  </div>
                </div>
              </div>

              {/* T/F 차원 */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-300">판단 방식</h4>
                <div className="relative">
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                    <span>사고형 (T)</span>
                    <span>감정형 (F)</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-6">
                    <div 
                      className="bg-gradient-to-r from-orange-500 to-red-500 h-6 rounded-full flex items-center justify-center text-white text-sm font-bold"
                      style={{ width: `${Math.max(percentages.T || 0, percentages.F || 0)}%` }}
                    >
                      {mbti[2] === 'T' ? `${percentages.T}% T` : `${percentages.F}% F`}
                    </div>
                  </div>
                </div>
              </div>

              {/* J/P 차원 */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-300">생활 양식</h4>
                <div className="relative">
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                    <span>판단형 (J)</span>
                    <span>인식형 (P)</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-6">
                    <div 
                      className="bg-gradient-to-r from-indigo-500 to-purple-500 h-6 rounded-full flex items-center justify-center text-white text-sm font-bold"
                      style={{ width: `${Math.max(percentages.J || 0, percentages.P || 0)}%` }}
                    >
                      {mbti[3] === 'J' ? `${percentages.J}% J` : `${percentages.P}% P`}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 상세 점수 */}
            <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">상세 점수</h4>
              <div className="grid grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{mbti[0]}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{percentages[mbti[0] as keyof typeof percentages]}%</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">{mbti[1]}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{percentages[mbti[1] as keyof typeof percentages]}%</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{mbti[2]}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{percentages[mbti[2] as keyof typeof percentages]}%</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{mbti[3]}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{percentages[mbti[3] as keyof typeof percentages]}%</div>
                </div>
              </div>
            </div>
          </div>

          {/* 상세 특징 */}
          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-700 p-6">
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center">
                <Heart className="w-6 h-6 mr-2 text-red-500" />
                주요 특징
              </h3>
              <ul className="space-y-3">
                {description.traits.map((trait, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-gray-700 dark:text-gray-300">{trait}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-700 p-6">
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                💼 추천 직업
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {description.careers.map((career, index) => (
                  <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 text-center">
                    <span className="text-gray-700 dark:text-gray-300 font-medium">{career}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 액션 버튼 */}
          <div className="text-center mt-8 space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
            <Link
              href="/test"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              다시 테스트하기
            </Link>
            <Link
              href="/compatibility"
              className="inline-block bg-purple-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
            >
              궁합 분석하기
            </Link>
            <Link
              href="/profile"
              className="inline-block bg-gray-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors"
            >
              내 프로필 보기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ResultPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">결과를 불러오는 중...</p>
        </div>
      </div>
    }>
      <ResultContent />
    </Suspense>
  );
}