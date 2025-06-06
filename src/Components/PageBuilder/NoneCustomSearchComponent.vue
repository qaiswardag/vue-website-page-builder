<script setup lang="ts">
import componentHelpers from '../../utils/html-elements/componentHelpers'
import components from '../../utils/html-elements/component'
import PageBuilderClass from '../../composables/PageBuilderClass'
import { usePageBuilderModal } from '../../composables/usePageBuilderModal'
import type { ComponentObject, PageBuilderStateStore, MediaLibraryStore } from '../../types'

import { inject } from 'vue'

// Get stores from parent PageBuilder component
const pageBuilderStateStore = inject<PageBuilderStateStore>('pageBuilderStateStore')
const mediaLibraryStore = inject<MediaLibraryStore>('mediaLibraryStore')

// Get modal close function
const { closeAddComponentModal } = usePageBuilderModal()

const pageBuilderClass = new PageBuilderClass(pageBuilderStateStore!, mediaLibraryStore!)

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
</script>

<style scoped>
/* Add any additional styling if needed */
</style>

<template>
  <div class="p-4">
    <!-- Helper Components Section -->
    <div class="mb-8">
      <h3 class="text-lg font-semibold mb-4">Helper Components</h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div
          v-for="helper in componentHelpers"
          :key="helper.title"
          class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
          @click="handleDropComponent(helper)"
        >
          <div class="max-h-72 cursor-pointer object-contain bg-white mx-auto">
            <div class="mr-2" v-html="helper.icon"></div>
            <h4 class="font-medium">{{ helper.title }}</h4>
          </div>
          <div class="text-sm text-gray-600">
            Click to add {{ helper.title.toLowerCase() }} component
          </div>
        </div>
      </div>
    </div>

    <!-- Regular Components Section -->
    <div>
      <h3 class="text-lg font-semibold mb-4">Layout Components</h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div
          v-for="comp in components[0].components.data"
          :key="comp.title"
          class="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
          @click="handleDropComponent(convertToComponentObject(comp))"
        >
          <div
            class="overflow-hidden whitespace-pre-line flex-1 h-auto rounded-lg border border-gray-200 lg:py-10 py-8 px-2"
          >
            <img
              v-if="comp.cover_image"
              :src="comp.cover_image"
              :alt="comp.title"
              class="max-h-72 cursor-pointer object-contain bg-white mx-auto"
            />
            <div v-else class="text-gray-500">{{ comp.title }}</div>
          </div>
          <div class="p-3">
            <h4 class="font-medium">{{ comp.title }}</h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
