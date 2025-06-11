<script setup>
import { onMounted, computed, ref, watch, provide } from 'vue'
import PageBuilderClass from '../composables/PageBuilderClass.ts'
import PageBuilderPreviewModal from '../Components/Modals/PageBuilderPreviewModal.vue'
import Preview from './Preview.vue'
import ComponentTopMenu from '../Components/PageBuilder/EditorMenu/Editables/ComponentTopMenu.vue'
import EditGetElement from '../Components/PageBuilder/EditorMenu/Editables/EditGetElement.vue'
import SearchComponents from '../Components/Search/SearchComponents.vue'
import OptionsDropdown from '../Components/PageBuilder/DropdownsPlusToggles/OptionsDropdown.vue'
import RightSidebarEditor from '../Components/PageBuilder/EditorMenu/RightSidebarEditor.vue'
import { sharedPageBuilderPinia, sharedPageBuilderStore } from '../stores/shared-store'

/**
 * Props for PageBuilder component
 * @typedef {Object} Props
 * @property {Object|null} CustomMediaLibraryComponent - Custom media component
 * @property {Object|null} CustomSearchComponent - Custom search component
 * @property {Object} configPageBuilder - Configuration object containing:
 */
const props = defineProps({
  CustomMediaLibraryComponent: {
    type: Object,
    default: null,
  },
  CustomSearchComponent: {
    type: Object,
    default: null,
  },
})

// Use shared Pinia instance for PageBuilder package (THIS IS THE KEY CHANGE!)
const internalPinia = sharedPageBuilderPinia
const pageBuilderStateStore = sharedPageBuilderStore

// Initialize PageBuilder with store
const pageBuilderClass = new PageBuilderClass(pageBuilderStateStore)

// Provide store for child components (all pointing to the same consolidated store)
provide('pageBuilderStateStore', pageBuilderStateStore)

// Provide the internal Pinia instance for components that need to create stores
provide('internalPinia', internalPinia)

// Provide custom components for child components
provide('CustomMediaComponent', props.CustomMediaLibraryComponent)
provide('CustomSearchComponent', props.CustomSearchComponent)

// Provide modal close function for custom components
const closeAddComponentModal = () => {
  showModalAddComponent.value = false
}
provide('closeAddComponentModal', closeAddComponentModal)

const getConfigPageBuilder = computed(() => {
  return pageBuilderStateStore.getConfigPageBuilder
})

const getMenuRight = computed(() => {
  return pageBuilderStateStore.getMenuRight
})
const previewCurrentDesign = function () {
  pageBuilderClass.previewCurrentDesign()
}
const openPageBuilderPreviewModal = ref(false)
const firstPageBuilderPreviewModalButton = ref(null)

const handlePageBuilderPreview = function () {
  previewCurrentDesign()

  openPageBuilderPreviewModal.value = true
  // handle click
  firstPageBuilderPreviewModalButton.value = function () {
    openPageBuilderPreviewModal.value = false
  }
  // end modal
}

const showModalAddComponent = ref(false)
const titleModalAddComponent = ref('')
const firstButtonTextSearchComponents = ref('')
const firstModalButtonSearchComponentsFunction = ref(null)

const handleAddComponent = function () {
  pageBuilderStateStore.setComponent(null)

  //
  titleModalAddComponent.value = 'Add Components to Page'
  firstButtonTextSearchComponents.value = 'Close'
  showModalAddComponent.value = true

  firstModalButtonSearchComponentsFunction.value = function () {
    // handle show modal for unique content
    showModalAddComponent.value = false
  }

  // end modal
}

const getComponents = computed(() => {
  const components = pageBuilderStateStore.getComponents
  return components
})

const getElement = computed(() => {
  return pageBuilderStateStore.getElement
})

const getElementAttributes = computed(() => {
  if (!getElement.value || !(getElement.value instanceof HTMLElement)) {
    return new Object()
  }

  // Extract the attributes you want to watch
  const attributesToWatch = {
    src: getElement.value.getAttribute('src'),
    href: getElement.value.getAttribute('href'),
    style: getElement.value.getAttribute('style'),
    class: getElement.value.getAttribute('class'),
    dataImage: getElement.value.getAttribute('data-image'),
  }

  return attributesToWatch
})

watch(getElementAttributes, async (newAttributes, oldAttributes) => {
  // Check if any of the specified attributes have changed
  if (
    newAttributes?.src !== oldAttributes?.src ||
    newAttributes?.href !== oldAttributes?.href ||
    newAttributes?.style !== oldAttributes?.style ||
    newAttributes?.class !== oldAttributes?.class ||
    newAttributes?.dataImage !== oldAttributes?.dataImage
  ) {
    // Trigger your method when any of the specified attributes change
    await pageBuilderClass.handlePageBuilderMethods()
    await pageBuilderClass.setEventListenersForElements()
  }
})

const handleSelectComponent = function (componentObject) {
  pageBuilderStateStore.setComponent(componentObject)
}

const draggableZone = ref(null)

const defaultUpdateOrCreate = {
  formType: 'create',
  createNewResourceFormName: 'post',
}

const defaultConfigValues = {
  updateOrCreate: {
    formType: 'create',
    createNewResourceFormName: 'post',
  },

  userSettings: {
    theme: 'light',
    language: 'en',
    autoSave: true,
  },
}

onMounted(async () => {
  pageBuilderClass.updateLocalStorageItemName()
  await pageBuilderClass.setEventListenersForElements()

  if (
    getConfigPageBuilder.value &&
    getConfigPageBuilder.value.updateOrCreate &&
    getConfigPageBuilder.value.updateOrCreate.formType === 'create'
  ) {
    pageBuilderClass.loadExistingContent()
  }

  pageBuilderClass.removeHoveredAndSelected()

  // Set config if it's an empty object
  if (
    getConfigPageBuilder.value === null ||
    getConfigPageBuilder.value === undefined ||
    (getConfigPageBuilder.value &&
      Object.keys(getConfigPageBuilder.value).length === 0 &&
      getConfigPageBuilder.value.constructor === Object)
  ) {
    pageBuilderClass.setConfigPageBuilder(defaultConfigValues)
  }
})
</script>

<template>
  <div
    id="builder-container"
    class="font-sans max-w-full m-8 border-2 border-myPrimaryLinkColor inset-x-0 z-10 bg-white overflow-x-scroll pt-2 rounded-lg p-2"
  >
    <SearchComponents
      v-if="showModalAddComponent"
      :show="showModalAddComponent"
      :firstButtonText="firstButtonTextSearchComponents"
      :title="titleModalAddComponent"
      :CustomSearchComponent="props.CustomSearchComponent"
      @firstModalButtonSearchComponentsFunction="firstModalButtonSearchComponentsFunction"
    ></SearchComponents>
    <PageBuilderPreviewModal
      :show="openPageBuilderPreviewModal"
      @firstPageBuilderPreviewModalButton="firstPageBuilderPreviewModalButton"
    >
      <Preview></Preview>
    </PageBuilderPreviewModal>

    <div>
      <div class="relative h-full flex">
        <div
          @click.self="pageBuilderStateStore.setComponent(null)"
          class="min-w-[3.5rem] pt-6 pb-2 my-2 mx-2 bg-myPrimaryLightGrayColor rounded-full shadow"
        >
          <div class="mx-2 flex flex-col myPrimaryGap">
            <div class="flex gap-2 items-center justify-center">
              <button
                type="button"
                @click="
                  () => {
                    pageBuilderStateStore.setComponentArrayAddMethod('unshift')
                    handleAddComponent()
                  }
                "
                class="h-10 w-10 cursor-pointer rounded-full flex items-center border-none justify-center bg-gray-50 aspect-square hover:bg-myPrimaryLinkColor hover:text-white focus-visible:ring-0"
              >
                <span class="myMediumIcon material-symbols-outlined"> interests </span>
              </button>
            </div>
            <div @click.self="pageBuilderStateStore.setComponent(null)">
              <ComponentTopMenu v-if="getElement"></ComponentTopMenu>
            </div>
          </div>
        </div>
        <main class="flex flex-col h-full grow rounded-2xl duration-300 shadow-2xl">
          <div
            class="flex items-center justify-between primary-gap rounded-t-2xl py-2 bg-myPrimaryLightGrayColor"
          >
            <div class="flex myPrimaryGap items-center mr-8 overflow-x-scroll w-96 pt-4">
              <div
                @click.self="pageBuilderStateStore.setComponent(null)"
                class="w-4/12 flex justify-start items-center py-2 pl-2 h-full"
              >
                <div class="flex gap-2">
                  <span class="w-2 h-2 rounded-full bg-red-400"></span>
                  <span class="w-2 h-2 rounded-full bg-yellow-400"></span>
                  <span class="w-2 h-2 rounded-full bg-green-400"></span>
                </div>
              </div>

              <button
                class="myPrimaryButton"
                @click="pageBuilderClass.saveComponentsLocalStorage"
                type="button"
              >
                <span class="material-symbols-outlined text-[18px]"> save </span>
                Save layout
              </button>
            </div>

            <div
              @click.self="pageBuilderStateStore.setComponent(null)"
              class="w-4/12 flex justify-center py-2"
            >
              <OptionsDropdown @previewCurrentDesign="previewCurrentDesign"></OptionsDropdown>
            </div>

            <div
              @click.self="pageBuilderStateStore.setComponent(null)"
              class="w-4/12 flex justify-end py-2 pr-2"
            >
              <div class="flex items-center justify-center gap-4">
                <button
                  type="button"
                  @click="
                    () => {
                      pageBuilderStateStore.setComponentArrayAddMethod('unshift')
                      handleAddComponent()
                    }
                  "
                >
                  <div class="flex items-center justify-center gap-2">
                    <span class="lg:block hidden">
                      <div class="whitespace-nowrap">Add new Components</div>
                    </span>
                    <span
                      class="h-10 w-10 cursor-pointer rounded-full flex items-center border-none justify-center bg-gray-50 aspect-square hover:bg-myPrimaryLinkColor hover:text-white focus-visible:ring-0"
                    >
                      <span class="myMediumIcon material-symbols-outlined"> interests </span>
                    </span>
                  </div>
                </button>
                <div class="flex items-center justify-center gap-4">
                  <button
                    type="button"
                    @click="
                      () => {
                        pageBuilderStateStore.setMenuRight(false)
                        pageBuilderStateStore.setElement(null)
                        pageBuilderStateStore.setComponent(null)
                        handlePageBuilderPreview()
                      }
                    "
                  >
                    <div class="flex items-center justify-center gap-2">
                      <div class="whitespace-nowrap lg:block hidden">Preview</div>

                      <span
                        class="h-10 w-10 cursor-pointer rounded-full flex items-center border-none justify-center bg-gray-50 aspect-square hover:bg-myPrimaryLinkColor hover:text-white focus-visible:ring-0"
                      >
                        <span class="myMediumIcon material-symbols-outlined"> visibility </span>
                      </span>
                    </div>
                  </button>

                  <button
                    type="button"
                    v-if="getMenuRight === false"
                    @click="pageBuilderStateStore.setMenuRight(true)"
                  >
                    <div class="flex items-center justify-center gap-2">
                      <span class="lg:block hidden"> Styling </span>

                      <span
                        class="h-10 w-10 cursor-pointer rounded-full flex items-center border-none justify-center bg-gray-50 aspect-square hover:bg-myPrimaryLinkColor hover:text-white focus-visible:ring-0"
                      >
                        <span class="myMediumIcon material-symbols-outlined"> apps </span>
                      </span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <EditGetElement></EditGetElement>
          <div id="contains-pagebuilder" class="pl-4 pr-4 pb-4 overflow-y-auto h-screen pt-1">
            <div id="pagebuilder">
              <div ref="draggableZone">
                <!-- Added Components to DOM # start -->
                <div
                  v-for="component in getComponents"
                  :key="component.id"
                  id="page-builder-editor-editable-area"
                  class="bg-white grow"
                >
                  <div @mouseup="handleSelectComponent(component)" class="relative group">
                    <div v-html="component.html_code"></div>
                  </div>
                </div>
              </div>
              <!-- Added Components to DOM # end -->

              <!-- Add Component # start -->
              <div
                @click="
                  () => {
                    pageBuilderStateStore.setComponentArrayAddMethod('push')
                    handleAddComponent()
                  }
                "
                class="hover:bg-gray-100 rounded-full border-2 border-myPrimaryLinkColor pt-10 pb-14 text-center focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 my-12 mx-8 cursor-pointer"
              >
                <div class="flex items-center justify-center gap-2 font-medium cursor-pointer">
                  <span class="lg:block hidden">
                    <div>Add new Components</div>
                  </span>
                </div>

                <div class="mt-6 flex items-center gap-2 justify-center">
                  <button
                    type="button"
                    class="myPrimaryButton flex items-center gap-2 justify-center"
                  >
                    <span class="myMediumIcon material-symbols-outlined"> interests </span>
                    <span class="font-medium"> Add new Components </span>
                  </button>
                </div>
              </div>
              <!-- Add Component # end -->
            </div>
          </div>
          <!-- Add Component # end -->
        </main>

        <aside
          aria-label="Menu"
          :class="{ 'w-0': !getMenuRight, 'w-80 ml-4': getMenuRight }"
          class="h-full duration-300 z-20 flex-shrink-0 overflow-hidden shadow-2xl rounded-l-2xl bg-white"
        >
          <RightSidebarEditor @closeEditor="pageBuilderStateStore.setMenuRight(false)">
          </RightSidebarEditor>
        </aside>
      </div>
    </div>
  </div>
</template>

<style>
#pagebuilder a {
  cursor: default;
}

#pagebuilder [element] {
  outline: rgba(255, 255, 255, 0) dashed 3px !important;
  outline-offset: -3px !important;
}
#pagebuilder [hovered] {
  outline: rgb(0, 140, 14, 1) dashed 3px !important;
  outline-offset: -3px !important;
}

#pagebuilder [selected] {
  position: relative;

  outline: rgb(185, 16, 16) dashed 3px !important;
  outline-offset: -3px !important;
}

/* sortable */

.sortable-ghost {
  display: flex;
  justify-content: center;
}

.sortable-ghost > * {
  width: 100%;
}
</style>
