<template>
  <q-page class="column q-pa-xl">
    <!-- <div class="row items-center q-mb-sm">
      <img src="~assets/myClubsIcon.svg" alt="icon" class="q-mr-sm">
      <div class="text-h5 text-bold">내 동아리</div>
    </div>
    <q-card flat class="bg-white row items-center q-pa-lg" style="border-radius: 10px;">
      <img src="loginBG.png" alt="club image" style="width: 100px; border-radius: 50%; border: 1px solid lightgrey;">
      <div class="q-ml-lg col">
        <div class="text-h6 text-bold">
            보안 동아리
        </div>
        <div>동아리 간단 소개 글 동아리 간단 소개 글 동아리 간단 소개 글 동아리 간단 소개 글 </div>
      </div>
    </q-card> -->

    <!-- <div class="row items-center q-mb-sm" style="margin-top: 80px;"> -->
    <div class="row items-center q-mb-sm">
      <img src="~assets/adminClubsIcon.svg" alt="icon" class="q-mr-sm">
      <div class="text-h5 text-bold">
        내가 관리중인 동아리
      </div>
    </div>

    <q-card v-for="club in clubList" :key="club" flat class="bg-white row items-center q-pa-lg q-mb-lg" style="border-radius: 10px;">
      <img v-if="club.image" :src=club.image alt="club image" style="width: 100px; height: 100px; border-radius: 50%; border: 1px solid lightgrey;">
      <img v-else src="~assets/adminClubsIcon.svg" alt="club image" style="width: 100px; border-radius: 50%; border: 1px solid lightgrey;">

      <div class="q-ml-lg col">
        <div class="text-h6 text-bold">
          {{club.name}}
        </div>
        <div>{{club.description}}</div>
      </div>

      <q-btn @click="navigateToConsole(club)" class="q-ml-md" unelevated size="md" color="primary"
        style="border-radius: 10px;">바로가기</q-btn>
    </q-card>

    <q-btn @click="$router.push('/newclub')" flat class="addClubBtn bg-grey-1 flex flex-center"
      style="min-height: 144px; border-radius: 10px;">
      <q-icon name="add" size="xl" color="grey"></q-icon>
    </q-btn>


  </q-page>
</template>

<script setup>
import { api } from 'src/boot/axios';
import { useJwtStore } from 'src/stores/jwt-store';
import { useUserStore } from 'src/stores/user-store';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

defineOptions({
  name: 'IndexPage'
});
const token = useJwtStore().token
const userStore = useUserStore()
const clubList = ref([])
const $router = useRouter()

function navigateToConsole(club) {
  userStore.setCurrentClub(club)
  console.log(userStore.currentClub)
  $router.push('/console/list')
}

function fetchClubList() {
  api.post('club/findAdmin', {}, { headers: { Authorization: token } })
  .then((res) => {
    clubList.value = res.data.clubList
    console.log(clubList.value)
  })
}

onMounted(()=> {
  fetchClubList()
})
</script>
