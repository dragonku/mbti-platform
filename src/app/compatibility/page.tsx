"use client";

import { useState } from "react";
import { Heart, Users, Briefcase, Home, Star, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CompatibilityPage() {
  const [myMBTI, setMyMBTI] = useState("");
  const [partnerMBTI, setPartnerMBTI] = useState("");
  const [analysisType, setAnalysisType] = useState("romantic");
  const [showResult, setShowResult] = useState(false);

  const mbtiTypes = [
    'ENFP', 'ENFJ', 'ENTP', 'ENTJ',
    'ESFP', 'ESFJ', 'ESTP', 'ESTJ',
    'INFP', 'INFJ', 'INTP', 'INTJ',
    'ISFP', 'ISFJ', 'ISTP', 'ISTJ'
  ];

  const analysisTypes = [
    { id: 'romantic', name: '연인 관계', icon: Heart, color: 'text-red-500' },
    { id: 'friendship', name: '친구 관계', icon: Users, color: 'text-blue-500' },
    { id: 'work', name: '업무 관계', icon: Briefcase, color: 'text-green-500' },
    { id: 'family', name: '가족 관계', icon: Home, color: 'text-purple-500' }
  ];

  const calculateCompatibility = (type1: string, type2: string, relationType: string) => {
    // 간단한 궁합 계산 알고리즘
    let score = 0;
    const reasons = [];

    // 외향/내향 분석
    if (type1[0] === type2[0]) {
      score += relationType === 'friendship' ? 20 : 15;
      reasons.push(`둘 다 ${type1[0] === 'E' ? '외향적' : '내향적'}이어서 에너지 레벨이 비슷해요`);
    } else {
      score += relationType === 'romantic' ? 20 : 10;
      reasons.push('외향적/내향적 성향이 보완적이어서 균형이 좋아요');
    }

    // 감각/직관 분석
    if (type1[1] === type2[1]) {
      score += 25;
      reasons.push(`둘 다 ${type1[1] === 'S' ? '현실적' : '창의적'}이어서 소통이 원활해요`);
    } else {
      score += 15;
      reasons.push('서로 다른 관점으로 보완할 수 있어요');
    }

    // 사고/감정 분석
    if (type1[2] === type2[2]) {
      score += relationType === 'work' ? 25 : 20;
      reasons.push(`둘 다 ${type1[2] === 'T' ? '논리적' : '감정적'}으로 판단해서 이해가 쉬워요`);
    } else {
      score += relationType === 'romantic' ? 25 : 15;
      reasons.push('서로 다른 판단 방식으로 더 균형잡힌 결정을 내릴 수 있어요');
    }

    // 판단/인식 분석
    if (type1[3] === type2[3]) {
      score += 20;
      reasons.push(`둘 다 ${type1[3] === 'J' ? '계획적' : '유연한'} 성향이어서 생활 패턴이 맞아요`);
    } else {
      score += 10;
      reasons.push('서로 다른 생활 방식이지만 보완할 수 있어요');
    }

    // 관계 타입별 보정
    if (relationType === 'romantic' && type1 === type2) {
      score += 10;
      reasons.push('같은 MBTI 타입으로 서로를 깊이 이해할 수 있어요');
    }

    return {
      score: Math.min(score, 100),
      reasons: reasons.slice(0, 3),
      level: score >= 80 ? 'excellent' : score >= 60 ? 'good' : score >= 40 ? 'fair' : 'challenging'
    };
  };

  const handleAnalysis = () => {
    if (myMBTI && partnerMBTI) {
      setShowResult(true);
    }
  };

  const result = showResult ? calculateCompatibility(myMBTI, partnerMBTI, analysisType) : null;

  const getResultColor = (level: string) => {
    switch (level) {
      case 'excellent': return 'text-green-600 bg-green-50 border-green-200';
      case 'good': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'fair': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'challenging': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getResultLabel = (level: string) => {
    switch (level) {
      case 'excellent': return '환상적인 궁합! ⭐⭐⭐⭐⭐';
      case 'good': return '좋은 궁합! ⭐⭐⭐⭐';
      case 'fair': return '괜찮은 궁합 ⭐⭐⭐';
      case 'challenging': return '노력이 필요한 관계 ⭐⭐';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">💝 MBTI 궁합 분석</h1>
            <p className="text-xl text-gray-600">두 사람의 MBTI를 비교하여 관계의 궁합을 분석해보세요</p>
          </div>

          <div className="bg-white rounded-lg shadow-xl p-8">
            {!showResult ? (
              <div className="space-y-8">
                {/* 분석 타입 선택 */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">분석하고 싶은 관계를 선택하세요</h3>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {analysisTypes.map((type) => {
                      const IconComponent = type.icon;
                      return (
                        <button
                          key={type.id}
                          onClick={() => setAnalysisType(type.id)}
                          className={`p-4 rounded-lg border-2 transition-all ${
                            analysisType === type.id
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <IconComponent className={`w-8 h-8 mx-auto mb-2 ${type.color}`} />
                          <div className="font-medium text-gray-700">{type.name}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* MBTI 선택 */}
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">나의 MBTI</h3>
                    <div className="grid grid-cols-4 gap-2">
                      {mbtiTypes.map((type) => (
                        <button
                          key={type}
                          onClick={() => setMyMBTI(type)}
                          className={`p-3 rounded-lg border-2 font-medium transition-all ${
                            myMBTI === type
                              ? 'border-blue-500 bg-blue-50 text-blue-700'
                              : 'border-gray-200 hover:border-gray-300 text-gray-700'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">상대방의 MBTI</h3>
                    <div className="grid grid-cols-4 gap-2">
                      {mbtiTypes.map((type) => (
                        <button
                          key={type}
                          onClick={() => setPartnerMBTI(type)}
                          className={`p-3 rounded-lg border-2 font-medium transition-all ${
                            partnerMBTI === type
                              ? 'border-purple-500 bg-purple-50 text-purple-700'
                              : 'border-gray-200 hover:border-gray-300 text-gray-700'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 분석 버튼 */}
                <div className="text-center">
                  <button
                    onClick={handleAnalysis}
                    disabled={!myMBTI || !partnerMBTI}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center mx-auto"
                  >
                    궁합 분석하기
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                {/* 결과 헤더 */}
                <div className="text-center">
                  <div className="flex justify-center items-center space-x-4 mb-6">
                    <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg font-bold text-xl">
                      {myMBTI}
                    </div>
                    <Heart className="w-8 h-8 text-red-500" />
                    <div className="bg-purple-100 text-purple-700 px-4 py-2 rounded-lg font-bold text-xl">
                      {partnerMBTI}
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    {analysisTypes.find(t => t.id === analysisType)?.name} 궁합 분석 결과
                  </h2>
                </div>

                {/* 궁합 점수 */}
                <div className={`border-2 rounded-lg p-6 text-center ${getResultColor(result!.level)}`}>
                  <div className="text-6xl font-bold mb-2">{result!.score}점</div>
                  <div className="text-xl font-semibold">{getResultLabel(result!.level)}</div>
                </div>

                {/* 분석 이유 */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">왜 이런 결과가 나왔을까요?</h3>
                  <ul className="space-y-3">
                    {result!.reasons.map((reason, index) => (
                      <li key={index} className="flex items-start">
                        <Star className="w-5 h-5 text-yellow-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 관계 개선 팁 */}
                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">💡 관계 개선 팁</h3>
                  <div className="space-y-2 text-gray-700">
                    {analysisType === 'romantic' && (
                      <>
                        <p>• 서로의 차이점을 인정하고 존중하세요</p>
                        <p>• 정기적인 소통 시간을 가져보세요</p>
                        <p>• 상대방의 성향에 맞춰 표현 방식을 조절해보세요</p>
                      </>
                    )}
                    {analysisType === 'friendship' && (
                      <>
                        <p>• 공통 관심사를 찾아 함께 활동해보세요</p>
                        <p>• 서로의 개인 시간도 존중해주세요</p>
                        <p>• 갈등이 생겼을 때는 솔직하게 대화하세요</p>
                      </>
                    )}
                    {analysisType === 'work' && (
                      <>
                        <p>• 업무 스타일의 차이를 이해하고 활용하세요</p>
                        <p>• 명확한 역할 분담을 통해 효율성을 높이세요</p>
                        <p>• 정기적인 피드백을 주고받으세요</p>
                      </>
                    )}
                    {analysisType === 'family' && (
                      <>
                        <p>• 가족 구성원의 성향을 이해하고 배려하세요</p>
                        <p>• 각자의 공간과 시간을 존중해주세요</p>
                        <p>• 가족 회의를 통해 소통하는 시간을 가져보세요</p>
                      </>
                    )}
                  </div>
                </div>

                {/* 액션 버튼 */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => setShowResult(false)}
                    className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    다시 분석하기
                  </button>
                  <Link
                    href="/test"
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors text-center"
                  >
                    MBTI 테스트하기
                  </Link>
                  <Link
                    href="/profile"
                    className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors text-center"
                  >
                    내 프로필 보기
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}