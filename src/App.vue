<script setup>
import { ref, computed, onBeforeMount, watch, onMounted, nextTick } from 'vue';
import { useStore } from 'vuex';
import PageBuilderModal from '@/Components/Modals/PageBuilderModal.vue';
import PageBuilderView from '@/PageBuilder/PageBuilder.vue';
import PageBuilder from '@/composables/PageBuilder';
import { delay } from '@/helpers/delay';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { parseISO, formatISO, format } from 'date-fns';
import FullScreenSpinner from '@/Components/Loaders/FullScreenSpinner.vue';

import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/vue';

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

  <div class="myPrimaryContentSection">
    <h2 class="mySecondaryHeader">
      <!--[-->Fashion brands in one searchable solution<!--]-->
    </h2>
    <p class="myPrimaryParagraph font-normal">
      <!--[-->
      myself is the largest and most exclusive fashion directory in the United
      Arab Emirates, gathering all fashion brands in one searchable solution.
      <!--]-->
    </p>
  </div>
  <div class="myPrimaryContentSection">
    <div
      class="rounded-lg mt-4 border-2 border-dashed border-gray-300 p-8 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >
      <button
        type="button"
        @click="handlePageBuilder"
      >
        <span class="myMediumIcon material-symbols-outlined"> stacks </span>
      </button>

      <h3 class="mt-2 text-sm font-medium text-gray-900">
        Build your Job by adding Components
      </h3>
      <p class="mt-1 text-sm text-gray-500">
        Get started by adding components using the drag & drop Page Builder.
      </p>
      <div class="mt-6">
        <button
          @click="handlePageBuilder"
          type="button"
          class="myPrimaryButton"
        >
          <span class="myMediumIcon material-symbols-outlined"> stacks </span>
          Open Page Builder
        </button>
      </div>
    </div>
  </div>
  <div class="myPrimaryWidthScreenModule bg-red-50 lg:block hidden">
    <div class="myPrimaryContentSection">
      <h2 class="mySecondaryHeader">
        <!--[-->Customize the design the way you want
        <!--]-->
      </h2>
      <p class="myPrimaryParagraph font-normal">
        <!--[-->
        Design stores, jobs or campaigns your way with our intuitive page
        builder. Customize layouts, colors, and fonts to achieve the perfect
        design. myself is like a digital shopping window, focusing on your brand
        image, authenticity and credibility! Just like on a shopping site
        customers can search for anything they are looking for.
        <!--]-->
      </p>
    </div>
    <div class="myPrimaryContentSection">
      <!--[-->
      <div
        class="relative overflow-hidden bg-cover bg-no-repeat grid grid-cols-12 h-[68rem] rounded-2xl shadow-sm outline outline-2 outline-offset-4 outline-myPrimaryLinkColor hover:outline-myPrimaryLinkColor/50"
        style="background-image: url('/home/page-builder-example.jpg')"
      >
        <div
          class="col-span-12 px-4 top-0 h-[4rem] w-full border-b border-gray-200"
        >
          <div class="flex items-center justify-between h-full">
            <div
              class="lg:flex hidden items-center justify-end myPrimaryGap h-full"
            >
              <div class="flex gap-2">
                <span
                  class="w-2 h-2 rounded-full bg-red-400 hover:bg-red-600"
                ></span
                ><span
                  class="w-2 h-2 rounded-full bg-yellow-400 hover:bg-yellow-600"
                ></span
                ><span
                  class="w-2 h-2 rounded-full bg-green-400 hover:bg-green-600"
                ></span>
              </div>
            </div>
            <div class="flex justify-center items-center gap-2">
              <button
                type="button"
                class="mySecondaryButton text-[10px] py-2 px-6 cursor-default min-h-2"
              >
                Save</button
              ><button
                type="button"
                class="myPrimaryButton text-[10px] py-2 px-6 cursor-default min-h-2"
              >
                Publish
              </button>
            </div>
            <div class="lg:flex hidden justify-center items-center gap-2">
              <p class="myPrimaryParagraph text-[10px] text-white italic">
                Editing: Listing ID 1
              </p>
            </div>
            <div class="flex items-center justify-end myPrimaryGap h-full">
              <div
                class="h-8 w-8 rounded-full flex items-center border-none justify-center bg-gray-50 aspect-square hover:bg-myPrimaryLinkColor hover:text-white focus-visible:ring-0"
              >
                <span class="material-symbols-outlined"> add </span>
              </div>
              <div
                class="h-8 w-8 rounded-full flex items-center border-none justify-center bg-gray-50 aspect-square hover:bg-myPrimaryLinkColor hover:text-white focus-visible:ring-0"
              >
                <span class="material-symbols-outlined"> visibility </span>
              </div>
              <div class="lg:flex hidden justify-center items-center gap-2">
                <p
                  class="myPrimaryParagraph text-[12px] text-white font-medium"
                >
                  Page Builder
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          class="lg:col-span-9 col-span-5 top-0 w-full h-[64rem] rounded-l-2xl"
        >
          <div class="flex items-center justify-between">
            <div
              class="w-[4rem] bg-red-100 bg-opacity-50 hover:bg-opacity-40 h-[40rem] rounded-full pt-8 ml-2"
            >
              <div class="flex flex-col justify-center items-center gap-8">
                <div
                  class="h-8 w-8 rounded-full flex items-center border-none justify-center bg-gray-50 aspect-square hover:bg-myPrimaryLinkColor hover:text-white focus-visible:ring-0"
                >
                  <span class="material-symbols-outlined">
                    arrow_selector_tool
                  </span>
                </div>
                <div
                  class="h-8 w-8 rounded-full flex items-center border-none justify-center bg-gray-50 aspect-square hover:bg-myPrimaryLinkColor hover:text-white focus-visible:ring-0"
                >
                  <span class="material-symbols-outlined"> add </span>
                </div>
                <div
                  class="h-8 w-8 rounded-full flex items-center border-none justify-center bg-gray-50 aspect-square hover:bg-myPrimaryLinkColor hover:text-white focus-visible:ring-0"
                >
                  <span class="material-symbols-outlined"> replay </span>
                </div>
                <div
                  class="h-8 w-8 rounded-full flex items-center border-none justify-center bg-gray-50 aspect-square hover:bg-myPrimaryErrorColor hover:text-white focus-visible:ring-0"
                >
                  <span class="material-symbols-outlined"> delete </span>
                </div>
              </div>
            </div>
            <div
              class="flex items-center justify-center w-full h-[64rem] pt-2 pr-8"
            >
              <div
                class="lg:flex hidden items-center w-full h-full justify-end"
              >
                <div class="flex flex-col gap-2">
                  <div
                    class="w-[22rem] rounded-2xl hover:bg-opacity-80 flex flex-col justify-between top-0"
                  >
                    <div class="flex items-center justify-end gap-2">
                      <button
                        class="myPrimaryParagraph mySecondaryButton text-[10px] py-2 px-6 cursor-default min-h-2"
                      >
                        Add text element
                      </button>
                      <div
                        class="h-8 w-8 rounded-full flex items-center border-none justify-center bg-gray-50 aspect-square hover:bg-myPrimaryLinkColor hover:text-white focus-visible:ring-0"
                      >
                        <span class="material-symbols-outlined text-[20px]">
                          add
                        </span>
                      </div>
                    </div>
                  </div>
                  <div
                    class="lg:flex hidden items-center w-full h-full justify-end"
                  >
                    <div
                      class="w-[22rem] h-[10rem] rounded-2xl bg-gray-200 bg-opacity-90 hover:bg-opacity-80 py-8 flex flex-col justify-between top-0"
                    >
                      <div
                        class="py-2 flex justify-between gap-4 px-4 bg-gray-400 rounded-full mx-6 bg-opacity-30"
                      >
                        <span class="material-symbols-outlined text-[20px]">
                          format_bold </span
                        ><span class="material-symbols-outlined text-[20px]">
                          format_italic </span
                        ><span class="material-symbols-outlined text-[20px]">
                          format_color_text </span
                        ><span class="material-symbols-outlined text-[20px]">
                          format_align_left
                        </span>
                      </div>
                      <div
                        class="py-2 flex justify-between gap-4 px-4 bg-gray-400 rounded-full mx-6 bg-opacity-30"
                      >
                        <span class="material-symbols-outlined text-[20px]">
                          format_shapes </span
                        ><span class="material-symbols-outlined text-[20px]">
                          add_photo_alternate </span
                        ><span class="material-symbols-outlined text-[20px]">
                          colors </span
                        ><span class="material-symbols-outlined text-[20px]">
                          attach_file
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="lg:col-span-3 col-span-7 px-4 top-0 w-full bg-gray-200 bg-opacity-90 hover:bg-opacity-80 h-[64rem] rounded-br-2xl pt-6 overflow-y-scroll"
        >
          <div class="min-h-[80rem] h-[80rem]">
            <div class="flex justify-between items-center gap-2">
              <div></div>
              <p class="font-medium text-sm">
                Editing <span class="lowercase">&lt;IMG&gt;</span>
              </p>
            </div>
            <div class="my-8">
              <p class="myPrimaryParagraph text-sm font-medium pb-3">Filters</p>
              <div class="flex flex-col myPrimaryGap">
                <div class="flex items-center justify-start gap-6">
                  <div class="myPrimaryParagraph text-xs font-medium w-1/3">
                    Blur
                  </div>
                  <div
                    class="border border-myPrimaryDarkGrayColor hover:border-gray-400 h-10 flex items-center justify-between px-2 shadow rounded-lg w-2/3"
                  >
                    <p class="myPrimaryParagraph text-xs">blur-lg</p>
                    <div class="material-symbols-outlined">expand_more</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="w-full border-t border-gray-300"></div>
            <div class="my-8">
              <p class="myPrimaryParagraph text-sm font-medium pb-3">Borders</p>
              <div class="flex flex-col myPrimaryGap">
                <div class="flex items-center justify-start gap-6">
                  <div class="myPrimaryParagraph text-xs font-medium w-1/3">
                    Radius
                  </div>
                  <div
                    class="border border-myPrimaryDarkGrayColor hover:border-gray-400 h-10 flex items-center justify-between px-2 shadow rounded-lg w-2/3"
                  >
                    <p class="myPrimaryParagraph text-xs">rounded</p>
                    <div class="material-symbols-outlined">expand_more</div>
                  </div>
                </div>
                <div class="flex items-center justify-start gap-6">
                  <div class="myPrimaryParagraph text-xs font-medium w-1/3">
                    Width
                  </div>
                  <div
                    class="border border-myPrimaryDarkGrayColor hover:border-gray-400 h-10 flex items-center justify-between px-2 shadow rounded-lg w-2/3"
                  >
                    <p class="myPrimaryParagraph text-xs">border-0</p>
                    <div class="material-symbols-outlined">expand_more</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="w-full border-t border-gray-300"></div>
            <div class="my-4">
              <p class="myPrimaryParagraph text-sm font-medium pb-3">
                Typography
              </p>
              <div class="flex flex-col myPrimaryGap">
                <div class="flex items-center justify-start gap-6">
                  <div class="myPrimaryParagraph text-xs font-medium w-1/3">
                    Font Family
                  </div>
                  <div class="flex justify-end w-full">
                    <div
                      class="shadow h-8 w-14 rounded-lg flex items-center border-none justify-center bg-gray-50 aspect-square hover:bg-myPrimaryLinkColor hover:text-white focus-visible:ring-0"
                    >
                      <span class="material-symbols-outlined"> aq </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="w-full border-t border-gray-300"></div>
            <div class="my-4">
              <p class="myPrimaryParagraph text-sm font-medium pb-3">Video</p>
              <div class="flex flex-col myPrimaryGap">
                <div class="flex items-center justify-start gap-6">
                  <div class="myPrimaryParagraph text-xs font-medium w-1/3">
                    Add Video
                  </div>
                  <div class="flex justify-end w-full">
                    <div
                      class="shadow h-8 w-14 rounded-lg flex items-center border-none justify-center bg-gray-50 aspect-square hover:bg-myPrimaryLinkColor hover:text-white focus-visible:ring-0"
                    >
                      <span class="material-symbols-outlined">
                        play_arrow
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="w-full border-t border-gray-300"></div>
            <div class="my-8">
              <p class="myPrimaryParagraph text-sm font-medium pb-3">
                Customization
              </p>
              <div class="flex flex-col myPrimaryGap">
                <div class="flex items-center justify-start gap-6">
                  <div class="myPrimaryParagraph text-xs font-medium w-1/3">
                    Shadow
                  </div>
                  <div
                    class="myPrimaryParagraph text-xs font-medium flex justify-end w-full"
                  >
                    <div
                      class="pointer-events-auto h-6 w-10 rounded-full p-1 ring-1 ring-inset transition duration-200 ease-in-out bg-myPrimaryLinkColor ring-black/20"
                    >
                      <div
                        class="h-4 w-4 rounded-full bg-white shadow-sm ring-1 ring-slate-700/10 transition duration-200 ease-in-out translate-x-4"
                      ></div>
                    </div>
                  </div>
                </div>
                <div class="flex items-center justify-start gap-6">
                  <div class="myPrimaryParagraph text-xs font-medium w-1/3">
                    Sepia
                  </div>
                  <div
                    class="border border-myPrimaryDarkGrayColor hover:border-gray-400 h-10 flex items-center justify-between px-2 shadow rounded-lg w-2/3"
                  >
                    <p class="myPrimaryParagraph text-xs">sepia-0</p>
                    <div class="material-symbols-outlined">expand_more</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="w-full border-t border-gray-300"></div>
            <div class="my-8">
              <p class="myPrimaryParagraph text-sm font-medium pb-3">Spacing</p>
              <div class="flex flex-col myPrimaryGap">
                <div class="flex items-center justify-start gap-6">
                  <div class="myPrimaryParagraph text-xs font-medium w-1/3">
                    Padding
                  </div>
                  <div
                    class="border border-myPrimaryDarkGrayColor hover:border-gray-400 h-10 flex items-center justify-between px-2 shadow rounded-lg w-2/3"
                  >
                    <p class="myPrimaryParagraph text-xs">p-0</p>
                    <div class="material-symbols-outlined">expand_more</div>
                  </div>
                </div>
                <div class="flex items-center justify-start gap-6">
                  <div class="myPrimaryParagraph text-xs font-medium w-1/3">
                    Margin
                  </div>
                  <div
                    class="border border-myPrimaryDarkGrayColor hover:border-gray-400 h-10 flex items-center justify-between px-2 shadow rounded-lg w-2/3"
                  >
                    <p class="myPrimaryParagraph text-xs">m-0</p>
                    <div class="material-symbols-outlined">expand_more</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="w-full border-t border-gray-300"></div>
            <div class="my-8">
              <p class="myPrimaryParagraph text-sm font-medium pb-3">
                Backgrounds
              </p>
              <div class="flex flex-col myPrimaryGap">
                <div class="flex items-center justify-start gap-6">
                  <div class="myPrimaryParagraph text-xs font-medium w-1/3">
                    Color
                  </div>
                  <div
                    class="border border-myPrimaryDarkGrayColor hover:border-gray-400 h-10 flex items-center justify-between px-2 shadow rounded-lg w-2/3"
                  >
                    <p class="myPrimaryParagraph text-xs">bg-black</p>
                    <div class="material-symbols-outlined">expand_more</div>
                  </div>
                </div>
                <div class="flex items-center justify-start gap-6">
                  <div class="myPrimaryParagraph text-xs font-medium w-1/3">
                    Size
                  </div>
                  <div
                    class="border border-myPrimaryDarkGrayColor hover:border-gray-400 h-10 flex items-center justify-between px-2 shadow rounded-lg w-2/3"
                  >
                    <p class="myPrimaryParagraph text-xs">bg-cover</p>
                    <div class="material-symbols-outlined">expand_more</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="w-full border-t border-gray-300"></div>
            <div class="my-8">
              <p class="myPrimaryParagraph text-sm font-medium pb-3">
                Settings
              </p>
              <div class="flex flex-col myPrimaryGap">
                <div class="flex items-center justify-start gap-6">
                  <div class="myPrimaryParagraph text-xs font-medium w-1/3">
                    Download
                  </div>
                  <div class="flex justify-end w-full">
                    <div
                      class="shadow h-8 w-14 rounded-lg flex items-center border-none justify-center bg-gray-50 aspect-square hover:bg-myPrimaryLinkColor hover:text-white focus-visible:ring-0"
                    >
                      <span class="material-symbols-outlined">
                        cloud_download
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--]-->
    </div>
  </div>
</template>
