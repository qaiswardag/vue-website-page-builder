<script setup>
import { ref, computed, watch } from 'vue'
import { sharedPageBuilderStore } from '../../../../stores/shared-store'
import EditorAccordion from '../EditorAccordion.vue'
import PageBuilderClass from '../../../../composables/PageBuilderClass.ts'

// Use shared store instance
const pageBuilderStateStore = sharedPageBuilderStore

const pageBuilderClass = new PageBuilderClass(pageBuilderStateStore)
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
      <div class="flex flex-row flex-wrap gap-2 mt-2 mb-4">
        <div
          v-for="className in currentClasses"
          :key="className"
          class="myPrimaryTag cursor-pointer hover:bg-myPrimaryErrorColor hover:text-white text-xs py-2 font-medium"
          @click="
            async () => {
              pageBuilderClass.handleRemoveClasses(className)
              await pageBuilderClass.initializeElementStyles()
            }
          "
        >
          <div class="flex items-center gap-1">
            <span class="mr-1">
              {{ className }}
            </span>
          </div>
        </div>
      </div>

      <div class="flex gap-2 item-center flex-col">
        <div class="flex gap-2 item-center">
          <div class="mt-1 relative flex items-center w-full border myPrimaryInput py-0 p-0">
            <input
              v-model="inputClass"
              type="text"
              placeholder="Type class"
              @keydown.enter="handleAddClasses()"
              autocomplete="off"
              class="myPrimaryInput border-none rounded-r-none ml-0 w-full"
            />
            <div
              class="border border-gray-200 border-none rounded flex items-center justify-center h-full w-8"
            >
              <kbd class="myPrimaryParagraph text-gray-400 border-none"> ⏎ </kbd>
            </div>
          </div>
        </div>
        <p class="myPrimaryInputError"></p>
      </div>
    </template>
  </EditorAccordion>
</template>
