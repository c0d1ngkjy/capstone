<template>
  <q-page class="flex flex-center text-h1">
   <div>AUTH PAGE</div>
   <div class="text-h6 text-red">{{ kakaoCode }}</div>
  </q-page>
</template>

<script setup>
import { onMounted } from 'vue';
import {useRoute} from 'vue-router'

defineOptions({
  name: "AuthPage",
});

const $route = useRoute();
const kakaoCode = $route.query.code

onMounted(() => {
  console.log($route.query)
})
</script>
