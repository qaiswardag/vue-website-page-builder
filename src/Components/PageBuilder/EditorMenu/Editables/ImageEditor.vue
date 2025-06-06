<script setup>
import { computed, watch, ref, inject } from 'vue'
import EditorAccordion from '@/Components/PageBuilder/EditorMenu/EditorAccordion.vue'
import MediaLibraryModal from '@/Components/Modals/MediaLibraryModal.vue'
import PageBuilderClass from '@/composables/PageBuilderClass.ts'

// Get stores from parent PageBuilder component
const pageBuilderStateStore = inject('pageBuilderStateStore')
const mediaLibraryStore = inject('mediaLibraryStore')
const customMediaComponent = inject('CustomMediaComponent')

const pageBuilderClass = new PageBuilderClass(pageBuilderStateStore, mediaLibraryStore)
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
const secondMediaButtonFunction = ref(null)
const thirdMediaButtonFunction = ref(null)

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
  // handle click
  secondMediaButtonFunction.value = function () {
    isLoading.value = true
    pageBuilderClass.updateBasePrimaryImage({ type: 'unsplash' })

    // close media library modal
    showMediaLibraryModal.value = false
    isLoading.value = false
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
      @secondMediaButtonFunction="secondMediaButtonFunction"
      @thirdMediaButtonFunction="thirdMediaButtonFunction"
    >
    </MediaLibraryModal>
  </div>
</template>
