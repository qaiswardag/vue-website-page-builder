<script setup>
import { computed } from 'vue'
import { sharedPageBuilderStore } from '../../../../stores/shared-store'
import EditorAccordion from '../EditorAccordion.vue'
import { getPageBuilder } from '../../../../composables/builderInstance'
const pageBuilderService = getPageBuilder()

// Use shared store instance
const pageBuilderStateStore = sharedPageBuilderStore

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
      <div class="pbx-flex pbx-flex-row pbx-flex-wrap pbx-gap-2 pbx-mt-2"></div>
      <!-- delete & restore element # start -->
      <template v-if="getRestoredElement">
        <div class="pbx-border-b pbx-border-gray-200 pbx-mb-4 pbx-pb-8 pbx-pt-4">
          <p class="pbx-myPrimaryParagraph pbx-font-medium pbx-py-0">Restore</p>
          <label class="pbx-myPrimaryInputLabel"> Restore the last deleted HTML element.</label>
          <div class="pbx-px-2 pbx-flex pbx-items-center pbx-justify-start pbx-gap-2 pbx-w-max">
            <button
              @click="pageBuilderService.handleRestoreElement"
              type="button"
              class="pbx-myPrimaryButton pbx-w-full pbx-mt-4"
            >
              <span class="material-symbols-outlined"> undo </span>
              <span>Restore</span>
            </button>
          </div>
        </div>
      </template>

      <template v-if="getElement">
        <p class="pbx-myPrimaryParagraph pbx-font-medium pbx-py-0 pbx-mb-4 pbx-pt-4">Delete</p>
        <label class="pbx-myPrimaryInputLabel">
          Delete the currently selected HTML element from the page.</label
        >

        <div class="pbx-px-2 pbx-flex pbx-items-center pbx-justify-start pbx-gap-2 pbx-w-max">
          <button
            @click="pageBuilderService.handleDeleteElement"
            type="button"
            class="pbx-myPrimaryDeleteButton pbx-w-full pbx-mt-4"
          >
            <span class="hover:pbx-text-white">Delete element</span>
          </button>
        </div>
      </template>
      <!-- delete & restore element # end -->
    </template>
  </EditorAccordion>
</template>
