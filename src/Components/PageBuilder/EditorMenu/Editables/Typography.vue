<script setup>
import { ref, computed, inject } from 'vue'
import EditorAccordion from '../EditorAccordion.vue'
import PageBuilderClass from '@/composables/PageBuilderClass.ts'
import tailwindFontSizes from '@/utils/builder/tailwind-font-sizes'
import tailwindFontStyles from '@/utils/builder/tailwind-font-styles'
import { usePageBuilderStateStore } from '@/stores/page-builder-state'

// Get stores from parent PageBuilder component
const pageBuilderStateStore = inject('pageBuilderStateStore')
const mediaLibraryStore = inject('mediaLibraryStore')

const pageBuilderClass = new PageBuilderClass(pageBuilderStateStore, mediaLibraryStore)
const fontBase = ref(null)
const fontDesktop = ref(null)
const fontTablet = ref(null)
const fontMobile = ref(null)
const fontWeight = ref(null)
const fontFamily = ref(null)
const fontStyle = ref(null)
const getFontBase = computed(() => {
  return pageBuilderStateStore.getFontBase
})
const getFontDesktop = computed(() => {
  return pageBuilderStateStore.getFontDesktop
})
const getFontTablet = computed(() => {
  return pageBuilderStateStore.getFontTablet
})
const getFontMobile = computed(() => {
  return pageBuilderStateStore.getFontMobile
})
const getFontWeight = computed(() => {
  return pageBuilderStateStore.getFontWeight
})
const getFontFamily = computed(() => {
  return pageBuilderStateStore.getFontFamily
})
const getFontStyle = computed(() => {
  return pageBuilderStateStore.getFontStyle
})

watch(
  getFontBase,
  (newValue) => {
    fontBase.value = newValue
    pageBuilderClass.handlePageBuilderMethods()
  },
  { immediate: true },
)
watch(
  getFontDesktop,
  (newValue) => {
    fontDesktop.value = newValue
    pageBuilderClass.handlePageBuilderMethods()
  },
  { immediate: true },
)
watch(
  getFontTablet,
  (newValue) => {
    fontTablet.value = newValue
    pageBuilderClass.handlePageBuilderMethods()
  },
  { immediate: true },
)
watch(
  getFontMobile,
  (newValue) => {
    fontMobile.value = newValue
    pageBuilderClass.handlePageBuilderMethods()
  },
  { immediate: true },
)
watch(
  getFontWeight,
  (newValue) => {
    fontWeight.value = newValue
    pageBuilderClass.handlePageBuilderMethods()
  },
  { immediate: true },
)
watch(
  getFontFamily,
  (newValue) => {
    fontFamily.value = newValue
    pageBuilderClass.handlePageBuilderMethods()
  },
  { immediate: true },
)
watch(
  getFontStyle,
  (newValue) => {
    fontStyle.value = newValue
    pageBuilderClass.handlePageBuilderMethods()
  },
  { immediate: true },
)
</script>

<template>
  <EditorAccordion>
    <template #title> Typographies </template>
    <template #content>
      <!-- FONT SIZES -->
      <p class="myPrimaryParagraph font-medium py-0 my-4">Font sizes</p>
      <div class="my-3 py-3">
        <label class="myPrimaryInputLabel"> Font Base </label>
        <select
          v-model="fontBase"
          class="myPrimarySelect"
          @change="pageBuilderClass.handleFontSize(fontBase)"
        >
          <option disabled value="">Select</option>
          <option v-for="fontSize in tailwindFontSizes.fontBase" :key="fontSize">
            {{ fontSize }}
          </option>
        </select>
      </div>
      <div class="my-3 py-3">
        <label class="myPrimaryInputLabel"> Font desktop size </label>
        <select
          v-model="fontDesktop"
          class="myPrimarySelect"
          @change="pageBuilderClass.handleFontSize(fontDesktop)"
        >
          <option disabled value="">Select</option>
          <option v-for="fontSize in tailwindFontSizes.fontDesktop" :key="fontSize">
            {{ fontSize }}
          </option>
        </select>
      </div>
      <div class="my-3 py-3">
        <label class="myPrimaryInputLabel"> Font tablet size </label>
        <select
          v-model="fontTablet"
          class="myPrimarySelect"
          @change="pageBuilderClass.handleFontSize(fontTablet)"
        >
          <option disabled value="">Select</option>
          <option v-for="fontSize in tailwindFontSizes.fontTablet" :key="fontSize">
            {{ fontSize }}
          </option>
        </select>
      </div>
      <div class="my-3 py-3">
        <label class="myPrimaryInputLabel"> Font mobile size </label>
        <select
          v-model="fontMobile"
          class="myPrimarySelect"
          @change="pageBuilderClass.handleFontSize(fontMobile)"
        >
          <option disabled value="">Select</option>
          <option v-for="fontSize in tailwindFontSizes.fontMobile" :key="fontSize">
            {{ fontSize }}
          </option>
        </select>
      </div>
      <hr />
      <p class="myPrimaryParagraph font-medium py-0 my-4">Font general</p>
      <div class="my-3 py-3">
        <label class="myPrimaryInputLabel"> Font weight </label>
        <select
          v-model="fontWeight"
          class="myPrimarySelect"
          @change="pageBuilderClass.handleFontWeight(fontWeight)"
        >
          <option disabled value="">Select</option>
          <option v-for="fontWeight in tailwindFontStyles.fontWeight" :key="fontWeight">
            {{ fontWeight }}
          </option>
        </select>
      </div>
      <div class="my-3 py-3">
        <label class="myPrimaryInputLabel"> Font family </label>
        <select
          v-model="fontFamily"
          class="myPrimarySelect"
          @change="pageBuilderClass.handleFontFamily(fontFamily)"
        >
          <option disabled value="">Select</option>
          <option v-for="fontFamily in tailwindFontStyles.fontFamily" :key="fontFamily">
            {{ fontFamily }}
          </option>
        </select>
      </div>
      <div class="my-3 py-3">
        <label class="myPrimaryInputLabel"> Font Style </label>
        <select
          v-model="fontStyle"
          class="myPrimarySelect"
          @change="pageBuilderClass.handleFontStyle(fontStyle)"
        >
          <option disabled value="">Select</option>
          <option v-for="fontStyle in tailwindFontStyles.fontStyle" :key="fontStyle">
            {{ fontStyle }}
          </option>
        </select>
      </div>
    </template>
  </EditorAccordion>
</template>
