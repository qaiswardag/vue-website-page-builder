<script setup>
import { ref, computed, watch } from 'vue'
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/vue'
import PageBuilderClass from '../../../../composables/PageBuilderClass.ts'
import tailwindColors from '../../../../utils/builder/tailwaind-colors'
import { sharedPageBuilderStore } from '../../../../stores/shared-store'

// Use shared store instance
const pageBuilderStateStore = sharedPageBuilderStore
const pageBuilderClass = new PageBuilderClass(pageBuilderStateStore)
const textColor = ref(null)
const getTextColor = computed(() => {
  return pageBuilderStateStore.getTextColor
})

watch(
  getTextColor,
  async (newValue) => {
    textColor.value = newValue
    await pageBuilderClass.initializeElementStyles()
  },
  { immediate: true },
)
</script>

<template>
  <Listbox as="div" v-model="textColor">
    <div class="pbx-relative">
      <ListboxButton class="pbx-w-max pbx-flex pbx-items-center pbx-myPrimaryTag">
        <div v-if="getTextColor === 'none'" class="pbx-flex pbx-gap-2 pbx-items-center">
          <span class="material-symbols-outlined"> format_color_text </span>
          <span class="pbx-block pbx-truncate pbx-text-[12.5px]">Text color</span>
        </div>
        <div v-if="textColor !== 'none'" class="pbx-flex pbx-items-center pbx-gap-2">
          <div
            class="pbx-aspect-square pbx-w-6 pbx-h-6 pbx-border pbx-border-gray-800 pbx-rounded-sm"
            :class="`pbx-bg-${textColor?.replace('pbx-text-', '')}`"
          ></div>
          <span class="pbx-block pbx-truncate pbx-text-[12.5px]">{{ textColor }}</span>
        </div>
      </ListboxButton>

      <transition
        leave-active-class="pbx-transition pbx-ease-in pbx-duration-100"
        leave-from-class="pbx-opacity-100"
        leave-to-class="pbx-opacity-0"
      >
        <ListboxOptions
          class="pbx-absolute pbx-min-w-[12rem] pbx-z-40 pbx-mt-1 pbx-max-h-56 pbx-w-full pbx-overflow-auto pbx-rounded-md pbx-bg-gray-50 pbx-py-1 pbx-text-base pbx-shadow-lg pbx-ring-1 pbx-ring-black pbx-ring-opacity-5 focus:pbx-outline-none sm:pbx-text-sm"
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
                active
                  ? 'pbx-bg-myPrimaryLinkColor pbx-text-white'
                  : 'pbx-text-myPrimaryDarkGrayColor',
                'pbx-relative pbx-cursor-default pbx-select-none pbx-py-2 pbx-pl-3 pbx-pr-9',
              ]"
            >
              <div v-if="color === 'none'" class="pbx-flex pbx-items-center">
                <span class="material-symbols-outlined"> invert_colors </span>
                <span class="pbx-ml-3">Default black</span>
              </div>
              <div v-if="color !== 'none'" class="pbx-flex pbx-items-center">
                <div
                  class="pbx-aspect-square pbx-w-6 pbx-h-6 pbx-border pbx-border-gray-100 pbx-rounded-sm"
                  :class="`pbx-bg-${color.replace('pbx-text-', '')}`"
                ></div>
                <span class="pbx-ml-3">{{ color }}</span>
              </div>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>
