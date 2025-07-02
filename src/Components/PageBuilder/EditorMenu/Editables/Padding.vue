<script setup>
import { ref, computed, watch } from 'vue'
import { sharedPageBuilderStore } from '../../../../stores/shared-store'
import EditorAccordion from '../EditorAccordion.vue'
import tailwindPaddingPlusMargin from '../../../../utils/builder/tailwind-padding-margin'
import { getPageBuilder } from '../../../../composables/builderInstance'
const pageBuilderService = getPageBuilder()

// Use shared store instance
const pageBuilderStateStore = sharedPageBuilderStore

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
    await pageBuilderService.initializeElementStyles()
  },
  { immediate: true },
)
watch(
  getFontHorizontalPadding,
  async (newValue) => {
    fontHorizontalPadding.value = newValue
    await pageBuilderService.initializeElementStyles()
  },
  { immediate: true },
)
watch(
  getFontVerticalMargin,
  async (newValue) => {
    fontVerticalMargin.value = newValue
    await pageBuilderService.initializeElementStyles()
  },
  { immediate: true },
)
watch(
  getFontHorizontalMargin,
  async (newValue) => {
    fontHorizontalMargin.value = newValue
    await pageBuilderService.initializeElementStyles()
  },
  { immediate: true },
)
</script>
<template>
  <EditorAccordion>
    <template #title>Padding</template>
    <template #content>
      <div class="pbx-my-2 pbx-py-2">
        <label for="vertical-padding" class="pbx-myPrimaryInputLabel"> Vertical Padding </label>
        <select
          id="vertical-padding"
          v-model="fontVerticalPadding"
          class="pbx-myPrimarySelect"
          @change="pageBuilderService.handleVerticalPadding(fontVerticalPadding)"
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
      <hr />
      <div class="pbx-my-2 pbx-py-2">
        <label for="horizontal-padding" class="pbx-myPrimaryInputLabel"> Horizontal Padding </label>
        <select
          id="horizontal-padding"
          v-model="fontHorizontalPadding"
          class="pbx-myPrimarySelect"
          @change="pageBuilderService.handleHorizontalPadding(fontHorizontalPadding)"
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
    </template>
  </EditorAccordion>
</template>
