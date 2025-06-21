<script setup>
import { ref, computed, watch } from 'vue'
import EditorAccordion from '../EditorAccordion.vue'
import PageBuilderClass from '../../../../composables/PageBuilderClass.ts'
import tailwindFontSizes from '../../../../utils/builder/tailwind-font-sizes'
import tailwindFontStyles from '../../../../utils/builder/tailwind-font-styles'
import { sharedPageBuilderStore } from '../../../../stores/shared-store'

// Use shared store instance
const pageBuilderStateStore = sharedPageBuilderStore

const pageBuilderClass = new PageBuilderClass(pageBuilderStateStore)
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
  async (newValue) => {
    fontBase.value = newValue
    await pageBuilderClass.initializeElementStyles()
  },
  { immediate: true },
)
watch(
  getFontDesktop,
  async (newValue) => {
    fontDesktop.value = newValue
    await pageBuilderClass.initializeElementStyles()
  },
  { immediate: true },
)
watch(
  getFontTablet,
  async (newValue) => {
    fontTablet.value = newValue
    await pageBuilderClass.initializeElementStyles()
  },
  { immediate: true },
)
watch(
  getFontMobile,
  async (newValue) => {
    fontMobile.value = newValue
    await pageBuilderClass.initializeElementStyles()
  },
  { immediate: true },
)
watch(
  getFontWeight,
  async (newValue) => {
    fontWeight.value = newValue
    await pageBuilderClass.initializeElementStyles()
  },
  { immediate: true },
)
watch(
  getFontFamily,
  async (newValue) => {
    fontFamily.value = newValue
    await pageBuilderClass.initializeElementStyles()
  },
  { immediate: true },
)
watch(
  getFontStyle,
  async (newValue) => {
    fontStyle.value = newValue
    await pageBuilderClass.initializeElementStyles()
  },
  { immediate: true },
)
</script>

<template>
  <EditorAccordion>
    <template #title> Typographies </template>
    <template #content>
      <!-- FONT SIZES -->
      <p class="pbx-myPrimaryParagraph pbx-font-medium pbx-py-0 pbx-my-4">Font Appearance</p>
      <div class="pbx-my-2 pbx-py-2">
        <label class="pbx-myPrimaryInputLabel"> Font Size </label>
        <select
          v-model="fontBase"
          class="pbx-myPrimarySelect"
          @change="pageBuilderClass.handleFontSizeBase(fontBase)"
        >
          <option disabled value="">Select</option>
          <option v-for="fontSize in tailwindFontSizes.fontBase" :key="fontSize">
            {{ fontSize }}
          </option>
        </select>
      </div>
      <template v-if="false">
        <div class="pbx-my-2 pbx-py-2">
          <label class="pbx-myPrimaryInputLabel"> Font desktop size </label>
          <select
            v-model="fontDesktop"
            class="pbx-myPrimarySelect"
            @change="pageBuilderClass.handleFontSizeDesktop(fontDesktop)"
          >
            <option disabled value="">Select</option>
            <option v-for="fontSize in tailwindFontSizes.fontDesktop" :key="fontSize">
              {{ fontSize }}
            </option>
          </select>
        </div>
        <div class="pbx-my-2 pbx-py-2">
          <label class="pbx-myPrimaryInputLabel"> Font tablet size </label>
          <select
            v-model="fontTablet"
            class="pbx-myPrimarySelect"
            @change="pageBuilderClass.handleFontSizeTablet(fontTablet)"
          >
            <option disabled value="">Select</option>
            <option v-for="fontSize in tailwindFontSizes.fontTablet" :key="fontSize">
              {{ fontSize }}
            </option>
          </select>
        </div>
        <div class="pbx-my-2 pbx-py-2">
          <label class="pbx-myPrimaryInputLabel"> Font small screens </label>
          <select
            v-model="fontMobile"
            class="pbx-myPrimarySelect"
            @change="pageBuilderClass.handleFontSizeMobile(fontMobile)"
          >
            <option disabled value="">Select</option>
            <option v-for="fontSize in tailwindFontSizes.fontMobile" :key="fontSize">
              {{ fontSize }}
            </option>
          </select>
        </div>
      </template>
      <hr />
      <!-- FONT FAMILY -->
      <div class="pbx-my-2 pbx-py-2">
        <label class="pbx-myPrimaryInputLabel"> Font family </label>
        <select
          v-model="fontFamily"
          class="pbx-myPrimarySelect"
          @change="pageBuilderClass.handleFontFamily(fontFamily)"
        >
          <option disabled value="">Select</option>
          <option v-for="fontFamily in tailwindFontStyles.fontFamily" :key="fontFamily">
            {{ fontFamily }}
          </option>
        </select>
      </div>
      <hr />

      <div class="pbx-my-2 pbx-py-2">
        <label class="pbx-myPrimaryInputLabel"> Font weight </label>
        <select
          v-model="fontWeight"
          class="pbx-myPrimarySelect"
          @change="pageBuilderClass.handleFontWeight(fontWeight)"
        >
          <option disabled value="">Select</option>
          <option v-for="fontWeight in tailwindFontStyles.fontWeight" :key="fontWeight">
            {{ fontWeight }}
          </option>
        </select>
      </div>
      <hr />
      <div class="pbx-my-2 pbx-py-2">
        <label class="pbx-myPrimaryInputLabel"> Font Style </label>
        <select
          v-model="fontStyle"
          class="pbx-myPrimarySelect"
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
