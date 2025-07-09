<script setup>
import { ref, computed } from 'vue'
import { sharedPageBuilderStore } from '../../../../stores/shared-store'
import ModalBuilder from '../../../../Components/Modals/ModalBuilder.vue'
import EditorAccordion from '../EditorAccordion.vue'
import { getPageBuilder } from '../../../../composables/builderInstance'
import { useTranslations } from '../../../../composables/useTranslations'

const pageBuilderService = getPageBuilder()
const pageBuilderStateStore = sharedPageBuilderStore
const { translate } = useTranslations()

const props = defineProps({
  globalPage: {
    type: Boolean,
  },
})

const getElement = computed(() => pageBuilderStateStore.getElement)
const getComponents = computed(() => pageBuilderStateStore.getComponents)

const elementHTML = computed(() => {
  if (!getElement.value || !(getElement.value instanceof HTMLElement)) {
    return ''
  }
  return getElement.value.outerHTML
})

const showModalHTMLEditor = ref(false)

const editableHtml = ref('')
const editableComponents = ref('')

const handleShowHTMLEditor = () => {
  if (!props.globalPage) {
    editableHtml.value = elementHTML.value
  }

  if (props.globalPage) {
    const comps =
      Array.isArray(getComponents.value) &&
      getComponents.value.map((comp) => {
        return comp.html_code
      })

    editableComponents.value = comps

    console.log('deeen er:', comps)
  }
  showModalHTMLEditor.value = true
}

const handleCloseHTMLEditor = () => {
  showModalHTMLEditor.value = false
}

const handleSaveChangesElement = () => {
  pageBuilderService.applyModifiedHTML(editableHtml.value)
  showModalHTMLEditor.value = true
}
const handleSaveChangesComponents = () => {
  pageBuilderService.applyModifiedComponents(editableComponents.value)
  showModalHTMLEditor.value = true
}
</script>
<template>
  <EditorAccordion>
    <template #title>{{ translate('HTML Editor') }}</template>
    <template #content>
      <div class="pbx-my-2 pbx-py-2">
        <label for="vertical-margin" class="pbx-myPrimaryInputLabel">{{
          translate(
            'Gain full control over individual components by editing the raw HTML of any selected element. This feature empowers advanced users to fine-tune the HTML structure,',
          )
        }}</label>
        <hr />
      </div>
      <button @click="handleShowHTMLEditor" type="button" class="pbx-myPrimaryButton">
        {{ translate('HTML Editor') }}
      </button>
    </template>
  </EditorAccordion>
  <ModalBuilder
    maxWidth="7xl"
    :showModalBuilder="showModalHTMLEditor"
    :title="translate('HTML Editor')"
    @closeMainModalBuilder="handleCloseHTMLEditor"
  >
    <template v-if="!globalPage">
      <textarea
        id="html-editor"
        v-model="editableHtml"
        class="pbx-h-full pbx-font-sans pbx-bg-gray-900 pbx-text-white pbx-w-full"
        style="overflow: auto; min-height: 400px"
      ></textarea>
      <div
        class="pbx-border-0 pbx-border-solid pbx-border-t pbx-border-gray-200 pbx-mt-4 pbx-flex pbx-items-center pbx-justify-end"
      >
        <div class="pbx-py-4 pbx-flex sm:pbx-justify-end pbx-justify-center">
          <div
            class="sm:pbx-grid-cols-2 sm:pbx-items-end sm:pbx-justify-end pbx-flex sm:pbx-flex-row pbx-flex-col pbx-myPrimaryGap sm:pbx-w-5/6 pbx-w-full"
          >
            <button @click="handleCloseHTMLEditor" type="button" class="pbx-mySecondaryButton">
              {{ translate('Close') }}
            </button>
            <button @click="handleSaveChangesElement" type="button" class="pbx-myPrimaryButton">
              {{ translate('Save') }}
            </button>
          </div>
        </div>
      </div>
    </template>
    <template v-if="globalPage">
      <textarea
        id="html-editor"
        v-model="editableComponents"
        class="pbx-h-full pbx-font-sans pbx-bg-gray-900 pbx-text-white pbx-w-full"
        style="overflow: auto; min-height: 400px"
      ></textarea>
      <div
        class="pbx-border-0 pbx-border-solid pbx-border-t pbx-border-gray-200 pbx-mt-4 pbx-flex pbx-items-center pbx-justify-end"
      >
        <div class="pbx-py-4 pbx-flex sm:pbx-justify-end pbx-justify-center">
          <div
            class="sm:pbx-grid-cols-2 sm:pbx-items-end sm:pbx-justify-end pbx-flex sm:pbx-flex-row pbx-flex-col pbx-myPrimaryGap sm:pbx-w-5/6 pbx-w-full"
          >
            <button @click="handleCloseHTMLEditor" type="button" class="pbx-mySecondaryButton">
              {{ translate('Close') }}
            </button>
            <button @click="handleSaveChangesComponents" type="button" class="pbx-myPrimaryButton">
              {{ translate('Save') }}
            </button>
          </div>
        </div>
      </div>
    </template>
  </ModalBuilder>
</template>
