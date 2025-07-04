"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ArrowLeft, Save, Check } from "lucide-react";

interface UserPreferences {
  interests: string[];
  careerStage: string;
  workStyle: string[];
  hobbies: string[];
  readingGenres: string[];
  musicGenres: string[];
  personalityTraits: string[];
}

const interestOptions = [
  "기술/IT", "디자인", "예술", "음악", "스포츠", "여행", "요리", "사진",
  "독서", "영화", "게임", "패션", "건강", "자연", "과학", "역사"
];

const careerStageOptions = [
  { id: "student", label: "학생" },
  { id: "entry", label: "신입/주니어 (1-3년)" },
  { id: "mid", label: "중급 (4-7년)" },
  { id: "senior", label: "시니어 (8년 이상)" },
  { id: "executive", label: "경영진/리더" },
  { id: "freelancer", label: "프리랜서" },
  { id: "entrepreneur", label: "창업가" }
];

const workStyleOptions = [
  "혼자 집중하기", "팀워크", "창의적 업무", "분석적 업무", "리더십",
  "멘토링", "문제해결", "기획/전략", "실행/운영", "소통/발표"
];

const hobbyOptions = [
  "운동", "독서", "영화감상", "음악감상", "게임", "요리", "여행",
  "사진", "그림그리기", "악기연주", "댄스", "수집", "원예", "DIY"
];

const readingGenreOptions = [
  "자기계발", "경영/경제", "인문학", "과학", "소설", "에세이",
  "심리학", "철학", "역사", "예술", "여행", "건강"
];

const musicGenreOptions = [
  "K-POP", "팝", "힙합", "R&B", "록", "재즈", "클래식", "인디",
  "전자음악", "발라드", "트로트", "OST"
];

// const personalityTraitOptions = [
//   "완벽주의", "모험적", "신중함", "즉흥적", "계획적", "유연함",
//   "경쟁적", "협력적", "독립적", "사교적", "내성적", "외향적"
// ];

export default function PreferencesPage() {
  const { data: session } = useSession();
  const [preferences, setPreferences] = useState<UserPreferences>({
    interests: [],
    careerStage: "",
    workStyle: [],
    hobbies: [],
    readingGenres: [],
    musicGenres: [],
    personalityTraits: []
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    // 저장된 선호도 불러오기
    const savedPreferences = localStorage.getItem('userPreferences');
    if (savedPreferences) {
      setPreferences(JSON.parse(savedPreferences));
    }
  }, []);

  const handleArrayChange = (field: keyof UserPreferences, value: string) => {
    setPreferences(prev => {
      const currentArray = prev[field] as string[];
      const newArray = currentArray.includes(value)
        ? currentArray.filter(item => item !== value)
        : [...currentArray, value];
      
      return {
        ...prev,
        [field]: newArray
      };
    });
  };

  const handleSingleChange = (field: keyof UserPreferences, value: string) => {
    setPreferences(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    try {
      // 실제로는 API 호출
      localStorage.setItem('userPreferences', JSON.stringify(preferences));
      
      setTimeout(() => {
        setIsSaving(false);
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      }, 1000);
    } catch {
      setIsSaving(false);
      alert('저장 중 오류가 발생했습니다.');
    }
  };

  const isSelected = (field: keyof UserPreferences, value: string) => {
    const fieldValue = preferences[field];
    if (Array.isArray(fieldValue)) {
      return fieldValue.includes(value);
    }
    return fieldValue === value;
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <Link
                href="/recommendations"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors mr-4"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                  선호도 설정
                </h1>
                <p className="text-gray-600 dark:text-gray-300 mt-1">
                  더 정확한 개인화 추천을 위해 선호도를 설정해주세요
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {/* 관심사 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-700 p-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                관심사 (복수 선택 가능)
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {interestOptions.map((interest) => (
                  <button
                    key={interest}
                    onClick={() => handleArrayChange('interests', interest)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      isSelected('interests', interest)
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                        : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                    }`}
                  >
                    <div className="flex items-center justify-center">
                      {isSelected('interests', interest) && <Check className="w-4 h-4 mr-2" />}
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {interest}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 커리어 단계 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-700 p-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                현재 커리어 단계
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {careerStageOptions.map((stage) => (
                  <button
                    key={stage.id}
                    onClick={() => handleSingleChange('careerStage', stage.id)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      isSelected('careerStage', stage.id)
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                        : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                    }`}
                  >
                    <div className="flex items-center">
                      {isSelected('careerStage', stage.id) && <Check className="w-4 h-4 mr-2" />}
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {stage.label}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 업무 스타일 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-700 p-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                선호하는 업무 스타일 (복수 선택 가능)
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {workStyleOptions.map((style) => (
                  <button
                    key={style}
                    onClick={() => handleArrayChange('workStyle', style)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      isSelected('workStyle', style)
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                        : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                    }`}
                  >
                    <div className="flex items-center justify-center">
                      {isSelected('workStyle', style) && <Check className="w-4 h-4 mr-2" />}
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {style}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 취미 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-700 p-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                관심 있는 취미 활동 (복수 선택 가능)
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {hobbyOptions.map((hobby) => (
                  <button
                    key={hobby}
                    onClick={() => handleArrayChange('hobbies', hobby)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      isSelected('hobbies', hobby)
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                        : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                    }`}
                  >
                    <div className="flex items-center justify-center">
                      {isSelected('hobbies', hobby) && <Check className="w-4 h-4 mr-2" />}
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {hobby}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 독서 장르 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-700 p-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                선호하는 독서 장르 (복수 선택 가능)
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {readingGenreOptions.map((genre) => (
                  <button
                    key={genre}
                    onClick={() => handleArrayChange('readingGenres', genre)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      isSelected('readingGenres', genre)
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                        : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                    }`}
                  >
                    <div className="flex items-center justify-center">
                      {isSelected('readingGenres', genre) && <Check className="w-4 h-4 mr-2" />}
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {genre}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 음악 장르 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-700 p-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                선호하는 음악 장르 (복수 선택 가능)
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {musicGenreOptions.map((genre) => (
                  <button
                    key={genre}
                    onClick={() => handleArrayChange('musicGenres', genre)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      isSelected('musicGenres', genre)
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                        : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                    }`}
                  >
                    <div className="flex items-center justify-center">
                      {isSelected('musicGenres', genre) && <Check className="w-4 h-4 mr-2" />}
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {genre}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Save Button */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-700 p-6">
              <div className="flex justify-center">
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex items-center space-x-2 bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSaving ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>저장 중...</span>
                    </>
                  ) : saveSuccess ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>저장 완료!</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>선호도 저장</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}