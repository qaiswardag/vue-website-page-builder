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
  <EditorAccordion>
    <template #title>Selected HTML Element</template>
    <template #content>
      <div class="flex flex-row flex-wrap gap-2 mt-2"></div>
      <div>
        <!-- delete & restore element # start -->
        <template v-if="getRestoredElement">
          <div class="px-2 flex items-center justify-start gap-2">
            <button
              @click="pageBuilderClass.handleRestoreElement"
              type="button"
              class="myPrimaryButton w-full"
            >
              <span class="material-symbols-outlined"> undo </span>
              <span>Undo</span>
            </button>
          </div>
        </template>

        <template v-if="getElement && !getRestoredElement">
          <div class="px-2 flex items-center justify-start gap-2">
            <button
              @click="pageBuilderClass.handleDeleteElement"
              type="button"
              class="myPrimaryDeleteButton w-full"
            >
              <span class="material-symbols-outlined"> delete </span>
              <span class="hover:text-white">Delete element</span>
            </button>
          </div>
        </template>
        <!-- delete & restore element # end -->
      </div>
    </template>
  </EditorAccordion>
</template>
