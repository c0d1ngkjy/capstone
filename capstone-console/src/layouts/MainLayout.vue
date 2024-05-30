<template>
  <q-layout view="lHh LpR lFf">
    <q-header bordered class="bg-white text-black q-py-sm q-px-md">
      <q-toolbar class="row justify-between">
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <div class="row q-gutter-x-sm items-center">
          <q-avatar>
            <img src="~assets/addClubIcon.svg" alt="profile image" style="border: 1px solid lightgrey;">
          </q-avatar>
          <div>최하호</div>
          <q-btn dense unelevated>
            <q-icon name="keyboard_arrow_down" size="md" color="grey" />
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" bordered>
      <div class="row items-center q-gutter-x-sm q-pa-sm q-pl-lg">
        <div style="width: 50px; height: 50px;" class="flex flex-center">
          <img width="40" src="~assets/logo.svg" style="
            filter: invert(50%) sepia(35%) saturate(7492%) hue-rotate(222deg)
              brightness(101%) contrast(102%);
          " alt="logo image" />
        </div>
        <div class="text-primary text-bold text-h5">여기모여</div>
      </div>
      <q-separator></q-separator>

      <div class="q-px-md q-py-lg row items-center q-gutter-x-md">
        <q-avatar>
          <img src="~assets/addClubIcon.svg" alt="club image" style="border: 1px solid lightgrey;">
        </q-avatar>
        <q-select class="col" borderless v-model="currentClub" :options="clubOptions"></q-select>
      </div>
      <q-separator></q-separator>

      <div>
        <q-list class="q-py-sm">
          <q-item clickable :active="currentNav == nav.name" @click="currentNav = nav.name; $router.push(`/console/${nav.link}`)" v-for="nav in navs"
            :key="nav" class="q-pa-md q-mx-md q-my-sm"
            :class="currentNav == nav.name ? 'text-primary bg-blue-grey-1' : 'text-grey'" style="border-radius: 10px;">
            <q-item-section avatar>
              <q-icon :name="nav.iconName"></q-icon>
            </q-item-section>
            <q-item-section>{{ nav.name }}</q-item-section>
          </q-item>
        </q-list>
      </div>
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
    const clubOptions = ref(['클러비티', '보안동아리', '앱미사'])
    const currentClub = ref(clubOptions.value[0])

    const navs = ref([
      { name: '부원 목록', iconName: 'list', link: 'list' },
      { name: '부원 모집', iconName: 'group',link: 'recruit'  },
      { name: '동아리 설정', iconName: 'settings', link: 'settings'  },
    ])
    const currentNav = ref(navs.value[0].name)

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      clubOptions,
      currentClub,
      navs,
      currentNav
    };
  },
};
</script>
