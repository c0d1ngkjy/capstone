<template>
  <q-page class="flex flex-center">
    <q-spinner v-if="loadingState" size="3em" color="primary" />
    <div v-if="loadingState == false">
      <div class="text-bold text-h5 text-center q-mb-xl">회원가입을 위해 추가 정보를 입력해주세요</div>

      <q-card flat style="border-radius: 12px; min-width: 500px;" class="q-pa-md column q-gutter-y-md">
        <div>
          <div class="text-bold q-mb-sm q-ml-sm">학교명</div>
          <q-input v-model="schoolInput" borderless class="bg-blue-grey-1 q-px-lg" placeholder="Ex) 명지전문대학교"
            style="border-radius: 10px;" />
          <div v-if="schoolError" class="text-red text-caption q-ml-sm">{{ schoolError }}</div>
        </div>

        <div>
          <div class="text-bold q-mb-sm q-ml-sm">학과명</div>
          <q-input v-model="majorInput" borderless class="bg-blue-grey-1 q-px-lg" placeholder="Ex) 인터넷보안공학과"
            style="border-radius: 10px;" />
          <div v-if="majorError" class="text-red text-caption q-ml-sm">{{ majorError }}</div>
        </div>

        <div>
          <div class="text-bold q-mb-sm q-ml-sm">학번</div>
          <q-input v-model="studIdInput" borderless class="bg-blue-grey-1 q-px-lg" placeholder="Ex) 2022671067"
            style="border-radius: 10px;" />
          <div v-if="studIdError" class="text-red text-caption q-ml-sm">{{ studIdError }}</div>
        </div>

        <div v-if="!kakaoData.phone">
          <div class="text-bold q-mb-sm q-ml-sm">전화번호</div>
          <q-input v-model="phoneInput" borderless class="bg-blue-grey-1 q-px-lg" placeholder="Ex) 01075539005"
            style="border-radius: 10px;" />
          <div v-if="phoneError" class="text-red text-caption q-ml-sm">{{ phoneError }}</div>
        </div>

        <div v-if="!kakaoData.email">
          <div class="text-bold q-mb-sm q-ml-sm">이메일</div>
          <q-input v-model="emailInput" borderless class="bg-blue-grey-1 q-px-lg" placeholder="Ex) 123a@gmail.com"
            style="border-radius: 10px;" />
          <div v-if="emailError" class="text-red text-caption q-ml-sm">{{ emailError }}</div>
        </div>

        <q-btn @click="register" icon="arrow_forward_ios" unelevated color="primary" style="border-radius: 12px;"
          class="q-pa-md q-mt-xl text-bold" />
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { api } from 'src/boot/axios';
import { onBeforeMount, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { useJwtStore } from 'stores/jwt-store'
import { useUserStore } from 'stores/user-store'
import { toSvg } from 'jdenticon'

defineOptions({
  name: "AuthPage",
});

const $route = useRoute();
const $router = useRouter()
const jwtStore = useJwtStore()
const userStore = useUserStore()
const kakaoCode = $route.query.code
const $q = useQuasar()
const loadingState = ref(false)

const schoolInput = ref('')
const majorInput = ref('')
const studIdInput = ref('')

const schoolError = ref('')
const majorError = ref('')
const studIdError = ref('')
const phoneError = ref('')
const emailError = ref('')

const kakaoData = ref({ email: '', phone: '', id: '', nickname: '' })
const phoneInput = ref('')
const emailInput = ref('')

function validateInputs() {
  schoolError.value = !schoolInput.value ? '학교명을 입력해주세요' : '';
  majorError.value = !majorInput.value ? '학과명을 입력해주세요' : '';
  studIdError.value = !studIdInput.value ? '학번을 입력해주세요' : '';
  emailError.value = !emailInput.value ? '이메일을 입력해주세요' : '';
  phoneError.value = !phoneInput.value ? '전화번호를 입력해주세요' : '';

  if (studIdInput.value && !/^\d+$/.test(studIdInput.value.trim())) {
    studIdError.value = '학번은 숫자로만 이루어져야 합니다';
  }

  return !schoolError.value && !majorError.value && !studIdError.value && !phoneError.value && !emailError.value;
}

function register() {
  if (!validateInputs()) {
    return
  }
  loadingState.value = true
  kakaoData.value.phone = phoneInput.value || kakaoData.value.phone;
  kakaoData.value.email = emailInput.value || kakaoData.value.email;

  const svgString = toSvg(kakaoData.value.email, 100)
  // svg -> base64
  const base64Svg = btoa(svgString)
  // base64 -> dataurl
  const svgDataUrl = `data:image/svg+xml;base64,${base64Svg}`

  api.post('/auth/register', {
    school: schoolInput.value,
    major: majorInput.value,
    studentId: studIdInput.value,
    id: kakaoData.value.id,
    name: kakaoData.value.nickname,
    email: kakaoData.value.email,
    phone: kakaoData.value.phone,
    image: svgDataUrl
  })
    .then((res) => {
      if (res) {
        $q.notify({ message: '회원가입 성공', color: 'primary' })
        console.log(res.data.user)
        userStore.setUserData(res.data.user)
        console.log(userStore.userData)
        jwtStore.setToken(res.data.token)
        loadingState.value = false
        $router.push('/myclubs')
      }
    })
    .catch((e) => {
      $q.notify({ message: '회원가입 에러', color: 'red' })
    })
}

async function getKakaoUserData() {
  loadingState.value = true
  api.post('/auth/kakao', { code: kakaoCode })
    .then((res) => {
      console.log(res.data)

      if (res.status === 208) {
        jwtStore.setToken(res.data.token)
        userStore.setUserData(res.data.user)
        console.table(jwtStore.token, userStore.userData)
        loadingState.value = false
        $router.push('/myclubs')
      } else if (res.status === 200) {
        kakaoData.value = res.data.kakaoUserInfo
        loadingState.value = false
      }
    })
    .catch((e) => {
      // $q.notify({ message: '카카오 에러', color: 'red' })
      $q.notify({ message: '카카오 에러' + e, color: 'red' })
    })
}

onBeforeMount(() => {
  getKakaoUserData()
})
</script>
