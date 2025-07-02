<script setup>
import { ref, computed, watch, nextTick } from 'vue'
import { sharedPageBuilderStore } from '../../../../stores/shared-store'
import EditorAccordion from '../EditorAccordion.vue'
import { getPageBuilder } from '../../../../composables/builderInstance'

const pageBuilderService = getPageBuilder()

const pageBuilderStateStore = sharedPageBuilderStore

const currentStyles = ref(null)
const getCurrentStyles = computed(() => pageBuilderStateStore.getCurrentStyles)

watch(
  getCurrentStyles,
  (newValue) => {
    currentStyles.value = newValue
  },
  { immediate: true },
)

const inputProperty = ref('')
const inputValue = ref('')
const errorMessage = ref('')
const valueInputRef = ref(null)

const handleEnterOnProperty = () => {
  if (valueInputRef.value) {
    valueInputRef.value.focus()
  }
}

const handleAddStyle = async () => {
  const property = inputProperty.value.trim()
  const value = inputValue.value.trim()

  if (!property || !value) {
    errorMessage.value = 'Please enter a property and a value.'
    return
  }

  if (currentStyles.value && currentStyles.value[property]) {
    errorMessage.value = `Property "${property}" already exists. Remove it first to add a new one.`
    return
  }

  errorMessage.value = '' // Clear error

  pageBuilderService.handleAddStyle(property, value)
  await pageBuilderService.initializeElementStyles()

  inputProperty.value = ''
  inputValue.value = ''
}
</script>

<template>
  <EditorAccordion>
    <template #title>Inline Styles</template>
    <template #content>
      <label class="pbx-myPrimaryInputLabel pbx-my-4">
        These are the inline styles applied by the builder. Add your own styles and press Enter to
        apply them to the selected element.
      </label>

      <div class="pbx-flex pbx-flex-row pbx-flex-wrap pbx-gap-2 pbx-mt-2 pbx-mb-4">
        <div
          v-for="(value, key) in currentStyles"
          :key="key"
          class="pbx-myPrimaryTag pbx-cursor-pointer hover:pbx-bg-myPrimaryErrorColor hover:pbx-text-white pbx-text-xs pbx-py-2 pbx-font-medium"
          @click="
            async () => {
              pageBuilderService.handleRemoveStyle(key)
              await pageBuilderService.initializeElementStyles()
            }
          "
        >
          <div class="pbx-flex pbx-items-center pbx-gap-1">
            <span class="pbx-mr-1"> {{ key }}: {{ value }}; </span>
          </div>
        </div>
      </div>

      <div>
        <label for="custom-style-property" class="pbx-myPrimaryInputLabel">
          Add your own style.
        </label>
        <div class="pbx-flex pbx-gap-2 pbx-flex-col pbx-item-center">
          <input
            id="custom-style-property"
            v-model="inputProperty"
            type="text"
            placeholder="property"
            @keydown.enter.prevent="handleEnterOnProperty"
            autocomplete="off"
            class="pbx-myPrimaryInput"
          />
          <input
            id="custom-style-value"
            ref="valueInputRef"
            v-model="inputValue"
            type="text"
            placeholder="value"
            @keydown.enter="handleAddStyle"
            autocomplete="off"
            class="pbx-myPrimaryInput"
          />

          <button @click="handleAddStyle" type="button" class="pbx-myPrimaryButton">Add</button>
        </div>
      </div>
      <p v-if="errorMessage" class="pbx-myPrimaryInputError">{{ errorMessage }}</p>
    </template>
  </EditorAccordion>
</template>
