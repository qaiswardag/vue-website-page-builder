<script setup>
import { onMounted, computed, ref, watch, provide } from 'vue'
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
import GlobalLoader from '../Components/Loaders/GlobalLoader.vue'
import { useTranslations } from '../composables/useTranslations'
import { getPageBuilder } from '../composables/builderInstance'
const pageBuilderService = getPageBuilder()
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
  showCloseButton: {
    type: Boolean,
    default: false,
  },
  showPublishButton: {
    type: Boolean,
    default: false,
  },
})

const { translate, loadTranslations } = useTranslations()

// Use shared Pinia instance for PageBuilder package
const internalPinia = sharedPageBuilderPinia

const pageBuilderStateStore = sharedPageBuilderStore

// Provide store for child components (all pointing to the same consolidated store)
provide('pageBuilderStateStore', pageBuilderStateStore)
// Provide the internal Pinia instance for components that need to create stores
provide('internalPinia', internalPinia)
// Provide custom components for child components
provide('CustomMediaComponent', props.CustomMediaLibraryComponent)
provide('CustomBuilderComponents', props.CustomBuilderComponents)

const emit = defineEmits(['handleClosePageBuilder', 'handlePublishPageBuilder'])

const closePageBuilder = function () {
  emit('handleClosePageBuilder')
}
const closePublish = function () {
  pageBuilderService.handleManualSave()
  emit('handlePublishPageBuilder')
}

// Provide modal close function for custom components
const closeAddComponentModal = () => {
  showModalAddComponent.value = false
}
provide('closeAddComponentModal', closeAddComponentModal)

const languageSelction = ref('en')

let isInitializingLang = true

// Watch for changes in languageSelction
watch(languageSelction, async (newVal) => {
  if (newVal && !isInitializingLang) {
    await loadTranslations(newVal)
    pageBuilderService.changeLanguage(newVal)

    // Ensure lang is updated within userSettings
    const userSettings = JSON.parse(localStorage.getItem('userSettingsPageBuilder')) || {}
    userSettings.lang = newVal
    localStorage.setItem('userSettingsPageBuilder', JSON.stringify(userSettings))
  }
})

const getCurrentLanguage = computed(() => {
  return pageBuilderStateStore.getCurrentLanguage
})

const getBuilderStarted = computed(() => {
  return pageBuilderStateStore.getBuilderStarted
})
const getPageBuilderConfig = computed(() => {
  return pageBuilderStateStore.getPageBuilderConfig
})

const getMenuRight = computed(() => {
  return pageBuilderStateStore.getMenuRight
})
const openPageBuilderPreviewModal = ref(false)

const previewCurrentDesign = function () {
  pageBuilderService.previewCurrentDesign()
}
const handlePageBuilderPreview = function () {
  previewCurrentDesign()
  openPageBuilderPreviewModal.value = true
}

const openPageBuilderPreviewMobile = ref(false)

const previewCurrentDesignMobile = function () {
  pageBuilderService.previewCurrentDesign()
}
const handlePageBuilderPreviewMobile = function () {
  previewCurrentDesignMobile()
  openPageBuilderPreviewMobile.value = true
}

const openAppNotStartedModal = ref(false)

const handlAppNotStartedModal = function () {
  openAppNotStartedModal.value = false
}

const firstPageBuilderPreviewModalButton = function () {
  openPageBuilderPreviewModal.value = false
}
const firstPageBuilderPreviewModalButtonMobile = function () {
  openPageBuilderPreviewMobile.value = false
}

const showModalAddComponent = ref(false)
const titleModalAddComponent = ref('')
const firstButtonTextSearchComponents = ref('')
const firstModalButtonSearchComponentsFunction = ref(null)

const handleAddComponent = async function () {
  await pageBuilderService.clearHtmlSelection()

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

const getElement = computed(() => {
  return pageBuilderStateStore.getElement
})

const getRestoredElement = computed(() => {
  return pageBuilderStateStore.getRestoredElement
})

const getComponents = computed(() => {
  return pageBuilderStateStore.getComponents
})

const getHasLocalDraftForUpdate = computed(() => {
  return pageBuilderStateStore.getHasLocalDraftForUpdate
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
      await pageBuilderService.initializeElementStyles()
    }, 200)
  }
})

const handleSelectComponent = function (componentObject) {
  pageBuilderStateStore.setComponent(componentObject)
}

const getIsLoadingGlobal = computed(() => {
  return pageBuilderStateStore.getIsLoadingGlobal
})
const getIsSaving = computed(() => {
  return pageBuilderStateStore.getIsSaving
})

const getIsLoadingResumeEditing = computed(() => {
  return pageBuilderStateStore.getIsLoadingResumeEditing
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
  typeModal.value = 'warning'
  showModalResumeEditing.value = true

  titleModalResumeEditing.value = 'Continue Your Work?'
  descriptionModalResumeEditing.value =
    'We noticed you have some changes that weren’t saved last time. Would you like to pick up where you left off, or use the version that’s currently loaded from the database?'
  firstButtonResumeEditing.value = 'Use Saved Version'
  secondButtonResumeEditing.value = null
  thirdButtonResumeEditing.value = 'Continue Where I Left Off'

  firstModalButtonResumeEditingFunction.value = async function () {
    pageBuilderStateStore.setHasLocalDraftForUpdate(false)
    showModalResumeEditing.value = false
  }

  secondModalButtonResumeEditingFunction.value = function () {}

  thirdModalButtonResumeEditingFunction.value = async function () {
    await pageBuilderService.resumeEditingFromDraft()
    pageBuilderStateStore.setHasLocalDraftForUpdate(false)

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
  await pageBuilderService.clearHtmlSelection()

  typeModalRestore.value = 'success'
  showModalRestore.value = true

  titleModalRestore.value = 'Do you want to reset this page?'
  descriptionModalRestore.value =
    'Are you sure you want to reset this page? This will overwrite your current changes.'
  firstButtonRestore.value = 'Close'
  secondButtonRestore.value = null
  thirdButtonRestore.value = 'Reset changes'

  firstModalButtonRestoreFunction.value = function () {
    showModalRestore.value = false
  }

  secondModalButtonRestoreFunction.value = async function () {}
  thirdModalButtonRestoreFunction.value = async function () {
    await pageBuilderService.restoreOriginalContent()
    showModalRestore.value = false
  }

  // end modal
}

const ensureBuilderInitialized = function () {
  if (!getBuilderStarted.value) {
    openAppNotStartedModal.value = true
  }
}

const pbxToolBar = ref(null)

let lastToolbarLeft = null
let lastToolbarTop = null

function updatePanelPosition() {
  const container = pbxToolBar.value
  const editToolbarElement = container && container.querySelector('#pbxEditToolbar')
  const restored = getRestoredElement.value

  if (!container || !editToolbarElement) return

  const selected = container.querySelector('[selected]')

  if (selected && typeof selected.getBoundingClientRect === 'function') {
    const selectedRect = selected.getBoundingClientRect()
    const containerRect = container.getBoundingClientRect()

    const left =
      selectedRect.left -
      containerRect.left +
      selectedRect.width / 2 -
      editToolbarElement.offsetWidth / 2

    const GAP = 20 // px
    const proposedTop =
      selectedRect.top -
      containerRect.top +
      container.scrollTop -
      editToolbarElement.offsetHeight -
      GAP

    const top = Math.max(0, proposedTop)

    editToolbarElement.style.position = 'absolute'
    editToolbarElement.style.left = `${left}px`
    editToolbarElement.style.top = `${top}px`
    editToolbarElement.classList.add('is-visible')

    lastToolbarLeft = left
    lastToolbarTop = top
  } else if (restored && lastToolbarLeft !== null && lastToolbarTop !== null) {
    editToolbarElement.style.position = 'absolute'
    editToolbarElement.style.left = `${lastToolbarLeft}px`
    editToolbarElement.style.top = `${lastToolbarTop}px`
    editToolbarElement.classList.add('is-visible')
  } else {
    editToolbarElement.classList.remove('is-visible')
  }
}

const userSettings = JSON.parse(localStorage.getItem('userSettingsPageBuilder'))

onMounted(async () => {
  // await delay(2000)
  await pageBuilderService.completeBuilderInitialization(undefined, true)

  if (userSettings && userSettings.lang) {
    languageSelction.value = userSettings.lang
  }
  if (
    getPageBuilderConfig.value &&
    getPageBuilderConfig.value.userSettings &&
    getPageBuilderConfig.value.userSettings.language &&
    getPageBuilderConfig.value.userSettings.language.default &&
    (!userSettings || !userSettings.lang)
  ) {
    languageSelction.value = getPageBuilderConfig.value.userSettings.language.default
  }

  await loadTranslations(languageSelction.value)
  isInitializingLang = false

  updatePanelPosition()

  // Set up MutationObserver and event listeners
  const container = pbxToolBar.value
  if (!container) return

  const observer = new MutationObserver(updatePanelPosition)
  observer.observe(container, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['selected'],
  })

  window.addEventListener('scroll', updatePanelPosition)
  window.addEventListener('resize', updatePanelPosition)

  //
  //
  //
  //
  // Check if Builder started
  await delay(10000)
  ensureBuilderInitialized()

  // Re-check if Builder started
  await delay(10000)
  ensureBuilderInitialized()

  // Re-check again if Builder started
  await delay(10000)
  ensureBuilderInitialized()
})
</script>

<template>
  <div
    class="pbx-font-sans pbx-max-w-full pbx-border-solid pbx-border pbx-border-gray-400 pbx-inset-x-0 pbx-z-10 pbx-bg-white pbx-overflow-x-auto pbx-h-full"
  >
    <GlobalLoader v-if="getIsLoadingGlobal && !openAppNotStartedModal"></GlobalLoader>
    <ModalBuilder
      title="The builder hasn’t started yet"
      :showModalBuilder="openAppNotStartedModal"
      @closeMainModalBuilder="handlAppNotStartedModal"
      type="delete"
      maxWidth="2xl"
      :noBackgroundOpacity="true"
    >
      The builder hasn’t started yet. If this screen doesn’t go away soon, it may just need a little
      setup in the background. You can safely contact support and ask them to initialize the builder
      by running the startBuilder method for this resource.
    </ModalBuilder>

    <BuilderComponents
      v-if="showModalAddComponent"
      :show="showModalAddComponent"
      :firstButtonText="firstButtonTextSearchComponents"
      :title="titleModalAddComponent"
      :CustomBuilderComponents="props.CustomBuilderComponents"
      @firstModalButtonSearchComponentsFunction="firstModalButtonSearchComponentsFunction"
    ></BuilderComponents>

    <ModalBuilder
      title="Preview"
      :showModalBuilder="openPageBuilderPreviewModal"
      @closeMainModalBuilder="firstPageBuilderPreviewModalButton"
      maxWidth="screen"
    >
      <Preview></Preview>
    </ModalBuilder>

    <ModalBuilder
      title="Mobile"
      :showModalBuilder="openPageBuilderPreviewMobile"
      @closeMainModalBuilder="firstPageBuilderPreviewModalButtonMobile"
      maxWidth="lg"
    >
      <Preview :mobile="true" />
    </ModalBuilder>

    <DynamicModalBuilder
      :showDynamicModalBuilder="showModalResumeEditing"
      :isLoading="getIsLoadingResumeEditing"
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
      <!-- Top Layout Save And Reset Area - Start -->
      <div
        id="pagebuilder-toolbar-area"
        class="pbx-flex pbx-items-center pbx-justify-between pbx-bg-myPrimaryLightGrayColor pbx-border-0 pbx-border-solid pbx-border-b pbx-border-gray-200 pbx-mb-2 lg:pbx-px-6 pbx-px-4 pbx-font-sans"
      >
        <template
          v-if="
            getPageBuilderConfig &&
            getPageBuilderConfig.pageBuilderLogo &&
            getPageBuilderConfig.pageBuilderLogo.src
          "
        >
          <!-- Logo # start -->
          <div
            @click.self="
              async () => {
                await pageBuilderService.clearHtmlSelection()
              }
            "
            class="pbx-flex pbx-justify-start pbx-py-2 pbx-min-h-20 pbx-max-h-20 pbx-w-full"
          >
            <div
              @click="
                async () => {
                  await pageBuilderService.clearHtmlSelection()
                }
              "
              class="pbx-flex pbx-items-center pbx-justify-center"
            >
              <div id="pagebuilder-logo-main" class="pbx-flex pbx-items-center pbx-justify-center">
                <img class="pbx-h-6" :src="getPageBuilderConfig.pageBuilderLogo.src" alt="Logo" />
              </div>
            </div>
          </div>
        </template>
        <!-- Logo # end -->

        <div
          @click.self="
            async () => {
              await pageBuilderService.clearHtmlSelection()
            }
          "
          class="pbx-flex pbx-justify-center pbx-items-center pbx-py-2 pbx-min-h-20 pbx-max-h-20 pbx-w-full"
        >
          <div class="pbx-flex pbx-items-center pbx-justify-center">
            <!-- Save Start -->
            <button
              class="pbx-mySecondaryButton pbx-h-6 pbx-flex pbx-gap-2 pbx-mr-2"
              @click.stop="
                async () => {
                  await pageBuilderService.clearHtmlSelection()
                  await pageBuilderService.handleManualSave()
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
            <!-- Save End -->

            <!-- Restore Start -->
            <template
              v-if="
                getPageBuilderConfig &&
                getPageBuilderConfig.updateOrCreate &&
                getPageBuilderConfig.updateOrCreate.formType === 'update'
              "
            >
              <button
                class="pbx-mySecondaryButton pbx-h-6 pbx-flex pbx-gap-2 lg:mr-2"
                @click.stop="
                  async () => {
                    await pageBuilderService.clearHtmlSelection()
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
                  <span class="material-symbols-outlined"> settings_backup_restore </span>
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
                <div class="lg:pbx-block pbx-hidden">
                  <span> {{ translate('Reset Page') }} </span>
                </div>
              </button>
            </template>
            <!-- Restore End -->
          </div>
        </div>

        <div
          @click.self="
            async () => {
              await pageBuilderService.clearHtmlSelection()
            }
          "
          class="pbx-flex pbx-justify-center pbx-items-center pbx-py-2 pbx-min-h-20 pbx-max-h-20 pbx-w-full"
        >
          <div
            @click.self="
              async () => {
                await pageBuilderService.clearHtmlSelection()
              }
            "
            class="pbx-flex pbx-items-center pbx-justify-center"
          >
            <div
              class="pbx-mr-2"
              @click="
                () => {
                  pageBuilderStateStore.setComponentArrayAddMethod('unshift')
                  handleAddComponent()
                }
              "
            >
              <div
                class="pbx-flex pbx-items-center pbx-justify-center pbx-gap-2 pbx-border-gray-200"
              >
                <span class="lg:pbx-block pbx-hidden">
                  <div class="pbx-whitespace-nowrap pbx-cursor-pointer">Add new Components</div>
                </span>
                <span
                  class="pbx-h-10 pbx-w-10 pbx-cursor-pointer pbx-rounded-full pbx-flex pbx-items-center pbx-border-none pbx-justify-center pbx-bg-gray-50 pbx-aspect-square hover:pbx-bg-myPrimaryLinkColor focus-visible:pbx-ring-0 pbx-text-black hover:pbx-text-white"
                >
                  <span class="pbx-myMediumIcon material-symbols-outlined"> interests </span>
                </span>
              </div>
            </div>
            <div class="pbx-flex pbx-items-center pbx-justify-center pbx-mr-2">
              <div
                @click="
                  async () => {
                    pageBuilderStateStore.setMenuRight(false)
                    pageBuilderStateStore.setElement(null)
                    await pageBuilderService.clearHtmlSelection()
                    handlePageBuilderPreview()
                  }
                "
              >
                <div class="pbx-flex pbx-items-center pbx-justify-center pbx-gap-2">
                  <span
                    class="pbx-h-10 pbx-w-10 pbx-cursor-pointer pbx-rounded-full pbx-flex pbx-items-center pbx-border-none pbx-justify-center pbx-bg-gray-50 pbx-aspect-square hover:pbx-bg-myPrimaryLinkColor focus-visible:pbx-ring-0 pbx-text-black hover:pbx-text-white"
                  >
                    <span class="pbx-myMediumIcon material-symbols-outlined"> visibility </span>
                  </span>
                </div>
              </div>
            </div>
            <div class="lg:pbx-flex pbx-hidden pbx-items-center pbx-justify-center">
              <div
                @click="
                  async () => {
                    pageBuilderStateStore.setMenuRight(false)
                    pageBuilderStateStore.setElement(null)
                    await pageBuilderService.clearHtmlSelection()
                    handlePageBuilderPreviewMobile()
                  }
                "
              >
                <div class="pbx-flex pbx-items-center pbx-justify-center pbx-gap-2">
                  <span
                    class="pbx-h-10 pbx-w-10 pbx-cursor-pointer pbx-rounded-full pbx-flex pbx-items-center pbx-border-none pbx-justify-center pbx-bg-gray-50 pbx-aspect-square hover:pbx-bg-myPrimaryLinkColor hover:pbx-text-white focus-visible:pbx-ring-0 pbx-text-black hover:pbx-text-white"
                  >
                    <span class="material-symbols-outlined"> phone_iphone </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="pbx-flex gap-2 pbx-items-center">
          <!-- Options # Start -->
          <div
            @click.self="
              async () => {
                await pageBuilderService.clearHtmlSelection()
              }
            "
            class="pbx-flex pbx-items-center pbx-py-2 pbx-min-h-20 pbx-max-h-20 pbx-w-full"
            :class="[showCloseButton ? 'pbx-justify-between' : 'pbx-justify-end']"
          >
            <ToolbarOption></ToolbarOption>
          </div>
          <!-- Options # Start -->
        </div>
        <!-- Close & Publish buttons start -->
        <template v-if="showPublishButton">
          <div class="pbx-ml-2">
            <button
              class="pbx-myPrimaryButton"
              @click="
                async () => {
                  closePublish()
                  await pageBuilderService.clearHtmlSelection()
                }
              "
            >
              Publish
            </button>
          </div>
        </template>
        <template
          v-if="
            getPageBuilderConfig &&
            getPageBuilderConfig.userSettings &&
            getPageBuilderConfig.userSettings.language
          "
        >
        </template>
        <template v-if="showCloseButton">
          <div class="pbx-ml-2">
            <button
              class="pbx-h-10 pbx-w-10 pbx-flex-end pbx-cursor-pointer pbx-rounded-full pbx-flex pbx-items-center pbx-border-none pbx-justify-center pbx-bg-gray-50 pbx-aspect-square hover:pbx-bg-myPrimaryLinkColor hover:pbx-text-white hover:pbx-fill-white focus-visible:pbx-ring-0"
              @click="
                async () => {
                  closePageBuilder()
                  await pageBuilderService.clearHtmlSelection()
                }
              "
            >
              <span class="material-symbols-outlined"> close </span>
            </button>
          </div>
        </template>

        <!-- Close & Publish buttons end -->

        <div class="pbx-py-6 pbx-px-4 pbx-bg-red-200 pbx-rounded-2xl pbx-m-2">
          <template
            v-if="
              getPageBuilderConfig &&
              getPageBuilderConfig.userSettings &&
              getPageBuilderConfig.userSettings.language &&
              !getPageBuilderConfig.userSettings.language.disableLanguageDropDown
            "
          >
            <template
              v-if="
                getPageBuilderConfig &&
                getPageBuilderConfig.userSettings &&
                getPageBuilderConfig.userSettings.language
              "
            >
              <div class="pbx-flex pbx-justify-center pbx-items-center pbx-ml-2">
                <div class="pbx-mr-6 pbx-text-[12px] pbx-w-max pbx-flex pbx-gap-2 pbx-flex-col">
                  <p class="py-4">getCurrentLanguage: {{ getCurrentLanguage }}</p>
                  <p class="py-4">
                    default lang: {{ getPageBuilderConfig.userSettings.language.default }}
                  </p>
                </div>
                <select
                  class="pbx-myPrimarySelect pbx-min-w-20 pbx-max-w-2pbx-min-w-20 pbx-w-max"
                  v-model="languageSelction"
                >
                  <template
                    v-if="
                      Array.isArray(getPageBuilderConfig.userSettings.language.enable) &&
                      getPageBuilderConfig.userSettings.language.enable.length >= 1
                    "
                  >
                    <template
                      v-for="lang in pageBuilderService
                        .availableLanguage()
                        .filter((l) =>
                          getPageBuilderConfig.userSettings.language.enable.includes(l),
                        )"
                      :key="lang"
                    >
                      <option :value="lang">{{ lang }}</option>
                    </template>
                  </template>
                  <template
                    v-if="
                      !getPageBuilderConfig.userSettings.language.enable ||
                      (Array.isArray(getPageBuilderConfig.userSettings.language.enable) &&
                        getPageBuilderConfig.userSettings.language.enable.length === 0)
                    "
                  >
                    <template v-for="lang in pageBuilderService.availableLanguage()" :key="lang">
                      <option :value="lang">{{ lang }}</option>
                    </template>
                  </template>
                </select>
              </div>
            </template>
          </template>
        </div>
      </div>

      <!-- Top Layout Save And Reset Area - End -->
      <div class="pbx-relative pbx-h-full pbx-flex pbx-pb-2 pbx-gap-2">
        <div
          @click.self="
            async () => {
              await pageBuilderService.clearHtmlSelection()
            }
          "
          id="pagebuilder-left-area"
          class="pbx-min-w-[3.5rem] pbx-pt-7 pbx-pb-2 pbx-ml-2 pbx-bg-myPrimaryLightGrayColor pbx-rounded-full pbx-shadow-sm"
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
                class="pbx-h-10 pbx-w-10 pbx-cursor-pointer pbx-rounded-full pbx-flex pbx-items-center pbx-border-none pbx-justify-center pbx-bg-gray-50 pbx-aspect-square hover:pbx-bg-myPrimaryLinkColor hover:pbx-text-white focus-visible:pbx-ring-0 pbx-text-black hover:pbx-text-white"
              >
                <span class="pbx-myMediumIcon material-symbols-outlined"> interests </span>
              </button>
            </div>
            <div
              @click.self="
                async () => {
                  await pageBuilderService.clearHtmlSelection()
                }
              "
            >
              <ComponentTopMenu v-if="getElement"></ComponentTopMenu>
            </div>
          </div>
        </div>

        <main
          ref="pbxToolBar"
          class="pbx-flex pbx-flex-col pbx-grow pbx-rounded-tr-2xl pbx-rounded-tl-2xl pbx-border-solid pbx-border pbx-border-gray-200 pbx-items-stretch pbx-h-[100vh] pbx-text-black"
          :class="{ 'pbx-mr-2': !getMenuRight, '': getMenuRight }"
        >
          <div
            id="pbxEditToolbar"
            class="pbx-z-30 lg:pbx-mx-20 pbx-flex pbx-gap-2 pbx-justify-center pbx-items-center pbx-rounded pbx-px-4 pbx-bg-red-200 pbx-h-0"
            style="
              box-shadow: 0 0 0 10px oklch(86.9% 0.005 56.366);
              background: oklch(86.9% 0.005 56.366);
            "
          >
            <template v-if="getElement">
              <EditGetElement></EditGetElement>
            </template>
            <template v-if="getRestoredElement">
              <button
                @click="pageBuilderService.restoreDeletedElementToDOM"
                type="button"
                class="pbx-h-10 pbx-w-10 pbx-flex-end pbx-cursor-pointer pbx-rounded-full pbx-flex pbx-items-center pbx-border-none pbx-justify-center pbx-aspect-square hover:pbx-bg-gray-100 hover:pbx-fill-white pbx-bg-gray-200 focus-visible:pbx-ring-0"
              >
                <span class="material-symbols-outlined"> undo </span>
              </button>
            </template>
          </div>
          <!-- Element Popover toolbar end -->

          <div id="pagebuilder" class="pbx-text-black pbx-font-sans">
            <template v-for="component in getComponents" :key="component.id">
              <section
                v-if="component.html_code"
                v-html="component.html_code"
                @mouseup="handleSelectComponent(component)"
              ></section>
            </template>
          </div>
        </main>

        <div
          v-if="!getMenuRight"
          @click.self="
            async () => {
              await pageBuilderService.clearHtmlSelection()
            }
          "
          class="pbx-min-w-[3rem] pbx-pt-6 pbx-pb-2"
        >
          <div
            @click.self="
              async () => {
                await pageBuilderService.clearHtmlSelection()
              }
            "
            class="pbx-flex pbx-flex-col pbx-items-center pbx-justify-center pbx-gap-2"
          >
            <button
              v-if="!getMenuRight"
              @click="pageBuilderStateStore.setMenuRight(true)"
              type="button"
              class="pbx-mySecondaryButton"
            >
              <span class="material-symbols-outlined"> view_sidebar </span>
              <span> Tools </span>
            </button>
          </div>
        </div>

        <aside
          aria-label="Menu"
          id="pagebuilder-right-area"
          :class="{
            'pbx-w-0 pbx-mr-0': !getMenuRight,
            'pbx-w-80 pbx-mr-2 pbx-bg-myPrimaryLightGrayColor pbx-items-stretch': getMenuRight,
          }"
          class="pbx-duration-100 pbx-z-20 pbx-flex-shrink-0 pbx-overflow-hidden pbx-shadow-sm pbx-rounded-l-2xl pbx-h-[100vh]"
        >
          <RightSidebarEditor @closeEditor="pageBuilderStateStore.setMenuRight(false)">
          </RightSidebarEditor>
        </aside>
      </div>

      <div
        class="pbx-flex pbx-items-center pbx-justify-center pbx-p-4 pbx-border-0 pbx-border-t pbx-border-t-gray-200 pbx-border-solid lg:pbx-mx-10"
      >
        <div
          @click="
            () => {
              pageBuilderStateStore.setComponentArrayAddMethod('push')
              handleAddComponent()
            }
          "
          class="pbx-flex pbx-items-center pbx-justify-center pbx-gap-2 pbx-cursor-pointer"
        >
          <span class="lg:pbx-block pbx-hidden">
            <div class="pbx-whitespace-nowrap">Add to the bottom</div>
          </span>
          <div class="pbx-flex pbx-gap-2 pbx-items-center pbx-justify-center">
            <button
              type="button"
              class="pbx-h-10 pbx-w-10 pbx-cursor-pointer pbx-rounded-full pbx-flex pbx-items-center pbx-border-none pbx-justify-center pbx-bg-gray-50 pbx-aspect-square hover:pbx-bg-myPrimaryLinkColor hover:pbx-text-white focus-visible:pbx-ring-0 pbx-text-black hover:pbx-text-white"
            >
              <span class="pbx-myMediumIcon material-symbols-outlined"> interests </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
#pagebuilder [element] {
  outline: rgba(255, 255, 255, 0) dashed 4px !important;
  outline-offset: -2px !important;
}
#pagebuilder [hovered] {
  outline: rgb(0, 140, 14, 1) dashed 4px !important;
  outline-offset: -2px !important;
}

#pagebuilder [selected] {
  position: relative;

  outline: rgb(185, 16, 16) dashed 4px !important;
  outline-offset: -2px !important;
}

#pagebuilder a {
  cursor: default;
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
