<script setup>
import tailwindColors from '@/utils/builder/tailwaind-colors';
import PageBuilder from '@/composables/PageBuilder';
import { computed, ref, watch } from 'vue';
import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/vue';
import { usePageBuilderStateStore } from '@/stores/page-builder-state';
import { useMediaLibraryStore } from '@/stores/media-library';

const mediaLibraryStore = useMediaLibraryStore();
const pageBuilderStateStore = usePageBuilderStateStore();
const pageBuilder = new PageBuilder(pageBuilderStateStore, mediaLibraryStore);
const backgroundColor = ref(null);
const getBackgroundColor = computed(() => {
  return pageBuilderStateStore.getBackgroundColor;
});

watch(
  getBackgroundColor,
  (newValue) => {
    backgroundColor.value = newValue;
    pageBuilder.handlePageBuilderMethods();
  },
  { immediate: true }
);
</script>

<template>
  <Listbox
    as="div"
    v-model="backgroundColor"
  >
    <div class="relative">
      <ListboxButton
        class="w-max flex items-center px-2 text-[12.5px] gap-2 text-nowrap pl-2 pr-3 h-10 cursor-pointer rounded-full border-none justify-center bg-gray-50 hover:bg-myPrimaryLinkColor hover:text-white focus-visible:ring-0"
      >
        <div
          v-if="getBackgroundColor === 'none'"
          class="flex gap-2 items-center"
        >
          <span class="material-symbols-outlined"> colors </span>
          <span class="block truncate text-[12.5px]">Background color </span>
        </div>
        <div
          v-if="backgroundColor !== 'none'"
          class="flex items-center gap-2"
        >
          <div
            class="aspect-square w-6 h-6 border border-gray-800 rounded-sm"
            :class="`bg-${backgroundColor?.replace('bg-', '')}`"
          ></div>
          <span class="block truncate">{{ backgroundColor }}</span>
        </div>
      </ListboxButton>

      <transition
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions
          class="absolute min-w-[12rem] z-40 mt-1 max-h-56 w-full overflow-auto rounded-md bg-gray-50 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
        >
          <ListboxOption
            as="template"
            v-for="color in tailwindColors.backgroundColorVariables"
            @click="pageBuilder.handleBackgroundColor(backgroundColor)"
            :key="color"
            :value="color"
            v-slot="{ active, backgroundColor }"
          >
            <li
              :class="[
                active
                  ? 'bg-myPrimaryLinkColor text-white'
                  : 'text-myPrimaryDarkGrayColor',
                'relative cursor-default select-none py-2 pl-3 pr-9',
              ]"
            >
              <div
                v-if="color === 'none'"
                class="flex items-center"
              >
                <span class="material-symbols-outlined"> ev_shadow </span>
                <span class="ml-3">Transparent</span>
              </div>
              <div
                v-if="color !== 'none'"
                class="flex items-center"
              >
                <div
                  class="aspect-square w-6 h-6 border border-gray-100 rounded-sm"
                  :class="`bg-${color.replace('bg-', '')}`"
                ></div>
                <span class="ml-3">{{ color }}</span>
              </div>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>
