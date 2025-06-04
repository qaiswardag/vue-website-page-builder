<script setup>
import tailwindPaddingPlusMargin from '@/utils/builder/tailwind-padding-margin'
import PageBuilderClass from '@/composables/PageBuilderClass.ts'
import EditorAccordion from '@/Components/PageBuilder/EditorMenu/EditorAccordion.vue'
import { computed, ref, watch } from 'vue'
import { usePageBuilderStateStore } from '@/stores/page-builder-state'
import { useMediaLibraryStore } from '@/stores/media-library'

const mediaLibraryStore = useMediaLibraryStore()
const pageBuilderStateStore = usePageBuilderStateStore()
const pageBuilderClass = new PageBuilderClass(pageBuilderStateStore, mediaLibraryStore)
const fontVerticalPadding = ref(null)
const fontHorizontalPadding = ref(null)
const fontVerticalMargin = ref(null)
const fontHorizontalMargin = ref(null)
const getFontVerticalPadding = computed(() => {
  return pageBuilderStateStore.getFontVerticalPadding
})
const getFontHorizontalPadding = computed(() => {
  return pageBuilderStateStore.getFontHorizontalPadding
})
const getFontVerticalMargin = computed(() => {
  return pageBuilderStateStore.getFontVerticalMargin
})
const getFontHorizontalMargin = computed(() => {
  return pageBuilderStateStore.getFontHorizontalMargin
})

watch(
  getFontVerticalPadding,
  (newValue) => {
    fontVerticalPadding.value = newValue
    pageBuilderClass.handlePageBuilderMethods()
  },
  { immediate: true },
)
watch(
  getFontHorizontalPadding,
  (newValue) => {
    fontHorizontalPadding.value = newValue
    pageBuilderClass.handlePageBuilderMethods()
  },
  { immediate: true },
)
watch(
  getFontVerticalMargin,
  (newValue) => {
    fontVerticalMargin.value = newValue
    pageBuilderClass.handlePageBuilderMethods()
  },
  { immediate: true },
)
watch(
  getFontHorizontalMargin,
  (newValue) => {
    fontHorizontalMargin.value = newValue
    pageBuilderClass.handlePageBuilderMethods()
  },
  { immediate: true },
)
</script>
<template>
  <EditorAccordion>
    <template #title>Padding & Margin</template>
    <template #content>
      <p class="myPrimaryParagraph font-medium py-0 my-4">Padding</p>
      <div class="my-3 py-3">
        <label class="myPrimaryInputLabel"> Padding Y-axis </label>
        <select
          v-model="fontVerticalPadding"
          class="myPrimarySelect"
          @change="pageBuilderClass.handleVerticalPadding(fontVerticalPadding)"
        >
          <option disabled value="">Select</option>
          <option
            v-for="verticalPadding in tailwindPaddingPlusMargin.verticalPadding"
            :key="verticalPadding"
          >
            {{ verticalPadding }}
          </option>
        </select>
      </div>
      <div class="my-3 py-3">
        <label class="myPrimaryInputLabel"> Padding X-axis </label>
        <select
          v-model="fontHorizontalPadding"
          class="myPrimarySelect"
          @change="pageBuilderClass.handleHorizontalPadding(fontHorizontalPadding)"
        >
          <option disabled value="">Select</option>
          <option
            v-for="horizontalPadding in tailwindPaddingPlusMargin.horizontalPadding"
            :key="horizontalPadding"
          >
            {{ horizontalPadding }}
          </option>
        </select>
      </div>
      <p class="myPrimaryParagraph font-medium py-0 my-4">Margin</p>
      <div class="my-3 py-3">
        <label class="myPrimaryInputLabel"> Margin Y-axis </label>
        <select
          v-model="fontVerticalMargin"
          class="myPrimarySelect"
          @change="pageBuilderClass.handleVerticalMargin(fontVerticalMargin)"
        >
          <option disabled value="">Select</option>
          <option
            v-for="verticalMargin in tailwindPaddingPlusMargin.verticalMargin"
            :key="verticalMargin"
          >
            {{ verticalMargin }}
          </option>
        </select>
      </div>
      <div class="my-3 py-3">
        <label class="myPrimaryInputLabel"> Margin X-axis </label>
        <select
          v-model="fontHorizontalMargin"
          class="myPrimarySelect"
          @change="pageBuilderClass.handleHorizontalMargin(fontHorizontalMargin)"
        >
          <option disabled value="">Select</option>
          <option
            v-for="horizontalMargin in tailwindPaddingPlusMargin.horizontalMargin"
            :key="horizontalMargin"
          >
            {{ horizontalMargin }}
          </option>
        </select>
      </div>
    </template>
  </EditorAccordion>
</template>
