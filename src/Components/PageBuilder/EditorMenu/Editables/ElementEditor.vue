<script setup>
import { computed } from 'vue'
import { sharedPageBuilderStore } from '../../../../stores/shared-store'
import PageBuilderClass from '../../../../composables/PageBuilderClass.ts'
import EditorAccordion from '../EditorAccordion.vue'

// Use shared store instance
const pageBuilderStateStore = sharedPageBuilderStore

const pageBuilderClass = new PageBuilderClass(pageBuilderStateStore)

const getElement = computed(() => {
  return pageBuilderStateStore.getElement
})

const getRestoredElement = computed(() => {
  return pageBuilderStateStore.getRestoredElement
})
</script>

<template>
  <EditorAccordion v-if="getElement || getRestoredElement">
    <template #title>Selected HTML Element</template>
    <template #content>
      <div class="flex flex-row flex-wrap gap-2 mt-2"></div>
      <!-- delete & restore element # start -->
      <template v-if="getRestoredElement">
        <div class="border-b border-gray-200 mb-4 pb-8 pt-4">
          <p class="myPrimaryParagraph font-medium py-0">Restore</p>
          <label class="myPrimaryInputLabel"> Restore the last deleted HTML element.</label>
          <div class="px-2 flex items-center justify-start gap-2">
            <button
              @click="pageBuilderClass.handleRestoreElement"
              type="button"
              class="myPrimaryButton w-full mt-4"
            >
              <span class="material-symbols-outlined"> undo </span>
              <span>Restore</span>
            </button>
          </div>
        </div>
      </template>

      <template v-if="getElement">
        <p class="myPrimaryParagraph font-medium py-0 mb-4 pt-4">Delete</p>
        <label class="myPrimaryInputLabel">
          Delete the currently selected HTML element from the page.</label
        >

        <div class="px-2 flex items-center justify-start gap-2">
          <button
            @click="pageBuilderClass.handleDeleteElement"
            type="button"
            class="myPrimaryDeleteButton w-full mt-4"
          >
            <span class="hover:text-white">Delete element</span>
          </button>
        </div>
      </template>
      <!-- delete & restore element # end -->
    </template>
  </EditorAccordion>
</template>
