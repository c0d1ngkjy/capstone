<template>
  <q-page>
    <div class="row justify-between items-center q-px-xl q-pt-xl">
      <div class="text-black text-subtitle1 text-bold q-py-md">부원 {{ memberList.length }}명</div>

      <q-btn style="border-radius: 8px;" unelevated color="primary" icon="add" label="부원 추가"
        @click="addMemberDialog = true" />
    </div>

    <q-dialog v-model="addMemberDialog">
      <q-card class="q-pa-lg" style="min-width: 500px; border-radius: 12px;">
        <div class="text-bold text-center text-black text-h5 q-mb-sm">부원 정보 입력</div>

        <div class="q-mt-sm text-grey text-bold">이름</div>
        <q-input v-model="newMemberData.name" placeholder="Ex) 김주윤" borderless class="bg-blue-grey-1 q-px-lg"
          style="border-radius: 12px;" />
        <div v-if="errors.name" class="text-negative q-pt-xs">{{ errors.name }}</div>

        <div class="q-mt-sm text-grey text-bold">역할</div>
        <q-input disable placeholder="Ex) 부원" borderless class="bg-blue-grey-1 q-px-lg" style="border-radius: 12px;" />

        <div class="q-mt-sm text-grey text-bold">학교</div>
        <q-input v-model="newMemberData.school" placeholder="Ex) 명지전문대학교" borderless class="bg-blue-grey-1 q-px-lg"
          style="border-radius: 12px;" />
        <div v-if="errors.school" class="text-negative q-pt-xs">{{ errors.school }}</div>

        <div class="q-mt-sm text-grey text-bold">학과</div>
        <q-input v-model="newMemberData.major" placeholder="Ex) 인터넷보안공학과" borderless class="bg-blue-grey-1 q-px-lg"
          style="border-radius: 12px;" />
        <div v-if="errors.major" class="text-negative q-pt-xs">{{ errors.major }}</div>

        <div class="q-mt-sm text-grey text-bold">전화번호</div>
        <q-input v-model="newMemberData.phone" placeholder="Ex) 01075539005" borderless class="bg-blue-grey-1 q-px-lg"
          style="border-radius: 12px;" />
        <div v-if="errors.phone" class="text-negative q-pt-xs">{{ errors.phone }}</div>

        <div class="q-mt-sm text-grey text-bold">이메일</div>
        <q-input v-model="newMemberData.email" placeholder="Ex) 12gmail.com" borderless class="bg-blue-grey-1 q-px-lg"
          style="border-radius: 12px;" />
        <div v-if="errors.email" class="text-negative q-pt-xs">{{ errors.email }}</div>

        <div class="q-mt-sm text-grey text-bold">학번</div>
        <q-input v-model="newMemberData.studentId" placeholder="Ex) 2022671067" borderless
          class="bg-blue-grey-1 q-px-lg" style="border-radius: 12px;" />
        <div v-if="errors.studentId" class="text-negative q-pt-xs">{{ errors.studentId }}</div>

        <q-btn unelevated style="border-radius: 12px;" class="q-pa-md fit q-mt-md" color="primary" label="추가"
          @click="handleAddMember" />
      </q-card>
    </q-dialog>

    <div>
      <q-card style="border-radius: 10px" flat v-for="row in memberList" :key="row.id"
        class="row items-center justify-between q-my-md q-mx-xl q-pa-md">
        <div class="row items-center q-gutter-xs">
          <q-avatar size="md">
            <img src="~assets/userIcon.svg" alt="profile img" />
          </q-avatar>
          <div>{{ row.name }}</div>
        </div>

        <!-- <div>{{ row.role }}</div> -->
        <div>부원</div>

        <div>{{ row.school }}</div>
        <div>{{ row.phone }}</div>
        <div>{{ row.email }}</div>
        <div>{{ row.studentId }}</div>

        <q-btn unelevated>
          <q-icon name="more_vert"></q-icon>
          <q-menu transition-show="scale" transition-hide="scale" style="border-radius: 12px;">
            <q-list separator>
              <q-item class="row items-center" clickable v-close-popup>
                <q-icon name="edit" class="q-mr-sm"></q-icon>
                <q-item-section>수정</q-item-section>
              </q-item>
              <q-item class="row items-center" clickable v-close-popup>
                <q-icon name="delete" class="q-mr-sm" color="negative"></q-icon>
                <q-item-section>삭제</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
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
const addMemberDialog = ref(false)

const memberList = ref([])
const newMemberData = ref({
  name: '',
  school: '',
  phone: '',
  email: '',
  studentId: '',
  major: ''
})

const errors = ref({
  name: '',
  school: '',
  phone: '',
  email: '',
  studentId: '',
  major: '',
})

function validateInputs() {
  errors.value = {
    name: !newMemberData.value.name ? '이름을 입력해주세요.' : '',
    school: !newMemberData.value.school ? '학교를 입력해주세요.' : '',
    phone: !newMemberData.value.phone ? '전화번호를 입력해주세요.' : '',
    email: !newMemberData.value.email ? '이메일을 입력해주세요.' : '',
    studentId: !newMemberData.value.studentId ? '학번을 입력해주세요.' : '',
    major: !newMemberData.value.major ? '학과를 입력해주세요.' : ''
  }

  return Object.values(errors.value).every(error => error === '')
}

function handleAddMember() {
  if (validateInputs()) {
    const data = {...newMemberData.value, clubId: userStore.currentClub.club_id}
    console.log(data)
    api.post('user/addMember', data).then((res) => {
      console.log(res.data)
      addMemberDialog.value = false
    }).catch((e) => {
      console.log(e)
    })
  } else {
    console.log('Validation failed')
  }
}

function fetchData() {
  api.post('user/findUser', {
    clubId: userStore.currentClub.club_id
  }).then((res) => {
    memberList.value = res.data.callData
  })
}
onMounted(() => {
  fetchData()
  console.log(userStore.currentClub)
})
</script>
