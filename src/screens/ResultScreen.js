import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Share,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';

const ResultScreen = ({ route, navigation }) => {
  const { colors, theme } = useTheme();
  const { result } = route.params;

  const shareResult = async () => {
    try {
      await Share.share({
        message: `나의 MBTI 결과: ${result.result} - ${result.description}\n\nMBTI 통합 플랫폼에서 테스트해보세요!`,
        title: 'MBTI 테스트 결과',
      });
    } catch (error) {
      console.error('Share failed:', error);
    }
  };

  const getTraits = (mbti) => {
    return [
      {
        title: '에너지 방향',
        value: mbti[0] === 'E' ? '외향형 (E)' : '내향형 (I)',
        description: mbti[0] === 'E' ? '다른 사람들과의 상호작용에서 에너지를 얻습니다' : '혼자만의 시간에서 에너지를 얻습니다'
      },
      {
        title: '인식 방식',
        value: mbti[1] === 'S' ? '감각형 (S)' : '직관형 (N)',
        description: mbti[1] === 'S' ? '구체적인 사실과 현실에 집중합니다' : '가능성과 의미에 집중합니다'
      },
      {
        title: '판단 방식',
        value: mbti[2] === 'T' ? '사고형 (T)' : '감정형 (F)',
        description: mbti[2] === 'T' ? '논리적 분석을 통해 결정합니다' : '가치와 감정을 고려하여 결정합니다'
      },
      {
        title: '생활 양식',
        value: mbti[3] === 'J' ? '판단형 (J)' : '인식형 (P)',
        description: mbti[3] === 'J' ? '계획적이고 체계적으로 생활합니다' : '유연하고 적응적으로 생활합니다'
      }
    ];
  };

  const getRecommendedCareers = (mbti) => {
    const careers = {
      'ENFP': ['마케팅 전문가', '상담사', '기업가', '저널리스트'],
      'ENFJ': ['교사', '심리 상담사', '인사 관리자', '사회복지사'],
      'ENTP': ['변호사', '컨설턴트', '발명가', '광고 기획자'],
      'ENTJ': ['CEO', '경영 컨설턴트', '투자 분석가', '프로젝트 매니저'],
      'ESFP': ['연예인', '이벤트 기획자', '판매원', '여행 가이드'],
      'ESFJ': ['간호사', '교사', '고객 서비스', '인사 담당자'],
      'ESTP': ['영업 담당자', '경찰관', '운동선수', '응급의학과 의사'],
      'ESTJ': ['관리자', '회계사', '은행원', '군인'],
      'INFP': ['작가', '심리학자', '예술가', '사회복지사'],
      'INFJ': ['작가', '상담사', '연구원', '종교인'],
      'INTP': ['과학자', '프로그래머', '철학자', '연구원'],
      'INTJ': ['전략 기획자', '건축가', '시스템 분석가', '투자 전문가'],
      'ISFP': ['예술가', '음악가', '사진작가', '수의사'],
      'ISFJ': ['간호사', '교사', '도서관 사서', '사회복지사'],
      'ISTP': ['엔지니어', '기술자', '파일럿', '수리공'],
      'ISTJ': ['회계사', '감사관', '데이터 분석가', '관리자']
    };

    return careers[mbti] || ['다양한 분야에서 활동 가능'];
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      padding: 20,
      paddingTop: 40,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    backButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.surface,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.border,
    },
    shareButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.text,
    },
    content: {
      flex: 1,
      padding: 20,
    },
    resultCard: {
      borderRadius: 20,
      overflow: 'hidden',
      marginBottom: 20,
      elevation: 4,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
    },
    resultContent: {
      padding: 32,
      alignItems: 'center',
    },
    congratsText: {
      fontSize: 18,
      color: '#FFFFFF',
      marginBottom: 16,
      opacity: 0.9,
    },
    mbtiType: {
      fontSize: 48,
      fontWeight: 'bold',
      color: '#FFFFFF',
      marginBottom: 8,
    },
    mbtiDescription: {
      fontSize: 18,
      color: '#FFFFFF',
      textAlign: 'center',
      opacity: 0.9,
    },
    traitsContainer: {
      marginBottom: 20,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 16,
    },
    traitCard: {
      backgroundColor: colors.surface,
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: colors.border,
    },
    traitTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 4,
    },
    traitValue: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.primary,
      marginBottom: 8,
    },
    traitDescription: {
      fontSize: 14,
      color: colors.textSecondary,
      lineHeight: 20,
    },
    careersContainer: {
      marginBottom: 32,
    },
    careerGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
    },
    careerChip: {
      backgroundColor: colors.primary,
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
      margin: 4,
    },
    careerText: {
      color: '#FFFFFF',
      fontSize: 14,
      fontWeight: '500',
    },
    actionsContainer: {
      gap: 12,
    },
    actionButton: {
      borderRadius: 12,
      overflow: 'hidden',
    },
    actionContent: {
      padding: 16,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    actionText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '600',
      marginLeft: 8,
    },
  });

  const traits = getTraits(result.result);
  const careers = getRecommendedCareers(result.result);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>테스트 결과</Text>
        <TouchableOpacity style={styles.shareButton} onPress={shareResult}>
          <Ionicons name="share-outline" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Result Card */}
        <View style={styles.resultCard}>
          <LinearGradient
            colors={theme === 'dark' ? ['#1F2937', '#111827'] : ['#3B82F6', '#1D4ED8']}
            style={styles.resultContent}
          >
            <Text style={styles.congratsText}>🎉 테스트 완료!</Text>
            <Text style={styles.mbtiType}>{result.result}</Text>
            <Text style={styles.mbtiDescription}>{result.description}</Text>
          </LinearGradient>
        </View>

        {/* Traits */}
        <View style={styles.traitsContainer}>
          <Text style={styles.sectionTitle}>당신의 성향</Text>
          {traits.map((trait, index) => (
            <View key={index} style={styles.traitCard}>
              <Text style={styles.traitTitle}>{trait.title}</Text>
              <Text style={styles.traitValue}>{trait.value}</Text>
              <Text style={styles.traitDescription}>{trait.description}</Text>
            </View>
          ))}
        </View>

        {/* Recommended Careers */}
        <View style={styles.careersContainer}>
          <Text style={styles.sectionTitle}>추천 직업</Text>
          <View style={styles.careerGrid}>
            {careers.map((career, index) => (
              <View key={index} style={styles.careerChip}>
                <Text style={styles.careerText}>{career}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Actions */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('Compatibility')}
          >
            <LinearGradient
              colors={['#EC4899', '#BE185D']}
              style={styles.actionContent}
            >
              <Ionicons name="heart" size={24} color="#FFFFFF" />
              <Text style={styles.actionText}>궁합 분석하기</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('Test')}
          >
            <LinearGradient
              colors={['#10B981', '#047857']}
              style={styles.actionContent}
            >
              <Ionicons name="refresh" size={24} color="#FFFFFF" />
              <Text style={styles.actionText}>다시 테스트하기</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ResultScreen;