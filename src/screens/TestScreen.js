import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const questions = [
  {
    id: 1,
    text: '파티에서 당신은 어떤 모습인가요?',
    options: [
      { text: '새로운 사람들과 적극적으로 대화를 나눈다', value: 'E' },
      { text: '친한 몇 명과 깊은 대화를 나눈다', value: 'I' }
    ]
  },
  {
    id: 2,
    text: '정보를 받아들일 때 당신은?',
    options: [
      { text: '구체적인 사실과 세부사항에 집중한다', value: 'S' },
      { text: '전체적인 의미와 가능성을 본다', value: 'N' }
    ]
  },
  {
    id: 3,
    text: '중요한 결정을 내릴 때?',
    options: [
      { text: '논리적 분석을 통해 결정한다', value: 'T' },
      { text: '사람들의 감정과 가치를 고려한다', value: 'F' }
    ]
  },
  {
    id: 4,
    text: '일상생활에서 당신은?',
    options: [
      { text: '계획을 세우고 체계적으로 행동한다', value: 'J' },
      { text: '유연하게 상황에 맞춰 행동한다', value: 'P' }
    ]
  },
  {
    id: 5,
    text: '스트레스를 받을 때 당신은?',
    options: [
      { text: '다른 사람들과 함께 있으며 에너지를 얻는다', value: 'E' },
      { text: '혼자만의 시간을 통해 에너지를 회복한다', value: 'I' }
    ]
  },
  {
    id: 6,
    text: '새로운 프로젝트를 시작할 때?',
    options: [
      { text: '과거의 경험과 검증된 방법을 활용한다', value: 'S' },
      { text: '혁신적이고 창의적인 접근을 시도한다', value: 'N' }
    ]
  },
  {
    id: 7,
    text: '비판을 받을 때 당신은?',
    options: [
      { text: '객관적으로 분석하고 개선점을 찾는다', value: 'T' },
      { text: '감정적으로 상처받지만 관계를 중시한다', value: 'F' }
    ]
  },
  {
    id: 8,
    text: '여행을 계획할 때?',
    options: [
      { text: '상세한 일정과 예약을 미리 준비한다', value: 'J' },
      { text: '대략적인 계획만 세우고 즉흥적으로 결정한다', value: 'P' }
    ]
  }
];

const TestScreen = ({ navigation }) => {
  const { colors, theme } = useTheme();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);

  const handleAnswer = async (value) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // 테스트 완료 시 결과 계산
      const mbti = calculateMBTI(newAnswers);
      const result = {
        date: new Date().toLocaleDateString('ko-KR'),
        result: mbti,
        description: getMBTIDescription(mbti),
        answers: newAnswers,
      };
      
      try {
        // 결과를 로컬 스토리지에 저장
        const existingHistory = await AsyncStorage.getItem('mbtiHistory');
        const history = existingHistory ? JSON.parse(existingHistory) : [];
        history.unshift(result);
        
        if (history.length > 10) {
          history.pop();
        }
        
        await AsyncStorage.setItem('mbtiHistory', JSON.stringify(history));
        
        // 결과 페이지로 이동
        navigation.navigate('Result', { result });
      } catch (error) {
        console.error('Failed to save result:', error);
        Alert.alert('오류', '결과 저장 중 오류가 발생했습니다.');
      }
    }
  };

  const calculateMBTI = (answerList) => {
    const counts = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
    
    answerList.forEach(answer => {
      counts[answer]++;
    });

    const mbti = 
      (counts.E > counts.I ? 'E' : 'I') +
      (counts.S > counts.N ? 'S' : 'N') +
      (counts.T > counts.F ? 'T' : 'F') +
      (counts.J > counts.P ? 'J' : 'P');

    return mbti;
  };

  const getMBTIDescription = (mbti) => {
    const descriptions = {
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
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      padding: 20,
      paddingTop: 40,
    },
    headerTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 16,
    },
    progressContainer: {
      marginBottom: 20,
    },
    progressBar: {
      height: 8,
      backgroundColor: colors.border,
      borderRadius: 4,
      overflow: 'hidden',
    },
    progressFill: {
      height: '100%',
      backgroundColor: colors.primary,
      borderRadius: 4,
    },
    progressText: {
      textAlign: 'right',
      marginTop: 8,
      fontSize: 14,
      color: colors.textSecondary,
    },
    questionContainer: {
      flex: 1,
      padding: 20,
    },
    questionCard: {
      backgroundColor: colors.surface,
      borderRadius: 16,
      padding: 24,
      marginBottom: 24,
      borderWidth: 1,
      borderColor: colors.border,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    questionText: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.text,
      lineHeight: 28,
      marginBottom: 20,
    },
    optionsContainer: {
      gap: 12,
    },
    optionButton: {
      borderRadius: 12,
      overflow: 'hidden',
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    optionContent: {
      padding: 16,
      flexDirection: 'row',
      alignItems: 'center',
    },
    optionNumber: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 16,
    },
    optionNumberText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#FFFFFF',
    },
    optionText: {
      flex: 1,
      fontSize: 16,
      color: '#FFFFFF',
      lineHeight: 24,
    },
    bottomContainer: {
      padding: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    restartButton: {
      backgroundColor: colors.surface,
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.border,
    },
    restartButtonText: {
      color: colors.textSecondary,
      fontSize: 14,
    },
    helpText: {
      color: colors.textSecondary,
      fontSize: 14,
    },
  });

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>MBTI 테스트</Text>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View 
              style={[styles.progressFill, { width: `${progress}%` }]} 
            />
          </View>
          <Text style={styles.progressText}>
            {currentQuestion + 1} / {questions.length}
          </Text>
        </View>
      </View>

      {/* Question */}
      <ScrollView style={styles.questionContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.questionCard}>
          <Text style={styles.questionText}>
            {questions[currentQuestion].text}
          </Text>
          
          <View style={styles.optionsContainer}>
            {questions[currentQuestion].options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.optionButton}
                onPress={() => handleAnswer(option.value)}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={theme === 'dark' ? ['#374151', '#1F2937'] : ['#3B82F6', '#1D4ED8']}
                  style={styles.optionContent}
                >
                  <View style={styles.optionNumber}>
                    <Text style={styles.optionNumberText}>{index + 1}</Text>
                  </View>
                  <Text style={styles.optionText}>{option.text}</Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Bottom */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.restartButton} onPress={restartTest}>
          <Text style={styles.restartButtonText}>다시 시작</Text>
        </TouchableOpacity>
        <Text style={styles.helpText}>질문에 답하여 진행하세요</Text>
      </View>
    </SafeAreaView>
  );
};

export default TestScreen;