<template>
  <q-layout view="lHh LpR lFf">
    <q-header bordered class="bg-white text-black q-py-sm q-px-md">
      <q-toolbar class="row justify-between">
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <div class="row q-gutter-x-sm items-center">
          <q-avatar>
            <img :src="userData.image" alt="profile image" style="border: 1px solid lightgrey" />
          </q-avatar>
          <!-- Profile Dropdown Menu -->
          <q-btn dense unelevated>
            <div>{{ userData.name }}</div>
            <q-icon name="arrow_drop_down" size="sm" color="grey" />
            <q-menu transition-show="scale" transition-hide="scale" style="border-radius: 12px;">
              <q-list separator style="min-width: 120px;">
                <q-item class="row items-center" clickable v-close-popup @click="$router.push('/console/userprofile')">
                  <q-icon name="person" class="q-mr-sm"></q-icon>
                  <q-item-section>프로필</q-item-section>
                </q-item>
                <q-item class="row items-center" clickable v-close-popup @click="handleLogout()">
                  <q-icon name="logout" class="q-mr-sm"></q-icon>
                  <q-item-section>로그아웃</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <!-- Left Drawer -->
    <q-drawer v-model="leftDrawerOpen" side="left" bordered>
      <div class="row items-center q-gutter-x-sm q-pa-sm q-pl-lg">
        <div style="width: 50px; height: 50px" class="flex flex-center">
          <img width="40" src="~assets/logo.svg" style="
              filter: invert(50%) sepia(35%) saturate(7492%) hue-rotate(222deg)
                brightness(101%) contrast(102%);
            " alt="logo image" />
        </div>
        <div class="text-primary text-bold text-h5">여기모여</div>
      </div>
      <q-separator></q-separator>

      <!-- Club Selection -->
      <div class="q-px-md q-py-lg row items-center q-gutter-x-md">
        <q-avatar>
          <img v-if="currentClub.image" :src="currentClub.image" alt="club image" style="border: 1px solid lightgrey" />
          <img v-else src="~assets/addClubIcon.svg" alt="icon img" style="border: 1px solid lightgrey;">
        </q-avatar>

        <q-select class="col" borderless v-model="currentClub" :options="clubOptions" option-label="name">
          <template v-slot:selected>
            <div class="full-width">
              {{ currentClub.name }}
            </div>
            <div class="text-caption text-grey-7"
              style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
              {{ currentClub.description }}
            </div>
          </template>
        </q-select>
      </div>
      <q-separator></q-separator>

      <!-- Navigation Items -->
      <div>
        <q-list class="q-py-sm">
          <q-item clickable :active="currentNav === nav.link" @click="
          currentNav = nav.link;
        $router.push(`/console/${nav.link}`);
        " v-for="nav in navs" :key="nav.link" class="q-pa-md q-mx-md q-my-sm" :class="currentNav == nav.link
          ? 'text-primary bg-blue-grey-1'
          : 'text-grey'
          " style="border-radius: 10px">
            <q-item-section avatar>
              <q-icon :name="nav.iconName"></q-icon>
            </q-item-section>
            <q-item-section>{{ nav.name }}</q-item-section>
          </q-item>
        </q-list>
      </div>
    </q-drawer>

    <!-- Page Content -->
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { api } from "src/boot/axios";
import { useJwtStore } from "src/stores/jwt-store";
import { useUserStore } from "src/stores/user-store";
import { onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

export default {
  setup() {
    const $route = useRoute();
    const $router = useRouter();
    const jwtStore = useJwtStore();
    const userStore = useUserStore();
    const token = jwtStore.token;
    const userData = ref({})

    const leftDrawerOpen = ref(true);
    const clubOptions = ref([]);
    const currentClub = ref({});
    const currentNav = ref("list");

    const navs = ref([
      { name: "부원 목록", iconName: "list", link: "list" },
      { name: "동아리 일정", iconName: "event", link: "event" },
      { name: "부원 모집", iconName: "group", link: "recruit" },
      { name: "회비 내역", iconName: "receipt_long", link: "dues" },
      { name: "동아리 설정", iconName: "settings", link: "settings" },
    ]);

    watch($route, () => {
      currentNav.value = $route.path.split("/")[2];
    });

    watch(currentClub, (newValue, oldValue) => {
      userStore.setCurrentClub(newValue);
      console.log('Current club changed:', newValue);
    });

    onMounted(() => {
      fetchClubList();
      currentNav.value = $route.path.split("/")[2];
      userData.value = userStore.userData
    });

    function fetchClubList() {
      api.post('club/findAdmin', {}, { headers: { Authorization: token } }).then((res) => {
        clubOptions.value = res.data.clubList;
        currentClub.value = userStore.currentClub || res.data.clubList[0];
      });
    }

    function handleLogout() {
      jwtStore.clearToken();
      $router.push('/');
    }

    function toggleLeftDrawer() {
      leftDrawerOpen.value = !leftDrawerOpen.value;
    }

    return {
      leftDrawerOpen,
      toggleLeftDrawer,
      clubOptions,
      currentClub,
      navs,
      currentNav,
      handleLogout,
      userData
    };
  },
};
</script>
