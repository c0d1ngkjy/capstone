<template>
  <q-page class="bg-primary text-white row items-center non-selectable">
    <div class="column justify-center q-pa-xl z-top">
      <div class="column content-start q-col-gutter-md">
        <div class="text-h4 text-bold">NO.1</div>
        <div class="text-h3 text-bold">동아리 운영 관리 서비스</div>
        <div class="row items-center">
          <div class="text-h2 text-bold">여기모여</div>
          <img width="70" src="~assets/logo.svg" alt="" />
        </div>
      </div>
      <div class="q-mt-xl">
        <img
          class="cursor-pointer"
          @click="handleKakaoLogin"
          src="https://k.kakaocdn.net/14/dn/btroDszwNrM/I6efHub1SN5KCJqLm1Ovx1/o.jpg"
          alt="카카오 로그인 버튼"
        />
      </div>
    </div>

    <img
      class="fixed-bottom-right"
      src="loginBG.png"
      alt="background image"
      width="640"
    />
  </q-page>
</template>

<script setup>
import { onMounted } from "vue";
import { useRoute } from "vue-router";

defineOptions({
  name: "LoginPage",
});

const $route = useRoute();

function handleKakaoLogin() {
  Kakao.Auth.authorize({
    redirectUri: "http://localhost:9000/oauth",
  });
}

onMounted(() => {
  Kakao.init("28beff42a42811b8f526dd8e29f2b9c5");
  console.log(Kakao.isInitialized());
  console.log($route.query);
});
</script>
