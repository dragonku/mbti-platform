# MBTI 통합 플랫폼 🧠

자신을 이해하고 타인과 더 나은 관계를 맺을 수 있도록 돕는 종합 MBTI 서비스입니다.

## 🎯 주요 기능

- **🎮 게임화된 MBTI 테스트**: 8개 질문으로 구성된 인터랙티브 테스트
- **📊 실시간 결과 분석**: 즉시 확인 가능한 MBTI 타입 분석
- **📱 반응형 디자인**: 모바일/태블릿/데스크톱 최적화
- **🎨 직관적인 UI/UX**: 사용자 친화적인 인터페이스

## 🛠 기술 스택

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **상태 관리**: React Hooks
- **배포**: Vercel
- **버전 관리**: Git/GitHub

## 🚀 시작하기

### 로컬 개발 환경 설정

```bash
# 저장소 클론
git clone https://github.com/dragonku/mbti-platform.git
cd mbti-platform

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

개발 서버가 실행되면 [http://localhost:3000](http://localhost:3000)에서 확인할 수 있습니다.

### 빌드 및 배포

```bash
# 프로덕션 빌드
npm run build

# 빌드 결과 확인
npm run start
```

## 📁 프로젝트 구조

```
src/
├── app/
│   ├── page.tsx          # 메인 페이지
│   ├── test/
│   │   └── page.tsx      # MBTI 테스트 페이지
│   ├── about/
│   │   └── page.tsx      # 서비스 소개 페이지
│   ├── layout.tsx        # 레이아웃 컴포넌트
│   └── globals.css       # 글로벌 스타일
```

## 🎨 디자인 시스템

- **컬러 팔레트**: Blue, Purple, Pink 그라데이션
- **타이포그래피**: 시스템 폰트 스택
- **반응형 브레이크포인트**: Tailwind CSS 기준

## 🧪 테스트

현재 구현된 기능들:
- [x] 메인 페이지 로딩 및 네비게이션
- [x] MBTI 테스트 전체 프로세스
- [x] 결과 분석 및 표시
- [x] 반응형 디자인 다양한 디바이스 지원

## 🚀 배포

이 프로젝트는 Vercel에 배포되어 있습니다:
- **Production**: [배포 URL이 여기에 표시됩니다]
- **Preview**: PR 생성 시 자동 생성

### Vercel 배포 방법
1. [Vercel](https://vercel.com)에 로그인
2. GitHub 저장소 연결
3. 자동 배포 완료

## 🤝 기여하기

1. 이 저장소를 Fork합니다
2. 새로운 기능 브랜치를 생성합니다 (`git checkout -b feature/새기능`)
3. 변경사항을 커밋합니다 (`git commit -m 'Add 새기능'`)
4. 브랜치에 Push합니다 (`git push origin feature/새기능`)
5. Pull Request를 생성합니다

## 📝 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다.

## 📧 문의

프로젝트에 대한 문의사항이 있으시면 이슈를 생성해주세요.

---

🤖 Generated with [Claude Code](https://claude.ai/code)
