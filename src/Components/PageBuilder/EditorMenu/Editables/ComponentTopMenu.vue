<script setup>
import DynamicModalBuilder from '../../../Modals/DynamicModalBuilder.vue'
import { computed, ref } from 'vue'
import { getPageBuilder } from '../../../../composables/builderInstance'
const pageBuilderService = getPageBuilder()

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
  <div class="pbx-flex pbx-flex-col pbx-items-center pbx-justify-center pbx-myPrimaryGap">
    <div class="pbx-flex pbx-gap-2 pbx-items-center pbx-justify-center">
      <div
        @click="deleteSelectedComponent()"
        class="pbx-h-10 pbx-w-10 pbx-cursor-pointer pbx-rounded-full pbx-flex pbx-items-center pbx-border-none pbx-justify-center pbx-bg-gray-50 pbx-aspect-square hover:pbx-bg-myPrimaryErrorColor hover:pbx-text-white pbx-text-myPrimaryErrorColor"
      >
        <span class="material-symbols-outlined"> delete_forever </span>
      </div>
    </div>

    <button
      type="button"
      @click="pageBuilderClass.reorderComponent(-1)"
      class="pbx-h-10 pbx-w-10 pbx-cursor-pointer pbx-rounded-full pbx-flex pbx-items-center pbx-border-none pbx-justify-center pbx-bg-gray-50 pbx-aspect-square hover:pbx-bg-myPrimaryLinkColor hover:pbx-text-white focus-visible:pbx-ring-0"
    >
      <span class="material-symbols-outlined"> move_up </span>
    </button>
    <button
      type="button"
      @click="pageBuilderClass.reorderComponent(1)"
      class="pbx-h-10 pbx-w-10 pbx-cursor-pointer pbx-rounded-full pbx-flex pbx-items-center pbx-border-none pbx-justify-center pbx-bg-gray-50 pbx-aspect-square hover:pbx-bg-myPrimaryLinkColor hover:pbx-text-white focus-visible:pbx-ring-0"
    >
      <span class="material-symbols-outlined"> move_down </span>
    </button>
  </div>
</template>
