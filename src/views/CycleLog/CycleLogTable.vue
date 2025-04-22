<template>
  <div>
    <el-table
      style="width: 100%"
     :data="tableData"
    >
      <el-table-column prop="date" label="날짜" sortable>
        <template #default="scope">
          <span>
            {{ formattedDate(scope.row.date) }}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="distance" label="거리" sortable />
      <el-table-column prop="uphillGain" label="오르막" sortable>
        <template #default="scope">
          <el-input-number
            style="width: 100%"
            v-if="isEdit(scope.$index)"
            v-model="editingForm.uphillGain"
            :min="0"
            :step="0.1"
            :precision="1"
          />
          <span v-else>
            {{ scope.row.uphillGain }}
          </span>
        </template>
      </el-table-column>
      <el-table-column align="right" width="120">
        <template #default="scope">
          <el-icon style="cursor: pointer" class="mr-r10" v-if="!isEdit(scope.$index)" @click="editData(scope.$index)" :size="20">
            <Edit />
          </el-icon>
          <el-icon style="cursor: pointer" class="mr-r10" v-if="isEdit(scope.$index)" @click="onSave" :size="20">
            <CircleCheckFilled />
          </el-icon>
          <el-icon style="cursor: pointer" class="mr-r10" v-if="isEdit(scope.$index)" :disabled="true" @click="onCancel" :size="20">
            <CircleCloseFilled :disabled="true" />
          </el-icon>
          <el-icon style="cursor: pointer" @click="deleteData(scope.$index)" :size="20">
            <CloseBold />
          </el-icon>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script setup>
import { ref, reactive } from 'vue'
import { cloneDeep } from 'lodash'
import moment from 'moment'
import { ElMessageBox, ElMessage } from 'element-plus'

let tableData = reactive([])
let editingIndex = ref(null)
let editingForm = reactive({
    date: null,
    distance: null, // km 단위
    uphillGain: null // km 단위
})

const setData = (data) => {
  tableData.push(data);
}

const initData = () => {
  tableData = [];
}
/**
 * 데이터 삭제
 * @param index 테이블 인덱스
 */
const deleteData = (index) => {
  ElMessageBox.confirm(
    '로그를 삭제하시겠습니까?',
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'info',
    }
  ).then(() => {
    tableData.splice(index, 1);
    ElMessage({
      message: '로그 삭제 완료!',
      type: 'success',
    })
  }).catch(() => {
  })
}
/**
 * 데이터 수정
 */
const editData = (index) => {
  const row = cloneDeep(tableData[index]);
  Object.assign(editingForm, row);
  if (editingIndex.value !== null && editingIndex.value !== index) {
    return;
  }
  editingIndex.value = index;
}
/**
 * 데이터 저장
 */
const onSave = () => {
  tableData[editingIndex.value] = { ...editingForm }
  editingIndex.value = null;
}
/**
 * 편집 취소
 */
const onCancel = () => {
  editingIndex.value = null
}
const isEdit = (index) => {
  if (editingIndex.value === index) {
    return true
  } else {
    return false
  }
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