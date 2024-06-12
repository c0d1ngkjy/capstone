<template>
  <q-page class="q-pa-xl">

    <q-card flat class="q-mb-md q-pa-lg row items-end" style="border-radius: 12px; max-width: 700px;"
      v-for="(answerForm, idx) in answerFormList" :key="idx">
      <div class="col">
        <div v-for="a in answerForm.answerList" :key="a">
          <div v-for="(value, key) in a" :key="key">
            <div class="text-grey">{{ key }}</div>
            <div class="text-subtitle1">{{ value }}</div>
          </div>
        </div>
        <div class="text-primary q-mt-md">희망 면접 일자: {{ answerForm.interviewDate }}</div>
      </div>
      <!--
      <div class="row items-center q-mt-md">
        <q-btn class="q-mr-sm" color="positive" style="border-radius: 12px;" unelevated label="수락"
          @click="handleAccept" />
        <q-btn color="negative" label="거절" style="border-radius: 12px;" unelevated @click="handleReject" />
      </div> -->

    </q-card>
  </q-page>
</template>
<script setup>
import { api } from 'src/boot/axios';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

defineOptions({
  name: 'FormListPage'
})
const $route = useRoute()
const application_id = $route.params.fid
const answerFormList = ref([])

function fetchAnswerList() {
  api.post('application/getAnswer', { applicationId: application_id })
    .then((res) => {
      console.log(res.data.answerData)
      answerFormList.value = res.data.answerData
    }).catch((e) => {
      console.log(e)
    })
}
function handleAccept() {
  console.log('accept')
}
function handleReject() {
  console.log('reject')
}

onMounted(() => {
  console.log(application_id)
  fetchAnswerList()
})
</script>
