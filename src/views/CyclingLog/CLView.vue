<template>
  <div class="cycling-log-view">
    <h1>
      <el-icon>
        <Bicycle />
      </el-icon>
      Log New Cycling Ride
    </h1>
    <el-card class="mr-b10" shadow="never">
      <CLForm @re-load="loadData" />
    </el-card>
    <el-card shadow="never">
      <CLTable ref="clTableRef" />
    </el-card>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import CLForm from '@/views/CyclingLog/CLForm.vue'
import CLTable from '@/views/CyclingLog/CLTable.vue'

const clTableRef = ref(null)

const loadData = () => {
  console.log('데이터 추가 성공');
  clTableRef.value.loadData();
}
</script>
<style>
.cycling-log-view {
  max-width: 800px; /* 폼 너비 제한 */
  margin: 0 auto; /* 가운데 정렬 */
}

h1 {
  text-align: center;
  margin-bottom: 2rem;
}
</style>