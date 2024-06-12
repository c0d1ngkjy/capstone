<template>
  <q-page :class="isMobile ? '': 'q-py-lg flex flex-center'">
    <q-card class="q-py-lg q-px-md" flat :style="isMobile ? '' : 'border-radius: 12px; min-width: 600px;'">
        <div class="text-center text-bold text-h5 q-mb-md">
          {{ applicationData.title }}
        </div>
        <div class="row text-primary text-subtitle1 justify-center">
          <div class="q-mr-xs">신청 기간 : </div>
          {{ applicationData.from }} ~
          {{ applicationData.to }}
        </div>
        <div>면접일자 선택</div>
        <q-date style="border-radius: 12px; border: 1px solid lightgrey;"></q-date>
        <div class="q-mt-md" v-for="(q, idx) in applicationData.questionList" :key="idx">
          <div>
            {{ q }}
          </div>
          <q-input borderless class="bg-blue-grey-1 q-px-md" style="border-radius: 12px;"></q-input>
        </div>
        <q-btn color="primary" label="제출하기" class="fit q-pa-md q-mt-md text-bold text-h6" unelevated style="border-radius: 12px;"  @click="onClick" />
      </q-card>

  </q-page>
</template>

<script setup>
import { Screen } from 'quasar';
import { api } from 'src/boot/axios';
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

defineOptions({
  name: 'ViewFormPage'
})

const $route = useRoute()
const isMobile = computed(()=> Screen.lt.md)

const applicationLink = ref('')
const applicationData = ref({})

function fetchApplicationData() {
  api.post('application/getlink', {link: $route.params.fid})
  .then((res)=>{
    console.log(res.data.applicationData)
    applicationData.value = res.data.applicationData
  })
}

onMounted(() => {
  applicationLink.value = $route.params.fid
  fetchApplicationData()
})
</script>
