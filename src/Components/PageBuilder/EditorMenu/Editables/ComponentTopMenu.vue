<script setup>
import DynamicModal from '@/Components/Modals/DynamicModal.vue';
import PageBuilder from '@/composables/PageBuilder';
import { ref } from 'vue';
import { usePageBuilderStateStore } from '@/stores/page-builder-state';
import { useMediaLibraryStore } from '@/stores/media-library';

const mediaLibraryStore = useMediaLibraryStore();
const pageBuilderStateStore = usePageBuilderStateStore();
const showModalDeleteComponent = ref(false);
// use dynamic model
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
const pageBuilder = new PageBuilder(pageBuilderStateStore, mediaLibraryStore);

// remove component
const deleteComponent = function (e) {
  showModalDeleteComponent.value = true;
  typeModal.value = 'delete';
  gridColumnModal.value = 2;
  titleModal.value = 'Remove Component?';
  descriptionModal.value = 'Are you sure you want to remove this Component?';
  firstButtonModal.value = 'Close';
  secondButtonModal.value = null;
  thirdButtonModal.value = 'Delete';

  // handle click
  firstModalButtonFunction.value = function () {
    showModalDeleteComponent.value = false;
  };
  //
  // handle click
  thirdModalButtonFunction.value = function () {
    pageBuilder.deleteComponent();

    showModalDeleteComponent.value = false;
  };
  // end modal
};
</script>

<template>
  <DynamicModal
    :show="showModalDeleteComponent"
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
    <main></main>
  </DynamicModal>
  <div class="flex flex-col items-center justify-center myPrimaryGap">
    <div class="flex gap-2 items-center justify-center">
      <div
        @click="deleteComponent()"
        class="h-10 w-10 cursor-pointer rounded-full flex items-center border-none justify-center bg-gray-50 aspect-square hover:bg-myPrimaryErrorColor hover:text-white text-myPrimaryErrorColor"
      >
        <span class="material-symbols-outlined"> delete_forever </span>
      </div>
    </div>

    <button
      type="button"
      @click="pageBuilder.moveComponent(-1)"
      class="h-10 w-10 cursor-pointer rounded-full flex items-center border-none justify-center bg-gray-50 aspect-square hover:bg-myPrimaryLinkColor hover:text-white focus-visible:ring-0"
    >
      <span class="material-symbols-outlined"> move_up </span>
    </button>
    <button
      type="button"
      @click="pageBuilder.moveComponent(1)"
      class="h-10 w-10 cursor-pointer rounded-full flex items-center border-none justify-center bg-gray-50 aspect-square hover:bg-myPrimaryLinkColor hover:text-white focus-visible:ring-0"
    >
      <span class="material-symbols-outlined"> move_down </span>
    </button>
  </div>
</template>
