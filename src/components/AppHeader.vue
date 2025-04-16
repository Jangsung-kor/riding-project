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
<style scoped>
.app-header {
  background-color: var(--el-bg-color); /* 흰색 배경 */
  border-bottom: 1px solid var(--el-border-color-light);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);
  padding: 0 20px; /* 좌우 패딩 */
  display: flex; /* 내용을 정렬하기 위해 */
  align-items: center; /* 수직 가운데 정렬 */
}

.header-content {
  display: flex;
  justify-content: space-between; /* 로고와 메뉴 분리 */
  align-items: center;
  width: 100%;
  max-width: 1200px; /* 최대 너비 제한 */
  margin: 0 auto; /* 가운데 정렬 */
}

.logo {
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--el-text-color-primary);
  text-decoration: none;
}
/* Element Plus 메뉴 스타일 조정 */
.el-menu--horizontal {
  border-bottom: none; /* 헤더 자체 테두리가 있으므로 메뉴 테두리 제거 */
  margin-left: auto; /* 로고 옆 오른쪽으로 밀기 */
}

.el-menu--horizontal > .el-menu-item {
  color: var(--el-text-color-secondary);  /* 기본 메뉴 텍스트 색상 */
  font-weight: 500;
}

.el-menu--horizontal > .el-menu-item:not(.is-disabled):hover,
.el-menu--horizontal > .el-menu-item.is-active {
  color: var(--el-color-primary);
  background-color: transparent !important; /* 배경색 변경 방지(선택) */
}
</style>