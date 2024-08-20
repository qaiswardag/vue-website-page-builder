<script setup>
import { ref, computed, nextTick } from 'vue';
import { useStore } from 'vuex';
import PageBuilderModal from '@/Components/Modals/PageBuilderModal.vue';
import HomeSection from '@/Components/App/HomeSection.vue';
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
  <!-- Footer start -->
  <div
    class="space-y-6 mx-auto px-6 py-4 md:flex md:items-center md:justify-between lg:px-8 bg-myPrimaryLightGrayColor"
  >
    <div
      class="flex justify-center space-x-6 md:order-2 text-gray-600 hover:text-gray-700"
    >
      <p class="myPrimaryParagraph text-gray-600">
        ©
        <a
          href="https://github.com/qaiswardag/vue-website-page-builder"
          target="_blank"
          class="myPrimaryLink text-gray-600"
          >Qais Wardag / GitHub
        </a>
      </p>
    </div>
    <div
      class="flex justify-center space-x-6 md:order-2 text-gray-600 hover:text-gray-700"
    >
      <a
        href="https://github.com/qaiswardag/vue-website-page-builder"
        target="_blank"
      >
        <span class="sr-only">GitHub</span>
        <svg
          class="h-6 w-6"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </a>
    </div>
  </div>
  <!-- Footer end -->
</template>
