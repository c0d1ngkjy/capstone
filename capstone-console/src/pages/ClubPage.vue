<template>
  <q-page class="column q-pa-xl">
    <div class="row items-center">
      <img src="~assets/addClubIcon.svg" alt="icon" class="q-mr-md">
      <div class="text-h5 text-bold">동아리 정보 수정하기</div>
    </div>

    <q-card style="border-radius: 10px;" flat class="q-pa-md q-mt-lg">
      <div class="row items-center q-mb-sm">
        <div class="text-h6">동아리 이름</div>
        <div class="q-ml-sm text-caption text-grey">이름을 입력해주세요</div>
      </div>
      <q-input borderless class="bg-blue-grey-1 q-px-lg" placeholder="내용을 입력하세요" style="border-radius: 10px;"/>
    </q-card>

    <q-card style="border-radius: 10px;" flat class="q-pa-md q-mt-lg">
      <div class="row items-center q-mb-sm">
        <div class="text-h6">프로필</div>
        <div class="q-ml-sm text-caption text-grey">동아리의 로고 또는 프로필 이미지를 업로드해 주세요</div>
      </div>
      <div class="row items-end q-pa-md">
        <img src="~assets/addClubIcon.svg" alt="" style="width: 300px; border-radius: 50%; border: 1px solid lightgrey;">
        <q-btn color="grey" rounded unelevated>변경하기</q-btn>

      </div>
    </q-card>

    <q-card style="border-radius: 10px;" flat class="q-pa-md q-mt-lg">
      <div class="row items-center q-mb-sm">
        <div class="text-h6">한줄 설명</div>
        <div class="q-ml-sm text-caption text-grey">무엇을 하는 동아리인가요?</div>
      </div>
      <q-input borderless class="bg-blue-grey-1 q-px-lg" placeholder="내용을 입력하세요" style="border-radius: 10px;"/>
    </q-card>

    <div class="row justify-end">
      <q-btn color="primary" style="border-radius: 10px;" class="q-mt-md" size="lg" unelevated>저장하기</q-btn>
    </div>
  </q-page>
</template>

<script setup>
defineOptions({
  name: 'ClubPage'
});
</script>
