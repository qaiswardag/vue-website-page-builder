<script setup lang="ts">
import componentHelpers from '../../../utils/html-elements/componentHelpers'
import components from '../../../utils/html-elements/component'
import { usePageBuilderModal } from '../../../composables/usePageBuilderModal'
import { generateComponentPreview } from '../../../utils/componentPreviews'
import type { ComponentObject } from '../../../types'
import { getPageBuilder } from '../../../composables/builderInstance'
const pageBuilderService = getPageBuilder()

defineProps({
  customMediaComponent: {
    type: Object,
    default: null,
  },
})

// Get modal close function
const { closeAddComponentModal } = usePageBuilderModal()

// Super simple component addition with professional modal closing!
const handleDropComponent = async function (componentObject: ComponentObject) {
  await pageBuilderClass.addComponent(componentObject)
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

// Get SVG preview for component
const getSvgPreview = (title: string) => {
  return generateComponentPreview(title)
}
</script>

<style scoped>
/* Add any additional styling if needed */
</style>

<template>
  <div>
    <!-- Helper Components Section -->
    <div class="pbx-mb-8">
      <h3 class="pbx-myQuaternaryHeader pbx-mb-4">Helper Components</h3>
      <div
        class="pbx-grid pbx-grid-cols-1 sm:pbx-grid-cols-2 md:pbx-grid-cols-3 lg:pbx-grid-cols-4 pbx-gap-4"
      >
        <div
          v-for="helper in componentHelpers"
          :key="helper.title"
          class="pbx-border pbx-border-gray-200 pbx-overflow-hidden hover:pbx-border-myPrimaryLinkColor pbx-duration-100 pbx-cursor-pointer pbx-p-4"
          @click="handleDropComponent(helper)"
        >
          <div class="pbx-max-h-72 pbx-cursor-pointer pbx-object-contain pbx-bg-white pbx-mx-auto">
            <div v-if="false" class="pbx-mr-2" v-html="helper.icon"></div>
            <h4 class="pbx-myPrimaryParagraph pbx-text-base pbx-font-medium">{{ helper.title }}</h4>
          </div>
          <div class="pbx-myPrimaryParagraph pbx-text-xs pbx-font-normal pbx-pt-2">
            Click to add {{ helper.title.toLowerCase() }} component
          </div>
        </div>
      </div>
    </div>

    <!-- Regular Components Section -->
    <div v-if="customMediaComponent">
      <h3 class="pbx-myQuaternaryHeader pbx-mb-4">Layout Components</h3>
      <div class="pbx-grid pbx-grid-cols-1 sm:pbx-grid-cols-2 md:pbx-grid-cols-3 pbx-gap-4">
        <div
          v-for="comp in components[0].components.data"
          :key="comp.title"
          class="pbx-border pbx-border-gray-200 pbx-overflow-hidden hover:pbx-border-myPrimaryLinkColor pbx-duration-100 pbx-cursor-pointer"
          @click="handleDropComponent(convertToComponentObject(comp))"
        >
          <div
            class="pbx-overflow-hidden pbx-whitespace-pre-line pbx-flex-1 pbx-h-auto pbx-border-b pbx-border-gray-200 lg:pbx-py-10 pbx-py-8 pbx-px-2"
          >
            <!-- Use SVG preview instead of external images -->
            <div
              class="pbx-max-h-72 pbx-cursor-pointer pbx-bg-white pbx-mx-auto pbx-flex pbx-items-center pbx-justify-center"
              v-html="getSvgPreview(comp.title)"
            ></div>
          </div>
          <div class="pbx-p-3">
            <h4 class="pbx-myPrimaryParagraph pbx-text-sm pbx-font-normal">{{ comp.title }}</h4>
            <div class="pbx-myPrimaryParagraph pbx-text-xs pbx-font-normal pbx-pt-2">
              Click to add component
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
