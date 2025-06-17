<script setup>
import { computed, ref, inject } from 'vue'
import MediaLibraryModal from '../../../Modals/MediaLibraryModal.vue'
import PageBuilderClass from '../../../../composables/PageBuilderClass.ts'
import { sharedPageBuilderStore } from '../../../../stores/shared-store'
import { preloadImage } from '../../../../composables/preloadImage'
import { delay } from '../../../../composables/delay'

// Use shared store instance
const pageBuilderStateStore = sharedPageBuilderStore
const customMediaComponent = inject('CustomMediaComponent')

const pageBuilderClass = new PageBuilderClass(pageBuilderStateStore)

const isLoading = ref(false)
const getIsLoadingImage = ref(false)

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

// get current image from store
const getBasePrimaryImage = computed(() => {
  if (pageBuilderStateStore.getBasePrimaryImage) {
    loadingImage(pageBuilderStateStore.getBasePrimaryImage)
  }
  return pageBuilderStateStore.getBasePrimaryImage
})

// get current image from store
const getElement = computed(() => {
  return pageBuilderStateStore.getElement
})

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
  //
  // end modal
}

const loadingImage = async function (imageURL) {
  getIsLoadingImage.value = true

  if (imageURL && typeof imageURL === 'string' && imageURL.length > 2) {
    await preloadImage(imageURL)
    await delay(200)
    getIsLoadingImage.value = false
  }
}
</script>
<template>
  <div>
    <div v-show="getIsLoadingImage">
      <div class="flex items-center justify-center mt-4 min-h-80">
        <div
          class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        >
          <span
            class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
            >Loading...</span
          >
        </div>
      </div>
    </div>
    <div v-show="getBasePrimaryImage && !getIsLoadingImage">
      <img
        class="object-cover object-center w-full cursor-pointer"
        :src="getBasePrimaryImage"
        @click="handleAddImage"
        alt="image"
      />
    </div>
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
  </div>
</template>
