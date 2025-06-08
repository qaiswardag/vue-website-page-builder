<script setup>
import { ref, computed, inject, watch } from 'vue'
import EditorAccordion from '../EditorAccordion.vue'
import PageBuilderClass from '@/composables/PageBuilderClass.ts'
import tailwindOpacities from '@/utils/builder/tailwind-opacities'
import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/vue'

// Get stores from parent PageBuilder component
const pageBuilderStateStore = inject('pageBuilderStateStore')
const pageBuilderClass = new PageBuilderClass(pageBuilderStateStore)
const opacityVueModel = ref(null)
const getBackgroundOpacity = computed(() => {
  return pageBuilderStateStore.getBackgroundOpacity
})

watch(
  getBackgroundOpacity,
  (newValue) => {
    opacityVueModel.value = newValue
    pageBuilderClass.handlePageBuilderMethods()
  },
  { immediate: true },
)
</script>

<template>
  <div class="my-3 py-3">
    <label class="myPrimaryInputLabel"> Background opacity</label>

    <Listbox as="div" v-model="opacityVueModel">
      <div class="relative">
        <ListboxButton class="myPrimarySelect">
          <span class="flex items-center gap-2">
            <div v-if="opacityVueModel === 'none'">
              <div class="myPrimaryColorPreview border-none">
                <span class="material-symbols-outlined"> ev_shadow </span>
              </div>
            </div>

            <div
              v-if="opacityVueModel !== 'none'"
              class="aspect-square w-6 h-6 bg-gray-950"
              :class="`${opacityVueModel}`"
            ></div>

            <span class="block truncate" :class="[opacityVueModel !== 'none' ? '' : '']">{{
              opacityVueModel === 'none' ? 'Transparent' : opacityVueModel
            }}</span>
          </span>
          <span class="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
            <span class="material-symbols-outlined"> keyboard_arrow_down </span>
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
              v-for="backgroundOpacity in tailwindOpacities.backgroundOpacities"
              @click="pageBuilderClass.handleBackgroundOpacity(backgroundOpacity)"
              :key="backgroundOpacity"
              :value="backgroundOpacity"
              v-slot="{ active }"
            >
              <li
                :class="[
                  active ? 'bg-myPrimaryLinkColor text-white' : 'text-myPrimaryDarkGrayColor',
                  'relative cursor-default select-none py-2 pl-3 pr-9',
                ]"
              >
                <div class="flex items-center">
                  <div v-if="backgroundOpacity === 'none'" class="aspect-square w-6 h-6">
                    <div class="myPrimaryColorPreview border-none">
                      <span class="material-symbols-outlined"> ev_shadow </span>
                    </div>
                  </div>

                  <div
                    v-if="backgroundOpacity !== 'none'"
                    class="aspect-square w-6 h-6 bg-gray-950"
                    :class="`${backgroundOpacity}`"
                  ></div>
                  <span v-if="backgroundOpacity !== 'none'" class="ml-3">{{
                    backgroundOpacity
                  }}</span>
                  <span v-if="backgroundOpacity === 'none'" class="ml-3">Transparent</span>
                </div>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
  </div>
</template>
