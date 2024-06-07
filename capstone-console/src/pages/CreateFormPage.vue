<template>
  <q-page class="q-pa-xl">
    <div class="text-bold text-h5">부원 신청서 작성</div>
    <q-card flat style="border-radius: 12px; max-width: 900px;" class="q-pa-md q-mt-md column">
      <div class="text-bold q-ml-sm q-mb-sm q-mt-md">
        신청서 제목
      </div>
      <q-input borderless class="bg-blue-grey-1 q-px-md" style="border-radius: 12px;" type="text" />

      <div class="text-bold q-ml-sm q-mb-sm q-mt-md">
        모집 기간 : {{ dateRange.from }} ~ {{ dateRange.to }}
      </div>
      <q-date landscape :locale="locale" style="border-radius: 12px;" range v-model="dateRange"></q-date>

      <div v-for="question in questionList" :key="question">
        <div class="text-bold q-ml-sm q-mb-sm q-mt-md">
          {{ question }}
        </div>
        <q-input borderless class="bg-blue-grey-1" style="border-radius: 12px;" disable type="" />
      </div>
      <q-btn class="q-mt-md q-py-sm q-px-md" color="primary" unelevated style="border-radius: 12px; max-width: 130px;"
        @click="addQuestionDialog = true">질문 추가하기</q-btn>
    </q-card>

    <q-btn color="primary" size="lg" class="q-my-md float-right" unelevated style="border-radius: 12px;">신청서
      저장하기</q-btn>

    <q-dialog v-model="addQuestionDialog">
      <q-card style="border-radius: 12px; min-width: 500px;" class="q-pa-md">
        <q-input borderless class="bg-blue-grey-1 q-px-md" style="border-radius: 12px;" v-model="newQuestion"
          type="text" label="질문" placeholder="지원동기가 무엇인가요?" />
        <q-btn class="q-mt-md fit" color="primary" unelevated style="border-radius: 12px;" icon="add"
          @click="addQuestion" />
      </q-card>

    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref } from 'vue';

defineOptions({
  name: 'CreateFormPage'
})
const questionList = ref([])


const addQuestionDialog = ref(false)
const newQuestion = ref()
const dateRange = ref({})

function addQuestion() {
  questionList.value.push(newQuestion.value)
  addQuestionDialog.value = false
  newQuestion.value = ""
}

const locale = {
  days: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
  daysShort: ['일', '월', '화', '수', '목', '금', '토'],
  months: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  monthsShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']
};
</script>
