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
          <el-form-item label="업힐" prop="uphillGain">
            <el-input-number
              style="width: 100%"
              v-model="formData.uphillGain"
              :precision="2"
              :step="0.1"
              :min="0"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary" @click="saveLog">
          Save Log
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
import moment from 'moment'
import { addCycleLog } from '@/api.js';

const emit = defineEmits(['update-data'])

// 폼 참조
const formRef = ref(null);

// 폼 데이터 모델
const formData = reactive(
  {
    cycleDate: null,
    distance: null, // km 단위
    uphillGain: null, // km 단위위
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
        required: true, message: '업힐힐 칸을 채워주세요.', trigger: 'blur',
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
  await formRef.value.validate(async (valid) => {
    if (valid) {
      try {
        // 로컬 시간으로 변환
        formData.cycleDate = moment(formData.cycleDate).format('YYYY-MM-DDTHH:mm');
        const res = await addCycleLog(formData);
        if (res.status === 201) {
          ElMessage({
            message: '싸이클 로그 저장 완료!',
            type: 'success',
          })
          resetForm();
          emit('re-load')
        } else {
          ElMessage({
            message: '싸이클 로그 저장 실패!',
            type: 'error',
          })
        }
      } catch (error) {
        ElMessage({
          message: '싸이클 로그 저장 실패!',
          type: 'error',
        })
      }
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