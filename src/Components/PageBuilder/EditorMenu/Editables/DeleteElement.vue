<script setup>
import EditorAccordion from '../EditorAccordion.vue'
import { computed } from 'vue'
import { sharedPageBuilderStore } from '../../../../stores/shared-store'
import PageBuilderClass from '../../../../composables/PageBuilderClass.ts'

// Use shared store instance
const pageBuilderStateStore = sharedPageBuilderStore

const pageBuilderClass = new PageBuilderClass(pageBuilderStateStore)
const getRestoredElement = computed(() => {
  return pageBuilderStateStore.getRestoredElement
})
</script>

<template>
  <EditorAccordion>
    <template #title>Delete or restore</template>
    <template #content>
      <div class="my-2">
        <button
          v-if="getRestoredElement !== null"
          @click="pageBuilderClass.handleRestoreElement"
          type="button"
          class="myPrimaryButton gap-2 items-center w-full"
        >
          <span class="material-symbols-outlined"> refresh </span>
          Restore Element
        </button>
        <button
          v-if="getRestoredElement === null"
          @click="pageBuilderClass.handleDeleteElement"
          type="button"
          class="myPrimaryDeleteButton gap-2 items-center w-full"
        >
          <span class="myMediumIcon material-symbols-outlined"> delete </span>
          Delete Element
        </button>
      </div>
    </template>
  </EditorAccordion>
</template>
