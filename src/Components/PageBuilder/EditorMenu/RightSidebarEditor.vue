<script setup>
import { computed, ref, watch, nextTick } from 'vue'
import { sharedPageBuilderStore } from '../../../stores/shared-store'
import ClassEditor from './Editables/ClassEditor.vue'
import ImageEditor from './Editables/ImageEditor.vue'
import OpacityEditor from './Editables/OpacityEditor.vue'
import Typography from './Editables/Typography.vue'
import Padding from './Editables/Padding.vue'
import Margin from './Editables/Margin.vue'
import BorderRadius from './Editables/BorderRadius.vue'
import BackgroundColorEditor from './Editables/BackgroundColorEditor.vue'
import Borders from './Editables/Borders.vue'
import LinkEditor from './Editables/LinkEditor.vue'
import TipTap from '../../TipTap/TipTap.vue'
import EditGetElement from './Editables/EditGetElement.vue'
import ElementEditor from './Editables/ElementEditor.vue'
import { getPageBuilder } from '../../../composables/builderInstance'
import EditorAccordion from '../EditorMenu/EditorAccordion.vue'
import fullHTMLContent from '../../../utils/builder/html-doc-declaration-with-components'
const pageBuilderService = getPageBuilder()
// Use shared store instance
const pageBuilderStateStore = sharedPageBuilderStore

// emit
const emit = defineEmits(['closeEditor'])

// get current element tag
const getElement = computed(() => {
  return pageBuilderStateStore.getElement
})

// Get tagName of element
const elementTag = computed(() => {
  return getElement.value?.tagName
})

const isHeadingElement = computed(() => {
  return (
    (getElement.value instanceof HTMLElement && getElement.value.innerText.trim() !== ' ') ||
    getElement.value instanceof HTMLImageElement
  )
})

const scrollContainer = ref(null)
let lastScrollTop = 0

// Watch for changes that cause re-render (e.g. dropdown value in store)
watch(
  // or the specific value that triggers re-render
  () => pageBuilderStateStore.getElement,
  () => {
    // Restore scroll after DOM updates
    nextTick(() => {
      if (scrollContainer.value) {
        scrollContainer.value.scrollTop = lastScrollTop
      }
    })
  },
)

// Save scroll position before update
function onScroll() {
  if (scrollContainer.value) {
    lastScrollTop = scrollContainer.value.scrollTop
  }
}

// generate HTML
const generateHTML = function (filename, HTML) {
  const element = document.createElement('a')
  element.setAttribute(
    'href',
    'data:text/html;charset=utf-8,' + encodeURIComponent(fullHTMLContent(HTML)),
  )
  element.setAttribute('download', filename)

  element.style.display = 'none'
  document.body.appendChild(element)

  element.click()

  document.body.removeChild(element)
}

const getComponents = computed(() => {
  return pageBuilderStateStore.getComponents
})

const downloadedComponents = ref(null)
// handle download HTML
const handleDownloadHTML = function () {
  downloadedComponents.value = getComponents.value.map((component) => {
    return component.html_code
  })

  generateHTML('downloaded_html.html', downloadedComponents.value.join(''))
}
</script>

<template>
  <div class="pbx-flex pbx-h-full pbx-flex-col">
    <div
      class="pbx-flex pbx-flex-row pbx-justify-between pbx-pt-7 pbx-pr-4 pbx-pl-4 pbx-items-center pbx-mb-3"
    >
      <button
        type="button"
        @click="$emit('closeEditor')"
        class="pbx-h-10 pbx-w-10 pbx-cursor-pointer pbx-rounded-full pbx-flex pbx-items-center pbx-border-none pbx-justify-center pbx-bg-gray-50 pbx-aspect-square hover:pbx-bg-myPrimaryLinkColor hover:pbx-text-white focus-visible:pbx-ring-0"
      >
        <span class="material-symbols-outlined"> close </span>
      </button>
      <p class="pbx-font-medium pbx-text-sm">
        Editing
        <span class="pbx-lowercase">&lt;{{ elementTag }}&gt;</span>
      </p>
    </div>

    <div
      v
      ref="scrollContainer"
      @scroll="onScroll"
      class="pbx-pl-3 pbx-pr-3 pbx-mb-4 pbx-overflow-y-scroll"
    >
      <div v-show="getElement && pageBuilderService.isEditableElement(getElement)">
        <article class="pbx-mb-1">
          <ImageEditor> </ImageEditor>
        </article>
        <article class="pbx-mb-1">
          <TipTap></TipTap>
        </article>
        <article class="pbx-my-1 pbx-bg-white">
          <Typography></Typography>
        </article>

        <article class="pbx-my-1 pbx-bg-white">
          <OpacityEditor> </OpacityEditor>
        </article>
        <article class="pbx-my-1 pbx-bg-white">
          <Padding> </Padding>
        </article>
        <article class="pbx-my-1 pbx-bg-white">
          <Margin> </Margin>
        </article>
        <article class="pbx-my-1 pbx-bg-white">
          <BorderRadius></BorderRadius>
        </article>
        <article class="pbx-my-1 pbx-bg-white">
          <Borders></Borders>
        </article>
        <article class="pbx-my-1 pbx-bg-white">
          <ClassEditor></ClassEditor>
        </article>
      </div>

      <article class="pbx-my-1 pbx-bg-white">
        <EditorAccordion>
          <template #title>Download HTML</template>
          <template #content>
            <p class="pbx-myPrimaryParagraph pbx-font-medium pbx-py-0 pbx-my-4">
              Download Page as HTML
            </p>

            <div class="pbx-mt-4">
              <button @click="handleDownloadHTML" type="button" class="pbx-myPrimaryButton">
                Download HTML file
              </button>
            </div>
          </template>

          <!-- Download Layout HTML - end -->
        </EditorAccordion>
      </article>

      <article class="pbx-mt-1 pbx-bg-white"></article>
    </div>
  </div>
</template>
