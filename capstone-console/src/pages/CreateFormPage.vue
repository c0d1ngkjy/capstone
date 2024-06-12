<template>
  <q-page class="q-pa-xl">
    <q-inner-loading :showing="loadingState">
      <q-spinner size="50px" color="primary" />
    </q-inner-loading>
    <div v-if="!loadingState" class="text-bold text-h5">부원 신청서 작성</div>
    <q-card v-if="!loadingState" flat style="border-radius: 12px; max-width: 900px;" class="q-pa-md q-mt-md column">
      <div class="text-bold q-ml-sm q-mb-sm q-mt-md">
        신청서 제목
      </div>
      <q-input v-model="form.title" borderless class="bg-blue-grey-1 q-px-md" style="border-radius: 12px;"
        type="text" />
      <div v-if="errors.title" class="text-red q-ml-sm">{{ errors.title }}</div>


      <div class="text-bold q-ml-sm q-mb-sm q-mt-md">
        모집 기간 : {{ form.dateRange.from }} ~ {{ form.dateRange.to }}
      </div>
      <q-date landscape :locale="locale" style="border-radius: 12px;" range v-model="form.dateRange"
        :error="!!errors.dateRange" />
      <div v-if="errors.dateRange" class="text-red q-ml-sm">{{ errors.dateRange }}</div>

      <div v-for="question in form.questionList" :key="question">
        <div class="text-bold q-ml-sm q-mb-sm q-mt-md">
          {{ question }}
        </div>
        <q-input borderless class="bg-blue-grey-1" style="border-radius: 12px;" disable type="" />
      </div>
      <q-btn class="q-mt-md q-py-sm q-px-md" color="primary" unelevated style="border-radius: 12px; max-width: 130px;"
        @click="addQuestionDialog = true">
        질문 추가하기
      </q-btn>
    </q-card>

    <q-btn v-if="!loadingState" @click="handleAddForm" color="primary" size="lg" class="q-my-md float-right" unelevated
      style="border-radius: 12px;">
      신청서 저장하기
    </q-btn>

    <q-dialog v-model="addQuestionDialog">
      <q-card style="border-radius: 12px; min-width: 500px;" class="q-pa-md">
        <q-input borderless class="bg-blue-grey-1 q-px-md" style="border-radius: 12px;" v-model="newQuestion"
          type="text" label="질문" placeholder="지원동기가 무엇인가요?" />
        <q-btn class="q-mt-md fit" color="primary" unelevated style="border-radius: 12px;" icon="add"
          @click="addQuestion"  />
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { useQuasar } from 'quasar';
import { api } from 'src/boot/axios';
import { useUserStore } from 'src/stores/user-store';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

defineOptions({
  name: 'CreateFormPage'
})
const locale = {
  days: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
  daysShort: ['일', '월', '화', '수', '목', '금', '토'],
  months: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  monthsShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']
};

const userStore = useUserStore()
const $q = useQuasar()
const $router = useRouter();
const loadingState = ref(false)

const addQuestionDialog = ref(false)
const newQuestion = ref("")
const form = ref({
  title: "",
  dateRange: { from: '', to: '' },
  questionList: ["이름을 입력해주세요", "학교를 입력해주세요", "학과를 입력해주세요", "학번을 입력해주세요", "전화번호를 입력해주세요", "이메일을 입력해주세요"]
})

const errors = ref({})

function addQuestion() {
  form.value.questionList.push(newQuestion.value)
  addQuestionDialog.value = false
  newQuestion.value = ""
}

async function handleAddForm() {
  errors.value = {}

  if (!form.value.title) {
    errors.value.title = '신청서 제목을 입력해주세요.'
  }

  if (!form.value.dateRange.from || !form.value.dateRange.to) {
    errors.value.dateRange = '모집 기간을 입력해주세요.'
  }

  if (Object.keys(errors.value).length === 0) {
    console.log({...form.value, clubId: userStore.currentClub.club_id})
    loadingState.value = true
    await api.post('application/addApplication', {
      ...form.value,
      clubId: userStore.currentClub.club_id
    }).then((res) => {
      console.log(res)
      if(res.status == 200) {
        loadingState.value = false
        $q.notify({
          message: '신청서 생성 완료',
          color: 'positive'
        })
        $router.push('/console/recruit')
      }
    })

  }
}

</script>
