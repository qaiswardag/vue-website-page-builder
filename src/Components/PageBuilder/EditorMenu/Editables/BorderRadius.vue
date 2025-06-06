<script setup>
import { ref, computed, inject, watch } from 'vue'
import EditorAccordion from '../EditorAccordion.vue'
import PageBuilderClass from '@/composables/PageBuilderClass.ts'
import tailwindBorderRadius from '@/utils/builder/tailwind-border-radius'

// Get stores from parent PageBuilder component
const pageBuilderStateStore = inject('pageBuilderStateStore')
const mediaLibraryStore = inject('mediaLibraryStore')

const pageBuilderClass = new PageBuilderClass(pageBuilderStateStore, mediaLibraryStore)
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
  (newValue) => {
    borderRadiusGlobal.value = newValue
    pageBuilderClass.handlePageBuilderMethods()
  },
  { immediate: true },
)
watch(
  getBorderRadiusTopLeft,
  (newValue) => {
    borderRadiusTopLeft.value = newValue
    pageBuilderClass.handlePageBuilderMethods()
  },
  { immediate: true },
)
watch(
  getBorderRadiusTopRight,
  (newValue) => {
    borderRadiusTopRight.value = newValue
    pageBuilderClass.handlePageBuilderMethods()
  },
  { immediate: true },
)
watch(
  getBorderRadiusBottomleft,
  (newValue) => {
    borderRadiusBottomleft.value = newValue
    pageBuilderClass.handlePageBuilderMethods()
  },
  { immediate: true },
)
watch(
  getBorderRadiusBottomRight,
  (newValue) => {
    borderRadiusBottomRight.value = newValue
    pageBuilderClass.handlePageBuilderMethods()
  },
  { immediate: true },
)
</script>

<template>
  <EditorAccordion>
    <template #title>Border Radius</template>
    <template #content>
      <p class="myPrimaryParagraph font-medium py-0 my-4">Global</p>
      <div class="my-3 py-3">
        <label class="myPrimaryInputLabel"> Border Radius </label>
        <select
          v-model="borderRadiusGlobal"
          class="myPrimarySelect"
          @change="pageBuilderClass.handleBorderRadiusGlobal(borderRadiusGlobal)"
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
      <p class="myPrimaryParagraph font-medium py-0 my-4">Specific</p>
      <div class="my-3 py-3">
        <label class="myPrimaryInputLabel"> Border Radius top left </label>
        <select
          v-model="borderRadiusTopLeft"
          class="myPrimarySelect"
          @change="pageBuilderClass.handleBorderRadiusTopLeft(borderRadiusTopLeft)"
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
      <div class="my-3 py-3">
        <label class="myPrimaryInputLabel"> Border Radius top right </label>
        <select
          v-model="borderRadiusTopRight"
          class="myPrimarySelect"
          @change="pageBuilderClass.handleBorderRadiusTopRight(borderRadiusTopRight)"
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
      <div class="my-3 py-3">
        <label class="myPrimaryInputLabel"> Border Radius bottom left </label>
        <select
          v-model="borderRadiusBottomleft"
          class="myPrimarySelect"
          @change="pageBuilderClass.handleBorderRadiusBottomleft(borderRadiusBottomleft)"
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
      <div class="my-3 py-3">
        <label class="myPrimaryInputLabel"> Border Radius bottom right </label>
        <select
          v-model="borderRadiusBottomRight"
          class="myPrimarySelect"
          @change="pageBuilderClass.handleBorderRadiusBottomRight(borderRadiusBottomRight)"
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
