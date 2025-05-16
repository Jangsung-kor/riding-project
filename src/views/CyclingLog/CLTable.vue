<template>
  <div>
    <el-table
      style="width: 100%"
     :data="tableData"
    >
      <el-table-column prop="cycleDate" label="날짜">
        <template #default="scope">
          {{ formattedDate(scope.row.cycleDate) }}
        </template>
      </el-table-column>
      <el-table-column prop="distance" label="거리" />
      <el-table-column prop="uphillGain" label="오르막" />
      <el-table-column align="right">
        <template #default="scope">
          <el-icon style="cursor: pointer" class="mr-r5">
            <Edit />
          </el-icon>
          <el-icon style="cursor: pointer" @click="deleteData(scope.row.id)">
            <CloseBold />
          </el-icon>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import moment from 'moment'
import { getCycleLogs, deleteCycleLog } from '@/api.js';

const tableData = ref([]);

onMounted(() => {
  loadData();
})

const loadData = async () => {
  initData();
  console.log('데이터 로드');
  const res = await getCycleLogs();
  tableData.value = res.data;
}

const initData = () => {
  tableData.value = [];
}

const deleteData = (id) => {
  try {
    console.log(id)
    ElMessageBox.confirm(
      '삭제하시겠습니까?',
      'info',
    ).then(() => {
      const res = deleteCycleLog(id);
      if (res.status === 201) {
        ElMessage({
          message: '싸이클 로그 삭제제 완료!',
          type: 'success',
        })
      } else {
        ElMessage({
          message: '싸이클 로그 삭제제 실패!',
          type: 'error',
        })
      }

    }).catch(() => {

    })
  } catch (error) {
    ElMessage({
      message: '싸이클 로그 삭제 실패!',
      type: 'error',
    })
  }
}
/**
 *
 * @param date
 */
const formattedDate = (date) => {
  return moment(date).format('YYYY-MM-DD HH:mm')
}
defineExpose({ loadData })
</script>