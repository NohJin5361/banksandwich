# BankSandwich 배포 가이드

## 🚀 Netlify로 배포하기 (추천)

### 방법 1: GitHub 연동 (자동 배포)

#### 1단계: GitHub 저장소 생성

1. GitHub에 로그인 후 새 저장소 생성
   - 저장소 이름: `banksandwich`
   - Public 또는 Private 선택
   - README, .gitignore는 추가하지 않음 (이미 있음)

#### 2단계: 로컬에서 GitHub에 푸시

```bash
cd D:\banksandwich

# Git 초기화 (이미 완료됨)
git init

# 모든 파일 추가
git add .

# 첫 커밋
git commit -m "Initial commit: BankSandwich 소비 습관 진단 앱"

# GitHub 저장소 연결 (본인의 저장소 URL로 변경)
git remote add origin https://github.com/YOUR_USERNAME/banksandwich.git

# 푸시
git branch -M main
git push -u origin main
```

#### 3단계: Netlify 배포

1. **Netlify 접속**
   - https://www.netlify.com 접속
   - GitHub 계정으로 로그인

2. **새 사이트 추가**
   - "Add new site" → "Import an existing project" 클릭
   - "Deploy with GitHub" 선택
   - 저장소 선택: `banksandwich`

3. **빌드 설정** (자동 감지됨)
   ```
   Base directory: frontend
   Build command: npm run build
   Publish directory: frontend/dist
   ```

4. **배포**
   - "Deploy site" 클릭
   - 약 1-2분 후 배포 완료!
   - 랜덤 URL 생성됨 (예: https://amazing-banksandwich-abc123.netlify.app)

5. **커스텀 도메인 설정 (선택사항)**
   - Site settings → Domain management
   - Custom domain 추가 가능

### 방법 2: 수동 배포 (빠른 테스트용)

```bash
# 프론트엔드 빌드
cd D:\banksandwich\frontend
npm run build

# dist 폴더가 생성됨
```

1. Netlify 사이트 접속
2. "Sites" → "Add new site" → "Deploy manually"
3. `frontend/dist` 폴더를 드래그 앤 드롭
4. 배포 완료!

---

## 📝 배포 후 확인사항

### ✅ 체크리스트

- [ ] 모든 페이지가 정상 작동 (/, /survey, /result)
- [ ] 샌드위치 이미지 8개가 모두 표시됨
- [ ] 나이·직업 선택 폼 작동
- [ ] 설문 21개 질문 진행 가능
- [ ] 결과 페이지 정상 표시
- [ ] 모바일에서 테스트 완료
- [ ] 브라우저 새로고침 시 페이지 유지 (React Router)

### 🔍 문제 해결

#### 1. 이미지가 안 보이는 경우

**원인**: 이미지 경로 문제

**해결**:
```bash
# public 폴더에 이미지가 있는지 확인
ls frontend/public/sandwich_image/
# image1.png ~ image8.png 있어야 함
```

#### 2. 페이지 새로고침 시 404 오류

**원인**: React Router 설정 문제

**해결**: `netlify.toml` 파일이 있는지 확인
```bash
cat frontend/netlify.toml
# redirects 설정이 있어야 함
```

#### 3. 빌드 실패

**원인**: Node 버전 또는 의존성 문제

**해결**:
```bash
# Node 버전 확인 (18 이상 권장)
node --version

# 의존성 재설치
cd frontend
rm -rf node_modules package-lock.json
npm install
npm run build
```

---

## 🌐 다른 플랫폼 배포

### Vercel

1. https://vercel.com 접속
2. GitHub 저장소 연동
3. 빌드 설정:
   ```
   Framework Preset: Vite
   Root Directory: frontend
   Build Command: npm run build
   Output Directory: dist
   ```

### GitHub Pages

```bash
# 1. package.json에 homepage 추가
"homepage": "https://YOUR_USERNAME.github.io/banksandwich"

# 2. vite.config.js에 base 추가
export default defineConfig({
  base: '/banksandwich/',
  // ...
})

# 3. gh-pages 설치 및 배포
npm install --save-dev gh-pages
npm run build
npx gh-pages -d dist
```

---

## 📊 환경별 설정

### 개발 환경
```bash
cd frontend
npm run dev
# http://localhost:5173
```

### 프로덕션 빌드 미리보기
```bash
cd frontend
npm run build
npm run preview
# http://localhost:4173
```

---

## 🔒 보안 및 최적화

### 배포 전 체크리스트

- [x] .gitignore 설정 (node_modules, .env 등)
- [x] 빌드 최적화 (Vite 자동)
- [x] 이미지 최적화 (public 폴더)
- [x] 보안 헤더 설정 (netlify.toml)
- [ ] 환경 변수 설정 (필요시)

### 성능 최적화

현재 빌드 크기:
- CSS: 34.68 KB (gzip: 6.29 KB)
- JS: 272.85 KB (gzip: 85.15 KB)
- 총 로딩 시간: ~1초 (빠른 인터넷 기준)

---

## 📱 모바일 접근성

배포 후 모바일에서 테스트:
1. 배포된 URL을 QR 코드로 생성
2. 휴대폰으로 QR 코드 스캔
3. 모든 기능 테스트

---

## 🎯 다음 단계

배포 완료 후:

1. **커스텀 도메인 설정**
   - Netlify: Site settings → Domain management
   - 예: banksandwich.com

2. **분석 도구 추가**
   - Google Analytics
   - Netlify Analytics

3. **SEO 최적화**
   - meta tags 추가
   - Open Graph 설정

4. **백엔드 연동** (향후)
   - FastAPI 서버 배포 (Render, Railway 등)
   - 데이터베이스 연결 (PlanetScale, Supabase 등)

---

## 💡 유용한 명령어

```bash
# Git 상태 확인
git status

# 변경사항 커밋
git add .
git commit -m "Update: 기능 개선"
git push

# Netlify는 자동으로 재배포됨!

# 로컬 빌드 테스트
npm run build

# 빌드 결과 미리보기
npm run preview
```

---

## 🆘 문제 발생 시

1. **Netlify 배포 로그 확인**
   - Site overview → Deploys → 실패한 배포 클릭
   - Deploy log 확인

2. **로컬에서 빌드 테스트**
   ```bash
   cd frontend
   npm run build
   ```

3. **의존성 버전 확인**
   ```bash
   npm list react react-dom react-router-dom
   ```

배포 완료! 🎉
