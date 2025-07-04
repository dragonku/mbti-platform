"use client";

import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';

interface MBTIChartProps {
  mbti: string;
  answers: string[];
}

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7c7c'];

export default function MBTIChart({ mbti, answers }: MBTIChartProps) {
  // MBTI 점수 계산
  const calculateScores = () => {
    const counts = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
    
    answers.forEach(answer => {
      counts[answer as keyof typeof counts]++;
    });

    // 백분율로 변환
    const total = answers.length;
    return {
      E: Math.round((counts.E / total) * 100),
      I: Math.round((counts.I / total) * 100),
      S: Math.round((counts.S / total) * 100),
      N: Math.round((counts.N / total) * 100),
      T: Math.round((counts.T / total) * 100),
      F: Math.round((counts.F / total) * 100),
      J: Math.round((counts.J / total) * 100),
      P: Math.round((counts.P / total) * 100),
    };
  };

  const scores = calculateScores();

  // 레이더 차트 데이터
  const radarData = [
    {
      dimension: '에너지 방향',
      current: mbti[0] === 'E' ? scores.E : scores.I,
      max: 100,
      label: mbti[0] === 'E' ? '외향형 (E)' : '내향형 (I)'
    },
    {
      dimension: '인식 방식',
      current: mbti[1] === 'S' ? scores.S : scores.N,
      max: 100,
      label: mbti[1] === 'S' ? '감각형 (S)' : '직관형 (N)'
    },
    {
      dimension: '판단 방식',
      current: mbti[2] === 'T' ? scores.T : scores.F,
      max: 100,
      label: mbti[2] === 'T' ? '사고형 (T)' : '감정형 (F)'
    },
    {
      dimension: '생활 양식',
      current: mbti[3] === 'J' ? scores.J : scores.P,
      max: 100,
      label: mbti[3] === 'J' ? '판단형 (J)' : '인식형 (P)'
    }
  ];

  // 바 차트 데이터 (대립 쌍)
  const barData = [
    {
      name: '에너지 방향',
      외향형: scores.E,
      내향형: scores.I,
    },
    {
      name: '인식 방식',
      감각형: scores.S,
      직관형: scores.N,
    },
    {
      name: '판단 방식',
      사고형: scores.T,
      감정형: scores.F,
    },
    {
      name: '생활 양식',
      판단형: scores.J,
      인식형: scores.P,
    }
  ];

  // 파이 차트 데이터 (MBTI 타입별 강도)
  const pieData = [
    { name: mbti[0] === 'E' ? '외향형' : '내향형', value: mbti[0] === 'E' ? scores.E : scores.I },
    { name: mbti[1] === 'S' ? '감각형' : '직관형', value: mbti[1] === 'S' ? scores.S : scores.N },
    { name: mbti[2] === 'T' ? '사고형' : '감정형', value: mbti[2] === 'T' ? scores.T : scores.F },
    { name: mbti[3] === 'J' ? '판단형' : '인식형', value: mbti[3] === 'J' ? scores.J : scores.P },
  ];

  return (
    <div className="w-full space-y-8">
      {/* 레이더 차트 - 성향 강도 */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
          성향 강도 분석
        </h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="dimension" />
              <PolarRadiusAxis 
                angle={90} 
                domain={[0, 100]} 
                tick={false}
              />
              <Radar
                name="강도"
                dataKey="current"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.3}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          {radarData.map((item, index) => (
            <div key={index} className="text-center p-3 bg-gray-50 rounded">
              <div className="font-semibold text-gray-700">{item.dimension}</div>
              <div className="text-blue-600 font-bold">{item.label}</div>
              <div className="text-lg font-bold text-gray-800">{item.current}%</div>
            </div>
          ))}
        </div>
      </div>

      {/* 바 차트 - 대립 쌍 비교 */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
          성향 대립 쌍 비교
        </h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Legend />
              <Bar dataKey="외향형" stackId="a" fill="#8884d8" />
              <Bar dataKey="내향형" stackId="a" fill="#82ca9d" />
              <Bar dataKey="감각형" stackId="a" fill="#8884d8" />
              <Bar dataKey="직관형" stackId="a" fill="#82ca9d" />
              <Bar dataKey="사고형" stackId="a" fill="#8884d8" />
              <Bar dataKey="감정형" stackId="a" fill="#82ca9d" />
              <Bar dataKey="판단형" stackId="a" fill="#8884d8" />
              <Bar dataKey="인식형" stackId="a" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 파이 차트 - 전체 성향 분포 */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
          나의 MBTI 성향 분포
        </h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          {pieData.map((item, index) => (
            <div key={index} className="flex items-center justify-center p-2">
              <div 
                className="w-4 h-4 rounded-full mr-2"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              ></div>
              <span className="text-sm font-medium">{item.name}: {item.value}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* 상세 분석 */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
          상세 분석 결과
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-700">주요 특징</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>가장 강한 성향:</span>
                <span className="font-bold text-blue-600">
                  {Object.entries(scores).reduce((a, b) => scores[a[0] as keyof typeof scores] > scores[b[0] as keyof typeof scores] ? a : b)[0]}형 
                  ({Math.max(...Object.values(scores))}%)
                </span>
              </div>
              <div className="flex justify-between">
                <span>균형잡힌 정도:</span>
                <span className="font-bold text-green-600">
                  {Math.abs(scores.E - scores.I) + Math.abs(scores.S - scores.N) + Math.abs(scores.T - scores.F) + Math.abs(scores.J - scores.P) < 80 ? '높음' : '보통'}
                </span>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-700">성향 해석</h4>
            <div className="text-sm text-gray-600 space-y-2">
              <p>• 80% 이상: 매우 뚜렷한 성향</p>
              <p>• 60-79%: 뚜렷한 성향</p>
              <p>• 40-59%: 균형잡힌 성향</p>
              <p>• 40% 미만: 상대 성향이 더 강함</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}