<script setup>
import { computed, ref } from 'vue'
import { sharedPageBuilderStore } from '../../../stores/shared-store'
import ModalBuilder from '../../Modals/ModalBuilder.vue'
import PageBuilderSettings from '../Settings/PageBuilderSettings.vue'
import AdvancedPageBuilderSettings from '../Settings/AdvancedPageBuilderSettings.vue'
import { preloadImage } from '../../../composables/preloadImage'

import PageBuilderClass from '../../../composables/PageBuilderClass'
import DynamicModalBuilder from '../../Modals/DynamicModalBuilder.vue'

// Use shared store instance
const pageBuilderStateStore = sharedPageBuilderStore

const getPageBuilderConfig = computed(() => {
  return pageBuilderStateStore.getPageBuilderConfig
})

const pageBuilderClass = new PageBuilderClass(pageBuilderStateStore)

const showModalDeleteAllComponents = ref(false)
//
// use dynamic model
const typeModal = ref('')
const gridColumnModal = ref(Number(1))
const titleModal = ref('')
const descriptionModal = ref('')
const firstButtonModal = ref('')
const secondButtonModal = ref(null)
const thirdButtonModal = ref(null)
// set dynamic modal handle functions
const firstModalButtonFunctionDynamicModalBuilder = ref(null)
const secondModalButtonFunctionDynamicModalBuilder = ref(null)
const thirdModalButtonFunctionDynamicModalBuilder = ref(null)

const deleteAllComponents = function () {
  showModalDeleteAllComponents.value = true
  typeModal.value = 'delete'
  gridColumnModal.value = 2
  titleModal.value = 'Remove all Components'
  descriptionModal.value = 'Are you sure you want to remove all Components?'
  firstButtonModal.value = 'Close'
  secondButtonModal.value = null
  thirdButtonModal.value = 'Delete'

  // handle click
  firstModalButtonFunctionDynamicModalBuilder.value = function () {
    showModalDeleteAllComponents.value = false
  }
  //
  // handle click
  thirdModalButtonFunctionDynamicModalBuilder.value = async function () {
    pageBuilderClass.deleteAllComponents()
    await pageBuilderClass.clearHtmlSelection()

    if (
      getPageBuilderConfig.value.updateOrCreate &&
      typeof getPageBuilderConfig.value.updateOrCreate.formType === 'string'
    ) {
      if (getPageBuilderConfig.value.updateOrCreate.formType === 'create') {
        await pageBuilderClass.removeItemComponentsLocalStorage()
      }
      if (getPageBuilderConfig.value.updateOrCreate.formType === 'update') {
        await pageBuilderClass.removeItemComponentsLocalStorage()
      }
    }

    // if(getPageBuilderConfig.updateOrCreate && getPageBuilderConfig.updateOrCreate){}

    showModalDeleteAllComponents.value = false
  }
  // end modal
}

// Settings
const showMainSettings = ref(false)

// handle slideover window
const handleMainSettings = function () {
  showMainSettings.value = false
}

const openMainSettings = function () {
  showMainSettings.value = true
}

// Settings
const showHTMLSettings = ref(false)

// handle slideover window
const handleHTMLSettings = function () {
  showHTMLSettings.value = false
}

const openHTMLSettings = function () {
  showHTMLSettings.value = true
}
</script>

<template>
  <div>
    <div
      class="pbx-flex pbx-gap-2 pbx-items-center pbx-myPrimaryParagraph pbx-font-medium pbx-text-xs pbx-py-1 pbx-px-2 pbx-rounded-full lg:pbx-border lg:pbx-border-gray-200 lg:pbx-shadow-sm lg:pbx-mr-10"
    >
      <!-- User No image Start-->
      <div
        class="pbx-flex pbx-items-center pbx-myPrimaryTag pbx-py-0"
        v-if="
          getPageBuilderConfig &&
          getPageBuilderConfig.userForPageBuilder &&
          getPageBuilderConfig.userForPageBuilder.name &&
          (!getPageBuilderConfig.userForPageBuilder.image ||
            (typeof getPageBuilderConfig.userForPageBuilder.image === 'string' &&
              getPageBuilderConfig.userForPageBuilder.image?.length < 2))
        "
      >
        <div
          class="pbx-text-white pbx-rounded-full pbx-bg-myPrimaryBrandColor pbx-flex pbx-justify-center pbx-items-center pbx-text-xs pbx-h-8 pbx-min-h-8 pbx-max-h-8 pbx-w-8 pbx-min-w-8 pbx-max-w-8 pbx-font-normal"
        >
          {{
            typeof getPageBuilderConfig.userForPageBuilder.name === 'string' &&
            getPageBuilderConfig.userForPageBuilder.name[0]
          }}
        </div>
        <div class="pbx-hidden pbx-text-xs pbx-h-8 lg:pbx-flex pbx-items-center pbx-font-normal">
          {{ getPageBuilderConfig.userForPageBuilder.name }}
        </div>
      </div>

      <!-- User No image End -->

      <!-- User With image Start-->
      <div
        class="pbx-flex pbx-items-center lg:pbx-myPrimaryTag pbx-py-0 pbx-gap-4 pbx-w-max"
        v-if="
          getPageBuilderConfig &&
          getPageBuilderConfig.userForPageBuilder &&
          getPageBuilderConfig.userForPageBuilder.name &&
          getPageBuilderConfig.userForPageBuilder.image &&
          typeof getPageBuilderConfig.userForPageBuilder.image === 'string' &&
          getPageBuilderConfig.userForPageBuilder.image.length > 2
        "
      >
        <div
          class="pbx-text-white pbx-flex-shrink-0 pbx-h-8 pbx-w-8 pbx-rounded-full pbx-flex pbx-justify-center pbx-items-center pbx-text-xs pbx-rounded-l-full"
        >
          <img
            alt="avatar"
            :src="`${getPageBuilderConfig.userForPageBuilder.image}`"
            class="pbx-block pbx-inset-0 pbx-object-top pbx-h-8 pbx-min-h-8 pbx-max-h-8 pbx-w-8 pbx-min-w-8 pbx-max-w-8 pbx-object-cover pbx-rounded-full"
          />
        </div>
        <div class="pbx-hidden pbx-text-xs pbx-h-8 lg:pbx-flex pbx-items-center pbx-font-normal">
          {{ getPageBuilderConfig.userForPageBuilder.name }}
        </div>
      </div>

      <!-- User With image End -->

      <div>
        <!-- Component Start -->
        <div class="pbx-relative pbx-group">
          <button
            type="button"
            class="pbx-cursor-pointer lg:pbx-flex pbx-myPrimaryTag pbx-font-normal pbx-w-max pbx-text-xs"
          >
            <span> Options </span>
          </button>
          <div
            class="pbx-absolute pbx-left-0 -pbx-ml-16 -pbx-mt-2 pbx-flex pbx-flex-col pbx-gap-3 pbx-shadow-lg pbx-bg-white pbx-w-max pbx-border pbx-border-gray-100 pbx-rounded-2xl pbx-transition-all pbx-duration-200 pbx-ease-out pbx-pt-4 pbx-pr-4 pbx-pb-4 pbx-pl-2 pbx-z-30 pbx-opacity-0 pbx-pointer-events-none pbx-translate-y-2 group-hover:pbx-opacity-100 group-hover:pbx-pointer-events-auto group-hover:pbx-translate-y-0"
          >
            <!-- Main Settings Start -->
            <button
              @click="
                () => {
                  pageBuilderClass.clearHtmlSelection()
                  openMainSettings()
                }
              "
              class="pbx-cursor-pointer lg:pbx-flex pbx-myPrimaryTag pbx-font-normal pbx-w-max pbx-border-none pbx-m-0"
              type="button"
            >
              Config Overview
            </button>
            <!-- Main Settings End -->

            <!-- HTML Settings Start -->
            <button
              @click="openHTMLSettings"
              class="pbx-cursor-pointer lg:pbx-flex pbx-myPrimaryTag pbx-font-normal pbx-w-max pbx-border-none pbx-m-0"
              type="button"
            >
              HTML Overview
            </button>
            <!-- HTML Settings End -->

            <!-- Delete Layout Start -->
            <button
              @click="
                () => {
                  pageBuilderClass.clearHtmlSelection()
                  deleteAllComponents()
                }
              "
              class="pbx-cursor-pointer lg:pbx-flex pbx-myPrimaryTag pbx-font-normal pbx-w-max pbx-border-none pbx-m-0 pbx-bg-myPrimaryErrorColor pbx-text-white"
              type="button"
            >
              Delete Layout
            </button>
            <!-- Delete Layout End -->
          </div>
        </div>
      </div>
      <!-- Component End -->
    </div>

    <ModalBuilder
      maxWidth="5xl"
      :showModalBuilder="showMainSettings"
      title="Main Settings"
      @closeMainModalBuilder="handleMainSettings"
      minHeight=""
      maxHeight=""
    >
      <PageBuilderSettings> </PageBuilderSettings>
    </ModalBuilder>

    <ModalBuilder
      maxWidth="5xl"
      :showModalBuilder="showHTMLSettings"
      title="Selected HTML"
      @closeMainModalBuilder="handleHTMLSettings"
      minHeight=""
      maxHeight=""
    >
      <AdvancedPageBuilderSettings> </AdvancedPageBuilderSettings>
    </ModalBuilder>

    <DynamicModalBuilder
      :showDynamicModalBuilder="showModalDeleteAllComponents"
      :type="typeModal"
      :gridColumnAmount="gridColumnModal"
      :title="titleModal"
      :description="descriptionModal"
      :firstButtonText="firstButtonModal"
      :secondButtonText="secondButtonModal"
      :thirdButtonText="thirdButtonModal"
      @firstModalButtonFunctionDynamicModalBuilder="firstModalButtonFunctionDynamicModalBuilder"
      @secondModalButtonFunctionDynamicModalBuilder="secondModalButtonFunctionDynamicModalBuilder"
      @thirdModalButtonFunctionDynamicModalBuilder="thirdModalButtonFunctionDynamicModalBuilder"
    >
      <header></header>
      <main></main>
    </DynamicModalBuilder>
  </div>
</template>
