<script setup>
import Modal from '@/Components/Modals/Modal.vue'
import DynamicModal from '@/Components/Modals/DynamicModal.vue'
import PageBuilder from '@/composables/PageBuilder.ts'
import { delay } from '@/composables/delay'

import {
  Dialog,
  DialogOverlay,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { computed, onMounted, ref } from 'vue'
import { usePageBuilderStateStore } from '@/stores/page-builder-state'
import { useUserStore } from '@/stores/user'
import { useMediaLibraryStore } from '@/stores/media-library'

const mediaLibraryStore = useMediaLibraryStore()
const userStore = useUserStore()
const pageBuilderStateStore = usePageBuilderStateStore()

defineProps({
  show: {
    type: Boolean,
    default: false,
    required: true,
  },
})

const pageBuilder = new PageBuilder(pageBuilderStateStore, mediaLibraryStore)

const hideDraftButton = ref(true)

const showModalConfirmClosePageBuilder = ref(false)
//
// use dynamic model
const typeModal = ref('')
const gridColumnModal = ref(Number(1))
const titleModal = ref('')
const descriptionModal = ref('')
const firstButtonModal = ref('')
const secondButtonModal = ref(null)
const thirdButtonModal = ref(null)
// set dynamic modal handle functions
const firstModalButtonFunction = ref(null)
const secondModalButtonFunction = ref(null)
const thirdModalButtonFunction = ref(null)

const emit = defineEmits([
  'pageBuilderPrimaryHandler',
  'pageBuilderSecondaryHandler',
  'handleDraftForUpdate',
])

const firstButton = function () {
  showModalConfirmClosePageBuilder.value = true
  typeModal.value = 'danger'
  gridColumnModal.value = 3
  titleModal.value = 'Close page builder without save?'
  descriptionModal.value =
    'Are you sure you want to close the page builder without saving? Any changes will be lost.'
  firstButtonModal.value = 'Close'
  secondButtonModal.value = null
  thirdButtonModal.value = 'Exit Page Builder'

  // handle click
  firstModalButtonFunction.value = function () {
    showModalConfirmClosePageBuilder.value = false
  }
  // handle click
  secondModalButtonFunction.value = function () {
    secondButton()
  }

  // handle click
  thirdModalButtonFunction.value = async function () {
    showModalConfirmClosePageBuilder.value = false
    emit('pageBuilderPrimaryHandler')

    pageBuilder.removeHoveredAndSelected()
    userStore.setIsLoading(true)
    await delay()
    userStore.setIsLoading(false)
  }
  //
  // end modal
}

const handleEscapeKey = function () {
  firstButton()
}

// first button function
const secondButton = function () {
  emit('pageBuilderSecondaryHandler')
  pageBuilder.removeHoveredAndSelected()
}

//
//
const getLocalStorageItemNameUpdate = computed(() => {
  return pageBuilderStateStore.getLocalStorageItemNameUpdate
})
//
const handleDraftForUpdate = function () {
  hideDraftButton.value = false
  emit('handleDraftForUpdate')
}

onMounted(() => {
  const item = localStorage.getItem(getLocalStorageItemNameUpdate.value)
  if (item) {
    const parsedValue = JSON.parse(item)

    if (Array.isArray(parsedValue) && parsedValue.length === 0) {
      hideDraftButton.value = false
    }
  }
  if (!item) {
    hideDraftButton.value = false
  }
})
</script>

<template>
  <teleport to="body">
    <TransitionRoot :show="show" as="template">
      <Dialog
        @close="firstButton"
        @keydown.escape.prevent="handleEscapeKey"
        as="div"
        class="fixed z-30 inset-0 overflow-y-auto focus:outline-none"
        tabindex="0"
      >
        <div class="flex items-end justify-center pb-20 text-center sm:block sm:p-0 bg-white">
          <TransitionChild
            as="template"
            enter="ease-out duration-100"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="ease-in duration-200"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <DialogOverlay class="fixed inset-0 bg-white bg-opacity-75 transition-opacity" />
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
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div
              class="bg-red-100 inline-block align-bottom text-left transform transition-all sm:align-middle w-full overflow-hidden h-[100vh] top-0 left-0 right-0 absolute"
            >
              <DynamicModal
                :show="showModalConfirmClosePageBuilder"
                :type="typeModal"
                :gridColumnAmount="gridColumnModal"
                :title="titleModal"
                :description="descriptionModal"
                :firstButtonText="firstButtonModal"
                :secondButtonText="secondButtonModal"
                :thirdButtonText="thirdButtonModal"
                @firstModalButtonFunction="firstModalButtonFunction"
                @secondModalButtonFunction="secondModalButtonFunction"
                @thirdModalButtonFunction="thirdModalButtonFunction"
              >
                <header></header>
                <main></main>
              </DynamicModal>

              <slot></slot>
            </div>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>
  </teleport>
</template>
