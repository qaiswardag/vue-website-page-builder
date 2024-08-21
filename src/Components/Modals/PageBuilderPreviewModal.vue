<script setup>
import Modal from '@/Components/Modals/Modal.vue';
import { delay } from '@/helpers/delay';

import {
  Dialog,
  DialogOverlay,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';

import { useStore } from 'vuex';

defineProps({
  show: {
    type: Boolean,
    default: false,
    required: true,
  },
});

const emit = defineEmits(['firstDesignerPreviewModalButtonFunction']);

const store = useStore();

// first button function
const firstButton = async function () {
  emit('firstDesignerPreviewModalButtonFunction');

  store.commit('user/setIsLoading', true);
  await delay();

  store.commit('user/setIsLoading', false);
};

const handleEscapeKey = function () {
  firstButton();
};
</script>

<template>
  <teleport to="body">
    <TransitionRoot
      :show="show"
      as="template"
    >
      <Dialog
        @close="firstButton"
        @keydown.escape.prevent="handleEscapeKey"
        as="div"
        class="fixed z-30 inset-0 overflow-y-auto focus:outline-none"
        tabindex="0"
      >
        <div
          class="flex items-end justify-center pb-20 text-center sm:block sm:p-0 bg-white"
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
            <DialogOverlay
              class="fixed inset-0 bg-opacity-75 transition-opacity"
            />
          </TransitionChild>

          <!-- This element is to trick the browser into centering the modal contents. -->
          <span
            aria-hidden="true"
            class="hidden sm:inline-block sm:align-middle sm:h-screen"
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
                class="px-4 h-[14vh] flex items-center justify-between border-b border-gray-200 bg-white"
              >
                <div
                  @click="firstButton"
                  class="flex items-center justify-center gap-1 cursor-pointer"
                >
                  <span class="myPrimaryParagraph font-medium">
                    Close Preview
                  </span>
                  <span class="material-symbols-outlined"> close </span>
                </div>
              </div>
              <slot></slot>
            </div>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>
  </teleport>
</template>
