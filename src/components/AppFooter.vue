<template>
  <el-footer class="app-footer" :height=footerHeight>
    <p>© {{ currentYear }} FitApp. All rights reserved.</p>
  </el-footer>
</template>
<script setup>
import { ref } from 'vue';

const footerHeight = ref('var(--footer-height)');
const currentYear = ref(new Date().getFullYear());
</script>

<style scoped>
.app-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--el-bg-color); /* 푸터 배경 (흰색) */
  border-top: 1px solid var(--el-border-color-light);
  color: var(--el-text-color-secondary); /* 보조 텍스트 색상 */
  font-size: 0.9rem;
  margin-top: auto; /* 내용이 적을 때 푸터를 아래로 밀어냄 */
}
</style>