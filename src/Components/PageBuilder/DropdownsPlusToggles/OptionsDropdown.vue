<script setup>
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
import PageBuilder from '@/composables/PageBuilder';
import { ref, computed } from 'vue';
import PageBuilderPreviewModal from '@/Components/Modals/PageBuilderPreviewModal.vue';
import Preview from '@/PageBuilder/Preview.vue';
import SlideOverRight from '@/Components/PageBuilder/Slidebars/SlideOverRight.vue';
import PageBuilderSettings from '@/Components/PageBuilder/Settings/PageBuilderSettings.vue';
import DynamicModal from '@/Components/Modals/DynamicModal.vue';
import { usePageBuilderStateStore } from '@/stores/page-builder-state';
import { useMediaLibraryStore } from '@/stores/media-library';

const mediaLibraryStore = useMediaLibraryStore();
const pageBuilderStateStore = usePageBuilderStateStore();
const pageBuilder = new PageBuilder(pageBuilderStateStore, mediaLibraryStore);
const emit = defineEmits(['previewCurrentDesign']);

const showModalDeleteAllComponents = ref(false);
//
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

const showSettingsSlideOverRight = ref(false);
const titleSettingsSlideOverRight = ref(null);
const openPageBuilderPreviewModal = ref(false);
const firstPageBuilderPreviewModalButton = ref(null);

const handlePageBuilderPreview = function () {
  emit('previewCurrentDesign');

  openPageBuilderPreviewModal.value = true;
  // handle click
  firstPageBuilderPreviewModalButton.value = function () {
    openPageBuilderPreviewModal.value = false;
  };
  // end modal
};

const deleteAllComponents = function () {
  showModalDeleteAllComponents.value = true;
  typeModal.value = 'delete';
  gridColumnModal.value = 2;
  titleModal.value = 'Remove all Components';
  descriptionModal.value = 'Are you sure you want to remove all Components?';
  firstButtonModal.value = 'Close';
  secondButtonModal.value = null;
  thirdButtonModal.value = 'Delete';

  // handle click
  firstModalButtonFunction.value = function () {
    showModalDeleteAllComponents.value = false;
  };
  //
  // handle click
  thirdModalButtonFunction.value = function () {
    pageBuilder.deleteAllComponents();
    pageBuilderStateStore.setComponents(null);
    showModalDeleteAllComponents.value = false;
  };
  // end modal
};

// handle slideover window
const handleSettingsSlideOver = function () {
  pageBuilderStateStore.setComponent(null);

  titleSettingsSlideOverRight.value = 'Settings';
  showSettingsSlideOverRight.value = true;
};
// handle slideover window
const settingsSlideOverButton = function () {
  pageBuilderStateStore.setComponent(null);

  showSettingsSlideOverRight.value = false;
};
</script>

<template>
  <SlideOverRight
    :open="showSettingsSlideOverRight"
    :title="titleSettingsSlideOverRight"
    @slideOverButton="settingsSlideOverButton"
  >
    <PageBuilderSettings> </PageBuilderSettings>
  </SlideOverRight>
  <DynamicModal
    :show="showModalDeleteAllComponents"
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
  <Menu
    as="div"
    class="myPrimaryParagraph relative lg:inline-block hidden text-left"
  >
    <div>
      <MenuButton
        class="inline-flex items-center gap-2 justify-center w-full rounded-md border border-gray-300 shadow-sm pl-4 pr-6 py-2 bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-emerald-600"
      >
        <span class="material-symbols-outlined text-[16px]">
          keyboard_command_key
        </span>
        <span class="text-sm"> Options </span>
      </MenuButton>
    </div>

    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <MenuItems
        class="z-50 origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none"
      >
        <div class="py-1">
          <MenuItem v-slot="{ active }">
            <div
              @click="handlePageBuilderPreview"
              class="cursor-pointer"
              :class="[
                active
                  ? 'bg-myPrimaryLightGrayColor text-gray-900'
                  : 'text-gray-700',
                'block px-4 py-2',
              ]"
            >
              <div class="flex items-center justify-left gap-2 text-sm">
                <div
                  class="h-8 w-8 cursor-pointer rounded-full flex items-center border-none justify-center bg-gray-50 aspect-square hover:bg-myPrimaryLinkColor hover:text-white focus-visible:ring-0"
                >
                  <span class="material-symbols-outlined text-[16px]">
                    visibility
                  </span>
                </div>
                Preview
              </div>
            </div>
          </MenuItem>

          <MenuItem v-slot="{ active }">
            <div
              @click="handleSettingsSlideOver"
              class="cursor-pointer"
              :class="[
                active
                  ? 'bg-myPrimaryLightGrayColor text-gray-900'
                  : 'text-gray-700',
                'block px-4 py-2',
              ]"
            >
              <div class="flex items-center justify-left gap-2 text-sm">
                <div
                  class="h-8 w-8 cursor-pointer rounded-full flex items-center border-none justify-center bg-gray-50 aspect-square hover:bg-myPrimaryLinkColor hover:text-white focus-visible:ring-0"
                >
                  <span class="material-symbols-outlined text-[16px]">
                    settings
                  </span>
                </div>
                Settings
              </div>
            </div>
          </MenuItem>
          <MenuItem v-slot="{ active }">
            <div
              @click="deleteAllComponents"
              class="cursor-pointer"
              :class="[
                active
                  ? 'bg-myPrimaryLightGrayColor text-gray-900'
                  : 'text-gray-700',
                'block px-4 py-2',
              ]"
            >
              <div class="flex items-center justify-left gap-2 text-sm">
                <div
                  class="h-8 w-8 cursor-pointer rounded-full flex items-center border-none justify-center bg-gray-50 aspect-square hover:bg-myPrimaryErrorColor hover:text-white text-myPrimaryErrorColor"
                >
                  <span
                    class="myMediumIcon material-symbols-outlined text-[16px]"
                  >
                    delete
                  </span>
                </div>
                <span class="group-hover:text-white"> Clear page </span>
              </div>
            </div>
          </MenuItem>
        </div>
      </MenuItems>
    </transition>
  </Menu>
  <PageBuilderPreviewModal
    :show="openPageBuilderPreviewModal"
    @firstPageBuilderPreviewModalButton="firstPageBuilderPreviewModalButton"
  >
    <Preview></Preview>
  </PageBuilderPreviewModal>
</template>
