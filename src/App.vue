<template>
  <el-container direction="vertical">
    <header>
      <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
      <div class="wrapper">
        <HelloWorld msg="You did it!" />
        <nav>
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/about">About</RouterLink>
        </nav>
      </div>
    </header>
    <el-main>
      <RouterView />
    </el-main>
    <AppFooter />
  </el-container>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ElContainer, ElMain } from 'element-plus' // Element Plus 컴포넌트 가져오기

import HelloWorld from './components/HelloWorld.vue'
import AppFooter from './components/AppFooter.vue'
</script>

<style>
/* App.vue 에만 필요한 최소한의 스타일 또는 전역 스타일 import 확인 */
/* 모든 스타일은 main.css와 컴포넌트 scoped style에서 처리 */
.el-main {
  /* main.css에서 처리했지만 여기서 오버라이드 */
  padding: 25px;
}


header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
