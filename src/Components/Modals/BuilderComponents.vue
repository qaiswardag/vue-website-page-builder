<script setup>
import ModalBuilder from '../Modals/ModalBuilder.vue'
import DefaultBuilderComponents from '../PageBuilder/DefaultComponents/DefaultBuilderComponents.vue'

defineProps({
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
  CustomBuilderComponents: {
    type: Object,
    default: null,
  },
})
const emit = defineEmits(['firstModalButtonSearchComponentsFunction'])

// first button function
const firstButtonBuilder = function () {
  emit('firstModalButtonSearchComponentsFunction')
}
</script>

<template>
  <ModalBuilder
    :title="title"
    maxWidth="5xl"
    :showModalBuilder="show"
    @closeMainModalBuilder="firstButtonBuilder"
    minHeight=""
    maxHeight=""
  >
    <div
      class="font-sans w-full relative inline-block align-bottom text-left overflow-hidden transform transition-all sm:align-middle"
    >
      <div>
        <!-- Only show custom search component if provided -->
        <div v-if="CustomBuilderComponents">
          <component :is="CustomBuilderComponents" />
        </div>
        <div v-else><DefaultBuilderComponents /></div>
      </div>
    </div>
    <div class="py-4 flex sm:justify-end justify-center border-t border-gray-200 mt-4">
      <div class="sm:w-3/6 w-full px-2 my-2 flex gap-2 justify-end">
        <button
          v-if="firstButtonText"
          ref="firstButtonRef"
          class="mySecondaryButton"
          type="button"
          @click="firstButtonBuilder"
        >
          {{ firstButtonText }}
        </button>
      </div>
    </div>
  </ModalBuilder>
</template>
