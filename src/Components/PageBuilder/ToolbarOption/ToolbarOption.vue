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
  thirdModalButtonFunctionDynamicModalBuilder.value = async function () {
    pageBuilderClass.deleteAllComponents()
    await pageBuilderClass.clearHtmlSelection()

    if (
      getConfigPageBuilder.value.updateOrCreate &&
      typeof getConfigPageBuilder.value.updateOrCreate.formType === 'string'
    ) {
      if (getConfigPageBuilder.value.updateOrCreate.formType === 'create') {
        await pageBuilderClass.removeItemComponentsLocalStorageCreate()
      }
      if (getConfigPageBuilder.value.updateOrCreate.formType === 'update') {
        await pageBuilderClass.removeItemComponentsLocalStorageUpdate()
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
      class="flex gap-2 items-center myPrimaryParagraph font-medium text-xs py-1 px-2 rounded-full lg:border lg:border-gray-200 lg:shadow-sm"
    >
      <!-- User No image Start-->
      <div
        class="flex items-center myPrimaryTag py-0"
        v-if="
          getConfigPageBuilder &&
          getConfigPageBuilder.userForPageBuilder &&
          getConfigPageBuilder.userForPageBuilder.name &&
          (!getConfigPageBuilder.userForPageBuilder.image ||
            (typeof getConfigPageBuilder.userForPageBuilder.image === 'string' &&
              getConfigPageBuilder.userForPageBuilder.image?.length < 2))
        "
      >
        <div
          class="text-white rounded-full bg-myPrimaryBrandColor flex justify-center items-center text-xs h-8 min-h-8 max-h-8 w-8 min-w-8 max-w-8"
        >
          {{
            typeof getConfigPageBuilder.userForPageBuilder.name === 'string' &&
            getConfigPageBuilder.userForPageBuilder.name[0]
          }}
        </div>
        <div class="hidden text-xs h-8 lg:flex items-center font-normal">
          {{ getConfigPageBuilder.userForPageBuilder.name }}
        </div>
      </div>

      <!-- User No image End -->

      <!-- User With image Start-->
      <div
        class="flex items-center lg:myPrimaryTag py-0 gap-4"
        v-if="
          getConfigPageBuilder &&
          getConfigPageBuilder.userForPageBuilder &&
          getConfigPageBuilder.userForPageBuilder.name &&
          getConfigPageBuilder.userForPageBuilder.image &&
          typeof getConfigPageBuilder.userForPageBuilder.image === 'string' &&
          getConfigPageBuilder.userForPageBuilder.image.length > 2
        "
      >
        <div
          class="text-white flex-shrink-0 h-8 w-8 rounded-full flex justify-center items-center text-xs rounded-l-full"
        >
          <img
            alt="avatar"
            :src="`${getConfigPageBuilder.userForPageBuilder.image}`"
            class="block inset-0 object-top h-8 min-h-8 max-h-8 w-8 min-w-8 max-w-8 object-cover rounded-full"
          />
        </div>
        <div class="hidden text-xs h-8 lg:flex items-center">
          {{ getConfigPageBuilder.userForPageBuilder.name }}
        </div>
      </div>

      <!-- User With image End -->

      <!-- Main Settings Start -->
      <button
        class="cursor-pointer lg:block hidden myPrimaryTag font-normal"
        type="button"
        @click="
          () => {
            pageBuilderClass.clearHtmlSelection()
            openMainSettings()
          }
        "
      >
        Config Overview
      </button>
      <!-- Main Settings End -->
      <!-- HTML Settings Start -->
      <button
        class="cursor-pointer lg:block hidden myPrimaryTag font-normal"
        type="button"
        @click="openHTMLSettings"
      >
        HTML Overview
      </button>
      <!-- HTML Settings End -->

      <!--Delete Layout Start -->
      <button
        class="cursor-pointer lg:block hidden myPrimaryTag font-normal bg-myPrimaryErrorColor text-white"
        type="button"
        @click="
          () => {
            pageBuilderClass.clearHtmlSelection()
            deleteAllComponents()
          }
        "
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
