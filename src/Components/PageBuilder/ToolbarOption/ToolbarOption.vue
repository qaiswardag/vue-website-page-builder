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

const openDropDown = ref(false)

const toggleDropDown = function () {
  openDropDown.value = !openDropDown.value
}
</script>

<template>
  <div>
    <div
      class="flex gap-2 items-center myPrimaryParagraph font-medium text-xs py-1 px-2 rounded-full lg:border lg:border-gray-200 lg:shadow-sm lg:mr-10"
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
          class="text-white rounded-full bg-myPrimaryBrandColor flex justify-center items-center text-xs h-8 min-h-8 max-h-8 w-8 min-w-8 max-w-8 font-normal"
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
        class="flex items-center lg:myPrimaryTag py-0 gap-4 w-max"
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
        <div class="hidden text-xs h-8 lg:flex items-center font-normal">
          {{ getConfigPageBuilder.userForPageBuilder.name }}
        </div>
      </div>

      <!-- User With image End -->

      <div>
        <!-- Component Start -->
        <div class="relative z-30">
          <button
            @click="toggleDropDown"
            type="button"
            class="cursor-pointer lg:flex myPrimaryTag font-normal w-max text-xs"
          >
            <span> Options </span>
          </button>
          <div
            :class="[
              'absolute left-0 -ml-16 flex flex-col gap-3 shadow-lg bg-white w-max rounded-2xl transition-all duration-200 ease-out pt-4 pr-4 pb-4 pl-2 mt-2 border border-gray-100 z-30',
              openDropDown
                ? 'opacity-100 translate-y-0 pointer-events-auto'
                : 'opacity-0 -translate-y-2 pointer-events-none',
            ]"
          >
            <!-- Close - start -->
            <div class="flex items-center justify-between bg-white mb-2">
              <span as="h3" class="myPriamryParagraph text-xs">Close</span>
              <div
                @click="toggleDropDown"
                class="h-10 w-10 flex-end cursor-pointer rounded-full flex items-center border-none justify-center bg-gray-50 aspect-square hover:bg-myPrimaryLinkColor hover:text-white hover:fill-white focus-visible:ring-0"
              >
                <span class="material-symbols-outlined"> close </span>
              </div>
            </div>
            <!-- Close - end -->

            <!-- Main Settings Start -->
            <button
              class="cursor-pointer lg:flex myPrimaryTag font-normal w-max border-none m-0"
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
              class="cursor-pointer lg:flex myPrimaryTag font-normal w-max border-none m-0"
              type="button"
              @click="openHTMLSettings"
            >
              HTML Overview
            </button>
            <!-- HTML Settings End -->

            <!--Delete Layout Start -->
            <button
              class="cursor-pointer lg:flex myPrimaryTag font-normal w-max border-none m-0 bg-myPrimaryErrorColor text-white"
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
          </div>
        </div>
        <!-- Component End  -->
      </div>

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
