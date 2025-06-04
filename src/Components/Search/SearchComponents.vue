<script setup>
import Modal from '@/Components/Modals/Modal.vue'

const props = defineProps({
  firstButtonText: {
    required: true,
  },
  title: {
    required: true,
  },
  show: {
    type: Boolean,
    default: false,
    required: true,
  },
  CustomSearchComponent: {
    type: Object,
    default: null,
  },
})
const emit = defineEmits(['firstModalButtonSearchComponentsFunction'])

// first button function
const firstButton = function () {
  emit('firstModalButtonSearchComponentsFunction')
}
</script>

<template>
  <Modal maxWidth="5xl" :show="show" @close="firstButton" minHeight="" maxHeight="">
    <div
      class="w-full relative inline-block align-bottom text-left overflow-hidden transform transition-all sm:align-middle"
    >
      <div class="flex items-center border-b border-gray-200 p-4 mb-2">
        <div class="flex-1">
          <h3 class="tertiaryHeader my-0 py-0">
            {{ title }}
          </h3>
        </div>
        <div
          class="h-10 w-10 flex-start cursor-pointer rounded-full flex items-center border-none justify-center bg-gray-50 aspect-square hover:bg-myPrimaryLinkColor hover:text-white hover:fill-white focus-visible:ring-0"
          @click="firstButton"
        >
          <span class="material-symbols-outlined"> close </span>
        </div>
      </div>

      <div class="p-4">
        <!-- Only show custom search component if provided -->
        <div v-if="CustomSearchComponent" class="border border-gray-200 rounded-lg p-4">
          <component :is="CustomSearchComponent" />
        </div>
        <div v-else class="text-center py-8 text-gray-500">
          <p>No custom search component provided</p>
        </div>
      </div>
    </div>
    <div class="bg-slate-50 px-2 py-4 flex sm:justify-end justify-center">
      <div class="sm:w-3/6 w-full px-2 my-2 flex gap-2 justify-end">
        <button
          v-if="firstButtonText"
          ref="firstButtonRef"
          class="mySecondaryButton"
          type="button"
          @click="firstButton"
        >
          {{ firstButtonText }}
        </button>
      </div>
    </div>
  </Modal>
</template>
