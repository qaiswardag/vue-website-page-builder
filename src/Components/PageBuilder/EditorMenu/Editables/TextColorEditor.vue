<script setup>
import { ref, computed, inject, watch } from 'vue'
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/vue'
import PageBuilderClass from '@/composables/PageBuilderClass.ts'
import tailwindColors from '@/utils/builder/tailwaind-colors'

// Get stores from parent PageBuilder component
const pageBuilderStateStore = inject('pageBuilderStateStore')
const pageBuilderClass = new PageBuilderClass(pageBuilderStateStore)
const textColor = ref(null)
const getTextColor = computed(() => {
  return pageBuilderStateStore.getTextColor
})

watch(
  getTextColor,
  (newValue) => {
    textColor.value = newValue
    pageBuilderClass.handlePageBuilderMethods()
  },
  { immediate: true },
)
</script>

<template>
  <Listbox as="div" v-model="textColor">
    <div class="relative">
      <ListboxButton
        class="w-max flex items-center px-2 text-[12.5px] gap-2 text-nowrap pl-2 pr-3 h-10 cursor-pointer rounded-full border-none justify-center bg-gray-50 hover:bg-myPrimaryLinkColor hover:text-white focus-visible:ring-0"
      >
        <div v-if="getTextColor === 'none'" class="flex gap-2 items-center">
          <span class="material-symbols-outlined"> format_color_text </span>
          <span class="block truncate text-[12.5px]">Text color</span>
        </div>
        <div v-if="textColor !== 'none'" class="flex items-center gap-2">
          <div
            class="aspect-square w-6 h-6 border border-gray-800 rounded-sm"
            :class="`bg-${textColor?.replace('text-', '')}`"
          ></div>
          <span class="block truncate text-[12.5px]">{{ textColor }}</span>
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
            v-for="color in tailwindColors.textColorVariables"
            @click="pageBuilderClass.handleTextColor(textColor)"
            :key="color"
            :value="color"
            v-slot="{ active, textColor }"
          >
            <li
              :class="[
                active ? 'bg-myPrimaryLinkColor text-white' : 'text-myPrimaryDarkGrayColor',
                'relative cursor-default select-none py-2 pl-3 pr-9',
              ]"
            >
              <div v-if="color === 'none'" class="flex items-center">
                <span class="material-symbols-outlined"> invert_colors </span>
                <span class="ml-3">Default black</span>
              </div>
              <div v-if="color !== 'none'" class="flex items-center">
                <div
                  class="aspect-square w-6 h-6 border border-gray-100 rounded-sm"
                  :class="`bg-${color.replace('text-', '')}`"
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
