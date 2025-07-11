<script setup lang="ts">
import { computed, ref } from 'vue'
import { sharedPageBuilderStore } from '../../../stores/shared-store'
import GlobalLoader from '../../../Components/Loaders/GlobalLoader.vue'
import { getPageBuilder } from '../../../composables/builderInstance'

const pageBuilderService = getPageBuilder()

// Use shared store instance
const pageBuilderStateStore = sharedPageBuilderStore

const getIsLoadingGlobal = computed(() => {
  return pageBuilderStateStore.getIsLoadingGlobal
})

const historyIndex = computed(() => pageBuilderStateStore.getHistoryIndex)
const historyLength = computed(() => pageBuilderStateStore.getHistoryLength)

const canUndo = computed(() => historyIndex.value > 0)
const canRedo = computed(() => historyIndex.value < historyLength.value - 1)

const handleUndo = async function () {
  const toolbar = document.querySelector('#pbxEditToolbar')
  if (toolbar) {
    toolbar.classList.remove('is-visible')
    toolbar.removeAttribute('style')
  }

  if (canUndo.value) {
    await pageBuilderService.undo()
  }
}
const handleRedo = async function () {
  if (canRedo.value) {
    await pageBuilderService.redo()
  }
}
</script>

<template>
  <GlobalLoader v-if="getIsLoadingGlobal"></GlobalLoader>
  <div class="pbx-flex-1 pbx-flex pbx-justify-center pbx-items-center pbx-py-2 pbx-w-full gap-2">
    <!-- Undo Start -->
    <button @click="handleUndo" type="button" :disabled="!canUndo">
      <div
        class="pbx-h-10 pbx-w-10 pbx-rounded-full pbx-flex pbx-items-center pbx-border-none pbx-justify-center pbx-bg-gray-50 pbx-aspect-square pbx-text-black hover:pbx-text-white"
        :class="[
          canUndo
            ? 'pbx-cursor-pointer hover:pbx-bg-myPrimaryLinkColor focus-visible:pbx-ring-0'
            : 'pbx-cursor-not-allowed pbx-bg-opacity-20  hover:pbx-bg-gray-200',
        ]"
      >
        <span class="material-symbols-outlined"> undo </span>
      </div>
    </button>
    <!-- Undo End -->
    <div
      class="pbx-text-xs pbx-text-gray-600 pbx-mx-2 pbx-py-3 pbx-px-2 pbx-border-solid pbx-border pbx-border-gray-200 pbx-rounded-full"
    >
      {{ historyIndex + 1 }}/{{ historyLength }}
    </div>
    <!-- Redo Start -->
    <button @click="handleRedo" type="button" :disabled="!canRedo">
      <div
        class="pbx-h-10 pbx-w-10 pbx-rounded-full pbx-flex pbx-items-center pbx-border-none pbx-justify-center pbx-bg-gray-50 pbx-aspect-square pbx-text-black hover:pbx-text-white"
        :class="[
          canRedo
            ? 'pbx-cursor-pointer hover:pbx-bg-myPrimaryLinkColor focus-visible:pbx-ring-0'
            : 'pbx-cursor-not-allowed pbx-bg-opacity-20  hover:pbx-bg-gray-200',
        ]"
      >
        <span class="material-symbols-outlined"> redo </span>
      </div>
    </button>
    <!-- Redo End -->
  </div>
</template>
