<template>
  <div class="w-full inset-x-0 h-[90vh] z-10 bg-white overflow-x-scroll lg:pt-2 pt-2">
    <div id="page-builder-editor">
      <div class="" v-html="htmlPage"></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const htmlPage = ref('')

const previewData = localStorage.getItem('preview')

// htmlPage.value = JSON.parse(htmlPage.value);
// // join
// htmlPage.value = htmlPage.value.join("");

if (previewData) {
  try {
    const parsedData = JSON.parse(previewData)
    htmlPage.value = Array.isArray(parsedData) ? parsedData.join('') : ''
  } catch (error) {
    console.error('Error parsing preview data:', error)
    htmlPage.value = ''
  }
} else {
  htmlPage.value = ''
}
</script>
