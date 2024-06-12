<template>
  <q-page class="column q-pa-xl">
    <div class="flex q-gutter-xl">
      <q-card flat class="column bg-primary" style="width: 340px; padding-left: 10px; border-radius: 10px">
        <q-btn @click="$router.push('/console/recruit/createform')" flat class="q-pa-md bg-grey-1 flex flex-center"
          style="
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 10px;
            border-top-right-radius: 10px;
            min-height: 160px;
          ">
          <div class="text-bold text-grey text-h6">신청서 작성</div>
        </q-btn>
      </q-card>

      <q-card flat v-for="application in applicationList" :key="application.application_id" class="column bg-primary cursor-pointer"
        style="width: 340px; padding-left: 10px; border-radius: 10px">
        <div class="column justify-between bg-white q-pa-md" style="
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
            min-height: 160px;
          ">
          <div class="row items-center justify-between">
            <div class="text-bold text-subtitle1 col">
              {{ application.title }}
            </div>
            <q-btn unelevated class="col-1 text-grey" icon="more_horiz">
              <q-menu transition-show="scale" transition-hide="scale" style="border-radius: 12px;">
                <q-list separator style="min-width: 120px;">
                  <q-item clickable v-close-popup @click="$router.push(`/console/recruit/viewforms/${application.application_id}`)">
                    <q-item-section class="text-primary">가입신청서 목록보기</q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup @click="handleRenderApplication(application)">
                    <q-item-section>미리보기</q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup @click="handleShareApplication(application)">
                    <q-item-section>공유하기</q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup @click="handleDeleteApplication(application.application_id)">
                    <q-item-section class="text-red">삭제</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </div>
          <div class="row justify-between items-end q-mt-md">
            <div class="text-subtitle2 text-grey text-bold col">
              {{ application.from }} ~
              {{ application.to }}
            </div>

          </div>
        </div>
      </q-card>
    </div>

    <q-dialog v-model="shareDialog">
      <q-card class="q-pa-md" style="border-radius: 12px;">
        <q-card-section class="row q-gutter-md items-center">
          <div ref="shareLinkRef" class="col" style="overflow: auto;">http://localhost:9000/recruit/form/{{ shareLink }}</div>

          <q-icon name="content_copy" class="cursor-pointer col-1" @click="copyLink" />
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="applicationContentDialog">
      <q-card class="q-py-lg q-px-md" style="border-radius: 12px; min-width: 600px;">
        <div class="text-center text-bold text-h5 q-mb-md">
          {{ renderApplicationContent.title }}
        </div>
        <div class="row text-primary text-subtitle1 justify-center">
          <div class="q-mr-xs">신청 기간 : </div>
          {{ renderApplicationContent.from }} ~
          {{ renderApplicationContent.to }}
        </div>
        <div class="q-mt-md" v-for="(q, idx) in renderApplicationContent.questionList" :key="idx">
          <div>
            {{ q }}
          </div>
          <q-input disable borderless class="bg-blue-grey-1" style="border-radius: 12px;"></q-input>
        </div>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { useQuasar } from 'quasar';
import { api } from 'src/boot/axios';
import { useUserStore } from 'src/stores/user-store';
import { onMounted, ref } from 'vue';

defineOptions({
  name: "RecruitPage",
});
const userStore = useUserStore()
const $q = useQuasar()

const applicationList = ref([])
const applicationContentDialog = ref(false)
const renderApplicationContent = ref({})
const shareLinkRef = ref(null);
const shareLink = ref()

const shareDialog = ref(false)

function handleShareApplication(application) {
  console.log(application)
  shareLink.value = encodeURIComponent(application.link)
  shareDialog.value = true
}
function handleRenderApplication(application) {
  renderApplicationContent.value = application
  applicationContentDialog.value = true
  shareLink.value = application.link
}
function handleDeleteApplication(app_id) {
  console.log(app_id)

  api.post('application/delete', { applicationId: app_id }).then((res) => {
    console.log(res)
    if (res.status == 200) {
      $q.notify({
        message: '신청서 삭제 완료',
        color: 'negative'
      })
      fetchApplications()
    }
  })
}

function fetchApplications() {
  api.post('application/get', {
    clubId: userStore.currentClub.club_id
  }).then((res) => {
    applicationList.value = res.data.applicationData
    console.log(applicationList.value)
  })
}

function copyLink() {
  const shareLinkDiv = shareLinkRef.value;
  const range = document.createRange();
  range.selectNode(shareLinkDiv);
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(range);

  try {
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
    $q.notify({
      message: '클립보드에 링크 복사완료',
      color: 'positive',
      position: 'top'
    });
  } catch (err) {
    console.error('Failed to copy text: ', err);
    $q.notify({
      message: '링크 복사 실패',
      color: 'negative',
      position: 'top'
    });
  }
}

onMounted(() => {
  fetchApplications()
})
</script>
