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

const CommunityScreen = () => {
  const { colors, theme } = useTheme();

  const communityBoards = [
    {
      id: 'free',
      title: '자유게시판',
      description: '자유롭게 이야기해요',
      icon: 'chatbubbles',
      posts: 1247,
      todayPosts: 23,
      color: ['#3B82F6', '#1D4ED8'],
    },
    {
      id: 'advice',
      title: '고민상담',
      description: '익명으로 고민을 나누세요',
      icon: 'heart',
      posts: 892,
      todayPosts: 15,
      color: ['#EC4899', '#BE185D'],
    },
    {
      id: 'relationships',
      title: '인간관계',
      description: '관계에 대한 고민과 조언',
      icon: 'people',
      posts: 634,
      todayPosts: 18,
      color: ['#10B981', '#047857'],
    },
  ];

  const mbtiTypes = [
    { type: 'ENFP', name: '활동가', count: 142, color: '#10B981' },
    { type: 'ENFJ', name: '선도자', count: 98, color: '#3B82F6' },
    { type: 'ENTP', name: '논쟁가', count: 156, color: '#8B5CF6' },
    { type: 'ENTJ', name: '지휘관', count: 87, color: '#EF4444' },
    { type: 'ESFP', name: '엔터테이너', count: 124, color: '#F59E0B' },
    { type: 'ESFJ', name: '집정관', count: 113, color: '#EC4899' },
    { type: 'ESTP', name: '경영자', count: 91, color: '#F97316' },
    { type: 'ESTJ', name: '관리자', count: 78, color: '#6366F1' },
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
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 8,
    },
    headerSubtitle: {
      fontSize: 16,
      color: colors.textSecondary,
    },
    content: {
      flex: 1,
      padding: 20,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 16,
    },
    boardCard: {
      marginBottom: 16,
      borderRadius: 16,
      overflow: 'hidden',
    },
    boardContent: {
      padding: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    boardIcon: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 16,
    },
    boardTextContainer: {
      flex: 1,
    },
    boardTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: '#FFFFFF',
      marginBottom: 4,
    },
    boardDescription: {
      fontSize: 14,
      color: 'rgba(255, 255, 255, 0.8)',
      marginBottom: 8,
    },
    boardStats: {
      fontSize: 12,
      color: 'rgba(255, 255, 255, 0.7)',
    },
    mbtiGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 12,
      marginBottom: 32,
    },
    mbtiCard: {
      width: '47%',
      backgroundColor: colors.surface,
      borderRadius: 12,
      padding: 16,
      borderWidth: 1,
      borderColor: colors.border,
    },
    mbtiHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    mbtiDot: {
      width: 12,
      height: 12,
      borderRadius: 6,
      marginRight: 8,
    },
    mbtiType: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
    },
    mbtiName: {
      fontSize: 14,
      color: colors.textSecondary,
      marginBottom: 4,
    },
    mbtiCount: {
      fontSize: 12,
      color: colors.textSecondary,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={theme === 'dark' ? ['#1F2937', '#111827'] : ['#EBF8FF', '#DBEAFE']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>커뮤니티</Text>
        <Text style={styles.headerSubtitle}>
          같은 MBTI 타입의 사람들과 소통하고 경험을 나누어요
        </Text>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* General Boards */}
        <Text style={styles.sectionTitle}>일반 게시판</Text>
        {communityBoards.map((board) => (
          <TouchableOpacity key={board.id} style={styles.boardCard}>
            <LinearGradient colors={board.color} style={styles.boardContent}>
              <View style={styles.boardIcon}>
                <Ionicons name={board.icon} size={24} color="#FFFFFF" />
              </View>
              <View style={styles.boardTextContainer}>
                <Text style={styles.boardTitle}>{board.title}</Text>
                <Text style={styles.boardDescription}>{board.description}</Text>
                <Text style={styles.boardStats}>
                  총 {board.posts.toLocaleString()}개 • 오늘 +{board.todayPosts}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color="rgba(255, 255, 255, 0.7)" />
            </LinearGradient>
          </TouchableOpacity>
        ))}

        {/* MBTI Type Boards */}
        <Text style={[styles.sectionTitle, { marginTop: 32 }]}>MBTI 타입별 게시판</Text>
        <View style={styles.mbtiGrid}>
          {mbtiTypes.map((mbti) => (
            <TouchableOpacity key={mbti.type} style={styles.mbtiCard}>
              <View style={styles.mbtiHeader}>
                <View style={[styles.mbtiDot, { backgroundColor: mbti.color }]} />
                <Text style={styles.mbtiType}>{mbti.type}</Text>
              </View>
              <Text style={styles.mbtiName}>{mbti.name}</Text>
              <Text style={styles.mbtiCount}>{mbti.count}명 활동</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CommunityScreen;