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
  <div>
    <div
      class="flex gap-2 items-center myPrimaryParagraph font-medium text-xs py-1 px-2 rounded-full border border-gray-200 shadow-sm"
    >
      <!-- User Start -->
      <div
        class=""
        v-if="
          getConfigPageBuilder &&
          getConfigPageBuilder.userForPageBuilder &&
          getConfigPageBuilder.userForPageBuilder.name
        "
      >
        <div
          class="text-white flex-shrink-0 h-10 w-10 rounded-full bg-myPrimaryBrandColor flex justify-center items-center text-xs rounded-l-full"
        >
          {{
            typeof getConfigPageBuilder.userForPageBuilder.name === 'string' &&
            getConfigPageBuilder.userForPageBuilder.name[0]
          }}
        </div>
      </div>
      <!-- User End -->

      <!-- Main Settings Start -->
      <button class="lg:block hidden myPrimaryTag" type="button" @click="openMainSettings">
        Config Overview
      </button>
      <!-- Main Settings End -->
      <!-- HTML Settings Start -->
      <button class="lg:block hidden myPrimaryTag" type="button" @click="openHTMLSettings">
        HTML Overview
      </button>
      <!-- HTML Settings End -->

      <!--Delete Layout Start -->
      <button
        class="lg:block hidden myPrimaryTag bg-myPrimaryErrorColor text-white"
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
