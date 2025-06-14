<script setup>
import {
  Dialog,
  DialogOverlay,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import { provide } from 'vue'
import DefaultMediaLibraryComponent from '../PageBuilder/DefaultComponents/DefaultMediaLibraryComponent.vue'

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    required: true,
  },
  firstButtonText: {
    type: String,
  },
  secondButtonText: {
    type: String,
  },
  thirdButtonText: {
    type: String,
  },
  open: {
    required: true,
  },
  customMediaComponent: {
    type: Object,
    default: null,
  },
})

const emit = defineEmits([
  'firstMediaButtonFunction',
  'secondMediaButtonFunction',
  'thirdMediaButtonFunction',
])

// first button function
const firstButton = function () {
  emit('firstMediaButtonFunction')
}

// second button  function
const secondButton = function () {
  emit('secondMediaButtonFunction')
}

// third button function
const thirdButton = function () {
  emit('thirdMediaButtonFunction')
}

// Provide close function for custom components
const closeMediaLibraryModal = () => {
  firstButton()
}
provide('closeMediaLibraryModal', closeMediaLibraryModal)
</script>

<template>
  <TransitionRoot :show="open" as="template">
    <Dialog as="div" class="fixed z-30 inset-0 overflow-y-auto sm:px-4" @close="firstButton">
      <div class="flex items-end justify-center text-center sm:block sm:p-0">
        <TransitionChild
          as="template"
          enter="ease-out duration-100"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-100"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <DialogOverlay class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <!-- This element is to trick the browser into centering the modal contents. -->
        <span aria-hidden="true" class="hidden sm:inline-block sm:align-middle sm:h-screen"
          >&#8203;</span
        >
        <TransitionChild
          as="template"
          enter="ease-out duration-100"
          enter-from="opacity-0 scale-95"
          enter-to="opacity-100 scale-100"
          leave="ease-in duration-100"
          leave-from="opacity-100 scale-100"
          leave-to="opacity-0 scale-95"
        >
          <div
            class="font-sans relative my-2 inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-7xl sm:w-full"
          >
            <div class="flex gap-2 justify-between items-center border-b border-gray-200 p-4 mb-2">
              <DialogTitle as="h3" class="tertiaryHeader my-0 py-0">
                {{ title }}
              </DialogTitle>

              <div class="flex-end">
                <div class="flex-end">
                  <button
                    type="button"
                    class="h-10 w-10 cursor-pointer rounded-full flex items-center border-none justify-center bg-gray-50 aspect-square hover:bg-myPrimaryLinkColor hover:text-white hover:fill-white focus-visible:ring-0 text-myPrimaryDarkGrayColor"
                    @click="firstButton"
                    aria-label="Close"
                  >
                    <span class="material-symbols-outlined"> close </span>
                  </button>
                </div>
              </div>
            </div>

            <div class="p-4">
              <!-- Show only custom media component if provided -->
              <div v-if="customMediaComponent" class="w-full">
                <component :is="customMediaComponent" />
              </div>
              <div v-else>
                <DefaultMediaLibraryComponent />
              </div>
            </div>
          </div>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
