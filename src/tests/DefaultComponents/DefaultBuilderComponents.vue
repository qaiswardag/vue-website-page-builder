<script setup lang="ts">
import { ref, computed } from 'vue'
import componentHelpers from '../../utils/html-elements/componentHelpers'
import components from '../../utils/html-elements/component'
import { usePageBuilderModal } from '../../composables/usePageBuilderModal'
import { generateComponentPreview } from '../../utils/componentPreviews'
import type { ComponentObject } from '../../types'
import { getPageBuilder } from '../../composables/builderInstance'

import { useTranslations } from '../../composables/useTranslations'

const { translate } = useTranslations()

const pageBuilderService = getPageBuilder()

defineProps({
  customMediaComponent: {
    type: Object,
    default: null,
  },
})

const isLoading = ref(false)

const selectedCategory = ref('All')

const categories = computed(() => {
  const allCategories = components[0].components.data.map((comp) => comp.category)
  return ['All', ...new Set(allCategories)]
})

const filteredComponents = computed(() => {
  if (selectedCategory.value === 'All') {
    return components[0].components.data
  }
  return components[0].components.data.filter((comp) => comp.category === selectedCategory.value)
})

// Get modal close function
const { closeAddComponentModal } = usePageBuilderModal()

// Super simple component addition with professional modal closing!
const handleDropComponent = async function (componentObject: ComponentObject) {
  isLoading.value = true
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
  isLoading.value = false
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
.category-button {
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  padding: 8px 16px;
  margin: 4px;
  cursor: pointer;
  border-radius: 4px;
}
.category-button.active {
  background-color: #007bff;
  color: white;
  border-color: #007bff;
}
</style>

<template>
  <div>
    <template v-if="isLoading">
      <div class="pbx-min-h-[85vh] pbx-h-[85vh]">
        <div class="pbx-flex pbx-items-center pbx-justify-center">
          <div
            class="pbx-inline-block pbx-h-8 pbx-w-8 pbx-animate-spin pbx-rounded-full pbx-border-4 pbx-border-solid pbx-border-current pbx-border-r-transparent pbx-align-[-0.125em] motion-reduce:pbx-animate-[spin_1.5s_linear_infinite]"
          >
            <span
              class="!pbx-absolute !pbx-m-px !pbx-h-px !pbx-w-px !pbx-overflow-hidden !pbx-whitespace-nowrap !pbx-border-0 !pbx-p-0 !pbx-[clip:rect(0,0,0,0)]"
              >{{ translate('Loading...') }}</span
            >
          </div>
        </div>
      </div>
    </template>
    <div v-if="!isLoading">
      <!-- Helper Components Section -->
      <div class="pbx-mb-8">
        <h3 class="pbx-myQuaternaryHeader pbx-mb-4">{{ translate('Helper Components') }}</h3>
        <div
          class="pbx-px-2 pbx-grid pbx-grid-cols-1 sm:pbx-grid-cols-2 md:pbx-grid-cols-3 lg:pbx-grid-cols-4 pbx-gap-4"
        >
          <div
            v-for="helper in componentHelpers"
            :key="helper.title"
            class="pbx-border-solid pbx-border pbx-border-gray-400 pbx-overflow-hidden hover:pbx-border-myPrimaryLinkColor pbx-duration-100 pbx-cursor-pointer pbx-p-4"
            @click="handleDropComponent(helper)"
          >
            <div
              class="pbx-max-h-72 pbx-cursor-pointer pbx-object-contain pbx-bg-white pbx-mx-auto"
            >
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
      <div class="pbx-px-2" v-if="customMediaComponent">
        <h3 class="pbx-myQuaternaryHeader pbx-mb-4">{{ translate('Layout Components') }}</h3>
        <div class="pbx-mb-4 pbx-flex pbx-jusitify-left pbx-items-center pbx-gap-2">
          <button
            v-for="category in categories"
            :key="category"
            @click="selectedCategory = category"
            class="pbx-mySecondaryButton pbx-px-2 pbx-text-xs"
            :class="{ active: selectedCategory === category }"
          >
            {{ translate(category) }}
          </button>
        </div>
        <div
          class="pbx-grid pbx-grid-cols-1 sm:pbx-grid-cols-2 md:pbx-grid-cols-3 pbx-gap-4 pbx-pb-4"
        >
          <div
            v-for="comp in filteredComponents"
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
      <div>
        <button class="pbx-sr-only">Focusable fallback</button>
      </div>
    </div>
  </div>
</template>
