<template>
  <q-page :class="isMobile ? '' : 'q-py-lg flex flex-center'">
    <q-card class="q-py-lg q-px-md" flat :style="isMobile ? '' : 'border-radius: 12px; min-width: 600px;'">
      <div class="text-center text-bold text-h5 q-mb-md">
        {{ applicationData.title }}
      </div>
      <div class="row text-primary text-subtitle1 justify-center">
        <div class="q-mr-xs">신청 기간 : </div>
        {{ applicationData.from }} ~
        {{ applicationData.to }}
      </div>
      <div class="q-mt-md">희망 면접일자 선택</div>
      <q-date
        :class="isMobile ? 'fit' : ''"
        :locale="locale"
        v-model="selectedDate"
        :options="dateOptions"
        style="border-radius: 12px; border: 1px solid lightgrey;">
      </q-date>
      <div class="q-mt-md" v-for="(q, idx) in applicationData.questionList" :key="idx">
        <div>
          {{ q }}
        </div>
        <q-input
          borderless
          class="bg-blue-grey-1 q-px-md"
          v-model="formAnswer[q]"
          style="border-radius: 12px;">
        </q-input>
      </div>
      <q-btn
        color="primary"
        label="제출하기"
        class="fit q-pa-md q-mt-md text-bold text-h6"
        unelevated
        style="border-radius: 12px;"
        @click="submit"
      />
    </q-card>
  </q-page>
</template>

<script setup>
import { Screen, useQuasar } from 'quasar';
import { api } from 'src/boot/axios';
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const $route = useRoute();
const router = useRouter();
const isMobile = computed(() => Screen.lt.md);
const $q = useQuasar()

const applicationLink = ref('');
const applicationData = ref({});
const selectedDate = ref(null);
const formAnswer = ref({});

const locale = {
  days: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
  daysShort: ['일', '월', '화', '수', '목', '금', '토'],
  months: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  monthsShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']
};

function fetchApplicationData() {
  api.post('application/getlink', { link: $route.params.fid })
    .then((res) => {
      applicationData.value = res.data.applicationData;
      initializeFormAnswer();
      checkApplicationPeriod();
    });
}

function initializeFormAnswer() {
  applicationData.value.questionList.forEach(question => {
    formAnswer.value[question] = '';
  });
}

function checkApplicationPeriod() {
  const fromDate = new Date(applicationData.value.from);
  const toDate = new Date(applicationData.value.to);
  const currentDate = new Date();

  if (currentDate < fromDate || currentDate > toDate) {
    $q.notify({message:'신청기간이 아닙니다', color: 'negative'})
    router.push('/');
  }
}

onMounted(() => {
  applicationLink.value = $route.params.fid;
  fetchApplicationData();
});

const dateOptions = computed(() => {
  const from = new Date(applicationData.value.interviewFrom);
  const to = new Date(applicationData.value.interviewTo);
  return (val) => {
    const d = new Date(val);
    return d >= from && d <= to;
  };
});

function submit() {
  const dataToSend = {
    application_id: applicationData.value.application_id,
    interviewDate: selectedDate.value,
    answerList: formAnswer.value,
  };
  api.post('application/addAnswer', dataToSend)
    .then((res) => {
      console.log(res);
      $q.notify({message:'신청서 제출 완료', color: 'positive'})
      router.push('/')
    })
    .catch((e) => {
      console.log(e);
      $q.notify({message: e, color: 'negative'})
    });
}
</script>

