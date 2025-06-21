<script setup>
import { ref, computed, onMounted, inject } from 'vue'
import DynamicModalBuilder from '../../../Modals/DynamicModalBuilder.vue'
import TipTapInput from '../../../TipTap/TipTapInput.vue'
import PageBuilderClass from '../../../../composables/PageBuilderClass.ts'
import MediaLibraryModal from '../../../Modals/MediaLibraryModal.vue'
import TextColorEditor from './TextColorEditor.vue'
import BackgroundColorEditor from './BackgroundColorEditor.vue'
import { sharedPageBuilderStore } from '../../../../stores/shared-store'

// Use shared store instance
const pageBuilderStateStore = sharedPageBuilderStore
const customMediaComponent = inject('CustomMediaComponent')

const pageBuilderClass = new PageBuilderClass(pageBuilderStateStore)

const getElement = computed(() => {
  return pageBuilderStateStore.getElement
})

const getShowModalTipTap = computed(() => {
  const result = pageBuilderStateStore.getShowModalTipTap

  if (result) {
    handleModalPreviewTiptap()
  }
  return result
})

const getComponent = computed(() => {
  return pageBuilderStateStore.getComponent
})

// hanlde Tip Tap modal
const typeModal = ref('')
const gridColumnModal = ref(Number(1))
const titleModal = ref('')
const descriptionModal = ref('')
const firstButtonModal = ref('')
const secondButtonModal = ref(null)
const thirdButtonModal = ref(null)
// set dynamic modal handle functions
const firstModalButtonFunctionDynamicModalBuilder = ref(null)
const secondModalButtonFunctionDynamicModalBuilder = ref(null)
const thirdModalButtonFunctionDynamicModalBuilder = ref(null)

const handleModalPreviewTiptap = function () {
  pageBuilderClass.toggleTipTapModal(true)

  typeModal.value = 'success'
  gridColumnModal.value = 2
  titleModal.value = 'Manage Content'
  descriptionModal.value = null
  firstButtonModal.value = null
  secondButtonModal.value = null
  thirdButtonModal.value = 'Save'

  // handle click

  firstModalButtonFunctionDynamicModalBuilder.value = function () {
    pageBuilderClass.toggleTipTapModal(false)
  }

  thirdModalButtonFunctionDynamicModalBuilder.value = function () {
    pageBuilderClass.toggleTipTapModal(true)
  }
}

// handle image
// get current image from store
const getBasePrimaryImage = computed(() => {
  return pageBuilderStateStore.getBasePrimaryImage
})

//
// use media library
const showMediaLibraryModal = ref(false)
// modal content
const titleMedia = ref('')
const descriptionMedia = ref('')
const firstButtonMedia = ref('')
const secondButtonMedia = ref(null)
const thirdButtonMedia = ref(null)
// set dynamic modal handle functions
const firstMediaButtonFunction = ref(null)

const handleAddImage = function () {
  // open modal to true
  showMediaLibraryModal.value = true

  // set media library modal standards
  titleMedia.value = `Media Library`
  descriptionMedia.value = null
  firstButtonMedia.value = 'Close'
  secondButtonMedia.value = 'Select image'

  // handle click
  firstMediaButtonFunction.value = function () {
    // close media library modal
    showMediaLibraryModal.value = false
  }
}

// Logic for Video Iframe

const urlError = ref(null)
const iframeSrc = ref('')
const showModalIframeSrc = ref(false)

const validateURL = function () {
  // initial value
  urlError.value = null

  // url validation
  const urlRegex = /^https?:\/\//
  const isValidURL = ref(true)
  isValidURL.value = urlRegex.test(iframeSrc.value)

  // cancelled
  if (isValidURL.value === false) {
    urlError.value =
      "The provided URL is invalid. Please ensure that it begins with 'https://' for proper formatting and security."
    return true
  }

  return false
}

const handleModalIframeSrc = function () {
  urlError.value = null

  const iframeSrcValue =
    getElement.value &&
    getElement.value.firstElementChild?.tagName === 'IFRAME' &&
    getElement.value.firstElementChild.hasAttribute('src') &&
    getElement.value.firstElementChild.getAttribute('src').trim() !== ''
      ? getElement.value.firstElementChild.src
      : ''

  iframeSrc.value = iframeSrcValue
  //
  //
  // open modal to true
  showModalIframeSrc.value = true

  typeModal.value = 'success'
  gridColumnModal.value = 2
  titleModal.value = 'Add video url'
  descriptionModal.value = null
  firstButtonModal.value = 'Close'
  secondButtonModal.value = 'Save'
  thirdButtonModal.value = null

  // handle click
  firstModalButtonFunctionDynamicModalBuilder.value = function () {
    showModalIframeSrc.value = false
  }
  // handle click
  secondModalButtonFunctionDynamicModalBuilder.value = function () {
    const isNotValidated = validateURL()
    if (isNotValidated) {
      return
    }

    if (
      getElement.value &&
      getElement.value.firstElementChild &&
      getElement.value.firstElementChild.tagName === 'IFRAME'
    ) {
      // Set the src attribute

      // replace watch with embed
      iframeSrc.value = iframeSrc.value.replace('watch?v=', 'embed/')

      // Remove dynamic parameters (&ab_channel, &list, &start_radio)
      iframeSrc.value = iframeSrc.value
        .replace(/&ab_channel=[^&]*/, '')
        .replace(/&list=[^&]*/, '')
        .replace(/&start_radio=[^&]*/, '')
        .replace(/&t=[^&]*/, '') // Remove the 't' parameter (time)

      getElement.value.firstElementChild.src = iframeSrc.value
    }

    showModalIframeSrc.value = false
  }
}

// const pagebuilder = ref(null)
// const videoElement = ref(null)

// videoElement.value = pagebuilder.value.querySelector('#youtube-video')
// pagebuilder.value = document.querySelector('#pagebuilder')
</script>
<template>
  <div>
    <DynamicModalBuilder
      :showDynamicModalBuilder="showModalIframeSrc"
      maxWidth="2xl"
      :type="typeModal"
      :gridColumnAmount="gridColumnModal"
      :title="titleModal"
      :description="descriptionModal"
      :firstButtonText="firstButtonModal"
      :secondButtonText="secondButtonModal"
      :thirdButtonText="thirdButtonModal"
      @firstModalButtonFunctionDynamicModalBuilder="firstModalButtonFunctionDynamicModalBuilder"
      @secondModalButtonFunctionDynamicModalBuilder="secondModalButtonFunctionDynamicModalBuilder"
      @thirdModalButtonFunctionDynamicModalBuilder="thirdModalButtonFunctionDynamicModalBuilder"
    >
      <header></header>
      <main>
        <div class="pbx-myInputGroup">
          <div class="pbx-myPrimaryFormOrganizationHeaderDescriptionSection">
            <div class="pbx-myPrimaryFormOrganizationHeader">
              <label for="video" class="pbx-myPrimaryInputLabel">Video url:</label>
              <input v-model="iframeSrc" type="text" class="pbx-myPrimaryInput" name="video" />
              <div
                v-if="urlError"
                class="pbx-min-h-[2.5rem] pbx-flex pbx-items-center pbx-justify-start"
              >
                <p class="pbx-myPrimaryInputError pbx-mt-2 pbx-mb-0 pbx-py-0 pbx-self-start">
                  {{ urlError }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </DynamicModalBuilder>
    <DynamicModalBuilder
      :simpleModal="true"
      :showDynamicModalBuilder="getShowModalTipTap"
      maxWidth="6xl"
      :type="typeModal"
      :gridColumnAmount="gridColumnModal"
      :title="titleModal"
      :description="descriptionModal"
      :firstButtonText="firstButtonModal"
      :secondButtonText="secondButtonModal"
      :thirdButtonText="thirdButtonModal"
      @firstModalButtonFunctionDynamicModalBuilder="firstModalButtonFunctionDynamicModalBuilder"
      @secondModalButtonFunctionDynamicModalBuilder="secondModalButtonFunctionDynamicModalBuilder"
      @thirdModalButtonFunctionDynamicModalBuilder="thirdModalButtonFunctionDynamicModalBuilder"
    >
      <header></header>
      <main class="pbx-overflow-y-auto">
        <TipTapInput></TipTapInput>
      </main>
    </DynamicModalBuilder>

    <MediaLibraryModal
      :open="showMediaLibraryModal"
      :title="titleMedia"
      :description="descriptionMedia"
      :firstButtonText="firstButtonMedia"
      :secondButtonText="secondButtonMedia"
      :thirdButtonText="thirdButtonMedia"
      :customMediaComponent="customMediaComponent"
      @firstMediaButtonFunction="firstMediaButtonFunction"
    >
    </MediaLibraryModal>

    <div
      class="pbx-z-20 pbx-px-2 pbx-py-1 pbx-h-24 pbx-flex pbx-items-center pbx-justify-center pbx-mt-2 pbx-mx-2 pbx-border-b pbx-border-myPrimaryLightGrayColor"
    >
      <div
        class="pbx-flex pbx-items-center pbx-justify-center"
        :class="{ 'pbx-rounded-full pbx-border pbx-border-gray-200 pbx-shadow-sm': getElement }"
      >
        <template v-if="pageBuilderClass.ElOrFirstChildIsIframe()">
          <div class="pbx-px-2 pbx-flex pbx-items-center pbx-justify-start pbx-gap-2 pbx-w-max">
            <button @click="handleModalIframeSrc" type="button" class="pbx-myPrimaryTag">
              <span class="material-symbols-outlined"> play_circle </span>
              <span>Add YouTube</span>
            </button>
          </div>
        </template>

        <template
          v-if="
            pageBuilderClass.isSelectedElementValidText() &&
            !pageBuilderClass.ElOrFirstChildIsIframe()
          "
        >
          <div class="pbx-px-2 pbx-flex pbx-items-center pbx-justify-start pbx-gap-2 pbx-w-max">
            <button @click="handleModalPreviewTiptap" type="button" class="pbx-myPrimaryTag">
              <span class="material-symbols-outlined"> edit </span>
              <span>Edit text and links</span>
            </button>
          </div>
          <div class="pbx-px-2">
            <TextColorEditor></TextColorEditor>
          </div>
        </template>

        <template
          v-if="
            getElement &&
            getComponent &&
            getBasePrimaryImage !== null &&
            !pageBuilderClass.ElOrFirstChildIsIframe()
          "
        >
          <div class="pbx-px-2 pbx-flex pbx-items-center pbx-justify-start pbx-gap-2 pbx-w-max">
            <button @click="handleAddImage" type="button" class="pbx-myPrimaryTag">
              <span class="material-symbols-outlined"> add_photo_alternate </span>
              <span>Update image</span>
            </button>
          </div>
        </template>

        <template
          v-if="
            getElement &&
            getElement.nodeType === 1 &&
            !getBasePrimaryImage &&
            !pageBuilderClass.ElOrFirstChildIsIframe()
          "
        >
          <div class="pbx-px-2">
            <BackgroundColorEditor></BackgroundColorEditor>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
