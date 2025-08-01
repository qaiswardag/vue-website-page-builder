<script setup>
import { ref, computed, watch } from 'vue'
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/vue'
import tailwindColors from '../../../../utils/builder/tailwaind-colors'
import { sharedPageBuilderStore } from '../../../../stores/shared-store'
import { getPageBuilder } from '../../../../composables/builderInstance'
import { useTranslations } from '../../../../composables/useTranslations'

const { translate } = useTranslations()

const pageBuilderService = getPageBuilder()

// Use shared store instance
const pageBuilderStateStore = sharedPageBuilderStore

defineProps({
  globalPageLayout: {
    Type: Boolean,
  },
})

const backgroundColor = ref(null)
const getBackgroundColor = computed(() => {
  return pageBuilderStateStore.getBackgroundColor
})

watch(
  getBackgroundColor,
  async (newValue) => {
    backgroundColor.value = newValue
    await pageBuilderService.initializeElementStyles()
  },
  { immediate: true },
)
</script>

<template>
  <Listbox as="div" v-model="backgroundColor">
    <div class="pbx-relative">
      <div
        :class="[
          globalPageLayout
            ? 'pbx-flex pbx-flex-col pbx-border-solid pbx-border pbx-border-gray-400'
            : 'pbx-flex pbx-gap-2 pbx-items-center',
        ]"
      >
        <ListboxButton
          v-if="globalPageLayout"
          class="pbx-flex pbx-flex-row pbx-justify-between pbx-items-center pbx-pl-3 pbx-pr-3 pbx-py-5 pbx-cursor-pointer pbx-duration-200 hover:pbx-bg-myPrimaryLightGrayColor pbx-bg-white hover:pbx-text-black pbx-text-black pbx-font-sans pbx-font-medium pbx-border-0"
        >
          <div class="pbx-flex pbx-justify-start pbx-items-center pbx-gap-2">
            <div
              class="pbx-aspect-square pbx-w-6 pbx-h-6 pbx-border pbx-border-gray-600 pbx-rounded-sm pbx-bg-none pbx-border-solid"
              :class="`pbx-bg-${backgroundColor?.replace('pbx-bg-', '')}`"
            ></div>
            <div>{{ translate('Background Color') }}</div>
          </div>

          <span v-if="globalPageLayout" class="material-symbols-outlined"> chevron_right </span>
        </ListboxButton>

        <ListboxButton
          v-if="!globalPageLayout"
          class="pbx-h-10 pbx-w-10 pbx-flex-end pbx-cursor-pointer pbx-rounded-full pbx-flex pbx-items-center pbx-border-none pbx-justify-center pbx-bg-gray-200 pbx-aspect-square hover:pbx-bg-gray-100 hover:pbx-fill-white focus-visible:pbx-ring-0 pbx-text-myPrimaryDarkGrayColor"
        >
          <div class="pbx-flex pbx-flex-col">
            <div class="pbx-flex pbx-gap-2 pbx-items-center">
              <span
                class="material-symbols-outlined"
                style="text-shadow: rgb(0 0 0 / 10%) 1.5px 1.5px 0px"
                :class="`pbx-text-${backgroundColor?.replace('pbx-bg-', '')}`"
              >
                format_color_fill
              </span>
            </div>
          </div>
        </ListboxButton>
      </div>

      <transition
        leave-active-class="pbx-transition pbx-ease-in pbx-duration-100"
        leave-from-class="pbx-opacity-100"
        leave-to-class="pbx-opacity-0"
      >
        <ListboxOptions
          class="pbx-headless-dropdown pbx-absolute pbx-min-w-[12rem] pbx-z-40 pbx-mt-1 pbx-max-h-56 pbx-w-full pbx-overflow-auto pbx-rounded-md pbx-bg-gray-50 pbx-py-1 pbx-text-base pbx-shadow-lg pbx-ring-1 pbx-ring-black pbx-ring-opacity-5 focus:pbx-outline-none sm:pbx-text-sm"
        >
          <ListboxOption
            as="template"
            v-for="color in tailwindColors.backgroundColorVariables"
            @click="pageBuilderService.handleBackgroundColor(backgroundColor)"
            :key="color"
            :value="color"
            v-slot="{ active, backgroundColor }"
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
                <span class="material-symbols-outlined"> ev_shadow </span>
                <span class="pbx-ml-3">{{ translate('Transparent') }}</span>
              </div>
              <div v-if="color !== 'none'" class="pbx-flex pbx-items-center">
                <div
                  class="pbx-aspect-square pbx-w-6 pbx-h-6 pbx-border-solid pbx-border pbx-border-gray-100 pbx-rounded-sm"
                  :class="`pbx-bg-${color.replace('pbx-bg-', '')}`"
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
