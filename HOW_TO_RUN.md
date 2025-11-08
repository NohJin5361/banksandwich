# BankSandwich 실행 방법

## 📱 휴대폰에서 바로 확인하는 방법

### 준비물
- PC (Windows)
- 휴대폰
- 같은 Wi-Fi 네트워크

### 단계별 실행

#### 1단계: PC에서 개발 서버 실행

```bash
# 명령 프롬프트(CMD) 또는 PowerShell 열기

# 프로젝트 폴더로 이동
cd D:\banksandwich\frontend

# 개발 서버 실행
npm run dev
```

#### 2단계: PC의 IP 주소 확인

터미널에서 다음과 같은 메시지가 표시됩니다:

```
  VITE v7.2.2  ready in 324 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.0.10:5173/
  ➜  press h + enter to show help
```

여기서 **Network 주소**를 확인하세요!
(예: `http://192.168.0.10:5173/`)

만약 Network 주소가 표시되지 않으면:

```bash
# Windows에서 IP 확인
ipconfig

# IPv4 주소를 찾으세요 (예: 192.168.0.10)
```

#### 3단계: 휴대폰에서 접속

1. 휴대폰을 PC와 **같은 Wi-Fi**에 연결
2. 휴대폰 브라우저(Chrome, Safari 등) 열기
3. 주소창에 Network 주소 입력
   - 예: `http://192.168.0.10:5173`
4. 접속 완료!

## 🖥️ PC에서만 테스트하는 방법

### 방법 1: 자동 브라우저 열기

```bash
cd D:\banksandwich\frontend
npm run dev
```

브라우저가 자동으로 열립니다.
(vite.config.js에 `open: true` 설정되어 있음)

### 방법 2: 수동으로 브라우저에서 열기

1. 개발 서버 실행:
   ```bash
   npm run dev
   ```

2. 브라우저에서 접속:
   - Chrome, Edge, Firefox 등에서
   - `http://localhost:5173` 입력

## 🔧 문제 해결

### 문제 1: "npm을 찾을 수 없습니다"

**해결책**: Node.js 설치 필요

1. https://nodejs.org 접속
2. LTS 버전 다운로드 및 설치
3. PC 재부팅
4. 다시 시도

### 문제 2: 휴대폰에서 접속 안 됨

**체크리스트**:
- [ ] PC와 휴대폰이 같은 Wi-Fi에 연결되어 있나요?
- [ ] PC 방화벽이 5173 포트를 차단하고 있나요?
  ```bash
  # Windows 방화벽에서 5173 포트 허용 필요
  ```
- [ ] Network 주소를 정확히 입력했나요?

**방화벽 설정 (Windows)**:
1. Windows 검색에서 "방화벽" 검색
2. "고급 설정" 클릭
3. "인바운드 규칙" → "새 규칙"
4. 포트 5173 허용 설정

### 문제 3: 페이지가 비어있거나 오류 발생

```bash
# 캐시 삭제 및 재설치
cd D:\banksandwich\frontend
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### 문제 4: 이미지가 표시되지 않음

이미지 파일 경로 확인:
```
D:\banksandwich\frontend\public\sandwich_image\
  - image1.png
  - image2.png
  - ...
  - image8.png
```

## 🚀 배포하기 (선택사항)

### Vercel로 무료 배포

1. https://vercel.com 회원가입
2. GitHub에 프로젝트 업로드
3. Vercel에서 "Import Project"
4. 자동 배포 완료!

### Netlify로 무료 배포

1. https://netlify.com 회원가입
2. "Add new site" → "Deploy manually"
3. `frontend/dist` 폴더를 드래그 앤 드롭
   ```bash
   cd D:\banksandwich\frontend
   npm run build
   # dist 폴더를 Netlify에 업로드
   ```

## 📊 개발 모드 vs 프로덕션 모드

### 개발 모드 (테스트용)
```bash
npm run dev
```
- 빠른 새로고침
- 디버깅 도구 사용 가능
- 소스맵 포함

### 프로덕션 빌드 (배포용)
```bash
npm run build
npm run preview
```
- 최적화된 코드
- 작은 파일 크기
- 빠른 로딩 속도

## 💡 유용한 팁

### 자동 새로고침
파일을 수정하면 자동으로 브라우저가 새로고침됩니다.
저장만 하면 즉시 반영!

### 모바일 디버깅
Chrome에서 `chrome://inspect`를 통해
휴대폰 브라우저를 디버깅할 수 있습니다.

### 여러 기기에서 동시 테스트
같은 Wi-Fi에 연결된 모든 기기에서
같은 Network 주소로 접속 가능합니다.

## 📞 추가 도움이 필요하신가요?

1. 터미널의 오류 메시지 캡처
2. 브라우저 콘솔 (F12) 확인
3. Node.js 버전 확인: `node --version`
4. npm 버전 확인: `npm --version`

권장 버전:
- Node.js: v18 이상
- npm: v9 이상

즐거운 테스트 되세요! 🎉
