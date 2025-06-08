<script setup lang="ts">
import componentHelpers from '../../utils/html-elements/componentHelpers'
import components from '../../utils/html-elements/component'
import PageBuilderClass from '../../composables/PageBuilderClass'
import { usePageBuilderModal } from '../../composables/usePageBuilderModal'
import { generateComponentPreview } from '../../utils/componentPreviews'
import type { ComponentObject } from '../../types'
import { usePageBuilderStateStore } from '../../stores/page-builder-state'

import { inject } from 'vue'

// Get store from parent PageBuilder component
const internalPinia = inject('internalPinia')

const pageBuilderStateStore = usePageBuilderStateStore(internalPinia)
// Get modal close function
const { closeAddComponentModal } = usePageBuilderModal()

const pageBuilderClass = new PageBuilderClass(pageBuilderStateStore!)

// Super simple component addition with professional modal closing!
const handleDropComponent = function (componentObject: ComponentObject) {
  pageBuilderClass.addComponent(componentObject)
  closeAddComponentModal()
}

// Helper function to convert ComponentData to ComponentObject
const convertToComponentObject = function (comp: any): ComponentObject {
  return {
    id: null, // Generate ID when needed in PageBuilderClass
    html_code: comp.html_code,
    title: comp.title,
  }
}

// Handle image load errors
const handleImageError = (event: Event, title: string) => {
  const img = event.target as HTMLImageElement
  const container = img.parentElement
  if (container) {
    // Generate and set SVG preview
    const svgPreview = generateComponentPreview(title)
    container.innerHTML = `<div class="w-full h-full flex items-center justify-center">${svgPreview}</div>`
  }
}

// Check if we should show SVG preview instead of image
const shouldShowSvgPreview = (comp: any) => {
  // Always show SVG preview for better reliability
  return true
}

// Get SVG preview for component
const getSvgPreview = (title: string) => {
  return generateComponentPreview(title)
}
</script>

<style scoped>
/* Add any additional styling if needed */
</style>

<template>
  <div class="p-4">
    <!-- Helper Components Section -->
    <div class="mb-8">
      <h3 class="myQuaternaryHeader mb-4">Helper Components</h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div
          v-for="helper in componentHelpers"
          :key="helper.title"
          class="border border-gray-200 overflow-hidden hover:border-myPrimaryLinkColor duration-100 cursor-pointer p-4"
          @click="handleDropComponent(helper)"
        >
          <div class="max-h-72 cursor-pointer object-contain bg-white mx-auto">
            <div class="mr-2" v-html="helper.icon"></div>
            <h4 class="myPrimaryParagraph text-sm font-normal">{{ helper.title }}</h4>
          </div>
          <div class="myPrimaryParagraph text-xs font-normal pt-2">
            Click to add {{ helper.title.toLowerCase() }} component
          </div>
        </div>
      </div>
    </div>

    <!-- Regular Components Section -->
    <div>
      <h3 class="myQuaternaryHeader mb-4">Layout Components</h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div
          v-for="comp in components[0].components.data"
          :key="comp.title"
          class="border border-gray-200 overflow-hidden hover:border-myPrimaryLinkColor duration-100 cursor-pointer"
          @click="handleDropComponent(convertToComponentObject(comp))"
        >
          <div
            class="overflow-hidden whitespace-pre-line flex-1 h-auto border-b border-gray-200 lg:py-10 py-8 px-2"
          >
            <!-- Use SVG preview instead of external images -->
            <div
              class="max-h-72 cursor-pointer bg-white mx-auto flex items-center justify-center"
              v-html="getSvgPreview(comp.title)"
            ></div>
          </div>
          <div class="p-3">
            <h4 class="myPrimaryParagraph text-sm font-normal">{{ comp.title }}</h4>
            <div class="myPrimaryParagraph text-xs font-normal pt-2">Click to add component</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
