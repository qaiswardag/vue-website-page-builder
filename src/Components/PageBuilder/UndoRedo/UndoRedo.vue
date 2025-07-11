<script setup>
import { computed, ref, watch, provide } from 'vue'
import { sharedPageBuilderStore } from '../../../stores/shared-store'
import { delay } from '../../../composables/delay'
import DynamicModalBuilder from '../../../Components/Modals/DynamicModalBuilder.vue'
import GlobalLoader from '../../../Components/Loaders/GlobalLoader.vue'
import { useTranslations } from '../../../composables/useTranslations'
import { getPageBuilder } from '../../../composables/builderInstance'

const { translate } = useTranslations()
const pageBuilderService = getPageBuilder()

// Use shared store instance
const pageBuilderStateStore = sharedPageBuilderStore

const getRestoredElement = computed(() => {
  return pageBuilderStateStore.getRestoredElement
})

const handleUndo = async function () {
  await pageBuilderService.undo()
}
const handleRedo = async function () {
  await pageBuilderService.redo()
}
</script>

<template>
  <div class="pbx-flex pbx-items-center pbx-justify-center pbx-gap-2 pbx-border-gray-200 pbx-ml-12">
    <!-- Undo Start -->
    <button @click="handleUndo" type="button">
      <div
        class="pbx-h-10 pbx-w-10 pbx-cursor-pointer pbx-rounded-full pbx-flex pbx-items-center pbx-border-none pbx-justify-center pbx-bg-gray-50 pbx-aspect-square hover:pbx-bg-myPrimaryLinkColor focus-visible:pbx-ring-0 pbx-text-black hover:pbx-text-white"
      >
        <span class="material-symbols-outlined"> undo </span>
      </div>
    </button>
    <!-- Undo End -->
    <!-- Redo Start -->
    <button @click="handleRedo" type="button">
      <div
        class="pbx-h-10 pbx-w-10 pbx-cursor-pointer pbx-rounded-full pbx-flex pbx-items-center pbx-border-none pbx-justify-center pbx-bg-gray-50 pbx-aspect-square hover:pbx-bg-myPrimaryLinkColor focus-visible:pbx-ring-0 pbx-text-black hover:pbx-text-white"
      >
        <span class="material-symbols-outlined"> redo </span>
      </div>
    </button>
    <!-- Redo End -->

    <div class="pbx-p-4 pbx-bg-red-200 bpx-ml-6 pbx-my-4 pbx-rounded-2xl">
      <p class="pbx-text-sm pbx-py-2">getRestoredElement: {{ getRestoredElement }}</p>
    </div>
  </div>
</template>
