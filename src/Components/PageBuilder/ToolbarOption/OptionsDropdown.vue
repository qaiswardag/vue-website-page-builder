<script setup>
import PageBuilderClass from '../../../composables/PageBuilderClass'
import { ref, computed } from 'vue'
import PageBuilderSettings from '../Settings/PageBuilderSettings.vue'
import DynamicModalBuilder from '../../Modals/DynamicModalBuilder.vue'

import { sharedPageBuilderStore } from '../../../stores/shared-store'

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
const showSettings = ref(false)
// use dynamic model
const typeModalSettings = ref('')
const gridColumnModalSettings = ref(Number(1))
const titleModalSettings = ref('')
const descriptionModalSettings = ref('')
const firstButtonModalSettings = ref('')
const secondButtonModalSettings = ref(null)
const thirdButtonModalSettings = ref(null)
// set dynamic modal handle functions
const firstModalButtonFunctionDynamicSettings = ref(null)
const secondModalButtonFunctionDynamicSettings = ref(null)
const thirdModalButtonFunctionDynamicSettings = ref(null)

// handle slideover window
const handleSettings = function () {
  showSettings.value = true
  typeModalSettings.value = 'default'
  gridColumnModalSettings.value = 2
  titleModalSettings.value = 'Settings'
  descriptionModalSettings.value = null
  firstButtonModalSettings.value = 'Close'
  secondButtonModalSettings.value = null
  thirdButtonModalSettings.value = null

  // handle click
  firstModalButtonFunctionDynamicSettings.value = function () {
    showSettings.value = false
  }
  //
  // handle click
  secondModalButtonFunctionDynamicSettings.value = function () {}
  thirdModalButtonFunctionDynamicSettings.value = function () {}
  // end modal
}
</script>

<template>
  <div
    class="font-sans w-full relative inline-block align-bottom text-left overflow-hidden transform transition-all sm:align-middle"
  >
    <div class="flex flex-col gap-8 mt-4">
      <div
        @click="handleSettings"
        class="cursor-pointer border border-gray-200 rounded-full px-4 py-4 bg-red-100"
      >
        <div class="flex items-center justify-left gap-2 text-sm">Settings</div>
      </div>

      <!-- Delete All Components -->
      <div
        @click="deleteAllComponents"
        class="cursor-pointer border border-gray-200 rounded-full px-4 py-4 bg-red-100"
      >
        <div class="flex items-center justify-left gap-2 text-sm">
          <span class="group-hover:text-white"> Delete Layout </span>
        </div>
      </div>
    </div>

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
