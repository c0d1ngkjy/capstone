<template>
  <q-page>
    <div>TEST</div>
    <img :src="svgDataUrl" alt="icon" width="100">
  </q-page>
</template>

<script setup>
import { toSvg } from 'jdenticon'
import { onMounted, ref } from 'vue';

defineOptions({
  name: 'TestPage'
})

const svgDataUrl = ref('')

onMounted(() => {
  const svgString = toSvg('justin28@gmail.com', 100)
  // Convert SVG string to base64
  const base64Svg = btoa(svgString)
  // Set as data URL
  svgDataUrl.value = `data:image/svg+xml;base64,${base64Svg}`
  console.log(svgDataUrl.value)
})
</script>
