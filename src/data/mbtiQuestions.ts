export interface Question {
  id: number;
  text: string;
  dimension: 'EI' | 'SN' | 'TF' | 'JP';
  options: {
    text: string;
    value: 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P';
    weight: number; // 1-3 (강도)
  }[];
}

export const mbtiQuestions: Question[] = [
  // E/I 차원 (외향성/내향성) - 10문항
  {
    id: 1,
    text: "파티에서 당신은 어떤 모습인가요?",
    dimension: 'EI',
    options: [
      { text: "새로운 사람들과 적극적으로 어울리며 대화한다", value: 'E', weight: 3 },
      { text: "친한 몇 명과 깊이 있는 대화를 나눈다", value: 'I', weight: 3 }
    ]
  },
  {
    id: 2,
    text: "스트레스를 받을 때 당신은?",
    dimension: 'EI',
    options: [
      { text: "친구들과 함께 시간을 보내며 에너지를 얻는다", value: 'E', weight: 2 },
      { text: "혼자만의 시간을 통해 에너지를 회복한다", value: 'I', weight: 2 }
    ]
  },
  {
    id: 3,
    text: "새로운 환경에 들어갔을 때?",
    dimension: 'EI',
    options: [
      { text: "먼저 다가가서 대화를 시작한다", value: 'E', weight: 3 },
      { text: "상황을 관찰하며 천천히 적응한다", value: 'I', weight: 3 }
    ]
  },
  {
    id: 4,
    text: "회의나 토론에서 당신은?",
    dimension: 'EI',
    options: [
      { text: "생각나는 대로 바로 의견을 표현한다", value: 'E', weight: 2 },
      { text: "충분히 생각한 후 신중하게 발언한다", value: 'I', weight: 2 }
    ]
  },
  {
    id: 5,
    text: "주말에 선호하는 활동은?",
    dimension: 'EI',
    options: [
      { text: "친구들과 만나거나 외부 활동을 한다", value: 'E', weight: 2 },
      { text: "집에서 혼자 취미 활동을 한다", value: 'I', weight: 2 }
    ]
  },
  {
    id: 6,
    text: "전화 통화에 대해 어떻게 생각하시나요?",
    dimension: 'EI',
    options: [
      { text: "전화로 이야기하는 것을 즐긴다", value: 'E', weight: 1 },
      { text: "문자나 메시지를 더 선호한다", value: 'I', weight: 1 }
    ]
  },
  {
    id: 7,
    text: "팀 프로젝트에서 당신의 역할은?",
    dimension: 'EI',
    options: [
      { text: "팀원들과 적극적으로 소통하며 진행한다", value: 'E', weight: 2 },
      { text: "개별 작업을 맡아 깊이 있게 연구한다", value: 'I', weight: 2 }
    ]
  },
  {
    id: 8,
    text: "문제 해결을 위해 당신은?",
    dimension: 'EI',
    options: [
      { text: "다른 사람들과 논의하며 해결책을 찾는다", value: 'E', weight: 2 },
      { text: "혼자서 깊이 생각하며 해결책을 찾는다", value: 'I', weight: 2 }
    ]
  },
  {
    id: 9,
    text: "에너지가 충전되는 때는?",
    dimension: 'EI',
    options: [
      { text: "사람들과 어울릴 때", value: 'E', weight: 3 },
      { text: "혼자 있을 때", value: 'I', weight: 3 }
    ]
  },
  {
    id: 10,
    text: "새로운 아이디어가 떠올랐을 때?",
    dimension: 'EI',
    options: [
      { text: "즉시 다른 사람들과 공유하고 싶다", value: 'E', weight: 2 },
      { text: "혼자서 충분히 발전시킨 후 공유한다", value: 'I', weight: 2 }
    ]
  },

  // S/N 차원 (감각/직관) - 10문항
  {
    id: 11,
    text: "정보를 받아들일 때 당신은?",
    dimension: 'SN',
    options: [
      { text: "구체적인 사실과 세부사항에 집중한다", value: 'S', weight: 3 },
      { text: "전체적인 의미와 가능성을 본다", value: 'N', weight: 3 }
    ]
  },
  {
    id: 12,
    text: "새로운 프로젝트를 시작할 때?",
    dimension: 'SN',
    options: [
      { text: "과거의 경험과 검증된 방법을 활용한다", value: 'S', weight: 2 },
      { text: "혁신적이고 창의적인 접근을 시도한다", value: 'N', weight: 2 }
    ]
  },
  {
    id: 13,
    text: "책을 읽을 때 당신은?",
    dimension: 'SN',
    options: [
      { text: "실용적이고 구체적인 내용을 선호한다", value: 'S', weight: 2 },
      { text: "이론적이고 상상력을 자극하는 내용을 선호한다", value: 'N', weight: 2 }
    ]
  },
  {
    id: 14,
    text: "업무를 수행할 때?",
    dimension: 'SN',
    options: [
      { text: "단계적으로 차근차근 진행한다", value: 'S', weight: 2 },
      { text: "전체적인 그림을 그리고 핵심부터 시작한다", value: 'N', weight: 2 }
    ]
  },
  {
    id: 15,
    text: "대화할 때 당신은?",
    dimension: 'SN',
    options: [
      { text: "구체적인 사례와 경험을 들려준다", value: 'S', weight: 2 },
      { text: "가능성과 아이디어에 대해 이야기한다", value: 'N', weight: 2 }
    ]
  },
  {
    id: 16,
    text: "변화에 대해 어떻게 생각하시나요?",
    dimension: 'SN',
    options: [
      { text: "신중하게 접근하며 안정성을 중시한다", value: 'S', weight: 1 },
      { text: "새로운 가능성으로 받아들이며 기대한다", value: 'N', weight: 1 }
    ]
  },
  {
    id: 17,
    text: "학습할 때 당신은?",
    dimension: 'SN',
    options: [
      { text: "실제 예시와 연습을 통해 배운다", value: 'S', weight: 2 },
      { text: "개념과 이론을 이해하며 배운다", value: 'N', weight: 2 }
    ]
  },
  {
    id: 18,
    text: "미래에 대해 생각할 때?",
    dimension: 'SN',
    options: [
      { text: "현실적이고 실현 가능한 계획을 세운다", value: 'S', weight: 2 },
      { text: "다양한 가능성과 꿈을 상상한다", value: 'N', weight: 2 }
    ]
  },
  {
    id: 19,
    text: "예술 작품을 감상할 때?",
    dimension: 'SN',
    options: [
      { text: "기법과 완성도에 주목한다", value: 'S', weight: 1 },
      { text: "작품이 전달하는 메시지와 의미에 집중한다", value: 'N', weight: 1 }
    ]
  },
  {
    id: 20,
    text: "문제를 해결할 때 당신은?",
    dimension: 'SN',
    options: [
      { text: "검증된 방법과 경험을 바탕으로 해결한다", value: 'S', weight: 3 },
      { text: "창의적이고 새로운 방법을 시도한다", value: 'N', weight: 3 }
    ]
  },

  // T/F 차원 (사고/감정) - 10문항
  {
    id: 21,
    text: "중요한 결정을 내릴 때?",
    dimension: 'TF',
    options: [
      { text: "논리적 분석을 통해 결정한다", value: 'T', weight: 3 },
      { text: "사람들의 감정과 가치를 고려한다", value: 'F', weight: 3 }
    ]
  },
  {
    id: 22,
    text: "비판을 받을 때 당신은?",
    dimension: 'TF',
    options: [
      { text: "객관적으로 분석하고 개선점을 찾는다", value: 'T', weight: 2 },
      { text: "감정적으로 받아들이며 관계를 중시한다", value: 'F', weight: 2 }
    ]
  },
  {
    id: 23,
    text: "갈등 상황에서 당신은?",
    dimension: 'TF',
    options: [
      { text: "사실과 논리로 해결하려 한다", value: 'T', weight: 2 },
      { text: "감정과 관계를 고려하여 해결하려 한다", value: 'F', weight: 2 }
    ]
  },
  {
    id: 24,
    text: "동료의 실수를 발견했을 때?",
    dimension: 'TF',
    options: [
      { text: "직접적으로 문제점을 지적한다", value: 'T', weight: 2 },
      { text: "상대방의 기분을 고려하여 조심스럽게 이야기한다", value: 'F', weight: 2 }
    ]
  },
  {
    id: 25,
    text: "영화를 평가할 때 당신은?",
    dimension: 'TF',
    options: [
      { text: "스토리의 논리성과 완성도를 중시한다", value: 'T', weight: 1 },
      { text: "감동과 메시지가 주는 느낌을 중시한다", value: 'F', weight: 1 }
    ]
  },
  {
    id: 26,
    text: "조직에서 당신의 역할은?",
    dimension: 'TF',
    options: [
      { text: "효율성과 성과를 추구한다", value: 'T', weight: 2 },
      { text: "팀 화합과 분위기를 중시한다", value: 'F', weight: 2 }
    ]
  },
  {
    id: 27,
    text: "친구가 고민 상담을 할 때?",
    dimension: 'TF',
    options: [
      { text: "논리적인 해결책을 제시한다", value: 'T', weight: 2 },
      { text: "감정적으로 공감하며 위로한다", value: 'F', weight: 2 }
    ]
  },
  {
    id: 28,
    text: "성공을 판단하는 기준은?",
    dimension: 'TF',
    options: [
      { text: "객관적인 성과와 결과", value: 'T', weight: 2 },
      { text: "사람들과의 관계와 만족도", value: 'F', weight: 2 }
    ]
  },
  {
    id: 29,
    text: "피드백을 줄 때 당신은?",
    dimension: 'TF',
    options: [
      { text: "직접적이고 명확하게 전달한다", value: 'T', weight: 2 },
      { text: "상대방의 감정을 고려하여 부드럽게 전달한다", value: 'F', weight: 2 }
    ]
  },
  {
    id: 30,
    text: "가치관이 다른 사람과 대화할 때?",
    dimension: 'TF',
    options: [
      { text: "논리적 근거를 바탕으로 설득한다", value: 'T', weight: 3 },
      { text: "상대방의 입장을 이해하려 노력한다", value: 'F', weight: 3 }
    ]
  },

  // J/P 차원 (판단/인식) - 10문항
  {
    id: 31,
    text: "일상생활에서 당신은?",
    dimension: 'JP',
    options: [
      { text: "계획을 세우고 체계적으로 행동한다", value: 'J', weight: 3 },
      { text: "유연하게 상황에 맞춰 행동한다", value: 'P', weight: 3 }
    ]
  },
  {
    id: 32,
    text: "여행을 계획할 때?",
    dimension: 'JP',
    options: [
      { text: "상세한 일정과 예약을 미리 준비한다", value: 'J', weight: 2 },
      { text: "대략적인 계획만 세우고 즉흥적으로 결정한다", value: 'P', weight: 2 }
    ]
  },
  {
    id: 33,
    text: "데드라인이 있는 과제를 할 때?",
    dimension: 'JP',
    options: [
      { text: "미리 계획을 세워 여유롭게 완료한다", value: 'J', weight: 2 },
      { text: "마감일에 맞춰 집중적으로 완료한다", value: 'P', weight: 2 }
    ]
  },
  {
    id: 34,
    text: "방이나 책상 정리는?",
    dimension: 'JP',
    options: [
      { text: "항상 깔끔하게 정리되어 있다", value: 'J', weight: 1 },
      { text: "필요에 따라 정리하며 약간 어수선할 수 있다", value: 'P', weight: 1 }
    ]
  },
  {
    id: 35,
    text: "새로운 기회가 생겼을 때?",
    dimension: 'JP',
    options: [
      { text: "신중하게 검토한 후 결정한다", value: 'J', weight: 2 },
      { text: "일단 시도해보고 경험을 통해 판단한다", value: 'P', weight: 2 }
    ]
  },
  {
    id: 36,
    text: "회의에서 당신은?",
    dimension: 'JP',
    options: [
      { text: "명확한 결론과 다음 단계를 정하고 싶어한다", value: 'J', weight: 2 },
      { text: "다양한 의견을 듣고 열린 토론을 선호한다", value: 'P', weight: 2 }
    ]
  },
  {
    id: 37,
    text: "쇼핑을 할 때?",
    dimension: 'JP',
    options: [
      { text: "필요한 것을 미리 정하고 계획적으로 구매한다", value: 'J', weight: 1 },
      { text: "둘러보다가 마음에 드는 것을 즉석에서 구매한다", value: 'P', weight: 1 }
    ]
  },
  {
    id: 38,
    text: "변화하는 상황에서 당신은?",
    dimension: 'JP',
    options: [
      { text: "미리 계획을 세워 대비한다", value: 'J', weight: 2 },
      { text: "상황에 맞춰 유연하게 대응한다", value: 'P', weight: 2 }
    ]
  },
  {
    id: 39,
    text: "의사결정 과정에서 당신은?",
    dimension: 'JP',
    options: [
      { text: "빠르게 결정하고 실행에 옮긴다", value: 'J', weight: 2 },
      { text: "충분히 고민하고 여러 옵션을 검토한다", value: 'P', weight: 2 }
    ]
  },
  {
    id: 40,
    text: "장기적인 목표에 대해?",
    dimension: 'JP',
    options: [
      { text: "구체적인 계획을 세우고 단계적으로 진행한다", value: 'J', weight: 3 },
      { text: "큰 방향만 정하고 상황에 따라 조정한다", value: 'P', weight: 3 }
    ]
  }
];

// 질문을 섞어서 균형있게 배치
export function getShuffledQuestions(): Question[] {
  const shuffled = [...mbtiQuestions];
  
  // 각 차원별로 고루 분포되도록 섞기
  const dimensions = ['EI', 'SN', 'TF', 'JP'];
  const result: Question[] = [];
  
  dimensions.forEach(dim => {
    const dimQuestions = shuffled.filter(q => q.dimension === dim);
    result.push(...dimQuestions);
  });
  
  return result;
}

// MBTI 결과 계산
export function calculateMBTI(answers: { questionId: number; value: string; weight: number }[]): {
  mbti: string;
  scores: { [key: string]: number };
  percentages: { [key: string]: number };
} {
  const scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
  
  answers.forEach(answer => {
    const type = answer.value as keyof typeof scores;
    scores[type] += answer.weight;
  });
  
  // 각 차원별 총 점수
  const totalEI = scores.E + scores.I;
  const totalSN = scores.S + scores.N;
  const totalTF = scores.T + scores.F;
  const totalJP = scores.J + scores.P;
  
  // 백분율 계산
  const percentages = {
    E: Math.round((scores.E / totalEI) * 100),
    I: Math.round((scores.I / totalEI) * 100),
    S: Math.round((scores.S / totalSN) * 100),
    N: Math.round((scores.N / totalSN) * 100),
    T: Math.round((scores.T / totalTF) * 100),
    F: Math.round((scores.F / totalTF) * 100),
    J: Math.round((scores.J / totalJP) * 100),
    P: Math.round((scores.P / totalJP) * 100)
  };
  
  // MBTI 타입 결정
  const mbti = 
    (scores.E > scores.I ? 'E' : 'I') +
    (scores.S > scores.N ? 'S' : 'N') +
    (scores.T > scores.F ? 'T' : 'F') +
    (scores.J > scores.P ? 'J' : 'P');
  
  return { mbti, scores, percentages };
}