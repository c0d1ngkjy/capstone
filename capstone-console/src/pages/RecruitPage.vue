<template>
  <q-page class="column q-pa-xl">
    <div class="row q-gutter-sm items-center q-mb-md">
      <img src="~assets/userIcon.svg" alt="icon">
      <div class="text-bold text-h6">부원 모집</div>
    </div>

    <div class="flex q-gutter-md">
      <q-card v-for="x in 7" :key="x" class="column bg-primary" style="width: 300px; padding-left: 6px;">
        <div class="column justify-between bg-white q-pa-md" style="border-top-left-radius: 0; border-bottom-left-radius: 0; min-height: 160px;">
          <div class="text-bold text-subtitle1">title</div>
          <div class="row justify-between">
            <div class="text-caption">{{ new Date() }}</div>
            <div>current recruits</div>
          </div>
        </div>
      </q-card>

      <q-card class="column bg-primary" style="width: 300px; padding-left: 6px;">
        <q-btn @click="$router.push('/createform')" flat class="addClubBtn q-pa-md bg-grey-1 flex flex-center"
          style="border-top-left-radius: 0; border-bottom-left-radius: 0; min-height: 160px;">
          <q-icon name="add" size="xl" color="grey"></q-icon>
        </q-btn>
      </q-card>

    </div>

  </q-page>
</template>

<script setup>
defineOptions({
  name: 'RecruitPage'
});
</script>
