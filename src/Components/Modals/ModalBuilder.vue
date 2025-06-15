<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  hideHeader: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    required: true,
  },
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
    '6xl': 'sm:max-w-6xl',
    '7xl': 'sm:max-w-7xl',
    full: 'sm:max-w-full', // 100% width
    screen: 'sm:w-screen sm:max-w-none', // truly full screen
  }[props.maxWidth]
})
</script>

<template>
  <div>
    <!-- Modal -->
    <div
      v-if="showModalBuilder"
      class="fixed inset-0 z-50 flex items-center justify-center mx-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
    >
      <!-- Backdrop -->
      <div class="fixed inset-0 bg-black/50 transition-opacity" @click="handleClose"></div>

      <div
        class="relative inline-block bg-white rounded-xl text-left overflow-hidden shadow-xl transform transition-all min-w-[96vh] min-h-[98vh] max-w-[96vh] max-h-[98vh] overflow-y-auto sm:w-full p-4"
        :class="[
          maxWidthClass ? maxWidthClass : '',
          minHeight ? minHeight : '',
          maxHeight ? maxHeight : '',
        ]"
      >
        <template v-if="!hideHeader">
          <div class="lg:h-20 flex items-center justify-between border-b border-gray-200 bg-white">
            <h3 as="h3" class="myQuaternaryHeader my-0 py-0">
              {{ title }}
            </h3>
            <div
              class="h-10 w-10 flex-end cursor-pointer rounded-full flex items-center border-none justify-center bg-gray-50 aspect-square hover:bg-myPrimaryLinkColor hover:text-white hover:fill-white focus-visible:ring-0"
              @click="handleClose"
            >
              <span class="material-symbols-outlined"> close </span>
            </div>
          </div>
        </template>
        <slot></slot>
      </div>
    </div>
  </div>
</template>
