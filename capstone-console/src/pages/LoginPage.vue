<template>
  <q-page class="bg-primary text-white row items-center">
    <div class="column justify-center q-pa-xl z-top">
      <div class="column content-start q-col-gutter-md">
        <div class="text-h4 text-bold">NO.1</div>
        <div class="text-h3 text-bold">동아리 운영 관리 서비스</div>
        <div class="row items-center">
          <div class="text-h2 text-bold">여기모여</div>
          <img width="70" src="~assets/logo.svg" alt="" />
        </div>
      </div>

      <div>
        <q-btn @click="$router.push('/console')" class="q-mt-xl text-brown text-bold" size="lg" color="yellow">카카오 로그인</q-btn>
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
defineOptions({
  name: "LoginPage",
});
</script>
