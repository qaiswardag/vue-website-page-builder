<script setup>
import { computed, ref } from 'vue';
import DynamicModal from '@/Components/Modals/DynamicModal.vue';
import TipTapInput from '@/Components/TipTap/TipTapInput.vue';
import PageBuilder from '@/composables/PageBuilder';
import MediaLibraryModal from '@/Components/Modals/MediaLibraryModal.vue';
import TextColorEditor from '@/Components/PageBuilder/EditorMenu/Editables/TextColorEditor.vue';
import BackgroundColorEditor from '@/Components/PageBuilder/EditorMenu/Editables/BackgroundColorEditor.vue';
import { usePageBuilderStateStore } from '@/stores/page-builder-state';
import { useMediaLibraryStore } from '@/stores/media-library';

const mediaLibraryStore = useMediaLibraryStore();
const pageBuilderStateStore = usePageBuilderStateStore();
const pageBuilder = new PageBuilder(pageBuilderStateStore, mediaLibraryStore);
const getElement = computed(() => {
  return pageBuilderStateStore.getElement;
});
const getShowModalTipTap = computed(() => {
  const result = pageBuilderStateStore.getShowModalTipTap;

  if (result) {
    handleModalPreviewTiptap();
  }
  return result;
});

const getRestoredElement = computed(() => {
  return pageBuilderStateStore.getRestoredElement;
});

const getComponent = computed(() => {
  return pageBuilderStateStore.getComponent;
});

// hanlde Tip Tap modal
const typeModal = ref('');
const gridColumnModal = ref(Number(1));
const titleModal = ref('');
const descriptionModal = ref('');
const firstButtonModal = ref('');
const secondButtonModal = ref(null);
const thirdButtonModal = ref(null);
// set dynamic modal handle functions
const firstModalButtonFunction = ref(null);
const secondModalButtonFunction = ref(null);
const thirdModalButtonFunction = ref(null);

const handleModalPreviewTiptap = function () {
  pageBuilderStateStore.setShowModalTipTap(true);

  typeModal.value = 'success';
  gridColumnModal.value = 2;
  titleModal.value = 'Manage Content';
  descriptionModal.value = null;
  firstButtonModal.value = null;
  secondButtonModal.value = null;
  thirdButtonModal.value = 'Save';

  // handle click

  firstModalButtonFunction.value = function () {
    pageBuilderStateStore.setShowModalTipTap(false);
  };

  thirdModalButtonFunction.value = function () {
    pageBuilderStateStore.setShowModalTipTap(false);
  };
};

// handle image
// get current image from store
const getBasePrimaryImage = computed(() => {
  return pageBuilderStateStore.getBasePrimaryImage;
});

const isLoading = ref(false);
//
// use media library
const showMediaLibraryModal = ref(false);
// modal content
const titleMedia = ref('');
const descriptionMedia = ref('');
const firstButtonMedia = ref('');
const secondButtonMedia = ref(null);
const thirdButtonMedia = ref(null);
// set dynamic modal handle functions
const firstMediaButtonFunction = ref(null);
const secondMediaButtonFunction = ref(null);
const thirdMediaButtonFunction = ref(null);

const handleAddImage = function () {
  // open modal to true
  showMediaLibraryModal.value = true;

  // set media library modal standards
  titleMedia.value = `Media Library`;
  descriptionMedia.value = null;
  firstButtonMedia.value = 'Close';
  secondButtonMedia.value = 'Select image';

  // handle click
  firstMediaButtonFunction.value = function () {
    // close media library modal
    showMediaLibraryModal.value = false;
  };
  //
  // handle click
  secondMediaButtonFunction.value = function () {
    isLoading.value = true;
    pageBuilder.updateBasePrimaryImage({ type: 'unsplash' });

    // close media library modal
    showMediaLibraryModal.value = false;
    isLoading.value = false;
  };
};

// Logic for Video Iframe

const urlError = ref(null);
const iframeSrc = ref('');
const showModalIframeSrc = ref(false);

const validateURL = function () {
  // initial value
  urlError.value = null;

  // url validation
  const urlRegex = /^https?:\/\//;
  const isValidURL = ref(true);
  isValidURL.value = urlRegex.test(iframeSrc.value);

  // cancelled
  if (isValidURL.value === false) {
    urlError.value =
      "The provided URL is invalid. Please ensure that it begins with 'https://' for proper formatting and security.";
    return true;
  }

  return false;
};

const handleModalIframeSrc = function () {
  urlError.value = null;

  const iframeSrcValue =
    getElement.value &&
    getElement.value.firstElementChild?.tagName === 'IFRAME' &&
    getElement.value.firstElementChild.hasAttribute('src') &&
    getElement.value.firstElementChild.getAttribute('src').trim() !== ''
      ? getElement.value.firstElementChild.src
      : '';

  iframeSrc.value = iframeSrcValue;
  //
  //
  // open modal to true
  showModalIframeSrc.value = true;

  typeModal.value = 'success';
  gridColumnModal.value = 2;
  titleModal.value = 'Add video url';
  descriptionModal.value = null;
  firstButtonModal.value = 'Close';
  secondButtonModal.value = 'Save';
  thirdButtonModal.value = null;

  // handle click
  firstModalButtonFunction.value = function () {
    showModalIframeSrc.value = false;
  };
  // handle click
  secondModalButtonFunction.value = function () {
    const isNotValidated = validateURL();
    if (isNotValidated) {
      return;
    }

    if (
      getElement.value &&
      getElement.value.firstElementChild &&
      getElement.value.firstElementChild.tagName === 'IFRAME'
    ) {
      // Set the src attribute

      // replace watch with embed
      iframeSrc.value = iframeSrc.value.replace('watch?v=', 'embed/');

      // Remove dynamic parameters (&ab_channel, &list, &start_radio)
      iframeSrc.value = iframeSrc.value
        .replace(/&ab_channel=[^&]*/, '')
        .replace(/&list=[^&]*/, '')
        .replace(/&start_radio=[^&]*/, '')
        .replace(/&t=[^&]*/, ''); // Remove the 't' parameter (time)

      getElement.value.firstElementChild.src = iframeSrc.value;
    }

    showModalIframeSrc.value = false;
  };
};
</script>
<template>
  <DynamicModal
    :show="showModalIframeSrc"
    maxWidth="2xl"
    :type="typeModal"
    :gridColumnAmount="gridColumnModal"
    :title="titleModal"
    :description="descriptionModal"
    :firstButtonText="firstButtonModal"
    :secondButtonText="secondButtonModal"
    :thirdButtonText="thirdButtonModal"
    @firstModalButtonFunction="firstModalButtonFunction"
    @secondModalButtonFunction="secondModalButtonFunction"
    @thirdModalButtonFunction="thirdModalButtonFunction"
  >
    <header></header>
    <main>
      <div class="myInputGroup">
        <div class="myPrimaryFormOrganizationHeaderDescriptionSection">
          <div class="myPrimaryFormOrganizationHeader">
            <label
              for="video"
              class="myPrimaryInputLabel"
              >Video url:</label
            >
            <input
              v-model="iframeSrc"
              type="text"
              class="myPrimaryInput"
              name="video"
            />
            <div
              v-if="urlError"
              class="min-h-[2.5rem] flex items-center justify-start"
            >
              <p class="myPrimaryInputError mt-2 mb-0 py-0 self-start">
                {{ urlError }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  </DynamicModal>
  <DynamicModal
    :simpleModal="true"
    :show="getShowModalTipTap"
    maxWidth="5xl"
    :type="typeModal"
    :gridColumnAmount="gridColumnModal"
    :title="titleModal"
    :description="descriptionModal"
    :firstButtonText="firstButtonModal"
    :secondButtonText="secondButtonModal"
    :thirdButtonText="thirdButtonModal"
    @firstModalButtonFunction="firstModalButtonFunction"
    @secondModalButtonFunction="secondModalButtonFunction"
    @thirdModalButtonFunction="thirdModalButtonFunction"
  >
    <header></header>
    <main class="overflow-y-auto">
      <TipTapInput></TipTapInput>
    </main>
  </DynamicModal>

  <MediaLibraryModal
    :open="showMediaLibraryModal"
    :title="titleMedia"
    :description="descriptionMedia"
    :firstButtonText="firstButtonMedia"
    :secondButtonText="secondButtonMedia"
    :thirdButtonText="thirdButtonMedia"
    @firstMediaButtonFunction="firstMediaButtonFunction"
    @secondMediaButtonFunction="secondMediaButtonFunction"
    @thirdMediaButtonFunction="thirdMediaButtonFunction"
  >
  </MediaLibraryModal>

  <div
    class="z-20 py-1 px-2 h-20 flex items-center justify-center mt-2 mx-2 border-b border-myPrimaryLightGrayColor"
  >
    <div class="flex items-center justify-center divide-x divide-gray-200 py-1">
      <template v-if="pageBuilder.ElOrFirstChildIsIframe()">
        <div class="px-2 flex items-center justify-start gap-2">
          <button
            @click="handleModalIframeSrc"
            type="button"
            class="text-[12.5px] gap-2 text-nowrap pl-2 pr-3 w-full h-10 cursor-pointer rounded-full flex items-center border-none justify-center bg-gray-50 hover:bg-myPrimaryLinkColor hover:text-white focus-visible:ring-0"
          >
            <span class="material-symbols-outlined"> play_circle </span>
            <span>Add YouTube</span>
          </button>
        </div>
      </template>

      <template
        v-if="
          pageBuilder.selectedElementIsValidText() &&
          !pageBuilder.ElOrFirstChildIsIframe()
        "
      >
        <div class="px-2 flex items-center justify-start gap-2">
          <button
            @click="handleModalPreviewTiptap"
            type="button"
            class="text-[12.5px] gap-2 text-nowrap pl-2 pr-3 w-full h-10 cursor-pointer rounded-full flex items-center border-none justify-center bg-gray-50 hover:bg-myPrimaryLinkColor hover:text-white focus-visible:ring-0"
          >
            <span class="material-symbols-outlined"> edit </span>
            <span>Edit text</span>
          </button>
        </div>
        <div class="px-2">
          <TextColorEditor></TextColorEditor>
        </div>
      </template>

      <template
        v-if="
          getElement &&
          getComponent &&
          getBasePrimaryImage !== null &&
          !pageBuilder.ElOrFirstChildIsIframe()
        "
      >
        <div class="px-2 flex items-center justify-start gap-2">
          <button
            @click="handleAddImage"
            type="button"
            class="text-[12.5px] gap-2 text-nowrap pl-2 pr-3 w-full h-10 cursor-pointer rounded-full flex items-center border-none justify-center bg-gray-50 hover:bg-myPrimaryLinkColor hover:text-white focus-visible:ring-0"
          >
            <span class="material-symbols-outlined"> add_photo_alternate </span>
            <span>Update image</span>
          </button>
        </div>
      </template>

      <template
        v-if="
          getElement &&
          Object.keys(getElement).length !== 0 &&
          !getBasePrimaryImage &&
          !pageBuilder.ElOrFirstChildIsIframe()
        "
      >
        <div class="px-2">
          <BackgroundColorEditor></BackgroundColorEditor>
        </div>
      </template>

      <!-- delete & restore element # start -->
      <template v-if="getRestoredElement">
        <div class="px-2 flex items-center justify-start gap-2">
          <button
            @click="pageBuilder.handleRestoreElement"
            type="button"
            class="text-[12.5px] gap-2 text-nowrap pl-2 pr-3 w-full h-10 cursor-pointer rounded-full flex items-center border-none justify-center bg-gray-50 hover:bg-myPrimaryLinkColor hover:text-white focus-visible:ring-0"
          >
            <span class="material-symbols-outlined"> undo </span>
            <span>Undo</span>
          </button>
        </div>
      </template>

      <template
        v-if="
          getElement &&
          Object.keys(getElement).length !== 0 &&
          !getRestoredElement
        "
      >
        <div class="px-2 flex items-center justify-start gap-2">
          <button
            @click="pageBuilder.handleDeleteElement"
            type="button"
            class="text-[12.5px] gap-2 text-nowrap pl-2 pr-3 w-full h-10 cursor-pointer rounded-full flex items-center border-none justify-center bg-gray-50 hover:text-white focus-visible:ring-0 hover:bg-myPrimaryErrorColor"
          >
            <span class="material-symbols-outlined"> delete </span>
            <span class="hover:text-white">Delete</span>
          </button>
        </div>
      </template>
      <!-- delete & restore element # end -->
    </div>
  </div>
</template>
