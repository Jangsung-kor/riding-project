<template>
  <div class="cycle-log-view">
    <h1>
      <el-icon :size="40">
        <Bicycle />
      </el-icon>
      Log New Cycling Ride
    </h1>
    <el-card class="mr-b10" shadow="never">
      <CLForm @re-load="loadData" />
    </el-card>
    <el-card shadow="never">
      <CLTable ref="CLTableRef" />
    </el-card>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import CLForm from '@/views/CycleLog/CLForm.vue'
import CLTable from '@/views/CycleLog/CLTable.vue'

const CLTableRef = ref(null);

const loadData = () => {
  CLTableRef.value.loadData();
}
</script>
<style>
.cycle-log-view {
  max-width: 100%; /* 폼 너비 제한 */
  margin: 0 auto; /* 가운데 정렬 */
}

h1 {
  text-align: center;
  margin-bottom: 2rem;
}
</style>