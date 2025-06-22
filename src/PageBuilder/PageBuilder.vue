<script setup>
import { onMounted, computed, ref, watch, provide, nextTick } from 'vue'
import PageBuilderClass from '../composables/PageBuilderClass.ts'
import ModalBuilder from '../Components/Modals/ModalBuilder.vue'
import Preview from './Preview.vue'
import ComponentTopMenu from '../Components/PageBuilder/EditorMenu/Editables/ComponentTopMenu.vue'
import EditGetElement from '../Components/PageBuilder/EditorMenu/Editables/EditGetElement.vue'
import BuilderComponents from '../Components/Modals/BuilderComponents.vue'
import RightSidebarEditor from '../Components/PageBuilder/EditorMenu/RightSidebarEditor.vue'
import { sharedPageBuilderPinia, sharedPageBuilderStore } from '../stores/shared-store'
import ToolbarOption from '../Components/PageBuilder/ToolbarOption/ToolbarOption.vue'
import { delay } from '../composables/delay'
import { useDebounce } from '../composables/useDebounce.ts'
import DynamicModalBuilder from '../Components/Modals/DynamicModalBuilder.vue'

/**
 * Props for PageBuilder component
 * @typedef {Object} Props
 * @property {Object|null} CustomMediaLibraryComponent - Custom media component
 * @property {Object|null} CustomBuilderComponents - Custom component
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

const getPageBuilderConfig = computed(() => {
  return pageBuilderStateStore.getPageBuilderConfig
})

const getMenuRight = computed(() => {
  return pageBuilderStateStore.getMenuRight
})
const previewCurrentDesign = function () {
  pageBuilderClass.previewCurrentDesign()
}
const openAppNotStartedModal = ref(false)
const openPageBuilderPreviewModal = ref(false)

const handlAppNotStartedModal = function () {
  openAppNotStartedModal.value = false
}
const handlePageBuilderPreview = function () {
  previewCurrentDesign()
  openPageBuilderPreviewModal.value = true
}

const firstPageBuilderPreviewModalButton = function () {
  openPageBuilderPreviewModal.value = false
}

const showModalAddComponent = ref(false)
const titleModalAddComponent = ref('')
const firstButtonTextSearchComponents = ref('')
const firstModalButtonSearchComponentsFunction = ref(null)

const handleAddComponent = async function () {
  await pageBuilderClass.clearHtmlSelection()

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

const getHasLocalDraftForUpdate = computed(() => {
  return pageBuilderStateStore.getHasLocalDraftForUpdate
})

const getElement = computed(() => {
  return pageBuilderStateStore.getElement
})

const getComponents = computed(() => {
  return pageBuilderStateStore.getComponents
})

watch(getHasLocalDraftForUpdate, (newVal) => {
  if (newVal) {
    handlerRumeEditingForUpdate()
  }
})

const getElementAttributes = computed(() => {
  if (!getElement.value || !(getElement.value instanceof HTMLElement)) {
    return ''
  }

  // Extract the attributes to watch
  const attributesToWatch = {
    src: getElement.value.getAttribute('src'),
    href: getElement.value.getAttribute('href'),
    style: getElement.value.getAttribute('style'),
    class: getElement.value.getAttribute('class'),
    dataImage: getElement.value.getAttribute('data-image'),
  }

  return attributesToWatch
})

const debounce = useDebounce()

watch(getElementAttributes, async (newAttributes, oldAttributes) => {
  // Only run if attributes actually changed
  if (
    newAttributes?.src !== oldAttributes?.src ||
    newAttributes?.href !== oldAttributes?.href ||
    newAttributes?.style !== oldAttributes?.style ||
    newAttributes?.class !== oldAttributes?.class ||
    newAttributes?.dataImage !== oldAttributes?.dataImage
  ) {
    debounce(async () => {
      await pageBuilderClass.handleAutoSave()
      await pageBuilderClass.initializeElementStyles()
    }, 200)
  }
})

const handleSelectComponent = function (componentObject) {
  pageBuilderStateStore.setComponent(componentObject)
}

const draggableZone = ref(null)

const getIsLoadingGlobal = computed(() => {
  return pageBuilderStateStore.getIsLoadingGlobal
})
const getIsSaving = computed(() => {
  return pageBuilderStateStore.getIsSaving
})

const getIsResumeEditing = computed(() => {
  if (pageBuilderStateStore.getIsResumeEditing) {
    handlerRumeEditingForUpdate()
  }
  return pageBuilderStateStore.getIsResumeEditing
})
const getIsRestoring = computed(() => {
  return pageBuilderStateStore.getIsRestoring
})

const gridColumnModalResumeEditing = ref(Number(1))
const typeModal = ref('')
const showModalResumeEditing = ref(false)
const titleModalResumeEditing = ref('')
const descriptionModalResumeEditing = ref('')
const firstButtonResumeEditing = ref('')
const secondButtonResumeEditing = ref(null)
const thirdButtonResumeEditing = ref(null)
const firstModalButtonResumeEditingFunction = ref(null)
const secondModalButtonResumeEditingFunction = ref(null)
const thirdModalButtonResumeEditingFunction = ref(null)

const handlerRumeEditingForUpdate = async function () {
  await pageBuilderClass.clearHtmlSelection()

  typeModal.value = 'default'
  showModalResumeEditing.value = true

  titleModalResumeEditing.value = 'Continue Your Work?'
  descriptionModalResumeEditing.value =
    'We noticed you have some changes that weren’t saved last time. Would you like to pick up where you left off, or use the version that’s currently saved?'
  firstButtonResumeEditing.value = 'Use Saved Version'
  secondButtonResumeEditing.value = null
  thirdButtonResumeEditing.value = 'Continue Where I Left Off'

  firstModalButtonResumeEditingFunction.value = function () {
    showModalResumeEditing.value = false
  }

  secondModalButtonResumeEditingFunction.value = function () {}

  thirdModalButtonResumeEditingFunction.value = async function () {
    await pageBuilderClass.resumeEditingForUpdate()

    showModalResumeEditing.value = false
  }

  // end modal
}

const gridColumnModalRestore = ref(Number(1))
const typeModalRestore = ref('')
const showModalRestore = ref(false)
const titleModalRestore = ref('')
const descriptionModalRestore = ref('')
const firstButtonRestore = ref('')
const secondButtonRestore = ref(null)
const thirdButtonRestore = ref(null)
const firstModalButtonRestoreFunction = ref(null)
const secondModalButtonRestoreFunction = ref(null)
const thirdModalButtonRestoreFunction = ref(null)

const handleRestoreOriginalContent = async function () {
  await pageBuilderClass.clearHtmlSelection()

  typeModalRestore.value = 'delete'
  showModalRestore.value = true

  titleModalRestore.value = 'Do you want to restore the original content from the database?'
  descriptionModalRestore.value =
    'Are you sure you want to restore the original content from the database? This will overwrite your current page layout.'
  firstButtonRestore.value = 'Close'
  secondButtonRestore.value = 'Use original Content'
  thirdButtonRestore.value = 'Trick'

  firstModalButtonRestoreFunction.value = function () {
    showModalRestore.value = false
  }

  secondModalButtonRestoreFunction.value = async function () {
    await pageBuilderClass.restoreOriginalContent()
    showModalRestore.value = false
  }
  thirdModalButtonRestoreFunction.value = async function () {
    console.log('This is a test button')
  }

  // end modal
}
onMounted(async () => {
  openAppNotStartedModal.value = true
})
</script>

<template>
  <div
    id="builder-container"
    class="pbx-font-sans pbx-max-w-full pbx-m-1 pbx-border pbx-border-gray-400 pbx-inset-x-0 pbx-z-10 pbx-bg-white pbx-overflow-x-scroll"
  >
    <div id="pagebuilder-top-area" class="lg:pbx-px-4 pbx-pt-2 pbx-pb-4 pbx-mx-4 pbx-mb-4 pbx-mt-2">
      <p class="pbx-font-bold pbx-my-4 pbx-py-4 pbx-bottom-2 pbx-border-red-300 rounded-3xl">
        ok getIsLoadingGlobal: {{ JSON.stringify(getIsLoadingGlobal) }}
      </p>
      <div
        @click.self="pageBuilderClass.clearHtmlSelection()"
        class="pbx-min-h-24 pbx-flex pbx-justify-between pbx-items-center pbx-pb-2 pbx-border-b pbx-border-gray-200"
      >
        <!-- Logo # start -->
        <div @click="pageBuilderClass.clearHtmlSelection()">
          <div
            v-if="
              getPageBuilderConfig &&
              getPageBuilderConfig.pageBuilderLogo &&
              getPageBuilderConfig.pageBuilderLogo.src
            "
            class="pbx-flex pbx-items-center pbx-divide-x pbx-divide-gray-200"
          >
            <div id="pagebuilder-logo-main" class="pbx-pr-4">
              <img class="pbx-h-6" :src="getPageBuilderConfig.pageBuilderLogo.src" alt="Logo" />
            </div>
            <span class="pbx-myPrimaryParagraph pbx-font-medium pbx-pl-4">Editing Page </span>
          </div>
          <div v-else>
            <div class="pbx-pr-6">
              <span class="pbx-myPrimaryParagraph pbx-font-medium">Editing Page </span>
            </div>
          </div>
        </div>
        <!-- Logo # end -->

        <!-- Options # Start -->
        <div>
          <ToolbarOption></ToolbarOption>
        </div>
        <!-- Options # Start -->
      </div>
    </div>

    <BuilderComponents
      v-if="showModalAddComponent"
      :show="showModalAddComponent"
      :firstButtonText="firstButtonTextSearchComponents"
      :title="titleModalAddComponent"
      :CustomBuilderComponents="props.CustomBuilderComponents"
      @firstModalButtonSearchComponentsFunction="firstModalButtonSearchComponentsFunction"
    ></BuilderComponents>

    <ModalBuilder
      title="The builder hasn’t started ye"
      :showModalBuilder="openAppNotStartedModal"
      @closeMainModalBuilder="handlAppNotStartedModal"
      type="delete"
      maxWidth="2xl"
    >
      The builder hasn’t started yet. If this screen doesn’t go away soon, it may just need a little
      setup in the background. You can safely contact support and ask them to initialize the builder
      by running the start method.
    </ModalBuilder>

    <ModalBuilder
      title="Preview"
      :showModalBuilder="openPageBuilderPreviewModal"
      @closeMainModalBuilder="firstPageBuilderPreviewModalButton"
      maxWidth="screen"
    >
      <Preview></Preview>
    </ModalBuilder>

    <p>eeer den: {{ getIsResumeEditing }}</p>
    <DynamicModalBuilder
      :showDynamicModalBuilder="showModalResumeEditing"
      :isLoading="getIsResumeEditing"
      :type="typeModal"
      :gridColumnAmount="gridColumnModalResumeEditing"
      :title="titleModalResumeEditing"
      :description="descriptionModalResumeEditing"
      :firstButtonText="firstButtonResumeEditing"
      :secondButtonText="secondButtonResumeEditing"
      :thirdButtonText="thirdButtonResumeEditing"
      @firstModalButtonFunctionDynamicModalBuilder="firstModalButtonResumeEditingFunction"
      @secondModalButtonFunctionDynamicModalBuilder="secondModalButtonResumeEditingFunction"
      @thirdModalButtonFunctionDynamicModalBuilder="thirdModalButtonResumeEditingFunction"
    >
      <header></header>
      <main></main>
    </DynamicModalBuilder>
    <DynamicModalBuilder
      :showDynamicModalBuilder="showModalRestore"
      :isLoading="getIsRestoring"
      :type="typeModalRestore"
      :gridColumnAmount="gridColumnModalRestore"
      :title="titleModalRestore"
      :description="descriptionModalRestore"
      :firstButtonText="firstButtonRestore"
      :secondButtonText="secondButtonRestore"
      :thirdButtonText="thirdButtonRestore"
      @firstModalButtonFunctionDynamicModalBuilder="firstModalButtonRestoreFunction"
      @secondModalButtonFunctionDynamicModalBuilder="secondModalButtonRestoreFunction"
      @thirdModalButtonFunctionDynamicModalBuilder="thirdModalButtonRestoreFunction"
    >
      <header></header>
      <main></main>
    </DynamicModalBuilder>

    <div>
      <div class="pbx-relative pbx-h-full pbx-flex pbx-pb-2 pbx-gap-2">
        <div
          @click.self="pageBuilderClass.clearHtmlSelection()"
          id="pagebuilder-left-area"
          class="pbx-min-w-[3.5rem] pbx-pt-6 pbx-pb-2 pbx-ml-2 pbx-bg-myPrimaryLightGrayColor pbx-rounded-full pbx-shadow-sm"
        >
          <div class="pbx-mx-2 pbx-flex pbx-flex-col pbx-myPrimaryGap pbx-items-stretch">
            <div class="pbx-flex pbx-gap-2 pbx-items-center pbx-justify-center">
              <button
                type="button"
                @click="
                  () => {
                    pageBuilderStateStore.setComponentArrayAddMethod('unshift')
                    handleAddComponent()
                  }
                "
                class="pbx-h-10 pbx-w-10 pbx-cursor-pointer pbx-rounded-full pbx-flex pbx-items-center pbx-border-none pbx-justify-center pbx-bg-gray-50 pbx-aspect-square hover:pbx-bg-myPrimaryLinkColor hover:pbx-text-white focus-visible:pbx-ring-0"
              >
                <span class="pbx-myMediumIcon material-symbols-outlined"> interests </span>
              </button>
            </div>
            <div @click.self="pageBuilderClass.clearHtmlSelection()">
              <ComponentTopMenu v-if="getElement"></ComponentTopMenu>
            </div>
          </div>
        </div>
        <main
          class="pbx-flex pbx-flex-col pbx-h-full pbx-grow pbx-rounded-tr-2xl pbx-rounded-tl-2xl pbx-border pbx-border-gray-200 pbx-items-stretch"
          :class="{ 'pbx-mr-2': !getMenuRight, '': getMenuRight }"
        >
          <div
            id="pagebuilder-toolbar-area"
            class="pbx-flex pbx-items-center pbx-justify-between pbx-rounded-t-2xl pbx-bg-myPrimaryLightGrayColor pbx-min-w-[30rem]"
          >
            <div
              @click.self="pageBuilderClass.clearHtmlSelection()"
              class="pbx-flex pbx-myPrimaryGap pbx-items-center pbx-pt-4 pbx-pb-2 pbx-pl-2 pbx-h-24 pbx-w-full pbx-min-w-36"
            >
              <button
                class="pbx-mySecondaryButton pbx-h-6 pbx-flex pbx-gap-2"
                @click.stop="
                  async () => {
                    await pageBuilderClass.clearHtmlSelection()
                    await pageBuilderClass.handleManualSave()
                  }
                "
                type="button"
                :disabled="getIsSaving"
              >
                <div
                  v-if="!getIsSaving"
                  class="pbx-h-10 pbx-w-4 pbx-cursor-pointer pbx-rounded-full pbx-flex pbx-items-center pbx-justify-center"
                >
                  <span class="material-symbols-outlined">save</span>
                </div>
                <div
                  v-if="getIsSaving"
                  class="pbx-h-10 pbx-w-4 pbx-cursor-pointer pbx-rounded-full pbx-flex pbx-items-center pbx-justify-center"
                >
                  <span class="pbx-relative pbx-flex pbx-size-3">
                    <span
                      class="pbx-absolute pbx-inline-flex pbx-h-full pbx-w-full pbx-animate-ping pbx-rounded-full pbx-bg-gray-400 pbx-opacity-75"
                    ></span>
                    <span
                      class="pbx-relative pbx-inline-flex pbx-size-3 pbx-rounded-full pbx-bg-green-200"
                    ></span>
                  </span>
                </div>
                <div>Save</div>
              </button>
              <button
                class="pbx-mySecondaryButton pbx-h-6 pbx-flex pbx-gap-2"
                @click.stop="
                  async () => {
                    await pageBuilderClass.clearHtmlSelection()
                    await handleRestoreOriginalContent()
                  }
                "
                type="button"
                :disabled="getIsRestoring"
              >
                <div
                  v-if="!getIsRestoring"
                  class="pbx-h-10 pbx-w-4 pbx-cursor-pointer pbx-rounded-full pbx-flex pbx-items-center pbx-justify-center"
                >
                  <span class="material-symbols-outlined">cloud_circle</span>
                </div>
                <div
                  v-if="getIsRestoring"
                  class="pbx-h-10 pbx-w-4 pbx-cursor-pointer pbx-rounded-full pbx-flex pbx-items-center pbx-justify-center"
                >
                  <span class="pbx-relative pbx-flex pbx-size-3">
                    <span
                      class="pbx-absolute pbx-inline-flex pbx-h-full pbx-w-full pbx-animate-ping pbx-rounded-full pbx-bg-gray-400 pbx-opacity-75"
                    ></span>
                    <span
                      class="pbx-relative pbx-inline-flex pbx-size-3 pbx-rounded-full pbx-bg-green-200"
                    ></span>
                  </span>
                </div>
                <div>Restore Original Content</div>
              </button>

              <!-- Continue editing # end -->
            </div>

            <div
              @click.self="pageBuilderClass.clearHtmlSelection()"
              class="pbx-flex pbx-justify-end pbx-py-2 pbx-pr-2 pbx-h-24 pbx-w-full"
            >
              <div
                @click.self="pageBuilderClass.clearHtmlSelection()"
                class="pbx-flex pbx-items-center pbx-justify-center pbx-gap-4"
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
                  <div class="pbx-flex pbx-items-center pbx-justify-center pbx-gap-2">
                    <span class="lg:pbx-block pbx-hidden">
                      <div class="pbx-whitespace-nowrap">Add new Components</div>
                    </span>
                    <span
                      class="pbx-h-10 pbx-w-10 pbx-cursor-pointer pbx-rounded-full pbx-flex pbx-items-center pbx-border-none pbx-justify-center pbx-bg-gray-50 pbx-aspect-square hover:pbx-bg-myPrimaryLinkColor hover:pbx-text-white focus-visible:pbx-ring-0"
                    >
                      <span class="pbx-myMediumIcon material-symbols-outlined"> interests </span>
                    </span>
                  </div>
                </button>
                <div class="pbx-flex pbx-items-center pbx-justify-center pbx-gap-4">
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
                    <div class="pbx-flex pbx-items-center pbx-justify-center pbx-gap-2">
                      <div class="pbx-whitespace-nowrap lg:pbx-block pbx-hidden">Preview</div>

                      <span
                        class="pbx-h-10 pbx-w-10 pbx-cursor-pointer pbx-rounded-full pbx-flex pbx-items-center pbx-border-none pbx-justify-center pbx-bg-gray-50 pbx-aspect-square hover:pbx-bg-myPrimaryLinkColor hover:pbx-text-white focus-visible:pbx-ring-0"
                      >
                        <span class="pbx-myMediumIcon material-symbols-outlined"> visibility </span>
                      </span>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            <div
              @click.self="pageBuilderClass.clearHtmlSelection()"
              class="pbx-flex pbx-justify-end pbx-py-2 pbx-pr-2 pbx-w-full pbx-h-24"
            >
              <div
                @click.self="pageBuilderClass.clearHtmlSelection()"
                class="pbx-flex pbx-items-center pbx-justify-center pbx-gap-4"
              >
                <button
                  type="button"
                  v-if="getMenuRight === false"
                  @click="pageBuilderStateStore.setMenuRight(true)"
                >
                  <div class="pbx-flex pbx-items-center pbx-justify-center pbx-gap-2">
                    <span class="lg:pbx-block pbx-hidden"> Styling </span>

                    <span
                      class="pbx-h-10 pbx-w-10 pbx-cursor-pointer pbx-rounded-full pbx-flex pbx-items-center pbx-border-none pbx-justify-center pbx-bg-gray-50 pbx-aspect-square hover:pbx-bg-myPrimaryLinkColor hover:pbx-text-white focus-visible:pbx-ring-0"
                    >
                      <span class="pbx-myMediumIcon material-symbols-outlined"> more_vert </span>
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </div>

          <EditGetElement></EditGetElement>
          <div
            id="contains-pagebuilder"
            class="pbx-pl-4 pbx-pr-4 pbx-pb-4 pbx-overflow-y-auto pbx-pt-1 pbx-h-[39rem]"
          >
            <div id="pagebuilder">
              <div ref="draggableZone">
                <!-- Added Components to DOM # start -->
                <div
                  v-for="component in getComponents"
                  :key="component.id"
                  id="page-builder-editor-editable-area"
                  class="pbx-bg-white pbx-grow"
                >
                  <div @mouseup="handleSelectComponent(component)" class="pbx-relative group">
                    <div v-html="component.html_code"></div>
                  </div>
                </div>
              </div>
              <!-- Added Components to DOM # end -->

              <!-- Add Component # start -->

              <div
                @click="pageBuilderClass.clearHtmlSelection()"
                id="pagebuilder-bottom-components-area"
                class="pbx-pt-8 pbx-pb-12 pbx-text-center focus:pbx-outline-none focus:pbx-ring-2 focus:pbx-ring-indigo-500 focus:pbx-ring-offset-2 pbx-my-2 pbx-mx-4"
                :class="{ 'pbx-border-t pbx-border-gray-200': getComponents.length > 0 }"
              >
                <div class="pbx-flex pbx-items-center pbx-justify-center pbx-gap-2 pbx-font-medium">
                  <span class="lg:pbx-block pbx-hidden">
                    <div>Add new components to the bottom of the page</div>
                  </span>
                </div>

                <div class="pbx-mt-6 pbx-flex pbx-items-center pbx-gap-2 pbx-justify-center">
                  <button
                    @click="
                      () => {
                        pageBuilderStateStore.setComponentArrayAddMethod('push')
                        handleAddComponent()
                      }
                    "
                    type="button"
                    class="pbx-myPrimaryButton pbx-flex pbx-items-center pbx-gap-2 pbx-justify-center"
                  >
                    <span class="pbx-myMediumIcon material-symbols-outlined"> interests </span>
                    <span class="pbx-font-medium"> Add new Components </span>
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
          :class="{
            'pbx-w-0': !getMenuRight,
            'pbx-w-80 pbx-mr-2 pbx-bg-myPrimaryLightGrayColor pbx-items-stretch': getMenuRight,
          }"
          class="pbx-duration-300 pbx-z-20 pbx-flex-shrink-0 pbx-overflow-hidden pbx-shadow-sm pbx-rounded-l-2xl"
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
