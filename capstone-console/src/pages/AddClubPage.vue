<template>
  <q-page class="column q-pa-xl">
    <div class="row items-center">
      <img src="~assets/addClubIcon.svg" alt="icon" class="q-mr-md">
      <div class="text-h5 text-bold">동아리 등록하기</div>
    </div>

    <q-card style="border-radius: 10px;" flat class="q-pa-md q-mt-lg">
      <div class="row items-center q-mb-sm">
        <div class="text-h6">동아리 이름</div>
        <div class="q-ml-sm text-caption text-grey">이름을 입력해주세요</div>
      </div>
      <q-input v-model="nameInput" borderless class="bg-blue-grey-1 q-px-lg" placeholder="Ex) 보안 동아리"
        style="border-radius: 10px;" />
      <div v-if="nameError" class="text-negative q-ml-sm">{{ nameError }}</div>
    </q-card>

    <q-card style="border-radius: 10px;" flat class="q-pa-md q-mt-lg">
      <div class="row items-center q-mb-sm">
        <div class="text-h6">소속 학교</div>
        <div class="q-ml-sm text-caption text-grey">소속 학교를 입력해주세요</div>
      </div>
      <q-input v-model="schoolInput" borderless class="bg-blue-grey-1 q-px-lg" placeholder="Ex) 명지전문대학교"
        style="border-radius: 10px;" />
      <div v-if="schoolError" class="text-negative q-ml-sm">{{ schoolError }}</div>
    </q-card>

    <q-card style="border-radius: 10px;" flat class="q-pa-md q-mt-lg">
      <div class="row items-center q-mb-sm">
        <div class="text-h6">동아리실</div>
        <div class="q-ml-sm text-caption text-grey">동아리실 위치를 입력해주세요</div>
      </div>
      <q-input v-model="locationInput" borderless class="bg-blue-grey-1 q-px-lg" placeholder="Ex) 공318호"
        style="border-radius: 10px;" />
      <div v-if="locationError" class="text-negative q-ml-sm">{{ locationError }}</div>
    </q-card>

    <q-card style="border-radius: 10px;" flat class="q-pa-md q-mt-lg">
      <div class="row items-center q-mb-sm">
        <div class="text-h6">프로필</div>
        <div class="q-ml-sm text-caption text-grey">동아리의 로고 또는 프로필 이미지를 업로드해 주세요</div>
      </div>
      <div class="row items-end q-pa-md">
        <img :src="imageUrl" alt=""
          style="width: 250px; height: 250px; border-radius: 50%; border: 1px solid lightgrey;" v-if="imageUrl">
        <input type="file" @change="onFileChange" accept="image/png, image/jpeg" style="display: none;" ref="fileInput">
        <q-btn color="grey" rounded unelevated @click="triggerFileInput">파일 업로드</q-btn>
      </div>
    </q-card>

    <q-card style="border-radius: 10px;" flat class="q-pa-md q-mt-lg">
      <div class="row items-center q-mb-sm">
        <div class="text-h6">한줄 설명</div>
        <div class="q-ml-sm text-caption text-grey">무엇을 하는 동아리인가요?</div>
      </div>
      <q-input v-model="desInput" borderless class="bg-blue-grey-1 q-px-lg" placeholder="Ex) 소프트웨어 보안 및 개발 동아리"
        style="border-radius: 10px;"  />
      <div v-if="desError" class="text-negative q-ml-sm">{{ desError }}</div>
    </q-card>

    <div class="row justify-end">
      <q-btn @click="submit" color="primary" style="border-radius: 10px;" class="q-mt-md" size="lg" unelevated>동아리
        등록하기</q-btn>
    </div>
  </q-page>
</template>

<script setup>
import { useQuasar } from 'quasar';
import { api } from 'src/boot/axios';
import { useJwtStore } from 'src/stores/jwt-store';
import { useUserStore } from 'src/stores/user-store';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

defineOptions({
  name: 'AddClubPage'
});
const jwtStore = useJwtStore()
const token = jwtStore.token
const userStore = useUserStore()
const $q = useQuasar()
const $router = useRouter()

const nameInput = ref('')
const desInput = ref('')
const schoolInput = ref('')
const locationInput = ref('')
const imageFile = ref(null)
const imageUrl = ref('')

const nameError = ref('')
const desError = ref('')
const schoolError = ref('')
const locationError = ref('')

const fileInput = ref(null)

function validateFields() {
  let isValid = true
  if (!nameInput.value) {
    nameError.value = '동아리 이름을 입력해주세요.'
    isValid = false
  } else {
    nameError.value = ''
  }

  if (!schoolInput.value) {
    schoolError.value = '소속 학교를 입력해주세요.'
    isValid = false
  } else {
    schoolError.value = ''
  }

  if (!locationInput.value) {
    locationError.value = '동아리실 위치를 입력해주세요.'
    isValid = false
  } else {
    locationError.value = ''
  }

  if (!desInput.value) {
    desError.value = '한줄 설명을 입력해주세요.'
    isValid = false
  } else {
    desError.value = ''
  }
  return isValid
}

function onFileChange(event) {
  const file = event.target.files[0]
  if (file) {
    imageFile.value = file
    imageUrl.value = URL.createObjectURL(file)
  }
}

function triggerFileInput() {
  fileInput.value.click()
}

async function submit() {
  if (!validateFields()) {
    return
  }

  try {
    const clubData = {
      name: nameInput.value,
      school: schoolInput.value,
      location: locationInput.value,
      description: desInput.value
    }

    const res = await api.post('/club/register', clubData, {
      headers: {
        Authorization: token,
      }
    })

    if (res.status === 200) {
      const clubId = res.data.clubData.club_id
      if (imageFile.value) {
        const imgRes = await uploadClubImage(clubId)
        if (imgRes) {
          $q.notify({
            message: '동아리 생성 완료',
            color: 'positive'
          })
          console.log(imgRes)
          userStore.setCurrentClub(imgRes.clubData)
          $router.push('/console/list')
        } else {
          $q.notify({
            message: '이미지 업로드 오류',
            color: 'negative'
          })
        }
      } else {
        $q.notify({
          message: '동아리 생성 완료',
          color: 'positive'
        })
        $router.push('/console/list')
      }
    }
  } catch (error) {
    $q.notify({
      message: '동아리 등록 에러' + error,
      color: 'negative'
    })
  }
}

async function uploadClubImage(clubId) {
  try {
    const formData = new FormData()
    formData.append('clubId', clubId)
    formData.append('profileImage', imageFile.value)

    const res = await api.post('/club/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    return res.data
  } catch (error) {
    console.error('Image upload error:', error)
    return null
  }
}
</script>
