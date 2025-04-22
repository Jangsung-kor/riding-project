<template>
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-position="top"
    >
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="날짜" prop="date">
            <el-date-picker
              style="width: 100%"
              v-model="formData.date"
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
              :precision="1"
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
              :precision="1"
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
import { cloneDeep } from 'lodash'

const emit = defineEmits(['update-data'])

// 폼 참조
const formRef = ref(null);

// 폼 데이터 모델
const formData = reactive(
  {
    date: null,
    distance: null, // km 단위
    uphillGain: null // km 단위
  }
)

// 폼 유효성 검사 규칙
const formRules = reactive(
  {
    date: [
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
const saveLog = async () => {
  if (!formRef.value) return
  await formRef.value.validate((valid, fields) => {
    if (valid) {
      // 여기에 실제 데이터 저장 로직 추가
      // 예: API 호출
      ElMessage({
        message: '싸이클 로그 저장 완료!',
        type: 'success',
      })
      emit('save-log', cloneDeep(formData))
      resetForm();
    } else {
      ElMessage({
        message: '싸이클 로그 저장 실패!',
        type: 'error',
      })
    }
  })
}
/**
 * 폼 리셋 함수
 */
const resetForm = () => {
  if (!formRef.value) return
  formRef.value.resetFields()
}
</script>