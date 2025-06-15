<script setup lang="ts">
import { computed } from 'vue'
import { delay } from '../../composables/delay'
import ModalBuilder from './ModalBuilder.vue'

// Use shared store instance
import { sharedPageBuilderStore } from '../../stores/shared-store'

defineProps({
  show: {
    type: Boolean,
    default: false,
    required: true,
  },
})

const pageBuilderStateStore = sharedPageBuilderStore
const emit = defineEmits(['firstPageBuilderPreviewModalButton'])

// first button function
const firstButton = async function () {
  emit('firstPageBuilderPreviewModalButton')

  pageBuilderStateStore.setIsLoading(true)
  await delay()
  pageBuilderStateStore.setIsLoading(false)
}

const handleEscapeKey = function () {
  firstButton()
}

const getConfigPageBuilder = computed(() => {
  return pageBuilderStateStore.getConfigPageBuilder
})
</script>

<template>
  <ModalBuilder
    :hideHeader="true"
    title="Preview"
    :showModalBuilder="show"
    @closeMainModalBuilder="handleEscapeKey"
    maxWidth="screen"
  >
    <div>
      <div class="px-4 lg:h-20 flex items-center justify-between border-b border-gray-200 bg-white">
        <div
          v-if="
            getConfigPageBuilder &&
            getConfigPageBuilder.pageBuilderLogo &&
            getConfigPageBuilder.pageBuilderLogo.src
          "
          class="flex items-center divide-x divide-gray-200"
        >
          <div class="pr-4">
            <img class="h-6" :src="getConfigPageBuilder.pageBuilderLogo.src" alt="Logo" />
          </div>
          <span class="myPrimaryParagraph font-medium pl-4">Preview mode </span>
        </div>
        <div v-else>
          <div class="pr-6">
            <span class="myPrimaryParagraph font-medium">Preview mode </span>
          </div>
        </div>

        <div @click="firstButton" class="flex items-center justify-center gap-1 cursor-pointer">
          <span class="myPrimaryParagraph font-medium"> Close Preview </span>
          <div
            class="h-10 w-10 cursor-pointer rounded-full flex items-center border-none justify-center bg-gray-50 aspect-square hover:bg-myPrimaryLinkColor hover:text-white focus-visible:ring-0"
          >
            <span class="material-symbols-outlined"> close </span>
          </div>
        </div>
      </div>
      <slot></slot>
    </div>
  </ModalBuilder>
</template>
