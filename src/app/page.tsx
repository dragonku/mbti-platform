import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            MBTI 통합 플랫폼
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            자신을 이해하고 타인과 더 나은 관계를 맺을 수 있도록 돕는 
            종합 MBTI 서비스입니다.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="text-3xl mb-4">🎮</div>
              <h3 className="text-xl font-semibold mb-2">게임화된 테스트</h3>
              <p className="text-gray-600">재미있는 상황별 선택으로 진행하는 MBTI 테스트</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="text-3xl mb-4">💝</div>
              <h3 className="text-xl font-semibold mb-2">궁합 분석</h3>
              <p className="text-gray-600">친구, 연인, 가족과의 관계를 더 깊이 이해하세요</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="text-3xl mb-4">👥</div>
              <h3 className="text-xl font-semibold mb-2">커뮤니티</h3>
              <p className="text-gray-600">같은 MBTI 타입의 사람들과 소통하고 교류하세요</p>
            </div>
          </div>
          
          <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
            <Link
              href="/test"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              MBTI 테스트 시작하기
            </Link>
            <Link
              href="/about"
              className="inline-block bg-gray-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors"
            >
              서비스 소개
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
