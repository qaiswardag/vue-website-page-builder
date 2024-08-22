<script setup>
import tailwindBorderStyleWidthPlusColor from '@/utils/builder/tailwind-border-style-width-color';
import PageBuilder from '@/composables/PageBuilder';
import EditorAccordion from '@/Components/PageBuilder/EditorMenu/EditorAccordion.vue';
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
const borderStyle = ref(null);
const borderWidth = ref(null);
const borderColor = ref(null);
const getBorderStyle = computed(() => {
  return pageBuilderStateStore.getBorderStyle;
});
const getBorderWidth = computed(() => {
  return pageBuilderStateStore.getBorderWidth;
});
const getBorderColor = computed(() => {
  return pageBuilderStateStore.getBorderColor;
});

watch(
  getBorderStyle,
  (newValue) => {
    borderStyle.value = newValue;
    pageBuilder.handlePageBuilderMethods();
  },
  { immediate: true }
);
watch(
  getBorderWidth,
  (newValue) => {
    borderWidth.value = newValue;
    pageBuilder.handlePageBuilderMethods();
  },
  { immediate: true }
);
watch(
  getBorderColor,
  (newValue) => {
    borderColor.value = newValue;
    pageBuilder.handlePageBuilderMethods();
  },
  { immediate: true }
);
</script>

<template>
  <EditorAccordion>
    <template #title>Border Style, Width & Color</template>
    <template #content>
      <div class="my-3 py-3">
        <label class="myPrimaryInputLabel"> Border Style </label>
        <select
          v-model="borderStyle"
          class="myPrimarySelect"
          @change="pageBuilder.handleBorderStyle(borderStyle)"
        >
          <option
            disabled
            value=""
          >
            Select
          </option>
          <option
            v-for="borderStyle in tailwindBorderStyleWidthPlusColor.borderStyle"
            :key="borderStyle"
          >
            {{ borderStyle }}
          </option>
        </select>
      </div>
      <div class="my-3 py-3">
        <label class="myPrimaryInputLabel"> Border Width </label>
        <select
          v-model="borderWidth"
          class="myPrimarySelect"
          @change="pageBuilder.handleBorderWidth(borderWidth)"
        >
          <option
            disabled
            value=""
          >
            Select
          </option>
          <option
            v-for="borderWidth in tailwindBorderStyleWidthPlusColor.borderWidth"
            :key="borderWidth"
          >
            {{ borderWidth }}
          </option>
        </select>
      </div>

      <label class="myPrimaryInputLabel"> Border Color </label>
      <Listbox
        as="div"
        v-model="borderColor"
      >
        <div class="relative mt-2">
          <ListboxButton class="myPrimarySelect">
            <span class="flex items-center gap-2">
              <div v-if="getBorderColor === 'none'">
                <div class="myPrimaryColorPreview border-none">
                  <span class="material-symbols-outlined"> ev_shadow </span>
                </div>
              </div>
              <div
                v-if="borderColor !== 'none'"
                class="aspect-square w-6 h-6 border border-gray-100 rounded-sm"
                :class="`bg-${borderColor?.replace('border-', '')}`"
              ></div>
              <span class="block truncate">{{ borderColor }}</span>
            </span>
            <span
              class="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2"
            >
              <span class="material-symbols-outlined">
                keyboard_arrow_down
              </span>
            </span>
          </ListboxButton>

          <transition
            leave-active-class="transition ease-in duration-100"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
          >
            <ListboxOptions
              class="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
            >
              <ListboxOption
                as="template"
                v-for="color in tailwindBorderStyleWidthPlusColor.borderColor"
                @click="pageBuilder.handleBorderColor(borderColor)"
                :key="color"
                :value="color"
                v-slot="{ active, borderColor }"
              >
                <li
                  :class="[
                    active
                      ? 'bg-myPrimaryLinkColor text-white'
                      : 'text-myPrimaryDarkGrayColor',
                    'relative cursor-default select-none py-2 pl-3 pr-9',
                  ]"
                >
                  <div class="flex items-center">
                    <div v-if="color === 'none'">
                      <div class="myPrimaryColorPreview border-none">
                        <span class="material-symbols-outlined">
                          ev_shadow
                        </span>
                      </div>
                    </div>

                    <div
                      v-if="color !== 'none'"
                      class="aspect-square w-6 h-6 bg-gray-950"
                      :class="`bg-${color.replace('border-', '')}`"
                    ></div>
                    <span
                      v-if="color === 'none'"
                      class="ml-3"
                      >Transparent</span
                    >
                    <span
                      v-if="color !== 'none'"
                      class="ml-3"
                      >{{ color }}</span
                    >
                  </div>
                </li>
              </ListboxOption>
            </ListboxOptions>
          </transition>
        </div>
      </Listbox>
    </template>
  </EditorAccordion>
</template>
