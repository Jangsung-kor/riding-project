<template>
  <el-container direction="vertical">
    <AppHeader />
    <el-main>
      <RouterView />
    </el-main>
    <AppFooter />
  </el-container>
</template>

<script setup>
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
</script>

<style>
/* App.vue 에만 필요한 최소한의 스타일 */
/* 모든 스타일은 main.css와 컴포넌트 scoped style에서 처리 */

.el-main {
  /* main.css에서 처리했지만 여기서 오버라이드 */
  background-color: var(--el-bg-color-page);
  color: var(--el-text-color-primary);
}
</style>
