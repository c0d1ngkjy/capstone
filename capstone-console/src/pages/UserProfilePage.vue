<!-- 이메일, 폰, 학교, 학과, 학번, 이미지?(nullable) -->
<template>
  <q-page class="q-pa-xl">
    <div class="text-h5 text-bold q-mb-md">사용자 프로필</div>
    <q-card flat class="q-pa-md" style="border-radius: 12px; max-width: 900px;">
      <div  style="max-width: 500px;" class="q-mb-lg">
        <div class="q-ml-sm q-mb-sm">프로필</div>
        <img :src="user.image" width="150px" style="border-radius: 50%; border: 1px solid lightgrey;" />
      </div>

      <div  style="max-width: 500px;">
        <div class="q-ml-sm q-mb-sm">이름</div>
        <q-input v-model="user.name" disable borderless class="bg-blue-grey-1 q-px-lg q-mb-lg" style="border-radius: 10px;" />
      </div>

      <div style="max-width: 500px;">
        <div class="q-ml-sm q-mb-sm">이메일</div>
        <q-input v-model="user.email" disable borderless class="bg-blue-grey-1 q-px-lg q-mb-lg" style="border-radius: 10px;" />
      </div>

      <div style="max-width: 500px;">
        <div class="q-ml-sm q-mb-sm">전화 번호</div>
        <q-input v-model="user.phone" disable borderless class="bg-blue-grey-1 q-px-lg q-mb-lg" style="border-radius: 10px;" />
      </div>

      <div style="max-width: 500px;">
        <div class="q-ml-sm q-mb-sm">학교</div>
        <q-input v-model="user.school" disable borderless class="bg-blue-grey-1 q-px-lg q-mb-lg" style="border-radius: 10px;" />
      </div>

      <div style="max-width: 500px;">
        <div class="q-ml-sm q-mb-sm">학과</div>
        <q-input v-model="user.major" disable borderless class="bg-blue-grey-1 q-px-lg q-mb-lg" style="border-radius: 10px;" />
      </div>

      <div style="max-width: 500px;">
        <div class="q-ml-sm q-mb-sm">학번</div>
        <q-input v-model="user.studentId" disable borderless class="bg-blue-grey-1 q-px-lg q-mb-lg" style="border-radius: 10px;" />
      </div>


    </q-card>
  </q-page>
</template>

<script setup>
import { useUserStore } from 'src/stores/user-store';
import { onMounted, ref } from 'vue';

defineOptions({
  name: 'UserProfilePage'
})
const userStore = useUserStore()

const user = ref({})
onMounted(()=>{
  user.value = userStore.userData
})
</script>
