<script setup>
import { onMounted, computed, ref, watch, provide } from 'vue'
import PageBuilderClass from '../composables/PageBuilderClass.ts'
import PageBuilderPreviewModal from '../Components/Modals/PageBuilderPreviewModal.vue'
import Preview from './Preview.vue'
import ComponentTopMenu from '../Components/PageBuilder/EditorMenu/Editables/ComponentTopMenu.vue'
import EditGetElement from '../Components/PageBuilder/EditorMenu/Editables/EditGetElement.vue'
import BuilderComponents from '../Components/Modals/BuilderComponents.vue'
import OptionsDropdown from '../Components/PageBuilder/DropdownsPlusToggles/OptionsDropdown.vue'
import RightSidebarEditor from '../Components/PageBuilder/EditorMenu/RightSidebarEditor.vue'
import { sharedPageBuilderPinia, sharedPageBuilderStore } from '../stores/shared-store'
import { updateOrCreateIsFalsy } from '../helpers/passedPageBuilderConfig'
/**
 * Props for PageBuilder component
 * @typedef {Object} Props
 * @property {Object|null} CustomMediaLibraryComponent - Custom media component
 * @property {Object|null} CustomBuilderComponents - Custom search component
 * @property {Object} configPageBuilder - Configuration object containing:
 */
const props = defineProps({
  CustomMediaLibraryComponent: {
    type: Object,
    default: null,
  },
  CustomBuilderComponents: {
    type: Object,
    default: null,
  },
})

// Use shared Pinia instance for PageBuilder package
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
provide('CustomBuilderComponents', props.CustomBuilderComponents)

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
  pageBuilderClass.clearHtmlSelection()

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

const defaultConfigValues = {
  updateOrCreate: {
    formType: 'create',
    formName: 'post',
  },
}

const handleConfig = function (config) {
  // Set config for page builder if not set by user
  if (
    config === null ||
    config === undefined ||
    (config && Object.keys(config).length === 0 && config.constructor === Object)
  ) {
    pageBuilderClass.setConfigPageBuilder(defaultConfigValues)
    return
  }

  if (config && Object.keys(config).length !== 0 && config.constructor === Object) {
    if (updateOrCreateIsFalsy(config)) {
      return
    }
  }
}

watch(
  () => getConfigPageBuilder.value,
  (config) => {
    pageBuilderClass.updateLocalStorageItemName()

    if (config && config.updateOrCreate && config.updateOrCreate.formType === 'create') {
      pageBuilderClass.loadExistingContent()
    }
  },
  { immediate: true },
)

onMounted(async () => {
  const config = getConfigPageBuilder.value
  handleConfig(config)

  pageBuilderClass.updateLocalStorageItemName()

  pageBuilderClass.removeHoveredAndSelected()

  await pageBuilderClass.setEventListenersForElements()
})
</script>

<template>
  <div
    id="builder-container"
    class="font-sans max-w-full m-1 border-2 border-myPrimaryLinkColor inset-x-0 z-10 bg-white overflow-x-scroll pt-2 rounded-lg p-2"
  >
    <div
      @click="pageBuilderClass.clearHtmlSelection()"
      id="pagebuilder-top-area"
      class="px-4 pb-4 mx-4 my-4 rounded-xl"
    >
      <!-- Logo # start -->
      <div
        v-if="
          getConfigPageBuilder &&
          getConfigPageBuilder.pageBuilderLogo &&
          getConfigPageBuilder.pageBuilderLogo.src
        "
        class="flex items-center divide-x divide-gray-200"
      >
        <div class="pr-4">
          <img class="h-6" :src="getConfigPageBuilder.pageBuilderLogo.src" alt="Logo" />
        </div>
        <span class="myPrimaryParagraph font-medium pl-4">Editing Page </span>
      </div>
      <div v-else>
        <div class="pr-6">
          <span class="myPrimaryParagraph font-medium">Editing Page </span>
        </div>
      </div>
    </div>
    <!-- Logo # end -->
    <BuilderComponents
      v-if="showModalAddComponent"
      :show="showModalAddComponent"
      :firstButtonText="firstButtonTextSearchComponents"
      :title="titleModalAddComponent"
      :CustomBuilderComponents="props.CustomBuilderComponents"
      @firstModalButtonSearchComponentsFunction="firstModalButtonSearchComponentsFunction"
    ></BuilderComponents>
    <PageBuilderPreviewModal
      :show="openPageBuilderPreviewModal"
      @firstPageBuilderPreviewModalButton="firstPageBuilderPreviewModalButton"
    >
      <Preview></Preview>
    </PageBuilderPreviewModal>

    <div>
      <div class="relative h-full flex">
        <div
          @click.self="pageBuilderClass.clearHtmlSelection()"
          id="pagebuilder-left-area"
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
            <div @click.self="pageBuilderClass.clearHtmlSelection()">
              <ComponentTopMenu v-if="getElement"></ComponentTopMenu>
            </div>
          </div>
        </div>
        <main class="flex flex-col h-full grow rounded-2xl duration-300 shadow-2xl">
          <div
            id="pagebuilder-toolbar-area"
            class="flex items-center justify-between rounded-t-2xl bg-myPrimaryLightGrayColor min-w-[30rem]"
          >
            <div
              @click="pageBuilderClass.clearHtmlSelection()"
              class="flex myPrimaryGap items-center overflow-x-scroll pt-4 pb-2 pl-2 h-24 w-full min-w-36"
            >
              <div>
                <button
                  class="myPrimaryButton"
                  @click="pageBuilderClass.saveComponentsLocalStorage"
                  type="button"
                >
                  <span class="material-symbols-outlined"> save </span>
                  Save
                </button>
              </div>
            </div>

            <div
              @click.self="pageBuilderClass.clearHtmlSelection()"
              class="flex justify-center items-center h-24 w-full pl-4"
            >
              <OptionsDropdown @previewCurrentDesign="previewCurrentDesign"></OptionsDropdown>
            </div>

            <div
              @click.self="pageBuilderClass.clearHtmlSelection()"
              class="flex justify-end py-2 pr-2 h-24 w-full"
            >
              <div
                @click.self="pageBuilderClass.clearHtmlSelection()"
                class="flex items-center justify-center gap-4"
              >
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
                        pageBuilderClass.clearHtmlSelection()
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
                </div>
              </div>
            </div>

            <div
              @click.self="pageBuilderClass.clearHtmlSelection()"
              class="flex justify-end py-2 pr-2 w-full h-24"
            >
              <div
                @click.self="pageBuilderClass.clearHtmlSelection()"
                class="flex items-center justify-center gap-4"
              >
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
                      <span class="myMediumIcon material-symbols-outlined"> more_vert </span>
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </div>

          <EditGetElement></EditGetElement>
          <div id="contains-pagebuilder" class="pl-4 pr-4 pb-4 overflow-y-auto pt-1 h-[39rem]">
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
                @click="pageBuilderClass.clearHtmlSelection()"
                id="pagebuilder-bottom-components-area"
                class="pt-8 pb-12 text-center focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 my-2 mx-4"
                :class="{ 'border-t border-gray-200': getComponents.length > 0 }"
              >
                <div class="flex items-center justify-center gap-2 font-medium">
                  <span class="lg:block hidden">
                    <div>Add new components to the bottom of the page</div>
                  </span>
                </div>

                <div class="mt-6 flex items-center gap-2 justify-center">
                  <button
                    @click="
                      () => {
                        pageBuilderStateStore.setComponentArrayAddMethod('push')
                        handleAddComponent()
                      }
                    "
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
          id="pagebuilder-right-area"
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
