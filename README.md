# MBTI 통합 플랫폼 - 모바일 앱

자신을 이해하고 타인과 더 나은 관계를 맺을 수 있도록 돕는 종합 MBTI 모바일 애플리케이션입니다.

## 🚀 주요 기능

### 📱 **핵심 기능**
- ✅ **MBTI 테스트** - 8개 질문으로 구성된 게임화된 성격유형 테스트
- ✅ **결과 분석** - 상세한 MBTI 분석 및 추천 직업 정보
- ✅ **궁합 분석** - 다양한 관계 분석 (친구, 연인, 직장)
- ✅ **커뮤니티** - MBTI 타입별 게시판 및 일반 게시판
- ✅ **개인화 추천** - 직업, 도서, 취미, 음악 등 맞춤형 추천
- ✅ **프로필 관리** - 테스트 히스토리 및 개인 설정

### 🎨 **사용자 경험**
- ✅ **다크 모드** - 시스템 테마 자동 감지 및 수동 전환
- ✅ **반응형 디자인** - 모든 디바이스에 최적화
- ✅ **로컬 데이터 저장** - AsyncStorage를 활용한 오프라인 지원
- ✅ **직관적인 네비게이션** - 탭 기반 네비게이션
- ✅ **결과 공유 기능** - 소셜 미디어 공유 지원

## 🛠 기술 스택

### **프레임워크 & 라이브러리**
- **React Native**: 크로스 플랫폼 모바일 앱 개발
- **Expo SDK 53**: 개발 및 배포 플랫폼
- **React Navigation 7**: 네비게이션 시스템
- **Expo Vector Icons**: 아이콘 라이브러리
- **Linear Gradient**: 그라디언트 UI 요소
- **AsyncStorage**: 로컬 데이터 저장

### **상태 관리 & 데이터**
- **React Context API**: 글로벌 상태 관리 (테마)
- **AsyncStorage**: 테스트 결과 및 설정 저장
- **Local State Management**: React Hooks 기반

### **UI/UX**
- **Custom Components**: 재사용 가능한 컴포넌트
- **Themed Design System**: 라이트/다크 모드 지원
- **Responsive Layout**: 다양한 화면 크기 지원
- **Gradient Design**: 시각적으로 매력적인 UI

## 📂 프로젝트 구조

```
mbti-mobile-app/
├── App.js                    # 메인 앱 컴포넌트
├── src/
│   ├── contexts/
│   │   └── ThemeContext.js   # 테마 관리 컨텍스트
│   ├── screens/
│   │   ├── HomeScreen.js     # 홈 화면
│   │   ├── TestScreen.js     # MBTI 테스트 화면
│   │   ├── ResultScreen.js   # 결과 분석 화면
│   │   ├── CompatibilityScreen.js  # 궁합 분석 화면
│   │   ├── CommunityScreen.js      # 커뮤니티 화면
│   │   ├── RecommendationsScreen.js # 추천 서비스 화면
│   │   └── ProfileScreen.js         # 프로필 화면
│   ├── components/          # 재사용 가능한 컴포넌트
│   ├── utils/              # 유틸리티 함수
│   └── types/              # TypeScript 타입 정의
├── assets/                 # 이미지 및 에셋
├── app.json               # Expo 앱 설정
├── eas.json              # EAS 빌드 설정
└── package.json          # 의존성 및 스크립트
```

## 🎯 화면별 기능

### 1. **홈 화면 (HomeScreen)**
- 서비스 개요 및 주요 기능 소개
- 통계 정보 (활성 사용자, 총 테스트 수 등)
- 주요 기능으로의 빠른 접근

### 2. **테스트 화면 (TestScreen)**
- 8개 질문으로 구성된 MBTI 테스트
- 실시간 진행률 표시
- 게임화된 인터페이스
- 자동 결과 저장

### 3. **결과 화면 (ResultScreen)**
- MBTI 유형 및 상세 설명
- 4가지 성향 분석 (E/I, S/N, T/F, J/P)
- 추천 직업 정보
- 소셜 공유 기능

### 4. **궁합 분석 화면 (CompatibilityScreen)**
- 16가지 MBTI 유형 선택
- 나와 상대방의 MBTI 입력
- 궁합 분석 결과 제공

### 5. **커뮤니티 화면 (CommunityScreen)**
- 일반 게시판 (자유게시판, 고민상담, 인간관계)
- MBTI 타입별 전용 게시판
- 게시글 수 및 활동 통계

### 6. **추천 서비스 화면 (RecommendationsScreen)**
- 4개 카테고리별 추천 (직업, 도서, 취미, 음악)
- MBTI 기반 개인화 추천
- 매칭률 및 태그 정보

### 7. **프로필 화면 (ProfileScreen)**
- 사용자 정보 및 최신 MBTI 결과
- 테스트 히스토리 관리
- 다크 모드 토글
- 데이터 삭제 옵션

## 🔧 개발 환경 설정

### **필수 조건**
- Node.js 18.0.0 이상
- Expo CLI
- React Native 개발 환경

### **설치 및 실행**

```bash
# 의존성 설치
npm install

# 개발 서버 시작 (Expo Go 앱 필요)
npm run start

# 웹 버전 실행
npm run web

# Android 에뮬레이터에서 실행
npm run android

# iOS 시뮬레이터에서 실행 (macOS만 지원)
npm run ios
```

### **빌드 및 배포**

```bash
# EAS 빌드 (프리뷰용 APK)
eas build --platform android --profile preview

# 프로덕션 빌드
eas build --platform all --profile production

# 앱스토어 제출
eas submit --platform all
```

## 📱 지원 플랫폼

- **Android**: API 레벨 21 이상 (Android 5.0+)
- **iOS**: iOS 13.4 이상
- **웹**: 모던 브라우저 지원 (Chrome, Safari, Firefox, Edge)

## 🎨 디자인 시스템

### **색상 팔레트**
- **Primary**: #3B82F6 (Blue)
- **Secondary**: #10B981 (Green)
- **Error**: #EF4444 (Red)
- **Warning**: #F59E0B (Amber)

### **테마 지원**
- **라이트 모드**: 밝은 배경, 어두운 텍스트
- **다크 모드**: 어두운 배경, 밝은 텍스트
- **자동 전환**: 시스템 설정 감지

## 📊 앱 성능

### **최적화 기능**
- ✅ **빠른 시작**: 최적화된 번들 크기
- ✅ **오프라인 지원**: 로컬 데이터 저장
- ✅ **메모리 효율성**: 컴포넌트 최적화
- ✅ **부드러운 애니메이션**: 60fps 유지

### **사용자 경험**
- ✅ **직관적인 UI**: 간단하고 명확한 인터페이스
- ✅ **빠른 응답**: 즉각적인 피드백
- ✅ **일관된 디자인**: 통일된 디자인 언어
- ✅ **접근성**: 스크린 리더 지원

## 🔐 데이터 관리

### **로컬 저장**
- **테스트 결과**: 최대 10개 히스토리 보관
- **사용자 설정**: 테마 설정 등
- **임시 데이터**: 진행 중인 테스트 상태

### **개인정보 보호**
- ✅ **로컬 저장**: 모든 데이터는 기기에만 저장
- ✅ **익명성**: 개인 식별 정보 수집 안함
- ✅ **선택적 공유**: 사용자가 직접 선택하는 공유만 지원

## 🚀 향후 계획

### **Phase 1: 기본 기능 완성** ✅
- MBTI 테스트 및 결과 분석
- 기본 UI/UX 구현
- 로컬 데이터 저장

### **Phase 2: 고급 기능 추가** 🔄
- 서버 연동 및 사용자 계정
- 실시간 커뮤니티 기능
- 푸시 알림 시스템

### **Phase 3: 확장 기능** 📋
- AI 기반 개인화 추천
- 소셜 로그인 연동
- 다국어 지원

### **Phase 4: 플랫폼 확장** 📋
- 앱스토어 배포
- 웹 앱 최적화
- 데스크톱 앱 개발

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 🤝 기여하기

프로젝트에 기여하고 싶으시다면:

1. 이슈 등록
2. 기능 제안
3. 버그 리포트
4. 코드 개선 제안

## 📞 문의

프로젝트에 대한 문의사항이 있으시면 언제든지 연락해주세요.

---

**MBTI 통합 플랫폼** - 자신을 이해하고, 더 나은 관계를 만들어가세요 🌟