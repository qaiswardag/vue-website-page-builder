<script setup>
import { ref } from 'vue'

defineProps({
  mobile: {
    type: Boolean,
  },
})

const htmlPage = ref('')

const previewData = localStorage.getItem('preview')

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

<template>
  <template v-if="!mobile">
    <div>
      <div
        class="pbx-text-black pbx-w-full pbx-inset-x-0 pbx-h-[90vh] pbx-bg-white pbx-overflow-x-scroll lg:pbx-pt-2 pbx-pt-2"
      >
        <div id="page-builder-editor">
          <div class="" v-html="htmlPage"></div>
        </div>
      </div>
    </div>
  </template>
  <template v-if="mobile">
    <div>
      <div
        class="pbx-text-black pbx-w-full pbx-inset-x-0 pbx-h-[90vh] pbx-bg-white pbx-overflow-x-scroll lg:pbx-pt-2 pbx-pt-2"
      >
        <div id="page-builder-editor">
          <div class="" v-html="htmlPage"></div>
        </div>
      </div>
    </div>
  </template>
</template>
