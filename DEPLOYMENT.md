# MBTI 플랫폼 배포 가이드

## Vercel 배포 방법

### 1. GitHub Repository 생성
1. GitHub에서 새로운 repository 생성
2. Repository 이름: `mbti-platform` (또는 원하는 이름)
3. Public/Private 선택

### 2. 로컬 코드를 GitHub에 푸시
```bash
# 원격 저장소 추가
git remote add origin https://github.com/YOUR_USERNAME/mbti-platform.git

# 메인 브랜치로 변경 (선택사항)
git branch -M main

# 코드 푸시
git push -u origin main
```

### 3. Vercel 배포
1. [Vercel 웹사이트](https://vercel.com) 접속
2. GitHub 계정으로 로그인
3. "New Project" 클릭
4. GitHub에서 `mbti-platform` repository 선택
5. 프로젝트 설정:
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`
6. "Deploy" 클릭

### 4. 환경 변수 설정 (필요시)
현재 프로젝트는 환경 변수가 필요하지 않지만, 향후 데이터베이스나 인증 기능 추가 시 설정 필요

## 배포 완료 후 확인사항

### 기능 테스트
- [ ] 메인 페이지 로딩 확인
- [ ] MBTI 테스트 진행 가능 확인
- [ ] 테스트 결과 정상 표시 확인
- [ ] About 페이지 정상 표시 확인
- [ ] 모바일 반응형 디자인 확인

### 성능 최적화
- [ ] Lighthouse 점수 확인
- [ ] 로딩 속도 체크
- [ ] 이미지 최적화 확인

## 도메인 연결 (선택사항)
1. Vercel 프로젝트 설정에서 "Domains" 탭 이동
2. 커스텀 도메인 추가
3. DNS 설정 업데이트

## 자동 배포 설정
- GitHub에 push할 때마다 자동으로 Vercel에 배포됨
- PR 생성 시 Preview 환경 자동 생성
- main 브랜치에 merge 시 Production 배포

## 문제 해결
- 배포 실패 시 Vercel 콘솔에서 로그 확인
- Build 에러 시 로컬에서 `npm run build` 테스트
- 의존성 문제 시 `package.json` 확인

---

현재 프로젝트는 배포 준비가 완료되었습니다! 🚀