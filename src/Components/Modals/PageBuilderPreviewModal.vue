<script setup>
import { computed } from 'vue'
import { delay } from '../../composables/delay'
import { Dialog, DialogOverlay, TransitionChild, TransitionRoot } from '@headlessui/vue'

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
  <TransitionRoot :show="show" as="template">
    <Dialog
      @close="firstButton"
      @keydown.escape.prevent="handleEscapeKey"
      as="div"
      class="fixed z-30 inset-0 overflow-y-auto focus:outline-none"
      tabindex="0"
    >
      <div
        class="font-sans flex items-end justify-center pb-20 text-center sm:block sm:p-0 bg-white"
      >
        <TransitionChild
          as="template"
          enter="ease-out duration-100"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-100"
          leave-from="opacity-100"
          leave-to="opacity-100"
        >
          <DialogOverlay class="fixed inset-0 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <!-- This element is to trick the browser into centering the modal contents. -->
        <span aria-hidden="true" class="hidden sm:inline-block sm:align-middle sm:h-screen"
          >&#8203;</span
        >
        <TransitionChild
          as="template"
          enter="ease-out duration-100"
          enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enter-to="opacity-100 translate-y-0 sm:scale-100"
          leave="ease-in duration-100"
          leave-from="opacity-100 translate-y-0 sm:scale-100"
          leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <div
            class="bg-red-100 inline-block align-bottom text-left transform transition-all sm:align-middle w-full overflow-hidden h-[100vh] top-0 left-0 right-0 absolute"
          >
            <div
              class="px-4 lg:h-[10vh] h-[16vh] flex items-center justify-between border-b border-gray-200 bg-white"
            >
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

              <div
                @click="firstButton"
                class="flex items-center justify-center gap-1 cursor-pointer"
              >
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
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
