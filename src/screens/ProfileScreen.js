import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = ({ navigation }) => {
  const { colors, theme, toggleTheme } = useTheme();
  const [testHistory, setTestHistory] = useState([]);
  const [latestResult, setLatestResult] = useState(null);

  useEffect(() => {
    loadTestHistory();
  }, []);

  const loadTestHistory = async () => {
    try {
      const history = await AsyncStorage.getItem('mbtiHistory');
      if (history) {
        const parsedHistory = JSON.parse(history);
        setTestHistory(parsedHistory);
        if (parsedHistory.length > 0) {
          setLatestResult(parsedHistory[0]);
        }
      }
    } catch (error) {
      console.error('Failed to load test history:', error);
    }
  };

  const clearHistory = () => {
    Alert.alert(
      '히스토리 삭제',
      '모든 테스트 결과를 삭제하시겠습니까?',
      [
        { text: '취소', style: 'cancel' },
        {
          text: '삭제',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('mbtiHistory');
              setTestHistory([]);
              setLatestResult(null);
            } catch (error) {
              console.error('Failed to clear history:', error);
            }
          },
        },
      ]
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      padding: 20,
      paddingTop: 40,
      alignItems: 'center',
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
    profileCard: {
      backgroundColor: colors.surface,
      borderRadius: 16,
      padding: 20,
      marginBottom: 20,
      borderWidth: 1,
      borderColor: colors.border,
      alignItems: 'center',
    },
    avatar: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 16,
    },
    avatarText: {
      color: '#FFFFFF',
      fontSize: 32,
      fontWeight: 'bold',
    },
    userName: {
      fontSize: 20,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 8,
    },
    userMBTI: {
      fontSize: 16,
      color: colors.textSecondary,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 16,
      marginTop: 8,
    },
    historyCard: {
      backgroundColor: colors.surface,
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: colors.border,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    historyLeft: {
      flex: 1,
    },
    historyMBTI: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.primary,
      marginBottom: 4,
    },
    historyDescription: {
      fontSize: 14,
      color: colors.textSecondary,
      marginBottom: 4,
    },
    historyDate: {
      fontSize: 12,
      color: colors.textSecondary,
    },
    settingsCard: {
      backgroundColor: colors.surface,
      borderRadius: 16,
      padding: 4,
      marginBottom: 20,
      borderWidth: 1,
      borderColor: colors.border,
    },
    settingItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 16,
    },
    settingLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    settingIcon: {
      marginRight: 12,
    },
    settingText: {
      fontSize: 16,
      color: colors.text,
    },
    emptyState: {
      alignItems: 'center',
      padding: 40,
    },
    emptyIcon: {
      marginBottom: 16,
    },
    emptyText: {
      fontSize: 16,
      color: colors.textSecondary,
      textAlign: 'center',
      marginBottom: 20,
    },
    testButton: {
      borderRadius: 12,
      overflow: 'hidden',
    },
    testContent: {
      padding: 16,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    testText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '600',
      marginLeft: 8,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={theme === 'dark' ? ['#1F2937', '#111827'] : ['#F3E8FF', '#E9D5FF']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>프로필</Text>
        <Text style={styles.headerSubtitle}>나의 MBTI 정보와 설정</Text>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {latestResult ? latestResult.result[0] : 'U'}
            </Text>
          </View>
          <Text style={styles.userName}>사용자</Text>
          {latestResult && (
            <Text style={styles.userMBTI}>
              {latestResult.result} • {latestResult.description}
            </Text>
          )}
        </View>

        {/* Test History */}
        <Text style={styles.sectionTitle}>테스트 히스토리</Text>
        {testHistory.length > 0 ? (
          testHistory.map((test, index) => (
            <TouchableOpacity
              key={index}
              style={styles.historyCard}
              onPress={() => navigation.navigate('Result', { result: test })}
            >
              <View style={styles.historyLeft}>
                <Text style={styles.historyMBTI}>{test.result}</Text>
                <Text style={styles.historyDescription}>{test.description}</Text>
                <Text style={styles.historyDate}>{test.date}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Ionicons 
              name="document-text-outline" 
              size={64} 
              color={colors.textSecondary}
              style={styles.emptyIcon}
            />
            <Text style={styles.emptyText}>
              아직 테스트 결과가 없습니다.{'\n'}첫 번째 MBTI 테스트를 시작해보세요!
            </Text>
            <TouchableOpacity
              style={styles.testButton}
              onPress={() => navigation.navigate('Test')}
            >
              <LinearGradient
                colors={['#3B82F6', '#1D4ED8']}
                style={styles.testContent}
              >
                <Ionicons name="play" size={20} color="#FFFFFF" />
                <Text style={styles.testText}>테스트 시작하기</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}

        {/* Settings */}
        <Text style={styles.sectionTitle}>설정</Text>
        <View style={styles.settingsCard}>
          <TouchableOpacity style={styles.settingItem} onPress={toggleTheme}>
            <View style={styles.settingLeft}>
              <Ionicons 
                name={theme === 'dark' ? 'moon' : 'sunny'} 
                size={24} 
                color={colors.primary}
                style={styles.settingIcon}
              />
              <Text style={styles.settingText}>다크 모드</Text>
            </View>
            <Ionicons 
              name={theme === 'dark' ? 'toggle' : 'toggle-outline'} 
              size={28} 
              color={colors.primary} 
            />
          </TouchableOpacity>

          {testHistory.length > 0 && (
            <TouchableOpacity style={styles.settingItem} onPress={clearHistory}>
              <View style={styles.settingLeft}>
                <Ionicons 
                  name="trash-outline" 
                  size={24} 
                  color={colors.error}
                  style={styles.settingIcon}
                />
                <Text style={[styles.settingText, { color: colors.error }]}>
                  히스토리 삭제
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;