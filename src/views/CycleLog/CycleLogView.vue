<template>
  <div class="cycle-log-view">
    <h1>
      <el-icon :size="40">
        <Bicycle />
      </el-icon>
      Log New Cycling Ride
    </h1>
    <el-card class="mr-b10" shadow="never">
      <CycleLogForm @save-log="saveLog" />
    </el-card>
    <el-card shadow="never">
      <CycleLogTable ref="cycleLogTableRef" />
    </el-card>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import CycleLogForm from '@/views/CycleLog/CycleLogForm.vue'
import CycleLogTable from '@/views/CycleLog/CycleLogTable.vue'

const cycleLogTableRef = ref(null)

const saveLog = (form) => {
  cycleLogTableRef.value.setData(form)
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