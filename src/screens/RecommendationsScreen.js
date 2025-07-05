import React, { useState } from 'react';
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

const RecommendationsScreen = () => {
  const { colors, theme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('career');

  const categories = [
    { id: 'career', name: '직업', icon: 'briefcase', color: '#3B82F6' },
    { id: 'books', name: '도서', icon: 'book', color: '#10B981' },
    { id: 'hobbies', name: '취미', icon: 'heart', color: '#EF4444' },
    { id: 'music', name: '음악', icon: 'musical-notes', color: '#8B5CF6' },
  ];

  const recommendations = {
    career: [
      { title: '마케팅 전문가', match: 95, tags: ['창의적', '소통', '유연함'] },
      { title: '상담사', match: 92, tags: ['공감', '상담', '인간관계'] },
      { title: '기업가', match: 88, tags: ['혁신', '리더십', '모험'] },
    ],
    books: [
      { title: '자기계발서', match: 90, tags: ['성장', '동기부여', '영감'] },
      { title: '심리학', match: 87, tags: ['인간이해', '심리', '통찰'] },
      { title: '여행기', match: 85, tags: ['모험', '문화', '경험'] },
    ],
    hobbies: [
      { title: '사진 촬영', match: 93, tags: ['창의성', '예술', '탐험'] },
      { title: '여행', match: 95, tags: ['모험', '경험', '문화'] },
      { title: '요리', match: 82, tags: ['창의성', '실험', '나눔'] },
    ],
    music: [
      { title: 'K-POP', match: 88, tags: ['트렌디', '에너지', '감정'] },
      { title: '인디음악', match: 85, tags: ['독창성', '감성', '예술'] },
      { title: '재즈', match: 79, tags: ['즉흥성', '복잡성', '클래식'] },
    ],
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
    categoriesContainer: {
      flexDirection: 'row',
      marginBottom: 24,
      gap: 12,
    },
    categoryButton: {
      flex: 1,
      paddingVertical: 16,
      paddingHorizontal: 12,
      borderRadius: 12,
      alignItems: 'center',
      borderWidth: 2,
    },
    categorySelected: {
      borderColor: colors.primary,
      backgroundColor: colors.primary,
    },
    categoryUnselected: {
      borderColor: colors.border,
      backgroundColor: colors.surface,
    },
    categoryIcon: {
      marginBottom: 8,
    },
    categoryText: {
      fontSize: 14,
      fontWeight: '600',
    },
    categoryTextSelected: {
      color: '#FFFFFF',
    },
    categoryTextUnselected: {
      color: colors.text,
    },
    recommendationCard: {
      backgroundColor: colors.surface,
      borderRadius: 16,
      padding: 20,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: colors.border,
    },
    recommendationHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 12,
    },
    recommendationTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.text,
      flex: 1,
    },
    matchBadge: {
      backgroundColor: colors.success,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 20,
      marginLeft: 12,
    },
    matchText: {
      color: '#FFFFFF',
      fontSize: 14,
      fontWeight: '600',
    },
    tagsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
    },
    tag: {
      backgroundColor: colors.primary,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 16,
    },
    tagText: {
      color: '#FFFFFF',
      fontSize: 12,
      fontWeight: '500',
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={theme === 'dark' ? ['#1F2937', '#111827'] : ['#F0F9FF', '#E0F2FE']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>개인화 추천</Text>
        <Text style={styles.headerSubtitle}>
          당신의 MBTI 유형에 맞는 맞춤형 추천을 받아보세요
        </Text>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Categories */}
        <View style={styles.categoriesContainer}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryButton,
                selectedCategory === category.id 
                  ? styles.categorySelected 
                  : styles.categoryUnselected
              ]}
              onPress={() => setSelectedCategory(category.id)}
            >
              <Ionicons
                name={category.icon}
                size={24}
                color={selectedCategory === category.id ? '#FFFFFF' : category.color}
                style={styles.categoryIcon}
              />
              <Text style={[
                styles.categoryText,
                selectedCategory === category.id 
                  ? styles.categoryTextSelected 
                  : styles.categoryTextUnselected
              ]}>
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Recommendations */}
        {recommendations[selectedCategory].map((item, index) => (
          <View key={index} style={styles.recommendationCard}>
            <View style={styles.recommendationHeader}>
              <Text style={styles.recommendationTitle}>{item.title}</Text>
              <View style={styles.matchBadge}>
                <Text style={styles.matchText}>{item.match}%</Text>
              </View>
            </View>
            <View style={styles.tagsContainer}>
              {item.tags.map((tag, tagIndex) => (
                <View key={tagIndex} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default RecommendationsScreen;