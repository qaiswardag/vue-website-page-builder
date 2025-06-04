<script setup>
const version = __APP_VERSION__
import { onMounted, computed, ref, watch, provide } from 'vue'
import { createPinia } from 'pinia'
import PageBuilder from '@/composables/PageBuilder.ts'
import PageBuilderPreviewModal from '@/Components/Modals/PageBuilderPreviewModal.vue'
import Preview from '@/PageBuilder/Preview.vue'
import ComponentTopMenu from '@/Components/PageBuilder/EditorMenu/Editables/ComponentTopMenu.vue'
import EditGetElement from '@/Components/PageBuilder/EditorMenu/Editables/EditGetElement.vue'
import SearchComponents from '@/Components/Search/SearchComponents.vue'
import OptionsDropdown from '@/Components/PageBuilder/DropdownsPlusToggles/OptionsDropdown.vue'
import RightSidebarEditor from '@/Components/PageBuilder/EditorMenu/RightSidebarEditor.vue'
import { usePageBuilderStateStore } from '@/stores/page-builder-state'
import { useMediaLibraryStore } from '@/stores/media-library'
import { useUserStore } from '@/stores/user'

/**
 * Props for PageBuilder component
 * @typedef {Object} Props
 * @property {Object|null} CustomMediaLibraryComponent - Custom media component
 * @property {Object|null} CustomSearchComponent - Custom search component
 * @property {string} updateOrCreate - Mode: create or update
 * @property {Object|null} user - User object with name property: { name: string }
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
  updateOrCreate: {
    type: String,
    default: 'create',
    required: false,
  },
  user: {
    type: Object,
    default: null,
    validator: (value) => {
      // Allow null or object with name property
      return value === null || (typeof value === 'object' && typeof value.name === 'string')
    },
  },
  resourceData: {
    type: Object,
    default: null,
    required: false,
    validator: (value) => {
      // Allow null or object with title (string) and id (number) properties
      return (
        value === null ||
        (typeof value === 'object' &&
          typeof value.title === 'string' &&
          typeof value.id === 'number')
      )
    },
  },
})

// Create internal Pinia instance for PageBuilder package
const internalPinia = createPinia()
const mediaLibraryStore = useMediaLibraryStore(internalPinia)
const pageBuilderStateStore = usePageBuilderStateStore(internalPinia)
const userStore = useUserStore(internalPinia)

// Set current user if provided
if (props.user) {
  userStore.setCurrentUser(props.user)
}

// Initialize PageBuilder with stores
const pageBuilder = new PageBuilder(pageBuilderStateStore, mediaLibraryStore)

// Provide stores for child components
provide('pageBuilderStateStore', pageBuilderStateStore)
provide('mediaLibraryStore', mediaLibraryStore)
provide('userStore', userStore)

// Provide custom components for child components
provide('CustomMediaComponent', props.CustomMediaLibraryComponent)
provide('CustomSearchComponent', props.CustomSearchComponent)

// Provide updateOrCreate for custom components
provide('updateOrCreate', props.updateOrCreate)

// Provide modal close function for custom components
const closeAddComponentModal = () => {
  showModalAddComponent.value = false
}
provide('closeAddComponentModal', closeAddComponentModal)

const getMenuRight = computed(() => {
  return pageBuilderStateStore.getMenuRight
})
const previewCurrentDesign = function () {
  pageBuilder.previewCurrentDesign()
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
  return pageBuilderStateStore.getComponents
})

const getCurrentUser = computed(() => {
  return userStore.getCurrentUser
})
const getComponent = computed(() => {
  return pageBuilderStateStore.getComponent
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

watch(getElementAttributes, (newAttributes, oldAttributes) => {
  // Check if any of the specified attributes have changed
  if (
    newAttributes?.src !== oldAttributes?.src ||
    newAttributes?.href !== oldAttributes?.href ||
    newAttributes?.style !== oldAttributes?.style ||
    newAttributes?.class !== oldAttributes?.class ||
    newAttributes?.dataImage !== oldAttributes?.dataImage
  ) {
    // Trigger your method when any of the specified attributes change
    pageBuilder.handlePageBuilderMethods()
    pageBuilder.setEventListenersForElements()
  }
})

const handleSelectComponent = function (componentObject) {
  pageBuilderStateStore.setComponent(componentObject)
}

const draggableZone = ref(null)

onMounted(async () => {
  pageBuilder.setEventListenersForElements()
})

// Missing variables and functions
const hideDraftButton = ref(true)

// Define required functions that are referenced in template
const firstButton = function () {
  // Close or cancel function - can be customized as needed
  console.log('First button clicked - close/cancel action')
}

const secondButton = function () {
  // Save function - can be customized as needed
  console.log('Second button clicked - save action')
}

const handleDraftForUpdate = function () {
  // Handle draft for update function - can be customized as needed
  console.log('Handle draft for update')
}
</script>

<template>
  <div>
    <SearchComponents
      v-if="showModalAddComponent"
      :show="showModalAddComponent"
      :firstButtonText="firstButtonTextSearchComponents"
      :title="titleModalAddComponent"
      :CustomSearchComponent="CustomSearchComponent"
      @firstModalButtonSearchComponentsFunction="firstModalButtonSearchComponentsFunction"
    ></SearchComponents>
    <PageBuilderPreviewModal
      :show="openPageBuilderPreviewModal"
      @firstPageBuilderPreviewModalButton="firstPageBuilderPreviewModalButton"
    >
      <Preview></Preview>
    </PageBuilderPreviewModal>

    <div class="w-full inset-x-0 h-[90vh] z-10 bg-white overflow-x-scroll lg:pt-2 pt-2">
      <div class="py-4 p-4 bg-red-100 text-sm">
        <p class="text-xs py-2 px-2">passed user is: {{ getCurrentUser }}</p>
        <p class="text-xs py-2 px-2">passed updateOrCreate is: {{ updateOrCreate }}</p>
        <p class="text-xs py-2 px-2">
          passed resourceData: {{ resourceData ? JSON.stringify(resourceData) : 'null' }} passed
        </p>
        <p class="text-xs py-2 px-2">getCurrentResourceData: {{ 1 }}</p>
        <p class="text-xs py-2 px-2">
          CustomMediaLibraryComponent passed: {{ CustomMediaLibraryComponent ? true : false }}
        </p>
        <p class="text-xs py-2 px-2">
          CustomSearchComponent passed: {{ CustomSearchComponent ? true : false }}
        </p>
      </div>
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
                <span class="myMediumIcon material-symbols-outlined"> add </span>
              </button>
            </div>
            <div @click.self="pageBuilderStateStore.setComponent(null)">
              <ComponentTopMenu v-if="getElement"></ComponentTopMenu>
            </div>
          </div>
        </div>
        <main class="flex flex-col h-full grow rounded-2xl duration-300 shadow-2xl">
          <div
            class="flex items-center justify-between primary-gap rounded-t-2xl bg-myPrimaryLightGrayColor"
          >
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
                    <span class="lg:block hidden"> Add new Component </span>

                    <span
                      class="h-10 w-10 cursor-pointer rounded-full flex items-center border-none justify-center bg-gray-50 aspect-square hover:bg-myPrimaryLinkColor hover:text-white focus-visible:ring-0"
                    >
                      <span class="myMediumIcon material-symbols-outlined"> add </span>
                    </span>
                  </div>
                </button>
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
                  class="h-10 w-10 cursor-pointer rounded-full flex items-center border-none justify-center bg-gray-50 aspect-square hover:bg-myPrimaryLinkColor hover:text-white focus-visible:ring-0"
                >
                  <span class="material-symbols-outlined"> visibility </span>
                </button>

                <button
                  type="button"
                  v-if="getMenuRight === false"
                  @click="pageBuilderStateStore.setMenuRight(true)"
                  class="h-10 w-10 cursor-pointer rounded-full flex items-center border-none justify-center bg-gray-50 aspect-square hover:bg-myPrimaryLinkColor hover:text-white focus-visible:ring-0"
                >
                  <span class="material-symbols-outlined"> gesture </span>
                </button>
              </div>
            </div>
          </div>

          <EditGetElement></EditGetElement>
          <div
            @click="pageBuilderStateStore.setComponent(null)"
            id="contains-pagebuilder"
            class="pl-4 pr-4 pb-4 overflow-y-auto h-screen pt-1"
          >
            <div id="pagebuilder">
              <div ref="draggableZone">
                <!-- Added Components to DOM # start -->
                <div
                  v-for="component in Array.isArray(getComponents) && getComponents"
                  :key="component"
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
                class="rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 my-12 mx-8"
              >
                <h3 class="mt-2 text-sm font-medium text-gray-900">Add Components</h3>
                <p class="mt-1 text-sm text-gray-500">
                  Get started by adding components using the drag & drop Page Builder.
                </p>
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
                    <span class="myMediumIcon material-symbols-outlined"> add </span>
                    Add component
                  </button>
                </div>
              </div>
              <!-- Add Component # end -->
            </div>
          </div>
          <div class="text-right text-xs text-gray-600 py-2 px-4 bg-white">
            version: {{ version }}
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
