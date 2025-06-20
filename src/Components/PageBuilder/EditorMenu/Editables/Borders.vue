<script setup>
import { ref, computed, watch } from 'vue'
import EditorAccordion from '../EditorAccordion.vue'
import PageBuilderClass from '../../../../composables/PageBuilderClass.ts'
import tailwindBorderStyleWidthPlusColor from '../../../../utils/builder/tailwind-border-style-width-color'
import tailwindColors from '../../../../utils/builder/tailwaind-colors'
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/vue'
import { sharedPageBuilderStore } from '../../../../stores/shared-store'

// Use shared store instance
const pageBuilderStateStore = sharedPageBuilderStore

const pageBuilderClass = new PageBuilderClass(pageBuilderStateStore)
const borderStyle = ref(null)
const borderWidth = ref(null)
const borderColor = ref(null)
const getBorderStyle = computed(() => {
  return pageBuilderStateStore.getBorderStyle
})
const getBorderWidth = computed(() => {
  return pageBuilderStateStore.getBorderWidth
})
const getBorderColor = computed(() => {
  return pageBuilderStateStore.getBorderColor
})

watch(
  getBorderStyle,
  async (newValue) => {
    borderStyle.value = newValue
    await pageBuilderClass.initializeElementStyles()
  },
  { immediate: true },
)
watch(
  getBorderWidth,
  async (newValue) => {
    borderWidth.value = newValue
    await pageBuilderClass.initializeElementStyles()
  },
  { immediate: true },
)
watch(
  getBorderColor,
  async (newValue) => {
    borderColor.value = newValue
    await pageBuilderClass.initializeElementStyles()
  },
  { immediate: true },
)
</script>

<template>
  <EditorAccordion>
    <template #title>Border Style, Width & Color</template>
    <template #content>
      <p class="pbx-myPrimaryParagraph pbx-font-medium pbx-py-0 pbx-my-4">Border</p>

      <div class="pbx-my-2 pbx-py-2">
        <label class="pbx-myPrimaryInputLabel"> Border Style </label>
        <select
          v-model="borderStyle"
          class="pbx-myPrimarySelect"
          @change="pageBuilderClass.handleBorderStyle(borderStyle)"
        >
          <option disabled value="">Select</option>
          <option
            v-for="borderStyle in tailwindBorderStyleWidthPlusColor.borderStyle"
            :key="borderStyle"
          >
            {{ borderStyle }}
          </option>
        </select>
      </div>
      <div class="pbx-my-2 pbx-py-2">
        <label class="pbx-myPrimaryInputLabel"> Border Width </label>
        <select
          v-model="borderWidth"
          class="pbx-myPrimarySelect"
          @change="pageBuilderClass.handleBorderWidth(borderWidth)"
        >
          <option disabled value="">Select</option>
          <option
            v-for="borderWidth in tailwindBorderStyleWidthPlusColor.borderWidth"
            :key="borderWidth"
          >
            {{ borderWidth }}
          </option>
        </select>
      </div>

      <label class="pbx-myPrimaryInputLabel"> Border Color </label>
      <Listbox as="div" v-model="borderColor">
        <div class="pbx-relative pbx-mt-2">
          <ListboxButton class="pbx-myPrimarySelect">
            <span class="pbx-flex pbx-items-center pbx-gap-2">
              <div v-if="getBorderColor === 'none'">
                <div class="pbx-myPrimaryColorPreview pbx-border-none">
                  <span class="material-symbols-outlined"> ev_shadow </span>
                </div>
              </div>
              <div
                v-if="borderColor !== 'none'"
                class="pbx-aspect-square pbx-w-6 pbx-h-6 pbx-border pbx-border-gray-100 pbx-rounded-sm"
                :class="`bg-${borderColor?.replace('border-', '')}`"
              ></div>
              <span class="pbx-block pbx-truncate">{{ borderColor }}</span>
            </span>
            <span
              class="pbx-pointer-events-none pbx-absolute pbx-inset-y-0 pbx-right-0 pbx-ml-3 pbx-flex pbx-items-center pbx-pr-2"
            >
              <span class="material-symbols-outlined"> keyboard_arrow_down </span>
            </span>
          </ListboxButton>

          <transition
            leave-active-class="pbx-transition pbx-ease-in pbx-duration-100"
            leave-from-class="pbx-opacity-100"
            leave-to-class="pbx-opacity-0"
          >
            <ListboxOptions
              class="pbx-absolute pbx-z-10 pbx-mt-1 pbx-max-h-56 pbx-w-full pbx-overflow-auto pbx-rounded-md pbx-bg-white pbx-py-1 pbx-text-base pbx-shadow-lg pbx-ring-1 pbx-ring-black pbx-ring-opacity-5 focus:pbx-outline-none sm:pbx-text-sm"
            >
              <ListboxOption
                as="template"
                v-for="color in tailwindBorderStyleWidthPlusColor.borderColor"
                @click="pageBuilderClass.handleBorderColor(borderColor)"
                :key="color"
                :value="color"
                v-slot="{ active, borderColor }"
              >
                <li
                  :class="[
                    active
                      ? 'pbx-bg-myPrimaryLinkColor pbx-text-white'
                      : 'pbx-text-myPrimaryDarkGrayColor',
                    'pbx-relative pbx-cursor-default pbx-select-none pbx-py-2 pbx-pl-3 pbx-pr-9',
                  ]"
                >
                  <div class="pbx-flex pbx-items-center">
                    <div v-if="color === 'none'">
                      <div class="pbx-myPrimaryColorPreview pbx-border-none">
                        <span class="material-symbols-outlined"> ev_shadow </span>
                      </div>
                    </div>

                    <div
                      v-if="color !== 'none'"
                      class="pbx-aspect-square pbx-w-6 pbx-h-6 pbx-bg-gray-950"
                      :class="`bg-${color.replace('border-', '')}`"
                    ></div>
                    <span v-if="color === 'none'" class="pbx-ml-3">Transparent</span>
                    <span v-if="color !== 'none'" class="pbx-ml-3">{{ color }}</span>
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
