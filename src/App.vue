<script setup>
import { ref, computed, nextTick } from 'vue'
import PageBuilderModal from '@/Components/Modals/PageBuilderModal.vue'
import HomeSection from '@/Components/Homepage/HomeSection.vue'
import Footer from '@/Components/Homepage/Footer.vue'
import Navbar from '@/Components/Homepage/Navbar.vue'
import PageBuilder from '@/PageBuilder/PageBuilder.vue'
import PageBuilderClass from '@/composables/PageBuilderClass.ts'
import FullScreenSpinner from '@/Components/Loaders/FullScreenSpinner.vue'
import { usePageBuilderStateStore } from '@/stores/page-builder-state'
import { useUserStore } from '@/stores/user'
import { useMediaLibraryStore } from '@/stores/media-library'

const mediaLibraryStore = useMediaLibraryStore()
const pageBuilderStateStore = usePageBuilderStateStore()
const userStore = useUserStore()
const openPageBuilder = ref(false)

const pageBuilderPrimaryHandler = ref(null)
const pageBuilderSecondaryHandler = ref(null)
const pageBuilderClass = new PageBuilderClass(pageBuilderStateStore, mediaLibraryStore)

// Get updateOrCreate from store
const formType = computed(() => pageBuilderStateStore.getUpdateOrCreate)

const getIsLoading = computed(() => {
  return userStore.getIsLoading
})

const handlePageBuilder = async function () {
  userStore.setIsLoading(true)

  await nextTick()
  openPageBuilder.value = true

  // handle click
  pageBuilderPrimaryHandler.value = async function () {
    userStore.setIsLoading(true)

    if (formType.value === 'update') {
      await nextTick()
      pageBuilderClass.saveComponentsLocalStorageUpdate()
    }

    openPageBuilder.value = false
    userStore.setIsLoading(false)
  }

  // handle click
  pageBuilderSecondaryHandler.value = async function () {
    userStore.setIsLoading(true)

    // save to local storage if new resource
    if (formType.value === 'create') {
      await nextTick()
      pageBuilderClass.saveComponentsLocalStorage()
      await nextTick()
    }
    // save to local storage if update
    if (formType.value === 'update') {
      await nextTick()
      pageBuilderClass.synchronizeDOMAndComponents()
      await nextTick()
    }

    openPageBuilder.value = false

    userStore.setIsLoading(false)
  }

  userStore.setIsLoading(false)

  // end modal
}
// Builder # End
const handleDraftForUpdate = async function () {
  userStore.setIsLoading(true)

  if (formType.value === 'update') {
    await nextTick()
    pageBuilderClass.areComponentsStoredInLocalStorageUpdate()
    await nextTick()
    pageBuilderClass.setEventListenersForElements()

    userStore.setIsLoading(false)
  }
}
</script>

<template>
  <div>
    <teleport to="body">
      <FullScreenSpinner v-if="getIsLoading"></FullScreenSpinner>
    </teleport>
    <PageBuilderModal
      :show="openPageBuilder"
      @pageBuilderPrimaryHandler="pageBuilderPrimaryHandler"
      @pageBuilderSecondaryHandler="pageBuilderSecondaryHandler"
      @handleDraftForUpdate="handleDraftForUpdate"
    >
      <PageBuilder
        updateOrCreate="update"
        :userForPageBuilder="{ name: 'Qais Wardag', id: 1 }"
        :resourceData="{ title: 'Demo Resource', id: 1 }"
      ></PageBuilder>
    </PageBuilderModal>

    <Navbar @handleButton="handlePageBuilder"></Navbar>
    <HomeSection @handleButton="handlePageBuilder"></HomeSection>

    <Footer></Footer>
  </div>
</template>
