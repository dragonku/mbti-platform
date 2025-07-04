import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl dark:shadow-gray-700 p-8">
            <div className="text-8xl mb-6">🔍</div>
            <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              404
            </h1>
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
              페이지를 찾을 수 없습니다
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
            </p>
            <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
              <Link
                href="/"
                className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                홈으로 돌아가기
              </Link>
              <Link
                href="/test"
                className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                MBTI 테스트하기
              </Link>
              <Link
                href="/community"
                className="inline-block bg-purple-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
              >
                커뮤니티 둘러보기
              </Link>
            </div>
            
            {/* 인기 페이지 추천 */}
            <div className="mt-12 text-left">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                이런 페이지는 어떠세요?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link
                  href="/test"
                  className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <h4 className="font-medium text-gray-800 dark:text-gray-200">🎮 MBTI 테스트</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">당신의 성격유형을 알아보세요</p>
                </Link>
                <Link
                  href="/compatibility"
                  className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <h4 className="font-medium text-gray-800 dark:text-gray-200">💝 궁합 분석</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">상대방과의 궁합을 확인해보세요</p>
                </Link>
                <Link
                  href="/recommendations"
                  className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <h4 className="font-medium text-gray-800 dark:text-gray-200">🎯 개인화 추천</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">맞춤형 추천을 받아보세요</p>
                </Link>
                <Link
                  href="/about"
                  className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <h4 className="font-medium text-gray-800 dark:text-gray-200">ℹ️ 서비스 소개</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">플랫폼에 대해 자세히 알아보세요</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}