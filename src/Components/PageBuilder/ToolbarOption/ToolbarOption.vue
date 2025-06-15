<script setup>
import { computed, ref } from 'vue'
import { sharedPageBuilderStore } from '../../../stores/shared-store'
import ModalBuilder from '../../Modals/ModalBuilder.vue'
import PageBuilderSettings from '../Settings/PageBuilderSettings.vue'
import AdvancedPageBuilderSettings from '../Settings/AdvancedPageBuilderSettings.vue'

import PageBuilderClass from '../../../composables/PageBuilderClass'
import DynamicModalBuilder from '../../Modals/DynamicModalBuilder.vue'

// Use shared store instance
const pageBuilderStateStore = sharedPageBuilderStore

const getConfigPageBuilder = computed(() => {
  return pageBuilderStateStore.getConfigPageBuilder
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
  thirdModalButtonFunctionDynamicModalBuilder.value = function () {
    pageBuilderClass.deleteAllComponents()
    pageBuilderClass.clearHtmlSelection()
    if (
      getConfigPageBuilder.value.updateOrCreate &&
      typeof getConfigPageBuilder.value.updateOrCreate.formType === 'string'
    ) {
      if (getConfigPageBuilder.value.updateOrCreate.formType === 'create') {
        pageBuilderClass.removeItemComponentsLocalStorageCreate()
      }
      if (getConfigPageBuilder.value.updateOrCreate.formType === 'update') {
        pageBuilderClass.removeItemComponentsLocalStorageUpdate()
      }
    }

    // if(getConfigPageBuilder.updateOrCreate && getConfigPageBuilder.updateOrCreate){}

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
  <div class="flex gap-2 items-center myPrimaryParagraph font-medium text-xs">
    <!-- User Start -->
    <div
      class="lg:block hidden text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-full text-xs px-2 py-2 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
      v-if="
        getConfigPageBuilder &&
        getConfigPageBuilder.userForPageBuilder &&
        getConfigPageBuilder.userForPageBuilder.name
      "
    >
      <div>{{ getConfigPageBuilder.userForPageBuilder.name }}</div>
    </div>
    <!-- User End -->

    <!-- Main Settings Start -->
    <button
      class="lg:block hidden text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-full text-xs px-2 py-2 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
      type="button"
      @click="openMainSettings"
    >
      Main Settings
    </button>
    <!-- Main Settings End -->
    <!-- HTML Settings Start -->
    <button
      class="lg:block hidden text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-full text-xs px-2 py-2 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
      type="button"
      @click="openHTMLSettings"
    >
      HTML Settings
    </button>
    <!-- HTML Settings End -->

    <!--Delete Layout Start -->
    <button
      class="lg:block hidden text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-full text-xs px-2 py-2 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
      type="button"
      @click="deleteAllComponents"
    >
      Delete Layout
    </button>

    <!--Delete Layout End -->
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
    title="Advanced Settings"
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
</template>
