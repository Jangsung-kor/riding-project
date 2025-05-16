<template>
  <el-form
    ref="formRef"
    :model="formData"
    :rules="formRules"
    label-position="top"
  >
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="날짜" prop="cycleDate">
          <el-date-picker
            style="width: 100%"
            v-model="formData.cycleDate"
            type="datetime"
            clearable
            format="YYYY-MM-DD HH:mm"
            time-format="HH:mm"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="거리" prop="distance">
          <el-input-number
            style="width: 100%"
            v-model="formData.distance"
            :precision="2"
            :step="0.1"
            :min="0"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="오르막" prop="uphillGain">
          <el-input-number
            style="width: 100%"
            v-model="formData.uphillGain"
            :precision="0"
            :step="0.1"
            :min="0"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item>
      <el-button type="primary" @click="saveLog">
        Save
      </el-button>
      <el-button @click="resetForm">
        Reset
      </el-button>
    </el-form-item>
  </el-form>
</template>
<script setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { isBoolean } from 'lodash'
import { addCycleLog } from '@/api.js';

const emit = defineEmits(['update-data'])

// 폼 참조
const formRef = ref(null);

// 폼 데이터 모델
const formData = reactive(
  {
    cycleDate: null,
    distance: null, // km 단위
    uphillGain: null // km 단위
  }
)

// 폼 유효성 검사 규칙
const formRules = reactive(
{
  cycleDate: [
    {
      required: true, message: '날짜 칸을 채워주세요.', trigger: 'change',
    }
  ],
  distance: [
    {
      required: true, message: '거리 칸을 채워주세요.', trigger: 'blur',
    },
    {
      validator: (rule, value, callback) => {
        if (value < 0) {
          callback(new Error('숫자가 아닙니다.'));
        } else {
          callback()
        }
      }, trigger: 'blur'
    }
  ],
  uphillGain: [
    {
      required: true, message: '오르막 칸을 채워주세요.', trigger: 'blur',
    },
    {
      validator: (rule, value, callback) => {
        if (value < 0) {
          callback(new Error('숫자가 아닙니다.'));
        } else {
          callback()
        }
      }, trigger: 'blur'
    }
  ],
}
)
/**
* 싸이클 로그 저장 함수
*/
const saveLog = () => {
  if (!formRef.value) return
  formRef.value.validate((valid, fields) => {
    if (valid) {
      addLog();
    } else {
      ElMessage({
        message: '로그 폼을 채워주세요.!',
        type: 'warning',
      })
    }
  })
}
const addLog = () => {
  // Create a copy of formData to avoid modifying the original
  const dataToSend = {
    ...formData,
    cycleDate: formData.cycleDate ? new Date(formData.cycleDate.getTime() + (9 * 60 * 60 * 1000)) : null
  };

  addCycleLog(dataToSend).then((res) => {
    if (isBoolean(res.data.success)) {
      ElMessage({
        message: '싸이클 로그 저장 완료!',
        type: 'success',
      })
      emit('re-load');
      resetForm();
    } else {
      ElMessage({
        message: '싸이클 로그 저장 실패!',
        type: 'error',
      })
    }
  });
}
/**
* 폼 리셋 함수
*/
const resetForm = () => {
  if (!formRef.value) return
  formRef.value.resetFields()
}
</script>