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

const CompatibilityScreen = () => {
  const { colors, theme } = useTheme();
  const [myMBTI, setMyMBTI] = useState('');
  const [partnerMBTI, setPartnerMBTI] = useState('');

  const mbtiTypes = [
    'ENFP', 'ENFJ', 'ENTP', 'ENTJ',
    'ESFP', 'ESFJ', 'ESTP', 'ESTJ',
    'INFP', 'INFJ', 'INTP', 'INTJ',
    'ISFP', 'ISFJ', 'ISTP', 'ISTJ'
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
    typeGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
      marginBottom: 32,
    },
    typeButton: {
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderRadius: 12,
      borderWidth: 2,
      minWidth: 80,
      alignItems: 'center',
    },
    typeButtonSelected: {
      borderColor: colors.primary,
      backgroundColor: colors.primary,
    },
    typeButtonUnselected: {
      borderColor: colors.border,
      backgroundColor: colors.surface,
    },
    typeText: {
      fontSize: 16,
      fontWeight: '600',
    },
    typeTextSelected: {
      color: '#FFFFFF',
    },
    typeTextUnselected: {
      color: colors.text,
    },
    analyzeButton: {
      borderRadius: 12,
      overflow: 'hidden',
      marginTop: 20,
    },
    analyzeContent: {
      padding: 16,
      alignItems: 'center',
    },
    analyzeText: {
      color: '#FFFFFF',
      fontSize: 18,
      fontWeight: '600',
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={theme === 'dark' ? ['#1F2937', '#111827'] : ['#FDF2F8', '#FCE7F3']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>궁합 분석</Text>
        <Text style={styles.headerSubtitle}>
          두 사람의 MBTI를 선택하여 궁합을 분석해보세요
        </Text>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* My MBTI */}
        <Text style={styles.sectionTitle}>나의 MBTI</Text>
        <View style={styles.typeGrid}>
          {mbtiTypes.map((type) => (
            <TouchableOpacity
              key={`my-${type}`}
              style={[
                styles.typeButton,
                myMBTI === type ? styles.typeButtonSelected : styles.typeButtonUnselected
              ]}
              onPress={() => setMyMBTI(type)}
            >
              <Text style={[
                styles.typeText,
                myMBTI === type ? styles.typeTextSelected : styles.typeTextUnselected
              ]}>
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Partner MBTI */}
        <Text style={styles.sectionTitle}>상대방의 MBTI</Text>
        <View style={styles.typeGrid}>
          {mbtiTypes.map((type) => (
            <TouchableOpacity
              key={`partner-${type}`}
              style={[
                styles.typeButton,
                partnerMBTI === type ? styles.typeButtonSelected : styles.typeButtonUnselected
              ]}
              onPress={() => setPartnerMBTI(type)}
            >
              <Text style={[
                styles.typeText,
                partnerMBTI === type ? styles.typeTextSelected : styles.typeTextUnselected
              ]}>
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Analyze Button */}
        {myMBTI && partnerMBTI && (
          <TouchableOpacity style={styles.analyzeButton}>
            <LinearGradient
              colors={['#EC4899', '#BE185D']}
              style={styles.analyzeContent}
            >
              <Text style={styles.analyzeText}>궁합 분석하기</Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default CompatibilityScreen;