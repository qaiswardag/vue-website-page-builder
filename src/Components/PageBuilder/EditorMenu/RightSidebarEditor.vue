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
</script>

<template>
  <div class="pbx-flex pbx-max-h-[50rem] pbx-flex-col">
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

      <div>
        <article class="pbx-my-1 pbx-bg-white">
          <ElementEditor></ElementEditor>
        </article>
      </div>
      <article class="pbx-mt-1 pbx-bg-white"></article>
    </div>
  </div>
</template>
