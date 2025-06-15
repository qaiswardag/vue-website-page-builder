<script setup>
import { computed, ref, inject } from 'vue'
import MediaLibraryModal from '../../../Modals/MediaLibraryModal.vue'
import PageBuilderClass from '../../../../composables/PageBuilderClass.ts'
import { sharedPageBuilderStore } from '../../../../stores/shared-store'

// Use shared store instance
const pageBuilderStateStore = sharedPageBuilderStore
const customMediaComponent = inject('CustomMediaComponent')

const pageBuilderClass = new PageBuilderClass(pageBuilderStateStore)
const isLoading = ref(false)

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
  return pageBuilderStateStore.getBasePrimaryImage
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
</script>
<template>
  <div>
    <div v-if="getBasePrimaryImage !== null">
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
