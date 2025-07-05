import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';

const HomeScreen = ({ navigation }) => {
  const { colors, theme } = useTheme();

  const features = [
    {
      id: 1,
      title: 'MBTI 테스트',
      description: '재미있는 상황별 선택으로 진행하는 성격유형 테스트',
      icon: 'game-controller',
      color: ['#3B82F6', '#1D4ED8'],
      onPress: () => navigation.navigate('Test'),
    },
    {
      id: 2,
      title: '궁합 분석',
      description: '친구, 연인, 가족과의 관계를 더 깊이 이해하세요',
      icon: 'heart',
      color: ['#EC4899', '#BE185D'],
      onPress: () => navigation.navigate('Compatibility'),
    },
    {
      id: 3,
      title: '커뮤니티',
      description: '같은 MBTI 타입의 사람들과 소통하고 교류하세요',
      icon: 'people',
      color: ['#10B981', '#047857'],
      onPress: () => navigation.navigate('Community'),
    },
    {
      id: 4,
      title: '개인화 추천',
      description: '당신의 MBTI에 맞는 직업, 취미, 도서를 추천받으세요',
      icon: 'bulb',
      color: ['#F59E0B', '#D97706'],
      onPress: () => navigation.navigate('Recommendations'),
    },
  ];

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
      fontSize: 28,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 8,
    },
    headerSubtitle: {
      fontSize: 16,
      color: colors.textSecondary,
      lineHeight: 24,
    },
    featuresContainer: {
      padding: 20,
    },
    featureCard: {
      marginBottom: 16,
      borderRadius: 16,
      overflow: 'hidden',
      elevation: 4,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
    },
    featureContent: {
      padding: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    featureIcon: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 16,
    },
    featureTextContainer: {
      flex: 1,
    },
    featureTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: '#FFFFFF',
      marginBottom: 4,
    },
    featureDescription: {
      fontSize: 14,
      color: 'rgba(255, 255, 255, 0.8)',
      lineHeight: 20,
    },
    statsContainer: {
      flexDirection: 'row',
      margin: 20,
      marginTop: 0,
    },
    statCard: {
      flex: 1,
      backgroundColor: colors.surface,
      padding: 16,
      borderRadius: 12,
      marginHorizontal: 4,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.border,
    },
    statNumber: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.primary,
      marginBottom: 4,
    },
    statLabel: {
      fontSize: 12,
      color: colors.textSecondary,
      textAlign: 'center',
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient
          colors={theme === 'dark' ? ['#1F2937', '#111827'] : ['#EBF8FF', '#DBEAFE']}
          style={styles.header}
        >
          <Text style={styles.headerTitle}>MBTI 통합 플랫폼</Text>
          <Text style={styles.headerSubtitle}>
            자신을 이해하고 타인과 더 나은 관계를 맺을 수 있도록 돕는 종합 MBTI 서비스입니다.
          </Text>
        </LinearGradient>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>2.8K</Text>
            <Text style={styles.statLabel}>활성 사용자</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>12K</Text>
            <Text style={styles.statLabel}>총 테스트</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>64</Text>
            <Text style={styles.statLabel}>오늘 완료</Text>
          </View>
        </View>

        {/* Features */}
        <View style={styles.featuresContainer}>
          {features.map((feature) => (
            <TouchableOpacity
              key={feature.id}
              style={styles.featureCard}
              onPress={feature.onPress}
              activeOpacity={0.8}
            >
              <LinearGradient colors={feature.color} style={styles.featureContent}>
                <View style={styles.featureIcon}>
                  <Ionicons name={feature.icon} size={24} color="#FFFFFF" />
                </View>
                <View style={styles.featureTextContainer}>
                  <Text style={styles.featureTitle}>{feature.title}</Text>
                  <Text style={styles.featureDescription}>{feature.description}</Text>
                </View>
                <Ionicons name="chevron-forward" size={24} color="rgba(255, 255, 255, 0.7)" />
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;