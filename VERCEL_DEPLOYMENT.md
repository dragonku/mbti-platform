# 🚀 Vercel 배포 가이드

## 📋 배포 준비 완료

### ✅ 최적화된 설정
- **프레임워크**: Next.js 15.3.5
- **빌드**: 성공적으로 완료 (17개 라우트)
- **최적화**: 프로덕션 빌드 최적화 적용
- **설정 파일**: vercel.json, .vercelignore 준비 완료

## 🎯 추천 배포 방법

### **방법 1: Vercel 대시보드 (추천)**

1. **저장소 연결**
   ```
   https://vercel.com/dashboard
   → New Project
   → Import Git Repository
   → GitHub: dragonku/mbti-platform
   ```

2. **프로젝트 설정**
   ```
   Project Name: mbti-platform
   Framework Preset: Next.js
   Root Directory: mbti-app
   Build Command: npm run build
   Output Directory: .next
   Install Command: npm install
   ```

3. **환경 변수 설정**
   ```
   NEXTAUTH_SECRET: [랜덤 시크릿 키]
   NEXTAUTH_URL: https://your-domain.vercel.app
   ```

4. **배포 실행**
   ```
   Deploy 버튼 클릭
   ```

### **방법 2: Vercel CLI (고급 사용자)**

```bash
# Vercel CLI 설치
npm install -g vercel

# 프로젝트 디렉토리에서 배포
cd /home/dragonku/mbti/mbti-app
vercel --prod

# 첫 배포 시 설정
# → Link to existing project? N
# → Project name: mbti-platform  
# → Directory: ./
# → Override settings? N
```

## 🔧 배포 설정 최적화

### **vercel.json**
```json
{
  "name": "mbti-platform",
  "version": 2,
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm install",
  "devCommand": "npm run dev"
}
```

### **환경 변수**
```env
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=https://your-domain.vercel.app
```

## 📊 빌드 정보

```
✓ 컴파일 성공: 6.0초
✓ 정적 페이지 생성: 17개 라우트
✓ 최적화 완료
✓ 빌드 크기 최적화

주요 페이지:
- 홈페이지: 1.52 kB
- MBTI 테스트: 3.34 kB  
- 결과 페이지: 122 kB (차트 포함)
- 커뮤니티: 3.29 kB
- 추천 서비스: 5.39 kB
```

## 🌐 배포 후 확인사항

### **기능 테스트**
- [ ] 홈페이지 로딩
- [ ] MBTI 테스트 완료
- [ ] 결과 차트 표시
- [ ] 다크모드 전환
- [ ] 반응형 디자인

### **성능 확인**
- [ ] Lighthouse 점수 확인
- [ ] 로딩 속도 테스트
- [ ] 모바일 최적화

### **SEO 확인**
- [ ] 메타태그 확인
- [ ] sitemap.xml 접근
- [ ] robots.txt 확인

## 🚀 배포 명령어

```bash
# 로컬 빌드 테스트
npm run build

# 로컬 프로덕션 서버 실행
npm run start

# Vercel 배포
vercel --prod
```

## 📱 도메인 설정

배포 후 커스텀 도메인 연결:
1. Vercel 대시보드 → Settings → Domains
2. 도메인 입력 후 DNS 설정
3. SSL 인증서 자동 적용

---

**준비 완료!** Vercel 대시보드에서 Root Directory를 `mbti-app`로 설정하고 배포하세요. 🚀