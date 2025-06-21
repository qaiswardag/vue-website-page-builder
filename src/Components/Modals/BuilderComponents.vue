<script setup>
import ModalBuilder from '../Modals/ModalBuilder.vue'
import DefaultBuilderComponents from '../PageBuilder/DefaultComponents/DefaultBuilderComponents.vue'
import { inject } from 'vue'
const customMediaComponent = inject('CustomMediaComponent')

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
    maxWidth="6xl"
    :showModalBuilder="show"
    @closeMainModalBuilder="firstButtonBuilder"
    minHeight=""
    maxHeight=""
  >
    <div class="pbx-w-full pbx-inset-x-0 pbx-bg-white pbx-overflow-x-scroll lg:pbx-pt-2 pbx-pt-2">
      <div>
        <!-- Only show custom search component if provided -->
        <div v-if="CustomBuilderComponents">
          <component :is="CustomBuilderComponents" />
        </div>
        <div class="pbx-h-[75vh]" v-else>
          <DefaultBuilderComponents :customMediaComponent="customMediaComponent" />
        </div>
      </div>
    </div>
    <div
      class="pbx-py-4 pbx-flex sm:pbx-justify-end pbx-justify-center pbx-border-t pbx-border-gray-200 pbx-mt-4"
    >
      <div class="sm:pbx-w-3/6 pbx-w-full pbx-px-2 pbx-my-2 pbx-flex pbx-gap-2 pbx-justify-end">
        <button
          v-if="firstButtonText"
          ref="firstButtonRef"
          class="pbx-mySecondaryButton"
          type="button"
          @click="firstButtonBuilder"
        >
          {{ firstButtonText }}
        </button>
      </div>
    </div>
  </ModalBuilder>
</template>
