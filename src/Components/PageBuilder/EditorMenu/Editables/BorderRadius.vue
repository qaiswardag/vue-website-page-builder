<script setup>
import { ref, computed, watch } from 'vue'
import { sharedPageBuilderStore } from '../../../../stores/shared-store'
import EditorAccordion from '../EditorAccordion.vue'
import tailwindBorderRadius from '../../../../utils/builder/tailwind-border-radius'
import { getPageBuilder } from '../../../../composables/builderInstance'
const pageBuilderService = getPageBuilder()

const pageBuilderStateStore = sharedPageBuilderStore

const borderRadiusGlobal = ref(null)
const borderRadiusTopLeft = ref(null)
const borderRadiusTopRight = ref(null)
const borderRadiusBottomleft = ref(null)
const borderRadiusBottomRight = ref(null)
const getBorderRadiusGlobal = computed(() => {
  return pageBuilderStateStore.getBorderRadiusGlobal
})
const getBorderRadiusTopLeft = computed(() => {
  return pageBuilderStateStore.getBorderRadiusTopLeft
})
const getBorderRadiusTopRight = computed(() => {
  return pageBuilderStateStore.getBorderRadiusTopRight
})
const getBorderRadiusBottomleft = computed(() => {
  return pageBuilderStateStore.getBorderRadiusBottomleft
})
const getBorderRadiusBottomRight = computed(() => {
  return pageBuilderStateStore.getBorderRadiusBottomRight
})

watch(
  getBorderRadiusGlobal,
  async (newValue) => {
    borderRadiusGlobal.value = newValue
    await pageBuilderService.initializeElementStyles()
  },
  { immediate: true },
)
watch(
  getBorderRadiusTopLeft,
  async (newValue) => {
    borderRadiusTopLeft.value = newValue
    await pageBuilderService.initializeElementStyles()
  },
  { immediate: true },
)
watch(
  getBorderRadiusTopRight,
  async (newValue) => {
    borderRadiusTopRight.value = newValue
    await pageBuilderService.initializeElementStyles()
  },
  { immediate: true },
)
watch(
  getBorderRadiusBottomleft,
  async (newValue) => {
    borderRadiusBottomleft.value = newValue
    await pageBuilderService.initializeElementStyles()
  },
  { immediate: true },
)
watch(
  getBorderRadiusBottomRight,
  async (newValue) => {
    borderRadiusBottomRight.value = newValue
    await pageBuilderService.initializeElementStyles()
  },
  { immediate: true },
)
</script>

<template>
  <EditorAccordion>
    <template #title>Border Radius</template>
    <template #content>
      <p class="pbx-myPrimaryParagraph pbx-font-medium pbx-py-0 pbx-my-4">Global</p>
      <div class="pbx-my-2 pbx-py-2">
        <label for="global-border-radius" class="pbx-myPrimaryInputLabel"> Border Radius </label>
        <select
          id="global-border-radius"
          v-model="borderRadiusGlobal"
          class="pbx-myPrimarySelect"
          @change="pageBuilderService.handleBorderRadiusGlobal(borderRadiusGlobal)"
        >
          <option disabled value="">Select</option>
          <option
            v-for="borderRadiusGlobal in tailwindBorderRadius.roundedGlobal"
            :key="borderRadiusGlobal"
          >
            {{ borderRadiusGlobal }}
          </option>
        </select>
      </div>
      <p class="pbx-myPrimaryParagraph pbx-font-medium pbx-py-0 pbx-my-4">Specific</p>
      <div class="pbx-my-2 pbx-py-2">
        <label for="border-radius-top-left" class="pbx-myPrimaryInputLabel">
          Border Radius top left
        </label>
        <select
          id="border-radius-top-left"
          v-model="borderRadiusTopLeft"
          class="pbx-myPrimarySelect"
          @change="pageBuilderService.handleBorderRadiusTopLeft(borderRadiusTopLeft)"
        >
          <option disabled value="">Select</option>
          <option
            v-for="borderRadiusTopLeft in tailwindBorderRadius.roundedTopLeft"
            :key="borderRadiusTopLeft"
          >
            {{ borderRadiusTopLeft }}
          </option>
        </select>
      </div>
      <div class="pbx-my-2 pbx-py-2">
        <label for="border-radius-top-right" class="pbx-myPrimaryInputLabel">
          Border Radius top right
        </label>
        <select
          id="border-radius-top-right"
          v-model="borderRadiusTopRight"
          class="pbx-myPrimarySelect"
          @change="pageBuilderService.handleBorderRadiusTopRight(borderRadiusTopRight)"
        >
          <option disabled value="">Select</option>
          <option
            v-for="borderRadiusTopRight in tailwindBorderRadius.roundedTopRight"
            :key="borderRadiusTopRight"
          >
            {{ borderRadiusTopRight }}
          </option>
        </select>
      </div>
      <div class="pbx-my-2 pbx-py-2">
        <label for="border-radius-bottom-left" class="pbx-myPrimaryInputLabel">
          Border Radius bottom left
        </label>
        <select
          id="border-radius-bottom-left"
          v-model="borderRadiusBottomleft"
          class="pbx-myPrimarySelect"
          @change="pageBuilderService.handleBorderRadiusBottomleft(borderRadiusBottomleft)"
        >
          <option disabled value="">Select</option>
          <option
            v-for="borderRadiusBottomleft in tailwindBorderRadius.roundedBottomLeft"
            :key="borderRadiusBottomleft"
          >
            {{ borderRadiusBottomleft }}
          </option>
        </select>
      </div>
      <div class="pbx-my-2 pbx-py-2">
        <label for="border-radius-bottom-right" class="pbx-myPrimaryInputLabel">
          Border Radius bottom right
        </label>
        <select
          id="border-radius-bottom-right"
          v-model="borderRadiusBottomRight"
          class="pbx-myPrimarySelect"
          @change="pageBuilderService.handleBorderRadiusBottomRight(borderRadiusBottomRight)"
        >
          <option disabled value="">Select</option>
          <option
            v-for="borderRadiusBottomRight in tailwindBorderRadius.roundedBottomRight"
            :key="borderRadiusBottomRight"
          >
            {{ borderRadiusBottomRight }}
          </option>
        </select>
      </div>
    </template>
  </EditorAccordion>
</template>
