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
    sm: 'lg:pbx-max-w-sm',
    md: 'lg:pbx-max-w-md',
    lg: 'lg:pbx-max-w-lg',
    xl: 'lg:pbx-max-w-xl',
    '2xl': 'lg:pbx-max-w-2xl',
    '3xl': 'lg:pbx-max-w-3xl',
    '4xl': 'lg:pbx-max-w-4xl',
    '5xl': 'lg:pbx-max-w-5xl',
    '6xl': 'lg:pbx-max-w-6xl',
    '7xl': 'lg:pbx-max-w-7xl',
    full: 'lg:pbx-max-w-full', // 100% width
    screen: 'lg:w-screen sm:pbx-max-w-none', // truly full screen
  }[props.maxWidth]
})
</script>

<template>
  <teleport to="body">
    <div class="pbx-font-sans">
      <!-- Modal -->
      <div
        v-if="showModalBuilder"
        class="pbx-fixed pbx-inset-0 pbx-z-40 pbx-flex pbx-items-center pbx-justify-center pbx-mx-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
      >
        <!-- Backdrop -->
        <div
          class="pbx-fixed pbx-inset-0 pbx-bg-black/50 pbx-transition-opacity"
          @click="handleClose"
        ></div>

        <div
          class="pbx-relative pbx-inline-block pbx-bg-white pbx-rounded-xl pbx-text-left pbx-overflow-hidden pbx-shadow-xl pbx-transform pbx-transition-all pbx-max-w-[96vh] pbx-max-h-[98vh] pbx-overflow-y-auto pbx-w-full pbx-px-4"
          :class="[
            maxWidthClass ? maxWidthClass : '',
            minHeight ? minHeight : '',
            maxHeight ? maxHeight : '',
          ]"
        >
          <div
            class="pbx-h-16 pbx-flex pbx-items-center pbx-justify-between pbx-border-b pbx-border-gray-200 pbx-bg-white pbx-mb-2"
          >
            <h3 as="h3" class="pbx-myQuaternaryHeader pbx-my-0 pbx-py-0">
              {{ title }}
            </h3>
            <div
              class="pbx-h-10 pbx-w-10 pbx-flex-end pbx-cursor-pointer pbx-rounded-full pbx-flex pbx-items-center pbx-border-none pbx-justify-center pbx-bg-gray-50 pbx-aspect-square hover:pbx-bg-myPrimaryLinkColor hover:pbx-text-white hover:pbx-fill-white focus-visible:pbx-ring-0"
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
