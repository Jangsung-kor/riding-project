<template>
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-position="top"
      @submit.prevent="submitForm"
    >
      <el-row :gutter="20">
        <el-col :span="12">
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
        <el-col :span="12">
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
      </el-row>
    </el-form>
</template>
<script setup>
import { ref, reactive } from 'vue'

// 폼 참조
const formRef = ref(null);

// 폼 데이터 모델
const formData = reactive(
  {
    date: null,
    distance: null // km 단위
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
  }
)
const submitForm = async () => {
  if (!formRef.value) return
}
</script>