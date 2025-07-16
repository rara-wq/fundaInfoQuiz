// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ここにあなたのフォークしたリポジトリ名を正確に入力してください
const repoName = 'fundaInfoQuiz'; // 例: 'my-forked-repo'

export default defineConfig({
  plugins: [react()],
  // ここに 'base' オプションを追加
  base: `/${repoName}/`, // リポジトリ名に合わせて変更

})