<script setup>
import DynamicModalBuilder from '../../../Modals/DynamicModalBuilder.vue'
import { ref, computed } from 'vue'
import { getPageBuilder } from '../../../../composables/builderInstance'
import { useTranslations } from '../../../../composables/useTranslations'

const { translate } = useTranslations()

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

const canMoveUp = computed(() => pageBuilderService.canMoveUp())
const canMoveDown = computed(() => pageBuilderService.canMoveDown())

// remove component
const handleDelete = function () {
  showModalDeleteComponent.value = true
  typeModal.value = 'delete'
  gridColumnModal.value = 2
  titleModal.value = translate('Remove Component?')
  descriptionModal.value = translate('Are you sure you want to remove this Component?')
  firstButtonModal.value = translate('Close')
  secondButtonModal.value = null
  thirdButtonModal.value = translate('Delete')

  // handle click
  firstModalButtonFunctionDynamicModalBuilder.value = function () {
    showModalDeleteComponent.value = false
  }
  //
  // handle click
  thirdModalButtonFunctionDynamicModalBuilder.value = async function () {
    await pageBuilderService.deleteComponentFromDOM()

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
        @click="handleDelete()"
        class="pbx-h-10 pbx-w-10 pbx-cursor-pointer pbx-rounded-full pbx-flex pbx-items-center pbx-border-none pbx-justify-center pbx-bg-gray-50 pbx-aspect-square hover:pbx-bg-myPrimaryErrorColor hover:pbx-text-white pbx-text-myPrimaryErrorColor"
      >
        <span class="material-symbols-outlined"> delete_forever </span>
      </div>
    </div>

    <button
      type="button"
      @click="pageBuilderService.reorderComponent(-1)"
      :disabled="!canMoveUp"
      class="pbx-h-10 pbx-w-10 pbx-rounded-full pbx-flex pbx-items-center pbx-border-none pbx-justify-center pbx-bg-gray-50 pbx-aspect-square pbx-text-black"
      :class="[
        canMoveUp
          ? 'hover:pbx-bg-myPrimaryLinkColor hover:pbx-text-white focus-visible:pbx-ring-0'
          : 'pbx-cursor-not-allowed pbx-bg-opacity-20 hover:pbx-bg-gray-200',
      ]"
    >
      <span class="material-symbols-outlined"> move_up </span>
    </button>
    <button
      type="button"
      @click="pageBuilderService.reorderComponent(1)"
      :disabled="!canMoveDown"
      class="pbx-h-10 pbx-w-10 pbx-rounded-full pbx-flex pbx-items-center pbx-border-none pbx-justify-center pbx-bg-gray-50 pbx-aspect-square pbx-text-black"
      :class="[
        canMoveDown
          ? 'hover:pbx-bg-myPrimaryLinkColor hover:pbx-text-white focus-visible:pbx-ring-0'
          : 'pbx-cursor-not-allowed pbx-bg-opacity-20 hover:pbx-bg-gray-200',
      ]"
    >
      <span class="material-symbols-outlined"> move_down </span>
    </button>
  </div>
</template>
