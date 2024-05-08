<template>
  <q-layout view="lHh LpR lFf">
    <q-header bordered class="bg-white text-black q-py-sm q-px-md">
      <q-toolbar class="row justify-between">
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <div class="row q-gutter-x-sm items-center">
          <q-avatar class="shadow-3">
            <img src="loginBG.png" alt="" />
          </q-avatar>
          <div>최하호</div>
          <q-btn dense unelevated>
            <q-icon name="keyboard_arrow_down" size="md" color="grey" />
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" bordered>
      <div class="row items-center q-gutter-x-sm q-pa-sm">
        <img
          width="50"
          src="~assets/logo.svg"
          style="
            filter: invert(50%) sepia(35%) saturate(7492%) hue-rotate(222deg)
              brightness(101%) contrast(102%);
          "
        />
        <div class="text-primary text-bold text-h5">여기모여</div>
      </div>
      <q-separator></q-separator>

      <div class="q-pa-md bg-secondary">
        현재 동아리
      </div>
      <q-separator></q-separator>

      <div>NAVS</div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const leftDrawerOpen = ref(true);

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
};
</script>
