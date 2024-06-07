<template>
  <q-page>
    <q-spinner v-if="loadingState" color="primary" size="3rem" />
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
      <q-card style="border-radius: 10px" flat v-for="(row, index) in memberList" :key="row.id"
        class="row items-center justify-between q-my-md q-mx-xl q-pa-md">
        <div class="row items-center q-gutter-xs col">
          <q-avatar size="md">
            <img src="~assets/userIcon.svg" alt="profile img" />
          </q-avatar>
          <div>{{ row.name }}</div>
        </div>

        <!-- <div>{{ row.role }}</div> -->
        <div class="col row justify-start">
          <q-chip v-if="index == 0" style="border-radius: 12px;" color="red text-white">회장</q-chip>
          <q-chip v-else style=" border-radius: 12px;" color="primary text-white">부원</q-chip>
        </div>


        <div class="col">{{ row.school }}</div>
        <div class="col">{{ row.phone }}</div>
        <div class="col">{{ row.email }}</div>
        <div class="col">{{ row.studentId }}</div>

        <q-btn unelevated :disable="index == 0">
          <q-icon name="more_vert"></q-icon>
          <q-menu transition-show="scale" transition-hide="scale" style="border-radius: 12px;">
            <q-list separator>
              <q-item @click="handleUpdateMember(row)" class="row items-center" clickable v-close-popup>
                <q-icon name="edit" class="q-mr-sm"></q-icon>
                <q-item-section>수정</q-item-section>
              </q-item>
              <q-item @click="handleDeleteMember(row)" class="row items-center" clickable v-close-popup>
                <q-icon name="delete" class="q-mr-sm" color="negative"></q-icon>
                <q-item-section>삭제</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>

      </q-card>
    </div>

    <q-dialog v-model="updateMemberDialog">
      <q-card class="q-pa-lg" style="min-width: 500px; border-radius: 12px;">
        <div class="text-bold text-center text-black text-h5 q-mb-sm">부원 정보 수정</div>

        <div class="q-mt-sm text-grey text-bold">이름</div>
        <q-input v-model="updateMemberData.name" placeholder="Ex) 김주윤" borderless class="bg-blue-grey-1 q-px-lg"
          style="border-radius: 12px;" />

        <div class="q-mt-sm text-grey text-bold">역할</div>
        <q-input disable placeholder="Ex) 부원" borderless class="bg-blue-grey-1 q-px-lg" style="border-radius: 12px;" />

        <div class="q-mt-sm text-grey text-bold">학교</div>
        <q-input v-model="updateMemberData.school" placeholder="Ex) 명지전문대학교" borderless class="bg-blue-grey-1 q-px-lg"
          style="border-radius: 12px;" />

        <div class="q-mt-sm text-grey text-bold">학과</div>
        <q-input v-model="updateMemberData.major" placeholder="Ex) 인터넷보안공학과" borderless class="bg-blue-grey-1 q-px-lg"
          style="border-radius: 12px;" />

        <div class="q-mt-sm text-grey text-bold">전화번호</div>
        <q-input v-model="updateMemberData.phone" placeholder="Ex) 01075539005" borderless
          class="bg-blue-grey-1 q-px-lg" style="border-radius: 12px;" />

        <div class="q-mt-sm text-grey text-bold">이메일</div>
        <q-input v-model="updateMemberData.email" placeholder="Ex) 12gmail.com" borderless
          class="bg-blue-grey-1 q-px-lg" style="border-radius: 12px;" />

        <div class="q-mt-sm text-grey text-bold">학번</div>
        <q-input v-model="updateMemberData.studentId" placeholder="Ex) 2022671067" borderless
          class="bg-blue-grey-1 q-px-lg" style="border-radius: 12px;" />

        <q-btn unelevated style="border-radius: 12px;" class="q-pa-md fit q-mt-md" color="primary" label="수정"
          @click="updateMember" />
      </q-card>
    </q-dialog>
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
const loadingState = ref(false)
const addMemberDialog = ref(false)
const updateMemberDialog = ref(false)

const memberList = ref([])
const updateMemberData = ref({})
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
    studentId: !newMemberData.value.studentId || newMemberData.value.studentId.length > 10 ? '학번을 입력해주세요.(10자 이내)' : '',
    major: !newMemberData.value.major ? '학과를 입력해주세요.' : ''
  }

  return Object.values(errors.value).every(error => error === '')
}

async function handleAddMember() {
  if (validateInputs()) {
    const data = { ...newMemberData.value, clubId: userStore.currentClub.club_id }
    try {
      await api.post('member/addMember', data)
      addMemberDialog.value = false
      await fetchData()
      newMemberData.value = {}
    } catch (error) {
      console.error(error)
    }
  } else {
    console.log('Validation failed')
  }
}

function handleUpdateMember(row) {
  console.log(row)
  updateMemberData.value = { ...row }
  updateMemberDialog.value = true
}

async function updateMember() {
  try {
    const { member_id, ...updateDataWithoutId } = updateMemberData.value;

    await api.post('member/updateMember', {
      clubId: userStore.currentClub.club_id,
      memberId: member_id,
      updateData: updateDataWithoutId
    })
    updateMemberDialog.value = false
    await fetchData()
  } catch (error) {
    console.error('Error updating member:', error)
  }
}

async function handleDeleteMember(row) {
  console.log(row)
  try {
    await api.post('member/deleteMember', {
      clubId: userStore.currentClub.club_id,
      memberId: row.member_id
    }).then((res) => {
      console.log(res)
    })
    await fetchData()
  } catch (e) {
    console.log(e)
  }
}

async function fetchMemberList() {
  const response = await api.post('member/findMember', { clubId: userStore.currentClub.club_id })
  memberList.value.push(...response.data.findMember)
}

async function fetchAdmin() {
  const response = await api.post('user/findUser', { clubId: userStore.currentClub.club_id })
  memberList.value = response.data.callData
}

async function fetchData() {
  loadingState.value = true
  memberList.value = []
  try {
    await fetchAdmin()
    await fetchMemberList()
  } catch (error) {
    console.error(error)
  } finally {
    loadingState.value = false
  }
}

onMounted(() => {
  fetchData()
})
</script>
