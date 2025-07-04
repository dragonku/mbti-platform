"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [mbtiHistory, setMbtiHistory] = useState<Array<{
    date: string;
    result: string;
    description: string;
  }>>([]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  useEffect(() => {
    // 로컬 스토리지에서 MBTI 테스트 기록을 가져옴 (데모용)
    const history = localStorage.getItem("mbtiHistory");
    if (history) {
      setMbtiHistory(JSON.parse(history));
    }
  }, []);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">로딩 중...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const getMBTIDescription = (mbti: string) => {
    const descriptions: { [key: string]: string } = {
      'ENFP': '활동가 - 열정적이고 창의적인 사람',
      'ENFJ': '선도자 - 카리스마 있고 영감을 주는 지도자',
      'ENTP': '논쟁가 - 지적인 호기심이 많은 사상가',
      'ENTJ': '지휘관 - 대담하고 의지가 강한 지도자',
      'ESFP': '엔터테이너 - 즉흥적이고 열정적인 사람',
      'ESFJ': '집정관 - 따뜻하고 양심적인 협력자',
      'ESTP': '경영자 - 지각이 뛰어나고 현실적인 사람',
      'ESTJ': '관리자 - 실용적이고 사실에 근거한 지도자',
      'INFP': '중재자 - 이상주의적이고 충성스러운 사람',
      'INFJ': '옹호자 - 창의적이고 통찰력 있는 영감가',
      'INTP': '논리술사 - 혁신적이고 독특한 사상가',
      'INTJ': '건축가 - 상상력이 풍부하고 전략적인 사상가',
      'ISFP': '모험가 - 유연하고 매력적인 예술가',
      'ISFJ': '수호자 - 따뜻하고 헌신적인 보호자',
      'ISTP': '장인 - 대담하고 실용적인 실험가',
      'ISTJ': '논리주의자 - 실용적이고 사실에 근거한 신뢰할 수 있는 사람'
    };
    return descriptions[mbti] || '알 수 없는 유형';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
            <div className="flex items-center mb-6">
              {session.user?.image ? (
                <Image
                  src={session.user.image}
                  alt="Profile"
                  width={64}
                  height={64}
                  className="h-16 w-16 rounded-full mr-4"
                />
              ) : (
                <div className="h-16 w-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mr-4">
                  {session.user?.name?.charAt(0) || session.user?.email?.charAt(0) || "U"}
                </div>
              )}
              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  {session.user?.name || "사용자"}님의 프로필
                </h1>
                <p className="text-gray-600">{session.user?.email}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">계정 정보</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-600">이름</label>
                    <p className="text-gray-800">{session.user?.name || "설정되지 않음"}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">이메일</label>
                    <p className="text-gray-800">{session.user?.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">가입일</label>
                    <p className="text-gray-800">2024년 12월</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">활동 통계</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">완료한 테스트</span>
                    <span className="font-semibold text-blue-600">{mbtiHistory.length}회</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">최근 활동</span>
                    <span className="text-gray-800">오늘</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">회원 등급</span>
                    <span className="text-purple-600 font-semibold">일반 회원</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-xl p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">MBTI 테스트 기록</h2>
              <Link
                href="/test"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                새 테스트 시작
              </Link>
            </div>

            {mbtiHistory.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🧠</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  아직 테스트 기록이 없습니다
                </h3>
                <p className="text-gray-600 mb-6">
                  첫 번째 MBTI 테스트를 진행하여 자신의 성격을 알아보세요!
                </p>
                <Link
                  href="/test"
                  className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  MBTI 테스트 시작하기
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {mbtiHistory.map((record, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center mb-2">
                          <span className="text-2xl font-bold text-blue-600 mr-3">
                            {record.result}
                          </span>
                          <span className="text-gray-700">{getMBTIDescription(record.result)}</span>
                        </div>
                        <p className="text-sm text-gray-600">{record.date}</p>
                      </div>
                      <button className="text-blue-600 hover:text-blue-800 text-sm">
                        자세히 보기
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-8 bg-white rounded-lg shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">추천 기능</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-blue-50 rounded-lg">
                <div className="text-3xl mb-4">💝</div>
                <h3 className="font-semibold mb-2">궁합 분석</h3>
                <p className="text-sm text-gray-600 mb-4">
                  다른 MBTI 타입과의 궁합을 분석해보세요
                </p>
                <button className="text-blue-600 hover:text-blue-800 font-medium">
                  분석하기
                </button>
              </div>
              
              <div className="text-center p-6 bg-purple-50 rounded-lg">
                <div className="text-3xl mb-4">👥</div>
                <h3 className="font-semibold mb-2">커뮤니티</h3>
                <p className="text-sm text-gray-600 mb-4">
                  같은 타입의 사람들과 소통해보세요
                </p>
                <button className="text-purple-600 hover:text-purple-800 font-medium">
                  참여하기
                </button>
              </div>
              
              <div className="text-center p-6 bg-pink-50 rounded-lg">
                <div className="text-3xl mb-4">📊</div>
                <h3 className="font-semibold mb-2">상세 분석</h3>
                <p className="text-sm text-gray-600 mb-4">
                  내 성격의 세부적인 분석을 받아보세요
                </p>
                <button className="text-pink-600 hover:text-pink-800 font-medium">
                  분석받기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}