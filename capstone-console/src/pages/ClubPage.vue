<template>
  <q-page class="column q-pa-xl">
    <q-card style="border-radius: 10px;" flat class="q-pa-md">
      <div class="row items-center q-mb-sm">
        <div class="text-h6">동아리 이름</div>
        <div class="q-ml-sm text-caption text-grey">이름을 입력해주세요</div>
      </div>
      <q-input v-model="clubData.name" borderless class="bg-blue-grey-1 q-px-lg" placeholder="내용을 입력하세요" style="border-radius: 10px;"/>
    </q-card>


    <q-card style="border-radius: 10px;" flat class="q-pa-md q-mt-lg">
      <div class="row items-center q-mb-sm">
        <div class="text-h6">소속 학교</div>
        <div class="q-ml-sm text-caption text-grey">소속 학교를 입력해주세요</div>
      </div>
      <q-input v-model="clubData.school" borderless class="bg-blue-grey-1 q-px-lg" placeholder="Ex) 명지전문대학교"
        style="border-radius: 10px;" />
      <div v-if="schoolError" class="text-negative q-ml-sm">{{ schoolError }}</div>
    </q-card>

    <q-card style="border-radius: 10px;" flat class="q-pa-md q-mt-lg">
      <div class="row items-center q-mb-sm">
        <div class="text-h6">동아리실</div>
        <div class="q-ml-sm text-caption text-grey">동아리실 위치를 입력해주세요</div>
      </div>
      <q-input v-model="clubData.location" borderless class="bg-blue-grey-1 q-px-lg" placeholder="Ex) 공318호"
        style="border-radius: 10px;" />
      <div v-if="locationError" class="text-negative q-ml-sm">{{ locationError }}</div>
    </q-card>

    <q-card style="border-radius: 10px;" flat class="q-pa-md q-mt-lg">
      <div class="row items-center q-mb-sm">
        <div class="text-h6">프로필</div>
        <div class="q-ml-sm text-caption text-grey">동아리의 로고 또는 프로필 이미지를 업로드해 주세요</div>
      </div>
      <div class="row items-end q-pa-md">
        <img :src="clubData.image" alt="club image" style="width: 200px; height: 200px; border-radius: 50%; border: 1px solid lightgrey;">
        <q-btn disable color="grey" rounded unelevated>변경하기</q-btn>
      </div>
    </q-card>

    <q-card style="border-radius: 10px;" flat class="q-pa-md q-mt-lg">
      <div class="row items-center q-mb-sm">
        <div class="text-h6">한줄 설명</div>
        <div class="q-ml-sm text-caption text-grey">무엇을 하는 동아리인가요?</div>
      </div>
      <q-input v-model="clubData.description" borderless class="bg-blue-grey-1 q-px-lg" placeholder="내용을 입력하세요" style="border-radius: 10px;"/>
    </q-card>

    <div class="row justify-end">
      <q-btn @click="handleUpdateClub()" color="primary" style="border-radius: 10px;" class="q-mt-md" size="lg" unelevated>수정하기</q-btn>
    </div>
  </q-page>
</template>

<script setup>
import { useUserStore } from 'src/stores/user-store';
import { onMounted, ref } from 'vue';

defineOptions({
  name: 'ClubPage'
});
const userStore = useUserStore()

const clubData = ref({})

function handleUpdateClub() {
  console.log(clubData.value)
}

onMounted(()=>{
  clubData.value = userStore.currentClub
})
</script>
