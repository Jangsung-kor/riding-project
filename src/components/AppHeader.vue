<template>
  <el-header class="app-header" :height="headerHeight">
    <div class="header-content">
      <RouterLink to="/" class="logo">
        <span>
          JS RideBook
        </span>
      </RouterLink>

      <!-- Element Plus Menu 사용 -->
      <el-menu
        class="el-menu-demo"
        :default-active="activeIndex"
        mode="horizontal"
        :ellipsis="false"
        router
      >
        <el-menu-item index="/">
          Home
        </el-menu-item>
        <el-menu-item index="/about">
          About
        </el-menu-item>
        <!-- 자전거 기록 메뉴 항목 추가 -->
        <el-menu-item index="/cycling-log">
        Cycling-log
        </el-menu-item>
      </el-menu>
    </div>
  </el-header>
</template>
<script setup>
import { ref, computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'

const headerHeight = ref('var(--header-height)') // css 변수 사용

// 현재 라우트 경로를 기반으로 활성 메뉴 설정
const route = useRoute()
const activeIndex = computed(() => route.path)
</script>
<style>
.app-header {
  background-color: var(--el-bg-color);
  border-bottom: 1px solid var(--el-border-color-light);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
  padding: 0 20px; /* 좌우 패딩 */
  display: flex; /* 내용을 정렬하기 위해 */
  align-items: center; /* 수직 가운데 정렬 */
}
.header-content {
  display: flex;
  justify-content: space-between; /* 로고와 메뉴 분리 */
  align-items: center;
  width: 100%;
  height: 100%;
}
.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--el-text-color-primary);
  /*color: #f4f4f5;*/
  text-decoration: none;
}
</style>