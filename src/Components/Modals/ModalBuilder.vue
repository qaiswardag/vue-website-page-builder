<script setup lang="ts">
import { computed } from 'vue'
import { Dialog, DialogOverlay, TransitionChild, TransitionRoot } from '@headlessui/vue'

const props = defineProps({
  showModalBuilder: {
    type: Boolean,
    default: false,
  },
  maxWidth: {
    type: String,
    default: '2xl',
  },
  minHeight: {
    type: String,
  },
  maxHeight: {
    type: String,
  },
})

const emit = defineEmits(['closeMainModalBuilder'])

const handleClose = () => {
  emit('closeMainModalBuilder')
}

const maxWidthClass = computed(() => {
  return {
    sm: 'sm:max-w-sm',
    md: 'sm:max-w-md',
    lg: 'sm:max-w-lg',
    xl: 'sm:max-w-xl',
    '2xl': 'sm:max-w-2xl',
    '3xl': 'sm:max-w-3xl',
    '4xl': 'sm:max-w-4xl',
    '5xl': 'sm:max-w-5xl',
  }[props.maxWidth]
})
</script>

<template>
  <TransitionRoot :show="showModalBuilder" as="template">
    <Dialog as="div" class="font-sans fixed z-30 inset-0 overflow-y-auto" @close="handleClose">
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
            class="relative inline-block align-bottom bg-white rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:align-top top-4 sm:w-full w-[96%]"
            :class="[
              maxWidthClass ? maxWidthClass : '',
              minHeight ? minHeight : '',
              maxHeight ? maxHeight : '',
            ]"
          >
            <slot></slot>
          </div>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
