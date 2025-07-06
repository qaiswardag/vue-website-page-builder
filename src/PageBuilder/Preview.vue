<script setup>
import { ref, watchEffect } from 'vue'

const props = defineProps({
  mobile: {
    type: Boolean,
  },
})

const htmlPage = ref('')
const iframeRef = ref(null)

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

watchEffect(() => {
  if (props.mobile && iframeRef.value && htmlPage.value) {
    const iframe = iframeRef.value
    const doc = iframe.contentWindow.document
    doc.open()
    doc.write(
      `<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body><div class="pbx-font-sans pbx-text-black">${htmlPage.value}</div></body></html>`,
    )
    doc.close()

    // Copy stylesheets
    document.querySelectorAll('link[rel="stylesheet"], style').forEach((node) => {
      doc.head.appendChild(node.cloneNode(true))
    })
  }
})
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
      <iframe
        ref="iframeRef"
        class="pbx-mx-auto pbx-w-full pbx-bg-white pbx-shadow-lg pbx-h-[80vh] pbx-border-0"
        src="about:blank"
      ></iframe>
    </div>
  </template>
</template>
