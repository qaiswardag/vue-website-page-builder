<script setup>
import PageBuilder from '@/composables/PageBuilder';
import EditorAccordion from '../EditorAccordion.vue';
import { computed, nextTick, ref, watch } from 'vue';
import { Switch } from '@headlessui/vue';
import { usePageBuilderStateStore } from '@/stores/page-builder-state';
import { useMediaLibraryStore } from '@/stores/media-library';

const mediaLibraryStore = useMediaLibraryStore();
const pageBuilderStateStore = usePageBuilderStateStore();
const pageBuilder = new PageBuilder(pageBuilderStateStore, mediaLibraryStore);
const hyperlinkEnable = ref(false);
const urlInput = ref(null);
const openHyperlinkInNewTab = ref(false);
const getElementContainsHyperlink = computed(() => {
  return pageBuilderStateStore.getElementContainsHyperlink;
});
const getHyperlinkAbility = computed(() => {
  return pageBuilderStateStore.getHyperlinkAbility;
});
const getHyperlinkMessage = computed(() => {
  return pageBuilderStateStore.getHyperlinkMessage;
});
const getHyperlinkError = computed(() => {
  return pageBuilderStateStore.getHyperlinkError;
});
const getHyperlinkInput = computed(() => {
  return pageBuilderStateStore.getHyperlinkInput;
});
const getHyberlinkEnable = computed(() => {
  return pageBuilderStateStore.getHyberlinkEnable;
});

const getOpenHyperlinkInNewTab = computed(() => {
  return pageBuilderStateStore.getOpenHyperlinkInNewTab;
});
const getElement = computed(() => {
  return pageBuilderStateStore.getElement;
});

watch(getHyperlinkInput, (newValue) => {
  urlInput.value = newValue;
});
watch(getHyberlinkEnable, (newValue) => {
  hyperlinkEnable.value = newValue;
});
watch(getOpenHyperlinkInNewTab, (newValue) => {
  openHyperlinkInNewTab.value = newValue;
});

// remove hyperlink
watch(hyperlinkEnable, (hyperlinkEnableNewValue) => {
  hyperlinkEnable.value = hyperlinkEnableNewValue;
  pageBuilderStateStore.setHyberlinkEnable(hyperlinkEnable.value);
});

const handleToggleHyperlinkEnable = async function (data) {
  await nextTick();

  // remove hyperlink
  if (hyperlinkEnable.value === false) {
    pageBuilder.handleHyperlink(hyperlinkEnable.value, data);
  }
};
// add hyperlink
const handleHyperlink = function () {
  pageBuilder.handleHyperlink(
    hyperlinkEnable.value,
    urlInput.value,
    openHyperlinkInNewTab.value
  );
};

const handleToggleOpenHyperlinkInNewTab = async function () {
  await nextTick();

  pageBuilder.handleHyperlink(
    hyperlinkEnable.value,
    urlInput.value,
    openHyperlinkInNewTab.value
  );
};
</script>

<template>
  <EditorAccordion>
    <template #title>Link</template>
    <template #content>
      <!-- Hyperlink ability / start -->
      <div
        v-if="getHyperlinkAbility === false"
        class="rounded-md bg-red-50 p-2"
      >
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <ExclamationCircleIcon
              class="w-4 h-4 text-myPrimaryErrorColor"
            ></ExclamationCircleIcon>
          </div>
          <div class="ml-2">
            <p class="text-sm font-medium text-green-800">
              Not able to add hyperlink on this element
            </p>
          </div>
          <div class="ml-auto pl-3">
            <div class="-mx-1.5 -my-1.5">
              <button
                type="button"
                class="inline-flex rounded-md bg-green-50 p-1.5 text-green-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50"
              ></button>
            </div>
          </div>
        </div>
      </div>
      <!-- Hyperlink ability / end -->
      <div v-if="getHyperlinkAbility === true">
        <div class="my-3 py-3">
          <div class="flex items-center justify-between gap-2 w-full">
            <p class="myPrimaryParagraph">Enable hyperlink</p>
            <!-- Toggle start -->
            <Switch
              v-model="hyperlinkEnable"
              @click="handleToggleHyperlinkEnable('removeHyperlink')"
              :class="[
                hyperlinkEnable ? 'bg-myPrimaryLinkColor' : 'bg-gray-200',
                'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-myPrimaryLinkColor focus:ring-offset-2',
              ]"
            >
              <span class="sr-only">Use setting</span>
              <span
                :class="[
                  hyperlinkEnable ? 'translate-x-5' : 'translate-x-0',
                  'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                ]"
              >
                <span
                  :class="[
                    hyperlinkEnable
                      ? 'opacity-0 ease-out duration-100'
                      : 'opacity-100 ease-in duration-200',
                    'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity',
                  ]"
                  aria-hidden="true"
                >
                  <svg
                    class="h-3 w-3 text-gray-400"
                    fill="none"
                    viewBox="0 0 12 12"
                  >
                    <path
                      d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </span>
                <span
                  :class="[
                    hyperlinkEnable
                      ? 'opacity-100 ease-in duration-200'
                      : 'opacity-0 ease-out duration-100',
                    'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity',
                  ]"
                  aria-hidden="true"
                >
                  <svg
                    class="h-3 w-3 text-myPrimaryLinkColor"
                    fill="currentColor"
                    viewBox="0 0 12 12"
                  >
                    <path
                      d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z"
                    />
                  </svg>
                </span>
              </span>
            </Switch>
            <!-- Toggle end -->
          </div>
        </div>
        <!-- attached url - start -->
        <div
          v-if="getElementContainsHyperlink === true"
          class="rounded-md bg-green-50 p-2"
        >
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <span class="myMediumIcon material-symbols-outlined">
                check
              </span>
            </div>
            <div class="ml-2">
              <p class="text-sm font-medium text-green-800">Hyperlink added</p>
            </div>
            <div class="ml-auto pl-3">
              <div class="-mx-1.5 -my-1.5">
                <button
                  type="button"
                  class="inline-flex rounded-md bg-green-50 p-1.5 text-green-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50"
                ></button>
              </div>
            </div>
          </div>
        </div>
        <!-- attached url - end -->
        <!-- no attached url - start -->
        <div
          v-if="getElementContainsHyperlink === false"
          class="rounded-md bg-red-50 p-2"
        >
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <ExclamationCircleIcon
                class="w-4 h-4 text-myPrimaryErrorColor"
              ></ExclamationCircleIcon>
            </div>
            <div class="ml-2">
              <p class="text-sm font-medium text-green-800">
                No hyperlink added
              </p>
            </div>
            <div class="ml-auto pl-3">
              <div class="-mx-1.5 -my-1.5">
                <button
                  type="button"
                  class="inline-flex rounded-md bg-green-50 p-1.5 text-green-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50"
                ></button>
              </div>
            </div>
          </div>
        </div>
        <!-- no attached url - end -->
        <div
          v-if="hyperlinkEnable === true"
          class="my-3 py-3"
        >
          <div
            class="relative flex items-center w-full border myPrimaryInput py-0 p-0"
          >
            <input
              v-model="urlInput"
              type="text"
              placeholder="URL.."
              autocomplete="off"
              class="myPrimaryInput border-none rounded-r-none ml-0 w-full"
              @keydown.enter.tab.prevent="handleHyperlink()"
            />
            <div
              class="border border-gray-200 border-none rounded flex items-center justify-center h-full w-8"
            >
              <kbd class="myPrimaryParagraph text-gray-400 border-none">
                ⏎
              </kbd>
            </div>
          </div>

          <p
            v-if="getHyperlinkMessage !== null"
            class="myPrimaryParagraph text-myPrimarySuccesColor mt-1"
          >
            {{ getHyperlinkMessage }}
          </p>
          <p
            v-if="getHyperlinkError !== null"
            class="myPrimaryParagraphError mt-1"
          >
            {{ getHyperlinkError }}
          </p>

          <div class="my-3 py-3">
            <div class="flex items-center justify-between gap-2 w-full">
              <p class="myPrimaryParagraph">Open in new tab</p>
              <!-- Toggle start -->
              <Switch
                v-model="openHyperlinkInNewTab"
                @click="handleToggleOpenHyperlinkInNewTab"
                :class="[
                  openHyperlinkInNewTab
                    ? 'bg-myPrimaryLinkColor'
                    : 'bg-gray-200',
                  'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-myPrimaryLinkColor focus:ring-offset-2',
                ]"
              >
                <span class="sr-only">Use setting</span>
                <span
                  :class="[
                    openHyperlinkInNewTab ? 'translate-x-5' : 'translate-x-0',
                    'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                  ]"
                >
                  <span
                    :class="[
                      openHyperlinkInNewTab
                        ? 'opacity-0 ease-out duration-100'
                        : 'opacity-100 ease-in duration-200',
                      'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity',
                    ]"
                    aria-hidden="true"
                  >
                    <svg
                      class="h-3 w-3 text-gray-400"
                      fill="none"
                      viewBox="0 0 12 12"
                    >
                      <path
                        d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span>
                  <span
                    :class="[
                      openHyperlinkInNewTab
                        ? 'opacity-100 ease-in duration-200'
                        : 'opacity-0 ease-out duration-100',
                      'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity',
                    ]"
                    aria-hidden="true"
                  >
                    <svg
                      class="h-3 w-3 text-myPrimaryLinkColor"
                      fill="currentColor"
                      viewBox="0 0 12 12"
                    >
                      <path
                        d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z"
                      />
                    </svg>
                  </span>
                </span>
              </Switch>
              <!-- Toggle end -->
            </div>
          </div>
        </div>
      </div>
    </template>
  </EditorAccordion>
</template>
