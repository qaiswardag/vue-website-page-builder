<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
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
    sm: 'lg:max-w-sm',
    md: 'lg:max-w-md',
    lg: 'lg:max-w-lg',
    xl: 'lg:max-w-xl',
    '2xl': 'lg:max-w-2xl',
    '3xl': 'lg:max-w-3xl',
    '4xl': 'lg:max-w-4xl',
    '5xl': 'lg:max-w-5xl',
    '6xl': 'lg:max-w-6xl',
    '7xl': 'lg:max-w-7xl',
    full: 'lg:max-w-full', // 100% width
    screen: 'lg:w-screen sm:max-w-none', // truly full screen
  }[props.maxWidth]
})
</script>

<template>
  <teleport to="body">
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
          class="relative inline-block bg-white rounded-xl text-left overflow-hidden shadow-xl transform transition-all max-w-[96vh] max-h-[98vh] overflow-y-auto w-full px-4"
          :class="[
            maxWidthClass ? maxWidthClass : '',
            minHeight ? minHeight : '',
            maxHeight ? maxHeight : '',
          ]"
        >
          <div
            class="h-16 flex items-center justify-between border-b border-gray-200 bg-white mb-2"
          >
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
          <slot></slot>
        </div>
      </div>
    </div>
  </teleport>
</template>
