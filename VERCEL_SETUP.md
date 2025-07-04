# Vercel 배포 설정 가이드

## 🚀 자동 배포 확인

이 프로젝트는 GitHub와 Vercel이 연동되어 있어, main 브랜치에 푸시될 때마다 자동으로 배포됩니다.

## 🔐 환경 변수 설정

Vercel 대시보드에서 다음 환경 변수들을 설정해야 합니다:

### 필수 환경 변수

1. **AUTH_SECRET**
   ```
   AUTH_SECRET=your-super-secret-key-here-please-change-this-in-production
   ```
   - 길고 복잡한 랜덤 문자열로 설정
   - 32자 이상 권장

2. **AUTH_URL**
   ```
   AUTH_URL=https://your-domain.vercel.app
   ```
   - Vercel이 제공하는 실제 도메인으로 설정

### 선택적 환경 변수 (소셜 로그인)

#### GitHub OAuth
```
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
```

#### Google OAuth
```
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

## 📝 Vercel 환경 변수 설정 방법

1. [Vercel 대시보드](https://vercel.com/dashboard) 접속
2. 프로젝트 선택
3. "Settings" 탭 클릭
4. "Environment Variables" 섹션
5. 위의 환경 변수들을 하나씩 추가

## 🔧 OAuth 앱 설정 (선택사항)

### GitHub OAuth 앱 생성
1. GitHub Settings > Developer settings > OAuth Apps
2. "New OAuth App" 클릭
3. 설정:
   - Application name: `MBTI Platform`
   - Homepage URL: `https://your-domain.vercel.app`
   - Authorization callback URL: `https://your-domain.vercel.app/api/auth/callback/github`

### Google OAuth 앱 생성
1. [Google Cloud Console](https://console.cloud.google.com/)
2. OAuth consent screen 설정
3. Credentials > Create Credentials > OAuth client ID
4. 설정:
   - Application type: Web application
   - Authorized redirect URIs: `https://your-domain.vercel.app/api/auth/callback/google`

## ✅ 배포 후 확인사항

### 기본 기능 테스트
- [ ] 메인 페이지 로딩
- [ ] MBTI 테스트 진행
- [ ] 테스트 결과 표시

### 인증 기능 테스트
- [ ] 데모 계정 로그인 (`demo@mbti.com` / `demo123`)
- [ ] 회원가입 기능
- [ ] 프로필 페이지 접근
- [ ] 로그아웃 기능
- [ ] 소셜 로그인 (설정한 경우)

### 성능 확인
- [ ] 페이지 로딩 속도
- [ ] 모바일 반응형
- [ ] 이미지 최적화
- [ ] Lighthouse 점수

## 🐛 문제 해결

### 인증 오류
- `AUTH_SECRET` 설정 확인
- `AUTH_URL`이 실제 도메인과 일치하는지 확인
- 소셜 로그인 콜백 URL 확인

### 배포 실패
- 빌드 로그에서 오류 확인
- 환경 변수 설정 재확인
- Node.js 버전 호환성 확인

## 📊 모니터링

- Vercel Analytics 활용
- 오류 로그 정기 확인
- 사용자 피드백 수집

---

**현재 배포 상태**: ✅ 준비 완료

모든 설정이 완료되면 즉시 사용 가능한 상태입니다!