<script setup>
import { ref, computed, watch } from 'vue'
import { sharedPageBuilderStore } from '../../../../stores/shared-store'
import EditorAccordion from '../EditorAccordion.vue'
import PageBuilderClass from '../../../../composables/PageBuilderClass.ts'
import tailwindPaddingPlusMargin from '../../../../utils/builder/tailwind-padding-margin'

// Use shared store instance
const pageBuilderStateStore = sharedPageBuilderStore

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
    await pageBuilderClass.initializeElementStyles()
  },
  { immediate: true },
)
watch(
  getFontHorizontalPadding,
  async (newValue) => {
    fontHorizontalPadding.value = newValue
    await pageBuilderClass.initializeElementStyles()
  },
  { immediate: true },
)
watch(
  getFontVerticalMargin,
  async (newValue) => {
    fontVerticalMargin.value = newValue
    await pageBuilderClass.initializeElementStyles()
  },
  { immediate: true },
)
watch(
  getFontHorizontalMargin,
  async (newValue) => {
    fontHorizontalMargin.value = newValue
    await pageBuilderClass.initializeElementStyles()
  },
  { immediate: true },
)
</script>
<template>
  <EditorAccordion>
    <template #title>Margin</template>
    <template #content>
      <div class="pbx-my-2 pbx-py-2">
        <label class="pbx-myPrimaryInputLabel"> Vertical Margin </label>
        <select
          v-model="fontVerticalMargin"
          class="pbx-myPrimarySelect"
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
      <hr />
      <div class="pbx-my-2 pbx-py-2">
        <label class="pbx-myPrimaryInputLabel"> Horizontal Margin </label>
        <select
          v-model="fontHorizontalMargin"
          class="pbx-myPrimarySelect"
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
