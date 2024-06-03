<template>
  <q-page>
    <div class="row items-center q-pt-xl q-pl-xl">
      <img src="~assets/userIcon.svg" alt="icon" class="q-mr-md" />
      <div class="text-h5 text-bold">부원 목록</div>
    </div>
    <div class="text-grey text-bold q-pa-md q-pl-xl">총??명</div>
    <q-separator></q-separator>

    <div>
      <q-card
        style="border-radius: 10px"
        flat
        v-for="row in rows"
        :key="row"
        class="row items-center justify-between q-my-md q-mx-xl q-pa-md"
      >
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
defineOptions({
  name: "IndexPage",
});

const columns = [
  {
    name: "name",
    required: true,
    label: "이름",
    align: "left",
    field: "name",
    sortable: true,
  },
  { name: "role", label: "역할", field: "role", sortable: true },
  { name: "school", label: "학교", field: "school", sortable: true },
  { name: "phoneNumber", label: "휴대전화", field: "phoneNumber" },
  { name: "email", label: "이메일", field: "email" },
  { name: "studentId", label: "학번", field: "studentId" },
];

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
