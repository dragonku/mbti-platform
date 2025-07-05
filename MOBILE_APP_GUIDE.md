# 📱 MBTI 모바일 앱 개발 가이드

## 🎯 프로젝트 개요

MBTI 통합 플랫폼의 모바일 애플리케이션이 **완성**되었습니다!

### 📍 저장소 위치
- **모바일 앱**: `mobile-app` 브랜치
- **웹 앱**: `main` 브랜치

## 🚀 완성된 기능

### ✅ **7개 주요 화면**
1. **홈 화면** (`HomeScreen.js`)
   - 서비스 소개 및 주요 기능 카드
   - 사용자 통계 (활성 사용자, 총 테스트 수)
   - 각 기능으로의 빠른 네비게이션

2. **테스트 화면** (`TestScreen.js`)
   - 8개 질문 MBTI 테스트
   - 실시간 진행률 표시
   - 게임화된 선택 버튼
   - 자동 결과 저장

3. **결과 화면** (`ResultScreen.js`)
   - MBTI 유형 및 상세 설명
   - 4가지 성향 분석 (E/I, S/N, T/F, J/P)
   - 추천 직업 정보
   - 소셜 공유 기능

4. **궁합 분석 화면** (`CompatibilityScreen.js`)
   - 16가지 MBTI 유형 선택
   - 나와 상대방의 MBTI 입력
   - 궁합 분석 UI

5. **커뮤니티 화면** (`CommunityScreen.js`)
   - 일반 게시판 (자유, 고민상담, 인간관계)
   - MBTI 타입별 게시판
   - 활동 통계 표시

6. **추천 서비스 화면** (`RecommendationsScreen.js`)
   - 4개 카테고리 (직업, 도서, 취미, 음악)
   - MBTI 기반 개인화 추천
   - 매칭률 표시

7. **프로필 화면** (`ProfileScreen.js`)
   - 사용자 정보 및 최신 MBTI 결과
   - 테스트 히스토리 관리
   - 다크 모드 설정
   - 데이터 관리 옵션

### ✅ **핵심 시스템**
- **테마 시스템** (`ThemeContext.js`)
  - 라이트/다크 모드 지원
  - 시스템 테마 자동 감지
  - AsyncStorage 기반 설정 저장

- **네비게이션 시스템**
  - React Navigation 7 기반
  - 탭 네비게이션 + 스택 네비게이션
  - 직관적인 사용자 인터페이스

- **데이터 저장 시스템**
  - AsyncStorage 기반 로컬 저장
  - 테스트 결과 히스토리 (최대 10개)
  - 사용자 설정 저장

## 🛠 기술 스택

### **프레임워크 & 라이브러리**
```json
{
  "react-native": "Expo SDK 53",
  "expo": "~53.0.0",
  "@react-navigation/native": "^7.x",
  "@react-navigation/bottom-tabs": "^7.x",
  "@react-navigation/native-stack": "^7.x",
  "react-native-screens": "최신",
  "react-native-safe-area-context": "최신"
}
```

### **UI & 디자인**
```json
{
  "@expo/vector-icons": "아이콘",
  "expo-linear-gradient": "그라디언트",
  "expo-vector-icons": "벡터 아이콘"
}
```

### **데이터 & 상태 관리**
```json
{
  "@react-native-async-storage/async-storage": "로컬 저장",
  "react": "Context API 상태 관리"
}
```

## 📂 프로젝트 구조

```
📱 mbti-mobile-app/
├── App.js                          # 메인 앱 컴포넌트
├── app.json                        # Expo 설정
├── eas.json                        # EAS 빌드 설정
├── 
├── src/
│   ├── contexts/
│   │   └── ThemeContext.js         # 테마 관리
│   │
│   └── screens/
│       ├── HomeScreen.js           # 홈 화면
│       ├── TestScreen.js           # MBTI 테스트
│       ├── ResultScreen.js         # 결과 분석
│       ├── CompatibilityScreen.js  # 궁합 분석
│       ├── CommunityScreen.js      # 커뮤니티
│       ├── RecommendationsScreen.js # 추천 서비스
│       └── ProfileScreen.js        # 프로필
│
├── assets/                         # 앱 아이콘 및 에셋
├── .github/workflows/             # CI/CD 설정
└── README.md                      # 프로젝트 문서
```

## 🚀 배포 가이드

### **개발 환경 실행**
```bash
# 저장소 클론
git clone https://github.com/dragonku/mbti-platform.git
cd mbti-platform
git checkout mobile-app

# 의존성 설치
npm install

# 개발 서버 시작
npm run start     # Expo Go 앱으로 테스트
npm run web      # 웹 버전으로 테스트
npm run android  # Android 에뮬레이터
npm run ios      # iOS 시뮬레이터 (macOS만)
```

### **프로덕션 빌드**
```bash
# EAS CLI 설치
npm install -g @expo/cli eas-cli

# EAS 로그인 (Expo 계정 필요)
eas login

# 프리뷰 빌드 (APK)
eas build --platform android --profile preview

# 프로덕션 빌드
eas build --platform all --profile production

# 앱스토어 제출
eas submit --platform all
```

### **웹 배포**
```bash
# Expo 웹 익스포트
npx expo export --platform web

# 정적 파일이 dist/ 폴더에 생성됨
# Vercel, Netlify 등에 배포 가능
```

## 📱 플랫폼 지원

### **네이티브 플랫폼**
- ✅ **Android**: API 21+ (Android 5.0+)
- ✅ **iOS**: iOS 13.4+
- ✅ **웹**: 모던 브라우저

### **개발 환경**
- ✅ **Expo Go**: 빠른 개발 및 테스트
- ✅ **Development Build**: 네이티브 모듈 포함
- ✅ **Web**: 브라우저에서 즉시 테스트

## 🎨 UI/UX 특징

### **디자인 시스템**
- **색상**: 브랜드 일관성 유지
- **타이포그래피**: 가독성 최적화
- **그라디언트**: 시각적 매력 향상
- **아이콘**: Expo Vector Icons 활용

### **사용자 경험**
- **직관적 네비게이션**: 탭 기반 구조
- **부드러운 애니메이션**: 네이티브 성능
- **다크 모드**: 시스템 설정 연동
- **오프라인 지원**: 로컬 데이터 저장

## 🔄 웹 앱과의 차이점

### **모바일 앱 전용 기능**
- ✅ **네이티브 네비게이션**: 탭 기반 UX
- ✅ **디바이스 통합**: 시스템 테마, 공유 기능
- ✅ **오프라인 우선**: 로컬 데이터 중심
- ✅ **터치 최적화**: 모바일 인터랙션

### **웹 앱 전용 기능**
- 🌐 **서버 연동**: 실시간 커뮤니티
- 🌐 **SEO 최적화**: 검색 엔진 친화적
- 🌐 **브라우저 기능**: 북마크, 히스토리
- 🌐 **대화면 최적화**: 데스크톱 UX

## 📊 성능 최적화

### **번들 크기 최적화**
- Tree-shaking으로 불필요한 코드 제거
- 이미지 및 에셋 최적화
- Code splitting 적용

### **런타임 성능**
- 메모리 효율적인 컴포넌트 설계
- 불필요한 리렌더링 방지
- 네이티브 성능 활용

## 🔮 향후 계획

### **Phase 1: 기본 배포** ✅
- ✅ Google Play Store 출시
- ✅ Apple App Store 출시
- ✅ 기본 기능 검증

### **Phase 2: 고급 기능**
- 🔄 Push Notification
- 🔄 Deep Linking
- 🔄 Offline-first Architecture

### **Phase 3: 확장 기능**
- 📋 AI 기반 개인화
- 📋 실시간 채팅
- 📋 소셜 로그인 연동

## 🤝 개발팀 연락처

프로젝트 관련 문의:
- **Repository**: https://github.com/dragonku/mbti-platform
- **Branch**: `mobile-app`
- **Issues**: GitHub Issues 활용

---

**MBTI 통합 플랫폼 모바일 앱** - 언제 어디서나 당신의 성격을 탐험하세요! 📱✨