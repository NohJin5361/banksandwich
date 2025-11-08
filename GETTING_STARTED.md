# BankSandwich 시작 가이드

## 빠른 시작

### 1. 개발 서버 실행

```bash
# 프론트엔드 디렉토리로 이동
cd D:/banksandwich/frontend

# 개발 서버 실행 (처음이라면 npm install 먼저 실행)
npm run dev
```

개발 서버가 실행되면 브라우저에서 다음 주소로 접속:
**http://localhost:5173**

### 2. 휴대폰에서 테스트하기

#### 방법 1: 같은 Wi-Fi 네트워크 사용

1. PC의 IP 주소 확인:
   ```bash
   ipconfig
   ```
   (IPv4 주소 확인, 예: 192.168.0.10)

2. vite.config.js 수정 (이미 설정되어 있다면 생략):
   ```javascript
   export default defineConfig({
     server: {
       host: '0.0.0.0',
       port: 5173
     }
   })
   ```

3. 개발 서버 실행:
   ```bash
   npm run dev
   ```

4. 휴대폰에서 접속:
   - 휴대폰을 PC와 같은 Wi-Fi에 연결
   - 브라우저에서 `http://PC의IP주소:5173` 접속
   - 예: `http://192.168.0.10:5173`

#### 방법 2: QR 코드 사용 (권장)

Vite 개발 서버는 자동으로 네트워크 URL을 제공합니다.
서버 실행 시 콘솔에 표시되는 Network URL로 접속하거나,
QR 코드 생성 도구를 사용하세요.

### 3. 빌드 및 배포

#### 프로덕션 빌드

```bash
cd D:/banksandwich/frontend
npm run build
```

빌드된 파일은 `dist/` 폴더에 생성됩니다.

#### 빌드 결과 미리보기

```bash
npm run preview
```

#### 배포 옵션

1. **정적 호스팅 (Vercel, Netlify 등)**
   - `dist` 폴더를 직접 업로드
   - 또는 Git 연동으로 자동 배포

2. **GitHub Pages**
   ```bash
   # vite.config.js에 base 추가
   base: '/repository-name/'
   ```

3. **자체 서버**
   - `dist` 폴더를 웹 서버 루트에 복사
   - Nginx, Apache 등 사용

## 프로젝트 구조 설명

```
frontend/
├── src/
│   ├── components/          # 재사용 가능한 컴포넌트
│   │   ├── ChoiceCard.jsx   # 카드형 선택지
│   │   └── IncomeSlider.jsx # 소득 입력 슬라이더
│   ├── pages/               # 페이지 컴포넌트
│   │   ├── StartPage.jsx    # 시작 페이지
│   │   ├── SurveyPage.jsx   # 설문 페이지
│   │   └── ResultPage.jsx   # 결과 페이지
│   ├── data/
│   │   └── questions.js     # 21개 질문 데이터
│   ├── utils/
│   │   └── calculator.js    # 점수/저축/멍청비용 계산
│   ├── App.jsx              # 라우팅 설정
│   └── index.css            # 글로벌 스타일
└── public/
    └── sandwich_image/      # 멍청비용 이미지 (8종)
```

## 주요 기능 설명

### 1. 설문 시스템
- 21개 질문 (1-20번: 객관식, 21번: 소득)
- 진행률 표시
- 이전/다음 버튼으로 네비게이션
- 답변 유효성 검사

### 2. 점수 계산
- 각 선택지: 1-4점
- 총점 → 백분율 변환 (0-100)
- 등급 부여: S, A, B, C, D

### 3. 재정 분석
- **저축 추천**: 점수 기반 저축률 (10-30%)
- **멍청비용**: 자유 소비 가능 금액
- **AI 피드백**: 카테고리별 맞춤 조언

### 4. 시각화
- 카테고리별 점수 그래프
- 멍청비용 구간별 샌드위치 이미지
- 반응형 디자인 (모바일 최적화)

## 커스터마이징

### 색상 변경

`tailwind.config.js` 파일에서 primary, secondary 색상 수정:

```javascript
colors: {
  primary: {
    500: '#f4b137',  // 메인 오렌지
    // ...
  },
  secondary: {
    500: '#42abcd',  // 메인 블루
    // ...
  }
}
```

### 질문 추가/수정

`src/data/questions.js` 파일 수정:

```javascript
{
  id: 22,
  category: "새 카테고리",
  question: "새 질문?",
  choices: [
    { id: 1, text: "선택지 1", score: 4 },
    // ...
  ]
}
```

### 계산 로직 변경

`src/utils/calculator.js` 파일의 함수들 수정:
- `calculateScore()`: 점수 계산
- `calculateSavings()`: 저축 추천
- `calculateFoolishExpense()`: 멍청비용
- `generateAIFeedback()`: AI 피드백

## 문제 해결

### 빌드 오류

```bash
# node_modules 삭제 후 재설치
rm -rf node_modules package-lock.json
npm install
```

### 개발 서버가 열리지 않을 때

```bash
# 포트 변경
npm run dev -- --port 3000
```

### 이미지가 표시되지 않을 때

- `public/sandwich_image/` 폴더에 이미지 파일 확인
- 파일명이 `image1.png ~ image8.png`인지 확인

## 다음 단계

1. **백엔드 개발** (선택사항)
   - FastAPI 서버 구현
   - MySQL 데이터베이스 연동
   - 실제 Claude AI API 연동

2. **추가 기능**
   - 사용자 계정 시스템
   - 결과 공유 기능
   - 통계 대시보드

3. **배포**
   - Vercel, Netlify 등 무료 호스팅
   - 커스텀 도메인 연결

## 지원

문제가 발생하면 다음을 확인하세요:
1. Node.js 버전 (18 이상 권장)
2. npm 버전 (9 이상 권장)
3. 브라우저 개발자 도구 콘솔

즐거운 개발 되세요! 🎉
