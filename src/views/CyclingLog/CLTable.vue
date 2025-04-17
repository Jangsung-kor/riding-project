<template>
  <div>
    <el-table
      style="width: 100%"
     :data="tableData"
    >
      <el-table-column prop="date" label="날짜">
        <template #default="scope">
          <span>
            {{ formattedDate(scope.row.date) }}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="distance" label="거리" />
      <el-table-column align="right" width="50">
        <template #default="scope">
          <el-icon style="cursor: pointer" @click="deleteData(scope.$index)">
            <CloseBold />
          </el-icon>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script setup>
import { reactive } from 'vue'
import moment from 'moment'


const tableData = reactive([])

const setData = (data) => {
  tableData.push(data);
}

const initData = () => {
  tableData.length = 0;
}

const deleteData = (index) => {
  tableData.splice(index, 1)
}
/**
 * 
 * @param date
 */
const formattedDate = (date) => {
  return moment(date).format('YYYY-MM-DD HH:mm')
}
defineExpose({ setData })
</script>