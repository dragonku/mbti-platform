"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Question {
  id: number;
  text: string;
  options: {
    text: string;
    value: string;
  }[];
}

const questions: Question[] = [
  {
    id: 1,
    text: "파티에서 당신은 어떤 모습인가요?",
    options: [
      { text: "새로운 사람들과 적극적으로 대화를 나눈다", value: "E" },
      { text: "친한 몇 명과 깊은 대화를 나눈다", value: "I" }
    ]
  },
  {
    id: 2,
    text: "정보를 받아들일 때 당신은?",
    options: [
      { text: "구체적인 사실과 세부사항에 집중한다", value: "S" },
      { text: "전체적인 의미와 가능성을 본다", value: "N" }
    ]
  },
  {
    id: 3,
    text: "중요한 결정을 내릴 때?",
    options: [
      { text: "논리적 분석을 통해 결정한다", value: "T" },
      { text: "사람들의 감정과 가치를 고려한다", value: "F" }
    ]
  },
  {
    id: 4,
    text: "일상생활에서 당신은?",
    options: [
      { text: "계획을 세우고 체계적으로 행동한다", value: "J" },
      { text: "유연하게 상황에 맞춰 행동한다", value: "P" }
    ]
  },
  {
    id: 5,
    text: "스트레스를 받을 때 당신은?",
    options: [
      { text: "다른 사람들과 함께 있으며 에너지를 얻는다", value: "E" },
      { text: "혼자만의 시간을 통해 에너지를 회복한다", value: "I" }
    ]
  },
  {
    id: 6,
    text: "새로운 프로젝트를 시작할 때?",
    options: [
      { text: "과거의 경험과 검증된 방법을 활용한다", value: "S" },
      { text: "혁신적이고 창의적인 접근을 시도한다", value: "N" }
    ]
  },
  {
    id: 7,
    text: "비판을 받을 때 당신은?",
    options: [
      { text: "객관적으로 분석하고 개선점을 찾는다", value: "T" },
      { text: "감정적으로 상처받지만 관계를 중시한다", value: "F" }
    ]
  },
  {
    id: 8,
    text: "여행을 계획할 때?",
    options: [
      { text: "상세한 일정과 예약을 미리 준비한다", value: "J" },
      { text: "대략적인 계획만 세우고 즉흥적으로 결정한다", value: "P" }
    ]
  }
];

export default function TestPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const router = useRouter();

  const handleAnswer = (value: string) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // 테스트 완료 시 결과 계산하고 결과 페이지로 이동
      const mbti = calculateMBTI(newAnswers);
      
      // 결과를 로컬 스토리지에 저장
      const result = {
        date: new Date().toLocaleDateString('ko-KR'),
        result: mbti,
        description: getMBTIDescription(mbti)
      };
      
      const existingHistory = localStorage.getItem('mbtiHistory');
      const history = existingHistory ? JSON.parse(existingHistory) : [];
      history.unshift(result);
      
      if (history.length > 10) {
        history.pop();
      }
      
      localStorage.setItem('mbtiHistory', JSON.stringify(history));
      
      // 결과 페이지로 이동
      const params = new URLSearchParams({
        mbti: mbti,
        answers: encodeURIComponent(JSON.stringify(newAnswers))
      });
      router.push(`/result?${params.toString()}`);
    }
  };

  const calculateMBTI = (answerList: string[] = answers) => {
    const counts = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
    
    answerList.forEach(answer => {
      counts[answer as keyof typeof counts]++;
    });

    const mbti = 
      (counts.E > counts.I ? 'E' : 'I') +
      (counts.S > counts.N ? 'S' : 'N') +
      (counts.T > counts.F ? 'T' : 'F') +
      (counts.J > counts.P ? 'J' : 'P');

    return mbti;
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

  const restartTest = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
  };

  if (showResult) {
    const mbti = calculateMBTI();
    const description = getMBTIDescription(mbti);

    // 결과를 로컬 스토리지에 저장
    const saveResult = () => {
      const result = {
        date: new Date().toLocaleDateString('ko-KR'),
        result: mbti,
        description: description
      };
      
      const existingHistory = localStorage.getItem('mbtiHistory');
      const history = existingHistory ? JSON.parse(existingHistory) : [];
      history.unshift(result);
      
      // 최대 10개까지만 저장
      if (history.length > 10) {
        history.pop();
      }
      
      localStorage.setItem('mbtiHistory', JSON.stringify(history));
    };

    // 결과가 표시될 때 한 번만 저장
    if (typeof window !== 'undefined') {
      saveResult();
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl dark:shadow-gray-700 p-8">
              <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-6">
                테스트 완료! 🎉
              </h1>
              
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg p-6 mb-6">
                <h2 className="text-3xl font-bold mb-2">{mbti}</h2>
                <p className="text-lg">{description}</p>
              </div>

              <div className="space-y-4 mb-8">
                <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">당신의 성향</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded">
                    <strong className="text-gray-900 dark:text-gray-100">에너지 방향:</strong> <span className="text-gray-700 dark:text-gray-300">{mbti[0] === 'E' ? '외향형 (E)' : '내향형 (I)'}</span>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded">
                    <strong className="text-gray-900 dark:text-gray-100">인식 방식:</strong> <span className="text-gray-700 dark:text-gray-300">{mbti[1] === 'S' ? '감각형 (S)' : '직관형 (N)'}</span>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded">
                    <strong className="text-gray-900 dark:text-gray-100">판단 방식:</strong> <span className="text-gray-700 dark:text-gray-300">{mbti[2] === 'T' ? '사고형 (T)' : '감정형 (F)'}</span>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded">
                    <strong className="text-gray-900 dark:text-gray-100">생활 양식:</strong> <span className="text-gray-700 dark:text-gray-300">{mbti[3] === 'J' ? '판단형 (J)' : '인식형 (P)'}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
                <button
                  onClick={restartTest}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  다시 테스트하기
                </button>
                <Link
                  href="/"
                  className="inline-block bg-gray-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors"
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl dark:shadow-gray-700 p-8">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">MBTI 테스트</h1>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {currentQuestion + 1} / {questions.length}
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-6">
                {questions[currentQuestion].text}
              </h2>
              
              <div className="space-y-4">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option.value)}
                    className="w-full p-4 text-left bg-white dark:bg-gray-700 hover:bg-blue-50 dark:hover:bg-gray-600 border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md text-gray-800 dark:text-gray-200 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                  >
                    <div className="flex items-center">
                      <span className="w-6 h-6 rounded-full border-2 border-gray-300 dark:border-gray-500 mr-3 flex items-center justify-center text-sm font-bold text-gray-700 dark:text-gray-300">
                        {index + 1}
                      </span>
                      {option.text}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-between">
              <Link
                href="/"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
              >
                ← 홈으로 돌아가기
              </Link>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                질문에 답하여 진행하세요
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}