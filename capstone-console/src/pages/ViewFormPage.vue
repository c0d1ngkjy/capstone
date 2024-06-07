<template>
  <q-page>
    <div>FORM</div>
    <div class="text-h6 text-bold text-red">{{ $route.params.fid }}</div>
  </q-page>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

defineOptions({
  name: 'ViewFormPage'
})
const $route = useRoute()
const applicationLink = ref('')

onMounted(() => {
  applicationLink.value = $route.params.fid
})
</script>
