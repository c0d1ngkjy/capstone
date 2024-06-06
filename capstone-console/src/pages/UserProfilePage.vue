<!-- 이메일, 폰, 학교, 학과, 학번, 이미지?(nullable) -->
<template>
  <q-page class="q-pa-xl">
    <div class="text-h5 text-bold q-mb-md">사용자 프로필</div>
    <q-card flat class="q-pa-md" style="border-radius: 12px; max-width: 900px;">
      <div>
        <div class="q-ml-sm q-mb-sm">이름</div>
        <q-input v-model="user.name" disable borderless class="bg-blue-grey-1 q-px-lg q-mb-lg" style="border-radius: 10px;" />
      </div>

      <div>
        <div class="q-ml-sm q-mb-sm">이메일</div>
        <q-input v-model="user.email" disable borderless class="bg-blue-grey-1 q-px-lg q-mb-lg" style="border-radius: 10px;" />
      </div>

      <div>
        <div class="q-ml-sm q-mb-sm">전화 번호</div>
        <q-input v-model="user.phone" disable borderless class="bg-blue-grey-1 q-px-lg q-mb-lg" style="border-radius: 10px;" />
      </div>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue';

defineOptions({
  name: 'UserProfilePage'
})

const user = ref({
  name: '김주윤',
  phone: '010-0000-0000',
  school: '명지전문대',
  major: '인보과',
  image: null,
  studentId: '123213',
  email: 'mail'
})
</script>
