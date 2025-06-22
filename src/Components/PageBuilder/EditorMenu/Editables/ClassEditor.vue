<script setup>
import { ref, computed, watch } from 'vue'
import { sharedPageBuilderStore } from '../../../../stores/shared-store'
import EditorAccordion from '../EditorAccordion.vue'
import { getPageBuilder } from '../../../../composables/builderInstance'

const pageBuilderService = getPageBuilder()

// Use shared store instance
const pageBuilderStateStore = sharedPageBuilderStore

const currentClasses = ref(null)
const getCurrentClasses = computed(() => {
  return pageBuilderStateStore.getCurrentClasses
})

watch(
  getCurrentClasses,
  (newValue) => {
    currentClasses.value = newValue
  },
  { immediate: true },
)

const inputClass = ref('')

const handleAddClasses = async function () {
  pageBuilderClass.handleAddClasses(inputClass.value)
  await pageBuilderClass.initializeElementStyles()

  inputClass.value = ''
}
</script>

<template>
  <EditorAccordion>
    <template #title>Generated CSS</template>
    <template #content>
      <div class="pbx-flex pbx-flex-row pbx-flex-wrap pbx-gap-2 pbx-mt-2 pbx-mb-4">
        <div
          v-for="className in currentClasses"
          :key="className"
          class="pbx-myPrimaryTag pbx-cursor-pointer hover:pbx-bg-myPrimaryErrorColor hover:pbx-text-white pbx-text-xs pbx-py-2 pbx-font-medium"
          @click="
            async () => {
              pageBuilderClass.handleRemoveClasses(className)
              await pageBuilderClass.initializeElementStyles()
            }
          "
        >
          <div class="pbx-flex pbx-items-center pbx-gap-1">
            <span class="pbx-mr-1">
              {{ className }}
            </span>
          </div>
        </div>
      </div>

      <div class="pbx-flex pbx-gap-2 pbx-item-center pbx-flex-col">
        <div class="pbx-flex pbx-gap-2 pbx-item-center">
          <div
            class="pbx-mt-1 pbx-relative pbx-flex pbx-items-center pbx-w-full pbx-border pbx-myPrimaryInput pbx-py-0 pbx-p-0"
          >
            <input
              v-model="inputClass"
              type="text"
              placeholder="Type class"
              @keydown.enter="handleAddClasses()"
              autocomplete="off"
              class="pbx-myPrimaryInput pbx-border-none pbx-rounded-r-none pbx-ml-0 pbx-w-full"
            />
            <div
              class="pbx-border pbx-border-gray-200 pbx-border-none pbx-rounded pbx-flex pbx-items-center pbx-justify-center pbx-h-full pbx-w-8"
            >
              <kbd class="pbx-myPrimaryParagraph pbx-text-gray-400 pbx-border-none"> ⏎ </kbd>
            </div>
          </div>
        </div>
        <p class="pbx-myPrimaryInputError"></p>
      </div>
    </template>
  </EditorAccordion>
</template>
