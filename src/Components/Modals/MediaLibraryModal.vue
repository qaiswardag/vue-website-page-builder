<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import {
  Dialog,
  DialogOverlay,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';

// new version
import { useStore } from 'vuex';
import DynamicModal from '@/Components/Modals/DynamicModal.vue';
import SmallUniversalSpinner from '@/Components/Loaders/SmallUniversalSpinner.vue';

// store
const store = useStore();

const getCurrentImage = computed(() => {
  return store.getters['mediaLibrary/getCurrentImage'];
});

const getCurrentMedia = computed(() => {
  return store.getters['mediaLibrary/getCurrentMedia'];
});

const getCurrentPreviewImage = computed(() => {
  return store.getters['mediaLibrary/getCurrentPreviewImage'];
});

const selected = ref('Unsplash');

const tabs = ref([
  {
    name: 'Upload',
    current: false,
  },
  {
    name: 'Media library',
    current: false,
  },
  {
    name: 'Unsplash',
    current: true,
  },
]);

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    required: true,
  },
  firstButtonText: {
    type: String,
  },
  secondButtonText: {
    type: String,
  },
  thirdButtonText: {
    type: String,
  },
  open: {
    required: true,
  },
});

const emit = defineEmits([
  'firstMediaButtonFunction',
  'secondMediaButtonFunction',
  'thirdMediaButtonFunction',
]);

// first button function
const firstButton = function () {
  emit('firstMediaButtonFunction');
};

// second button  function
const secondButton = function () {
  emit('secondMediaButtonFunction');
};

// third button function
const thirdButton = function () {
  emit('thirdMediaButtonFunction');
};
//
//
const changeSelectedMenuTab = function (clicked) {
  selected.value = clicked;
};
//
//
//

//
</script>

<template>
  <teleport to="body">
    <TransitionRoot
      :show="open"
      as="template"
    >
      <Dialog
        as="div"
        class="fixed z-30 inset-0 overflow-y-auto sm:px-4"
        @close="firstButton"
      >
        <div class="flex items-end justify-center text-center sm:block sm:p-0">
          <TransitionChild
            as="template"
            enter="ease-out duration-100"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="ease-in duration-100"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <DialogOverlay
              class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            />
          </TransitionChild>

          <!-- This element is to trick the browser into centering the modal contents. -->
          <span
            aria-hidden="true"
            class="hidden sm:inline-block sm:align-middle sm:h-screen"
            >&#8203;</span
          >
          <TransitionChild
            as="template"
            enter="ease-out duration-100"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="ease-in duration-100"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <div
              class="relative max-h-[65rem] my-2 inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-7xl sm:w-full w-[96%]"
            >
              <div
                class="flex gap-2 justify-between items-center border-b border-gray-200 p-4 mb-2"
              >
                modal show delete image here..
                <DialogTitle
                  as="h3"
                  class="tertiaryHeader my-0 py-0"
                >
                  {{ title }}
                </DialogTitle>

                <div class="flex-end">
                  <div class="flex-end">
                    <div
                      class="h-10 w-10 cursor-pointer rounded-full flex items-center border-none justify-center bg-gray-50 aspect-square hover:bg-myPrimaryLinkColor hover:text-white hover:fill-white focus-visible:ring-0 text-myPrimaryDarkGrayColor"
                      @click="firstButton"
                    >
                      <span class="material-symbols-outlined"> close </span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="flex items-center">
                <div class="flex-1">
                  <!--content media library - start-->
                  <div
                    class="p-4 h-full flex md:flex-row flex-col myPrimaryGap mt-2 overflow-y-scroll"
                  >
                    <!-- Main content - start-->

                    <div class="pb-4 max-w-7xl mx-auto w-full">
                      <!-- Tabs -->
                      <div class="mb-4">
                        <!-- Tabs Mobile -->
                        <div class="sm:hidden">
                          <label
                            for="tabs"
                            class="sr-only"
                            >Select a tab</label
                          >
                          <!-- Use an "onChange" listener to redirect the user to the selected tab URL. -->

                          <select
                            v-model="selected"
                            id="tabs"
                            class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-myPrimaryLinkColor focus:border-myPrimaryLinkColor sm:text-sm rounded-md"
                          >
                            <option>Upload</option>
                            <option>Media library</option>
                            <option>Unsplash</option>
                          </select>
                        </div>
                        <div class="hidden sm:block">
                          <div
                            class="flex myPrimaryGap items-center overflow-x-auto bg-myPrimaryLightGrayColor px-2 pt-3 pb-2 rounded-full"
                          >
                            <nav
                              class="flex-1 -mb-px flex space-x-2 xl:space-x-4"
                              aria-label="Tabs"
                            >
                              <button
                                @click="changeSelectedMenuTab(tab.name)"
                                v-for="tab in tabs"
                                :key="tab.name"
                                :aria-current="tab.current ? 'page' : undefined"
                                class="py-2 px-3 my-1 text-xs cursor-pointer font-medium"
                                :class="[
                                  tab.name === selected
                                    ? 'myPrimaryButton'
                                    : 'mySecondaryButton',
                                  'whitespace-nowrap',
                                ]"
                              >
                                <span
                                  v-if="tab.name === 'Upload'"
                                  class="material-symbols-outlined"
                                >
                                  cloud_upload
                                </span>
                                <span
                                  v-if="tab.name === 'Media library'"
                                  class="myMediumIcon material-symbols-outlined"
                                >
                                  perm_media
                                </span>
                                <span
                                  v-if="tab.name === 'Unsplash'"
                                  class="myMediumIcon material-symbols-outlined"
                                >
                                  filter_hdr
                                </span>
                                <span>
                                  {{ tab.name }}
                                </span>
                              </button>
                            </nav>
                          </div>
                        </div>
                      </div>

                      <template v-if="selected === 'Upload'">
                        <!-- image upload - start -->
                        upload iamge form
                        <!-- image upload - end -->
                      </template>
                      <template v-if="selected === 'Media library'">
                        <!-- image gallary - start -->
                        MediaLibraryGalleryList here...
                        <!-- image gallary - end -->
                      </template>
                      <template v-if="selected === 'Unsplash'">
                        <!-- image gallary - start -->
                        Unsplash here...
                        <!-- image gallary - end -->
                      </template>
                    </div>

                    <!-- Main content - end-->

                    <!-- Details sidebar - upload start-->
                    <aside
                      v-if="selected === 'Upload'"
                      aria-label="sidebar"
                      class="rounded-lg md:w-72 md:min-h-[42.5rem] md:max-h-[42.5rem] min-h-[15rem] max-h-[15rem] overflow-y-scroll bg-white border border-gray-200"
                    >
                      <div
                        class="rounded-lg md:w-72 md:min-h-[42.5rem] md:max-h-[42.5rem] min-h-[15rem] max-h-[15rem] overflow-y-scroll bg-white border border-gray-200"
                      >
                        aside for upload
                      </div>
                    </aside>
                    <!-- Details sidebar - media library start-->
                    <aside
                      v-if="selected === 'Media library'"
                      aria-label="sidebar"
                      class="md:w-72"
                    >
                      <div
                        class="rounded-lg md:w-72 md:min-h-[42.5rem] md:max-h-[42.5rem] min-h-[15rem] max-h-[15rem] overflow-y-scroll bg-white border border-gray-200"
                      >
                        aside for media library
                      </div>
                    </aside>
                    <!-- Details sidebar - media library end-->
                    <!-- Details sidebar - unsplash start-->
                    <aside
                      v-if="selected === 'Unsplash'"
                      aria-label="sidebar"
                      class="md:w-72"
                    >
                      <div
                        class="rounded-lg md:w-72 md:min-h-[42.5rem] md:max-h-[42.5rem] min-h-[15rem] max-h-[15rem] overflow-y-scroll bg-white border border-gray-200"
                      >
                        aside for unsplash
                      </div>
                    </aside>
                    <!-- Details sidebar - unsplash end-->

                    <!-- Details sidebar end-->
                  </div>
                  <!--content media library - end-->

                  <!-- Actions # start -->
                  <template v-if="selected === 'Media library'">
                    <div>actions section</div>
                    <!-- Actions # end -->
                  </template>
                </div>
              </div>
            </div>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>
  </teleport>
</template>
