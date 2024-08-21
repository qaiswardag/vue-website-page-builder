<script setup>
import { ref, computed, nextTick } from 'vue';
import { useStore } from 'vuex';
import PageBuilderModal from '@/Components/Modals/PageBuilderModal.vue';
import HomeSection from '@/Components/App/HomeSection.vue';
import Footer from '@/Components/App/Footer.vue';
import Navbar from '@/Components/App/Navbar.vue';
import PageBuilderView from '@/PageBuilder/PageBuilder.vue';
import PageBuilder from '@/composables/PageBuilder';
import { delay } from '@/helpers/delay';
import FullScreenSpinner from '@/Components/Loaders/FullScreenSpinner.vue';

const openDesignerModal = ref(false);

// use designer model
const firstDesignerModalButtonFunction = ref(null);
const secondDesignerModalButtonFunction = ref(null);

const store = useStore();
const pageBuilder = new PageBuilder(store);

const formType = ref('create'); // create or update

const getIsLoading = computed(() => {
  return store.getters['user/getIsLoading'];
});

const handlePageBuilder = async function () {
  // set modal standards
  store.commit('user/setIsLoading', true);

  await delay();
  await nextTick();
  openDesignerModal.value = true;

  if (formType.value === 'create') {
    store.commit('pageBuilderState/setComponents', []);

    // local storage for page builder
    if (pageBuilder.areComponentsStoredInLocalStorage()) {
      // postForm.content =
      //   Array.isArray(getComponents.value) &&
      //   getComponents.value
      //     .map((component) => {
      //       return component.html_code;
      //     })
      //     .join('');
    }
  }

  // handle click
  firstDesignerModalButtonFunction.value = async function () {
    store.commit('user/setIsLoading', true);

    if (formType.value === 'update') {
      await nextTick();
      pageBuilder.saveComponentsLocalStorageUpdate();
      await delay();
    }

    // set open modal
    openDesignerModal.value = false;
    store.commit('user/setIsLoading', false);
  };

  // handle click
  secondDesignerModalButtonFunction.value = async function () {
    store.commit('user/setIsLoading', true);

    // save to local storage if new resource
    if (formType.value === 'create') {
      await nextTick();
      pageBuilder.saveComponentsLocalStorage();

      await nextTick();
      // postForm.content =
      //   Array.isArray(getComponents.value) &&
      //   getComponents.value
      //     .map((component) => {
      //       return component.html_code;
      //     })
      //     .join('');
    }
    // save to local storage if update
    if (formType.value === 'update') {
      await nextTick();
      pageBuilder.synchronizeDOMAndComponents();

      await nextTick();
      // postForm.content =
      //   Array.isArray(getComponents.value) &&
      //   getComponents.value
      //     .map((component) => {
      //       return component.html_code;
      //     })
      //     .join('');
    }

    // set open modal

    openDesignerModal.value = false;
    await delay();
    store.commit('user/setIsLoading', false);
  };

  store.commit('user/setIsLoading', false);

  // end modal
};
// Builder # End
const handleDraftForUpdate = async function () {
  store.commit('user/setIsLoading', true);

  if (formType.value === 'update') {
    await nextTick();
    pageBuilder.areComponentsStoredInLocalStorageUpdate();
    await nextTick();
    pageBuilder.setEventListenersForElements();

    await delay();
    store.commit('user/setIsLoading', false);
  }
};
</script>

<template>
  <teleport to="body">
    <FullScreenSpinner v-if="getIsLoading"></FullScreenSpinner>
  </teleport>
  <PageBuilderModal
    :show="openDesignerModal"
    updateOrCreate="create"
    @firstDesignerModalButtonFunction="firstDesignerModalButtonFunction"
    @secondDesignerModalButtonFunction="secondDesignerModalButtonFunction"
    @handleDraftForUpdate="handleDraftForUpdate"
  >
    <PageBuilderView></PageBuilderView>
  </PageBuilderModal>

  <Navbar @handleButton="handlePageBuilder"></Navbar>
  <HomeSection @handleButton="handlePageBuilder"></HomeSection>

  <Footer></Footer>
</template>
