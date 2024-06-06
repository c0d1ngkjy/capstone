<template>
  <q-page>
    <div class="row justify-between items-center q-px-xl q-pt-xl">
      <div>
        <div class="row items-center">
          <img src="~assets/userIcon.svg" alt="icon" class="q-mr-md" />
          <div class="text-h5 text-bold">부원 목록</div>
        </div>
        <div class="text-grey text-bold q-py-md">총??명</div>

      </div>

      <q-btn style="border-radius: 8px;" unelevated color="primary" icon="add" label="부원 추가" @click="addMemberDialog = true" />
    </div>
    <q-separator></q-separator>

    <q-dialog v-model="addMemberDialog">
      <q-card class="q-pa-md">

        <div>이름</div>
        <q-input  placeholder="Ex) 김주윤" />

        <div>역할</div>
        <div>학교</div>
        <div>전화번호</div>
        <div>이메일</div>
        <div>학번</div>

      </q-card>
    </q-dialog>

    <div>
      <q-card style="border-radius: 10px" flat v-for="row in rows" :key="row"
        class="row items-center justify-between q-my-md q-mx-xl q-pa-md">
        <div class="row items-center q-gutter-xs">
          <q-avatar size="md">
            <img src="~assets/userIcon.svg" alt="profile img" />
          </q-avatar>
          <div>{{ row.name }}</div>
        </div>

        <div>{{ row.role }}</div>
        <div>{{ row.school }}</div>
        <div>{{ row.phoneNumber }}</div>
        <div>{{ row.email }}</div>
        <div>{{ row.studentId }}</div>

        <q-btn unelevated>
          <q-icon name="more_vert"></q-icon>
        </q-btn>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { api } from 'src/boot/axios';
import { onMounted, ref } from 'vue';
import { useUserStore } from 'stores/user-store'

defineOptions({
  name: "IndexPage",
});

const userStore = useUserStore()
const addMemberDialog = ref()

function handleAddMember() {

}

function fetchData() {
  api.post('user/findUser', {
    clubId: userStore.currentClub.club_id
  }).then((res) => {
    console.log(res.data)
  })
}
onMounted(() => {
  fetchData()
  console.log(userStore.currentClub)
})
const rows = [
  {
    name: "최하호",
    role: "회장",
    school: "명지전문대학교",
    phoneNumber: "010-6643-5678",
    email: "ha20@naver.com",
    studentId: "2022671067",
  },
  {
    name: "최하호",
    role: "회장",
    school: "명지전문대학교",
    phoneNumber: "010-6643-5678",
    email: "ha20@naver.com",
    studentId: "2022671067",
  },
  {
    name: "최하호",
    role: "회장",
    school: "명지전문대학교",
    phoneNumber: "010-6643-5678",
    email: "ha20@naver.com",
    studentId: "2022671067",
  },
  {
    name: "최하호",
    role: "회장",
    school: "명지전문대학교",
    phoneNumber: "010-6643-5678",
    email: "ha20@naver.com",
    studentId: "2022671067",
  },
  {
    name: "최하호",
    role: "회장",
    school: "명지전문대학교",
    phoneNumber: "010-6643-5678",
    email: "ha20@naver.com",
    studentId: "2022671067",
  },
  {
    name: "최하호",
    role: "회장",
    school: "명지전문대학교",
    phoneNumber: "010-6643-5678",
    email: "ha20@naver.com",
    studentId: "2022671067",
  },
  {
    name: "최하호",
    role: "회장",
    school: "명지전문대학교",
    phoneNumber: "010-6643-5678",
    email: "ha20@naver.com",
    studentId: "2022671067",
  },
  {
    name: "최하호",
    role: "회장",
    school: "명지전문대학교",
    phoneNumber: "010-6643-5678",
    email: "ha20@naver.com",
    studentId: "2022671067",
  },
  {
    name: "최하호",
    role: "회장",
    school: "명지전문대학교",
    phoneNumber: "010-6643-5678",
    email: "ha20@naver.com",
    studentId: "2022671067",
  },
];
</script>
