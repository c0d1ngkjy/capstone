<template>
  <q-page class="column q-pa-xl">
    <!-- <div class="row items-center">
      <img src="~assets/userIcon.svg" alt="icon" class="q-mr-md" />
      <div class="text-bold text-h5">부원 모집</div>
    </div> -->

    <div class="flex q-gutter-xl">
      <q-card
        flat
        class="column bg-primary"
        style="width: 340px; padding-left: 10px; border-radius: 10px"
      >
        <q-btn
          @click="$router.push('/console/recruit/createform')"
          flat
          class="q-pa-md bg-grey-1 flex flex-center"
          style="
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 10px;
            border-top-right-radius: 10px;
            min-height: 160px;
          "
        >
          <q-icon name="add" size="xl" color="grey" />
        </q-btn>
      </q-card>

      <q-card
        flat
        v-for="x in 7"
        :key="x"
        class="column bg-primary"
        style="width: 340px; padding-left: 10px; border-radius: 10px"
      >
        <div
          class="column justify-between bg-white q-pa-md"
          style="
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
            min-height: 160px;
          "
        >
          <div class="row items-center justify-between">
            <div class="text-bold text-subtitle1 col">
              {{ 8-x }}기 신입부원 모집
            </div>
            <q-btn unelevated class="col-1 text-grey" icon="more_horiz" />
          </div>
          <div class="row justify-between items-end q-mt-md">
            <div class="text-subtitle2 text-grey text-bold col">
              {{ new Date().toLocaleDateString() }} ~
              {{ new Date().toLocaleDateString() }}
            </div>
            <!-- <div
              class="text-red text-bold q-pa-md flex flex-center text-center"
              style="
                width: 100px;
                height: 100px;
                border-radius: 50%;
                background-color: #f4f6fa;
                font-size: 16px;
              "
            >
              10명 <br />
              지원중
            </div> -->
          </div>
        </div>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
defineOptions({
  name: "RecruitPage",
});
</script>
