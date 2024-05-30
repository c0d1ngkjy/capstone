<template>
  <q-page class="q-pa-xl">
    <q-card flat style="border-radius: 10px;">
      <q-table color="primary" title="부원 목록" :rows="rows" :columns="columns" row-key="name" />
    </q-card>
  </q-page>
</template>

<script setup>
defineOptions({
  name: 'IndexPage'
});

const columns = [
  {
    name: 'name',
    required: true,
    label: '이름',
    align: 'left',
    field: 'name',
    sortable: true
  },
  { name: 'role', label: '역할', field: 'role', sortable: true },
  { name: 'school', label: '학교', field: 'school', sortable: true },
  { name: 'phoneNumber', label: '휴대전화', field: 'phoneNumber' },
  { name: 'email', label: '이메일', field: 'email' },
  { name: 'studentId', label: '학번', field: 'studentId' },
]

const rows = [
  {
    name: '최하호',
    role: '회장',
    school: '명지전문대학교',
    phoneNumber: '010-6643-5678',
    email: 'ha20@naver.com',
    studentId: '2022671067',
  },
  {
    name: '최하호',
    role: '회장',
    school: '명지전문대학교',
    phoneNumber: '010-6643-5678',
    email: 'ha20@naver.com',
    studentId: '2022671067',
  },
  {
    name: '최하호',
    role: '회장',
    school: '명지전문대학교',
    phoneNumber: '010-6643-5678',
    email: 'ha20@naver.com',
    studentId: '2022671067',
  },
  {
    name: '최하호',
    role: '회장',
    school: '명지전문대학교',
    phoneNumber: '010-6643-5678',
    email: 'ha20@naver.com',
    studentId: '2022671067',
  },
  {
    name: '최하호',
    role: '회장',
    school: '명지전문대학교',
    phoneNumber: '010-6643-5678',
    email: 'ha20@naver.com',
    studentId: '2022671067',
  },
  {
    name: '최하호',
    role: '회장',
    school: '명지전문대학교',
    phoneNumber: '010-6643-5678',
    email: 'ha20@naver.com',
    studentId: '2022671067',
  },
  {
    name: '최하호',
    role: '회장',
    school: '명지전문대학교',
    phoneNumber: '010-6643-5678',
    email: 'ha20@naver.com',
    studentId: '2022671067',
  },
  {
    name: '최하호',
    role: '회장',
    school: '명지전문대학교',
    phoneNumber: '010-6643-5678',
    email: 'ha20@naver.com',
    studentId: '2022671067',
  },
  {
    name: '최하호',
    role: '회장',
    school: '명지전문대학교',
    phoneNumber: '010-6643-5678',
    email: 'ha20@naver.com',
    studentId: '2022671067',
  },
]
</script>
