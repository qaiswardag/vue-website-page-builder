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
    const parsed = JSON.parse(previewData)
    htmlPage.value = Array.isArray(parsed) ? parsed.join('') : ''
  } catch (err) {
    console.error('Invalid preview data:', err)
    htmlPage.value = ''
  }
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
        class="pbx-text-black pbx-w-full pbx-inset-x-0 pbx-h-[70vh] pbx-bg-white pbx-overflow-x-scroll lg:pbx-pt-2 pbx-pt-2"
      >
        <div id="page-builder-editor">
          <div class="" v-html="htmlPage"></div>
        </div>
      </div>
    </div>
  </template>
</template>
