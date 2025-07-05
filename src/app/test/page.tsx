"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { mbtiQuestions, calculateMBTI } from '@/data/mbtiQuestions';
import type { Question } from '@/data/mbtiQuestions';

interface Answer {
  questionId: number;
  value: string;
  weight: number;
}

export default function TestPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [timeSpent, setTimeSpent] = useState(0);
  const [startTime, setStartTime] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    setQuestions(mbtiQuestions);
    setStartTime(Date.now());
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (startTime > 0) {
        setTimeSpent(Math.floor((Date.now() - startTime) / 1000));
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [startTime]);

  const handleAnswer = (value: string, weight: number) => {
    const newAnswer: Answer = {
      questionId: questions[currentQuestion].id,
      value,
      weight
    };
    const newAnswers = [...answers, newAnswer];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // 테스트 완료 시 결과 계산하고 결과 페이지로 이동
      const result = calculateMBTI(newAnswers);
      const totalTime = Math.floor((Date.now() - startTime) / 1000);
      
      // 결과를 로컬 스토리지에 저장
      const testResult = {
        date: new Date().toLocaleDateString('ko-KR'),
        time: new Date().toLocaleTimeString('ko-KR'),
        result: result.mbti,
        scores: result.scores,
        percentages: result.percentages,
        timeSpent: totalTime,
        description: getMBTIDescription(result.mbti)
      };
      
      const existingHistory = localStorage.getItem('mbtiHistory');
      const history = existingHistory ? JSON.parse(existingHistory) : [];
      history.unshift(testResult);
      
      if (history.length > 10) {
        history.pop();
      }
      
      localStorage.setItem('mbtiHistory', JSON.stringify(history));
      
      // 결과 페이지로 이동
      const params = new URLSearchParams({
        mbti: result.mbti,
        scores: JSON.stringify(result.scores),
        percentages: JSON.stringify(result.percentages),
        timeSpent: totalTime.toString()
      });
      router.push(`/result?${params.toString()}`);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

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


  const goBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setAnswers(answers.slice(0, -1));
    }
  };

  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">테스트를 준비하고 있습니다...</p>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl dark:shadow-gray-700 p-8">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">MBTI 완전판 테스트</h1>
                <div className="text-right">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {currentQuestion + 1} / {questions.length}
                  </div>
                  <div className="text-xs text-gray-400 dark:text-gray-500">
                    {formatTime(timeSpent)}
                  </div>
                </div>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                ></div>
              </div>
              <div className="mt-2 text-center text-xs text-gray-500 dark:text-gray-400">
                {Math.round(((currentQuestion + 1) / questions.length) * 100)}% 완료
              </div>
            </div>

            <div className="mb-8">
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium mb-2">
                  {questions[currentQuestion].dimension === 'EI' ? '에너지 방향' :
                   questions[currentQuestion].dimension === 'SN' ? '인식 방식' :
                   questions[currentQuestion].dimension === 'TF' ? '판단 방식' : '생활 양식'}
                </span>
              </div>
              
              <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-6">
                {questions[currentQuestion].text}
              </h2>
              
              <div className="space-y-4">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option.value, option.weight)}
                    className="w-full p-4 text-left bg-white dark:bg-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-gray-600 dark:hover:to-gray-600 border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md text-gray-800 dark:text-gray-200 hover:text-blue-700 dark:hover:text-blue-300 font-medium group"
                  >
                    <div className="flex items-center">
                      <span className="w-8 h-8 rounded-full border-2 border-gray-300 dark:border-gray-500 group-hover:border-blue-500 dark:group-hover:border-blue-400 mr-4 flex items-center justify-center text-sm font-bold text-gray-700 dark:text-gray-300 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                        {index + 1}
                      </span>
                      <span className="flex-1">{option.text}</span>
                      <span className="text-xs text-gray-400 dark:text-gray-500 ml-2">
                        {option.weight === 3 ? '매우 동의' : option.weight === 2 ? '동의' : '약간 동의'}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex space-x-4">
                <Link
                  href="/"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors text-sm"
                >
                  ← 홈으로
                </Link>
                {currentQuestion > 0 && (
                  <button
                    onClick={goBack}
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 transition-colors text-sm"
                  >
                    ↶ 이전 질문
                  </button>
                )}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                신중하게 선택해주세요
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}