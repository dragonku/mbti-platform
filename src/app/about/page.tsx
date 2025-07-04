import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-6">
              MBTI 통합 플랫폼 소개
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              자신을 이해하고 타인과 더 나은 관계를 맺을 수 있도록 돕는 종합 서비스
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-700/50 p-8">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">우리의 비전</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                모든 사람이 자신의 성격을 깊이 이해하고, 타인과의 관계에서 더 나은 소통을 할 수 있도록 돕는 것이 우리의 목표입니다. 
                MBTI를 통해 자기 자신을 발견하고, 다른 사람들과의 차이를 인정하며, 더 조화로운 관계를 만들어 나가세요.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-700/50 p-8">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">핵심 가치</h2>
              <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                  <span><strong>접근성:</strong> 누구나 쉽게 사용할 수 있는 서비스</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                  <span><strong>신뢰성:</strong> 정확하고 신뢰할 수 있는 분석</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                  <span><strong>재미:</strong> 즐거운 경험을 통한 학습</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                  <span><strong>안전성:</strong> 개인정보 보호 최우선</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-8 text-center">주요 기능</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-700/50 p-6 text-center">
                <div className="text-4xl mb-4">🎮</div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">게임화된 테스트</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">재미있는 상황별 선택으로 진행하는 MBTI 테스트</p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-700/50 p-6 text-center">
                <div className="text-4xl mb-4">📊</div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">시각적 분석</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">차트와 그래프로 보는 상세한 성격 분석</p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-700/50 p-6 text-center">
                <div className="text-4xl mb-4">💝</div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">궁합 분석</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">친구, 연인, 가족과의 관계 분석</p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-700/50 p-6 text-center">
                <div className="text-4xl mb-4">👥</div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">커뮤니티</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">같은 MBTI 타입끼리 소통하고 교류</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-700/50 p-8 mb-16">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">MBTI란?</h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-300">
              <p>
                MBTI(Myers-Briggs Type Indicator)는 개인의 성격을 16가지 유형으로 분류하는 
                성격 유형 지표입니다. 4가지 선호 지표를 바탕으로 개인의 성격을 이해할 수 있습니다.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div className="border-l-4 border-blue-500 dark:border-blue-400 pl-4">
                  <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">에너지 방향</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">외향형(E) vs 내향형(I)</p>
                </div>
                <div className="border-l-4 border-green-500 dark:border-green-400 pl-4">
                  <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">인식 방식</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">감각형(S) vs 직관형(N)</p>
                </div>
                <div className="border-l-4 border-purple-500 dark:border-purple-400 pl-4">
                  <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">판단 방식</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">사고형(T) vs 감정형(F)</p>
                </div>
                <div className="border-l-4 border-pink-500 dark:border-pink-400 pl-4">
                  <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">생활 양식</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">판단형(J) vs 인식형(P)</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">지금 시작해보세요!</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              몇 분의 시간을 투자하여 자신의 성격을 더 깊이 이해해보세요.
            </p>
            <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
              <Link
                href="/test"
                className="inline-block bg-blue-600 dark:bg-blue-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
              >
                MBTI 테스트 시작하기
              </Link>
              <Link
                href="/"
                className="inline-block bg-gray-600 dark:bg-gray-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
              >
                홈으로 돌아가기
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}