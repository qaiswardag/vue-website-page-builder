<script setup>
import EditorAccordion from '../EditorAccordion.vue'
import { computed } from 'vue'
import { sharedPageBuilderStore } from '../../../../stores/shared-store'
import { getPageBuilder } from '../../../../composables/builderInstance'
const pageBuilderService = getPageBuilder()

// Use shared store instance
const pageBuilderStateStore = sharedPageBuilderStore

const getRestoredElement = computed(() => {
  return pageBuilderStateStore.getRestoredElement
})
</script>

<template>
  <EditorAccordion>
    <template #title>Delete or restore</template>
    <template #content>
      <div class="pbx-my-2">
        <button
          v-if="getRestoredElement !== null"
          @click="pageBuilderClass.handleRestoreElement"
          type="button"
          class="pbx-myPrimaryButton pbx-gap-2 pbx-items-center pbx-w-full"
        >
          <span class="material-symbols-outlined"> refresh </span>
          Restore Element
        </button>
        <button
          v-if="getRestoredElement === null"
          @click="pageBuilderClass.handleDeleteElement"
          type="button"
          class="pbx-myPrimaryDeleteButton pbx-gap-2 pbx-items-center pbx-w-full"
        >
          <span class="pbx-myMediumIcon material-symbols-outlined"> delete </span>
          Delete Element
        </button>
      </div>
    </template>
  </EditorAccordion>
</template>
