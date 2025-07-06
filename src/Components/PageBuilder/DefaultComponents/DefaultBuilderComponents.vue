<script setup lang="ts">
import componentHelpers from '../../../utils/html-elements/componentHelpers'
import components from '../../../utils/html-elements/component'
import { usePageBuilderModal } from '../../../composables/usePageBuilderModal'
import { generateComponentPreview } from '../../../utils/componentPreviews'
import type { ComponentObject } from '../../../types'
import { getPageBuilder } from '../../../composables/builderInstance'

import { useTranslations } from '../../../composables/useTranslations'

const { translate } = useTranslations()

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
  // Translate all occurrences of the hardcoded strings in the html_code
  const translatedHtmlCode = componentObject.html_code
    .replace(/Layouts and visual\./g, translate('Layouts and visual.'))
    .replace(
      /Start customizing by editing this default text directly in the editor\./g,
      translate('Start customizing by editing this default text directly in the editor.'),
    )

  // Create a new component object with the translated html_code and title
  const translatedComponentObject = {
    ...componentObject,
    html_code: translatedHtmlCode,
    title: componentObject.title,
  }

  await pageBuilderService.addComponent(translatedComponentObject)
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
      <h3 class="pbx-myQuaternaryHeader pbx-mb-4">{{ translate('Helper Components') }}</h3>
      <div
        class="pbx-grid pbx-grid-cols-1 sm:pbx-grid-cols-2 md:pbx-grid-cols-3 lg:pbx-grid-cols-4 pbx-gap-4"
      >
        <div
          v-for="helper in componentHelpers"
          :key="helper.title"
          class="pbx-border-solid pbx-border pbx-border-gray-400 pbx-overflow-hidden hover:pbx-border-myPrimaryLinkColor pbx-duration-100 pbx-cursor-pointer pbx-p-4"
          @click="handleDropComponent(helper)"
        >
          <div class="pbx-max-h-72 pbx-cursor-pointer pbx-object-contain pbx-bg-white pbx-mx-auto">
            <div v-if="false" class="pbx-mr-2" v-html="helper.icon"></div>
            <h4 class="pbx-myPrimaryParagraph pbx-text-base pbx-font-medium">
              {{ translate(helper.title) }}
            </h4>
          </div>
          <div class="pbx-myPrimaryParagraph pbx-text-xs pbx-font-normal pbx-pt-2">
            {{ translate('Click to add') }} {{ helper.title.toLowerCase() }}
            {{ translate('component') }}
          </div>
        </div>
      </div>
    </div>

    <!-- Regular Components Section -->
    <div v-if="customMediaComponent">
      <h3 class="pbx-myQuaternaryHeader pbx-mb-4">{{ translate('Layout Components') }}</h3>
      <div class="pbx-grid pbx-grid-cols-1 sm:pbx-grid-cols-2 md:pbx-grid-cols-3 pbx-gap-4">
        <div
          v-for="comp in components[0].components.data"
          :key="comp.title"
          class="pbx-border-solid pbx-border pbx-border-gray-400 pbx-overflow-hidden hover:pbx-border-myPrimaryLinkColor pbx-duration-100 pbx-cursor-pointer"
          @click="handleDropComponent(convertToComponentObject(comp))"
        >
          <div
            class="pbx-overflow-hidden pbx-whitespace-pre-line pbx-flex-1 pbx-h-auto pbx-border-solid pbx-border-b pbx-border-gray-200 lg:pbx-py-10 pbx-py-8 pbx-px-2"
          >
            <!-- Use SVG preview instead of external images -->
            <div
              class="pbx-max-h-72 pbx-cursor-pointer pbx-bg-white pbx-mx-auto pbx-flex pbx-items-center pbx-justify-center"
              v-html="getSvgPreview(comp.title)"
            ></div>
          </div>
          <div class="pbx-p-3">
            <h4 class="pbx-myPrimaryParagraph pbx-text-sm pbx-font-normal">
              {{ translate(comp.title) }}
            </h4>
            <div class="pbx-myPrimaryParagraph pbx-text-xs pbx-font-normal pbx-pt-2">
              {{ translate('Click to add component') }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
