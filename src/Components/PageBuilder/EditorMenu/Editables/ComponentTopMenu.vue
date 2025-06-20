<script setup>
import DynamicModalBuilder from '../../../Modals/DynamicModalBuilder.vue'
import { computed, ref } from 'vue'
import PageBuilderClass from '../../../../composables/PageBuilderClass.ts'
import { sharedPageBuilderStore } from '../../../../stores/shared-store'

// Use shared store instance
const pageBuilderStateStore = sharedPageBuilderStore

const showModalDeleteComponent = ref(false)
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
const pageBuilderClass = new PageBuilderClass(pageBuilderStateStore)

// remove component
const deleteSelectedComponent = function (e) {
  showModalDeleteComponent.value = true
  typeModal.value = 'delete'
  gridColumnModal.value = 2
  titleModal.value = 'Remove Component?'
  descriptionModal.value = 'Are you sure you want to remove this Component?'
  firstButtonModal.value = 'Close'
  secondButtonModal.value = null
  thirdButtonModal.value = 'Delete'

  // handle click
  firstModalButtonFunctionDynamicModalBuilder.value = function () {
    showModalDeleteComponent.value = false
  }
  //
  // handle click
  thirdModalButtonFunctionDynamicModalBuilder.value = function () {
    pageBuilderClass.deleteSelectedComponent()

    showModalDeleteComponent.value = false
  }
  // end modal
}
</script>

<template>
  <DynamicModalBuilder
    :showDynamicModalBuilder="showModalDeleteComponent"
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
  <div class="flex flex-col items-center justify-center myPrimaryGap">
    <div class="flex gap-2 items-center justify-center">
      <div
        @click="deleteSelectedComponent()"
        class="h-10 w-10 cursor-pointer rounded-full flex items-center border-none justify-center bg-gray-50 aspect-square hover:bg-myPrimaryErrorColor hover:text-white text-myPrimaryErrorColor"
      >
        <span class="material-symbols-outlined"> delete_forever </span>
      </div>
    </div>

    <button
      type="button"
      @click="pageBuilderClass.reorderComponent(-1)"
      class="h-10 w-10 cursor-pointer rounded-full flex items-center border-none justify-center bg-gray-50 aspect-square hover:bg-myPrimaryLinkColor hover:text-white focus-visible:ring-0"
    >
      <span class="material-symbols-outlined"> move_up </span>
    </button>
    <button
      type="button"
      @click="pageBuilderClass.reorderComponent(1)"
      class="h-10 w-10 cursor-pointer rounded-full flex items-center border-none justify-center bg-gray-50 aspect-square hover:bg-myPrimaryLinkColor hover:text-white focus-visible:ring-0"
    >
      <span class="material-symbols-outlined"> move_down </span>
    </button>
  </div>
</template>
