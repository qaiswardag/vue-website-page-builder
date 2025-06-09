<script setup>
import { ref, computed, inject, watch } from 'vue'
import EditorAccordion from '../EditorAccordion.vue'
import PageBuilderClass from '../../../../composables/PageBuilderClass.ts'
import tailwindPaddingPlusMargin from '../../../../utils/builder/tailwind-padding-margin'

// Get stores from parent PageBuilder component
const pageBuilderStateStore = inject('pageBuilderStateStore')

const pageBuilderClass = new PageBuilderClass(pageBuilderStateStore)
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
  async (newValue) => {
    fontVerticalPadding.value = newValue
    await pageBuilderClass.handlePageBuilderMethods()
  },
  { immediate: true },
)
watch(
  getFontHorizontalPadding,
  async (newValue) => {
    fontHorizontalPadding.value = newValue
    await pageBuilderClass.handlePageBuilderMethods()
  },
  { immediate: true },
)
watch(
  getFontVerticalMargin,
  async (newValue) => {
    fontVerticalMargin.value = newValue
    await pageBuilderClass.handlePageBuilderMethods()
  },
  { immediate: true },
)
watch(
  getFontHorizontalMargin,
  async (newValue) => {
    fontHorizontalMargin.value = newValue
    await pageBuilderClass.handlePageBuilderMethods()
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
