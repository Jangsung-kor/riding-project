<template>
  <div class="cycling-log-view">
    <h1>Log New Cycling Ride</h1>
    <el-card  class="mr-b10" shadow="never">
      <CyclingLogForm/>
    </el-card>
    <el-card shadow="never">
      <CyclingLogTable />
    </el-card>
  </div>
</template>
<script setup>
import CyclingLogForm from '@/views/CyclingLog/Form.vue'
import CyclingLogTable from '@/views/CyclingLog/Table.vue'
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