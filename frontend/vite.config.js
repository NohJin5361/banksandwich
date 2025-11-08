import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // 외부 접속 허용 (모바일에서 접속 가능)
    port: 5173,
    open: true, // 브라우저 자동 열기
  },
})
