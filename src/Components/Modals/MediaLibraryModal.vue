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
import { TrashIcon } from '@heroicons/vue/24/outline';

// new version
import { useStore } from 'vuex';
import DynamicModal from '@/Components/Modals/DynamicModal.vue';
import SmallUniversalSpinner from '@/Components/Loaders/SmallUniversalSpinner.vue';

// store
const store = useStore();

const modalShowDeleteImage = ref(false);

// modal content
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

const getCurrentImage = computed(() => {
  return store.getters['mediaLibrary/getCurrentImage'];
});

const getCurrentMedia = computed(() => {
  return store.getters['mediaLibrary/getCurrentMedia'];
});

const getCurrentPreviewImage = computed(() => {
  return store.getters['mediaLibrary/getCurrentPreviewImage'];
});

const search_query = ref('');

const selected = ref('Media library');

const tabs = ref([
  {
    name: 'Upload',
    current: true,
  },
  {
    name: 'Media library',
    current: false,
  },
]);

const props = defineProps({
  team: {
    required: false,
  },
  user: {
    required: false,
  },
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
const uploadOnSuccess = function () {
  selected.value = 'Media library';
};
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
                <DynamicModal
                  :show="modalShowDeleteImage"
                  :type="typeModal"
                  disabledWhichButton="thirdButton"
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
                <DialogTitle
                  as="h3"
                  class="tertiaryHeader my-0 py-0"
                >
                  {{ title }} {{ team?.name ? 'for' : '' }}
                  {{ team?.name ? team?.name : '' }}
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

                    <!-- Main content - end-->

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
