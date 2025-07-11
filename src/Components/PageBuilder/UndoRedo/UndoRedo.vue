<script setup>
import { computed } from 'vue'
import { sharedPageBuilderStore } from '../../../stores/shared-store'
import GlobalLoader from '../../../Components/Loaders/GlobalLoader.vue'
import { getPageBuilder } from '../../../composables/builderInstance'

const pageBuilderService = getPageBuilder()

// Use shared store instance
const pageBuilderStateStore = sharedPageBuilderStore

const getIsLoadingGlobal = computed(() => {
  return pageBuilderStateStore.getIsLoadingGlobal
})

const handleUndo = async function () {
  await pageBuilderService.undo()
}
const handleRedo = async function () {
  await pageBuilderService.redo()
}
</script>

<template>
  <GlobalLoader v-if="getIsLoadingGlobal"></GlobalLoader>
  <div class="pbx-flex-1 pbx-flex pbx-justify-center pbx-items-center pbx-py-2 pbx-w-full gap-2">
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
        class="pbx-h-10 pbx-w-10 pbx-cursor-pointer pbx-rounded-full pbx-flex pbx-items-center pbx-border-none pbx-justify-center pbx-bg-gray-50 pbx-aspect-square hover:pbx-bg-myPrimaryLinkColor focus-visible:pbx-ring-0 pbx-text-black hover:pbx-text-white pbx-ml-2"
      >
        <span class="material-symbols-outlined"> redo </span>
      </div>
    </button>
    <!-- Redo End -->
  </div>
</template>
