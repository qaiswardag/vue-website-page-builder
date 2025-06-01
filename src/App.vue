<script setup>
import { ref, computed, nextTick, onBeforeMount } from 'vue'
import PageBuilderModal from '@/Components/Modals/PageBuilderModal.vue'
import HomeSection from '@/Components/Homepage/HomeSection.vue'
import Footer from '@/Components/Homepage/Footer.vue'
import Navbar from '@/Components/Homepage/Navbar.vue'
import PageBuilderView from '@/PageBuilder/PageBuilder.vue'
import PageBuilder from '@/composables/PageBuilder'
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
const pageBuilder = new PageBuilder(pageBuilderStateStore, mediaLibraryStore)
const formType = ref('create')

const getIsLoading = computed(() => {
  return userStore.getIsLoading
})

const pathPageBuilderStorageCreate = `page-builder-create-post`
const pathPageBuilderStorageUpdate = `page-builder-update-post-id-1`

const handlePageBuilder = async function () {
  userStore.setIsLoading(true)

  await nextTick()
  openPageBuilder.value = true

  if (formType.value === 'create') {
    pageBuilderStateStore.setComponents([])
    pageBuilder.areComponentsStoredInLocalStorage()
  }

  // handle click
  pageBuilderPrimaryHandler.value = async function () {
    userStore.setIsLoading(true)

    if (formType.value === 'update') {
      await nextTick()
      pageBuilder.saveComponentsLocalStorageUpdate()
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
      pageBuilder.saveComponentsLocalStorage()
      await nextTick()
    }
    // save to local storage if update
    if (formType.value === 'update') {
      await nextTick()
      pageBuilder.synchronizeDOMAndComponents()
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
    pageBuilder.areComponentsStoredInLocalStorageUpdate()
    await nextTick()
    pageBuilder.setEventListenersForElements()

    userStore.setIsLoading(false)
  }
}

onBeforeMount(() => {
  // Define local storage key name before on mount
  pageBuilderStateStore.setLocalStorageItemName(pathPageBuilderStorageCreate)

  // Define local storage key name before on mount
  pageBuilderStateStore.setLocalStorageItemNameUpdate(pathPageBuilderStorageUpdate)
})
</script>

<template>
  <teleport to="body">
    <FullScreenSpinner v-if="getIsLoading"></FullScreenSpinner>
  </teleport>
  <PageBuilderModal
    :show="openPageBuilder"
    updateOrCreate="create"
    @pageBuilderPrimaryHandler="pageBuilderPrimaryHandler"
    @pageBuilderSecondaryHandler="pageBuilderSecondaryHandler"
    @handleDraftForUpdate="handleDraftForUpdate"
  >
    <PageBuilderView></PageBuilderView>
  </PageBuilderModal>

  <Navbar @handleButton="handlePageBuilder"></Navbar>
  <HomeSection @handleButton="handlePageBuilder"></HomeSection>

  <Footer></Footer>
</template>
