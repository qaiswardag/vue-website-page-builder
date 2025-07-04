import type {
  BuilderResourceData,
  ComponentObject,
  ImageObject,
  PageBuilderConfig,
  PageSettings,
  StartBuilderResult,
} from '../types'
import type { usePageBuilderStateStore } from '../stores/page-builder-state'
import { initAppPromise } from '@/composables/initAppTracker'

import tailwindFontSizes from '../utils/builder/tailwind-font-sizes'
import tailwindColors from '../utils/builder/tailwaind-colors'
import tailwindOpacities from '../utils/builder/tailwind-opacities'
import tailwindFontStyles from '../utils/builder/tailwind-font-styles'
import tailwindPaddingAndMargin from '../utils/builder/tailwind-padding-margin'
import tailwindBorderRadius from '../utils/builder/tailwind-border-radius'
import tailwindBorderStyleWidthPlusColor from '../utils/builder/tailwind-border-style-width-color'
import { computed, ref, nextTick } from 'vue'
import type { ComputedRef, WritableComputedRef } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { delay } from '../composables/delay'
import { isEmptyObject } from '../helpers/isEmptyObject'
import { extractCleanHTMLFromPageBuilder } from '../composables/extractCleanHTMLFromPageBuilder'

// Define available languages as a type and an array for easy iteration and type safety
export type AvailableLanguage =
  | 'en'
  | 'zh-Hans'
  | 'fr'
  | 'ja'
  | 'ru'
  | 'es'
  | 'pt'
  | 'de'
  | 'ar'
  | 'hi'

export const AVAILABLE_LANGUAGES: AvailableLanguage[] = [
  'en',
  'zh-Hans',
  'fr',
  'ja',
  'ru',
  'es',
  'pt',
  'de',
  'ar',
  'hi',
]

export class PageBuilderService {
  // Class properties with types
  private fontSizeRegex =
    /^(sm:|md:|lg:|xl:|2xl:)?pbx-text-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl)$/

  protected pageBuilderStateStore: ReturnType<typeof usePageBuilderStateStore>
  private getLocalStorageItemName: ComputedRef<string | null>
  private getApplyImageToSelection: ComputedRef<ImageObject>
  private getHyberlinkEnable: ComputedRef<boolean>
  private getComponents: ComputedRef<ComponentObject[] | null>
  private getComponent: ComputedRef<ComponentObject | null>
  private getElement: ComputedRef<HTMLElement | null>
  private getNextSibling: ComputedRef<HTMLElement | null>
  private getParentElement: ComputedRef<HTMLElement | null>
  private getRestoredElement: ComputedRef<string | null>
  private getComponentArrayAddMethod: ComputedRef<string | null>
  private NoneListernesTags: string[]
  private hasStartedEditing: boolean = false
  // Hold data from Database or Backend for updated post
  private originalComponents: BuilderResourceData | undefined = undefined
  // Holds data to be mounted when pagebuilder is not yet present in the DOM
  private savedMountComponents: BuilderResourceData | null = null
  private pendingMountComponents: BuilderResourceData | null = null
  private isPageBuilderMissingOnStart: boolean = false

  constructor(pageBuilderStateStore: ReturnType<typeof usePageBuilderStateStore>) {
    this.hasStartedEditing = false
    this.pageBuilderStateStore = pageBuilderStateStore
    this.getApplyImageToSelection = computed(
      () => this.pageBuilderStateStore.getApplyImageToSelection,
    )
    this.getLocalStorageItemName = computed(
      () => this.pageBuilderStateStore.getLocalStorageItemName,
    )
    this.getHyberlinkEnable = computed(() => this.pageBuilderStateStore.getHyberlinkEnable)
    this.getComponents = computed(() => this.pageBuilderStateStore.getComponents)

    this.getComponent = computed(() => this.pageBuilderStateStore.getComponent)

    this.getElement = computed(() => this.pageBuilderStateStore.getElement)
    this.getNextSibling = computed(() => this.pageBuilderStateStore.getNextSibling)
    this.getParentElement = computed(() => this.pageBuilderStateStore.getParentElement)
    this.getRestoredElement = computed(() => this.pageBuilderStateStore.getRestoredElement)

    this.getComponentArrayAddMethod = computed(
      () => this.pageBuilderStateStore.getComponentArrayAddMethod,
    )

    this.NoneListernesTags = [
      'P',
      'H1',
      'H2',
      'H3',
      'H4',
      'H5',
      'H6',
      'IFRAME',
      'UL',
      'OL',
      'LI',
      'EM',
      'STRONG',
      'B',
      'A',
      'SPAN',
      'BLOCKQUOTE',
      'BR',
      'PRE',
      'CODE',
      'MARK',
      'DEL',
      'INS',
      'U',
      'FIGURE',
      'FIGCAPTION',
    ]
  }

  public availableLanguage(): AvailableLanguage[] {
    return AVAILABLE_LANGUAGES
  }
  // Deselect any selected or hovered elements in the builder UI
  async clearHtmlSelection(): Promise<void> {
    this.pageBuilderStateStore.setComponent(null)
    this.pageBuilderStateStore.setElement(null)
    await this.removeHoveredAndSelected()
  }

  private ensureUpdateOrCreateConfig(config: PageBuilderConfig): void {
    // Case A: updateOrCreate is missing or an empty object
    if (!config.updateOrCreate || (config.updateOrCreate && isEmptyObject(config.updateOrCreate))) {
      const updatedConfig = {
        ...config,
        updateOrCreate: {
          formType: 'create',
          formName: 'post',
        },
      } as const

      this.pageBuilderStateStore.setPageBuilderConfig(updatedConfig)
      return
    }

    // Case B: formType is valid ('create' or 'update'), but formName is missing or an empty string
    if (
      (config.updateOrCreate &&
        typeof config.updateOrCreate.formType === 'string' &&
        (config.updateOrCreate.formType === 'create' ||
          config.updateOrCreate.formType === 'update') &&
        typeof config.updateOrCreate.formName !== 'string') ||
      (typeof config.updateOrCreate.formName === 'string' &&
        config.updateOrCreate.formName.length === 0)
    ) {
      const updatedConfig = {
        ...config,
        updateOrCreate: {
          formType: config.updateOrCreate.formType,
          formName: 'post',
        },
      } as const
      this.pageBuilderStateStore.setPageBuilderConfig(updatedConfig)
    }

    // Case C: formType is missing or not a valid string like ('create' or 'update') but formName is valid string
    if (
      (config.updateOrCreate && typeof config.updateOrCreate.formType !== 'string') ||
      (typeof config.updateOrCreate.formType === 'string' &&
        config.updateOrCreate.formType !== 'create' &&
        config.updateOrCreate.formType !== 'update' &&
        typeof config.updateOrCreate.formName === 'string' &&
        config.updateOrCreate.formName.length !== 0)
    ) {
      const updatedConfig = {
        ...config,
        updateOrCreate: {
          formType: 'create',
          formName: config.updateOrCreate.formName,
        },
      } as const

      this.pageBuilderStateStore.setPageBuilderConfig(updatedConfig)
      return
    }

    // Case D: formType exists but is not 'create' or 'update', and formName is missing or invalid
    if (
      config.updateOrCreate &&
      typeof config.updateOrCreate.formType === 'string' &&
      config.updateOrCreate.formType !== 'create' &&
      config.updateOrCreate.formType !== 'update' &&
      typeof config.formName !== 'string'
    ) {
      const updatedConfig = {
        ...config,
        updateOrCreate: {
          formType: 'create',
          formName: 'post',
        },
      } as const

      this.pageBuilderStateStore.setPageBuilderConfig(updatedConfig)
    }
  }

  private validateUserProvidedComponents(components: unknown) {
    const formType =
      this.pageBuilderStateStore.getPageBuilderConfig &&
      this.pageBuilderStateStore.getPageBuilderConfig.updateOrCreate &&
      this.pageBuilderStateStore.getPageBuilderConfig.updateOrCreate.formType

    if (
      Array.isArray(components) &&
      components.length >= 1 &&
      formType === 'create' &&
      components
    ) {
      return {
        error: true as const,
        warning:
          'You cannot set formType to create in your configuration while also passing a components data array to the Page Builder. Please set formType to update.',
        status: 'validation_failed',
      }
    }

    // Must be an array
    if (!Array.isArray(components)) {
      return {
        error: true as const,
        reason: 'Components data must be an array.',
      }
    }

    // Check that the first item looks like a component
    const first = components[0]

    if (first && 'html_code' in first && typeof first.html_code !== 'string') {
      return {
        error: true as const,
        reason: "The 'html_code' property in the first object must be a string.",
      }
    }

    // Check that the first item has an 'html_code' key
    if (Array.isArray(components) && components.length >= 1) {
      if (!first || !('html_code' in first)) {
        return {
          error: true as const,
          reason: "The first object in the array must include an 'html_code' key.",
        }
      }
    }

    // No errors found
    return
  }

  private ensureLanguage(config: PageBuilderConfig): void {
    // Set default language config if missing, empty, or language missing/empty
    const defaultLang = 'en'
    const defaultEnable = ['en', 'zh-Hans', 'fr', 'ja', 'ru', 'es', 'pt', 'de', 'ar', 'hi'] as const

    let needsDefault = false
    const userSettings = config.userSettings
    const language = userSettings && userSettings.language

    if (!userSettings || isEmptyObject(userSettings)) {
      needsDefault = true
    } else if (!language || isEmptyObject(language)) {
      needsDefault = true
    }

    if (needsDefault) {
      const updatedLanguage = {
        ...config,
        userSettings: {
          ...userSettings,
          language: {
            default: defaultLang,
            enable: defaultEnable as typeof defaultEnable,
          },
        },
      } as const
      this.pageBuilderStateStore.setPageBuilderConfig(updatedLanguage)
      return
    }

    // Ensure default is in enable array
    if (language && Array.isArray(language.enable) && language.default) {
      if (!language.enable.includes(language.default)) {
        const updatedEnable = [...language.enable, language.default]
        const updatedLanguage = {
          ...config,
          userSettings: {
            ...userSettings,
            language: {
              ...language,
              enable: updatedEnable,
            },
          },
        } as const
        this.pageBuilderStateStore.setPageBuilderConfig(updatedLanguage)
      }
    }
  }

  private validateConfig(config: PageBuilderConfig): void {
    const defaultConfigValues = {
      updateOrCreate: {
        formType: 'create',
        formName: 'post',
      },
    } as const

    // Set config for page builder if not set by user
    if (!config || (config && Object.keys(config).length === 0 && config.constructor === Object)) {
      this.pageBuilderStateStore.setPageBuilderConfig(defaultConfigValues)
    }

    if (config && Object.keys(config).length !== 0 && config.constructor === Object) {
      this.ensureUpdateOrCreateConfig(config)
    }

    this.ensureLanguage(config)
  }

  public saveBuilderConfigToLocalStorage(specificConfig: PageBuilderConfig) {
    // Only save userSettings to localStorage
    if (specificConfig && specificConfig.userSettings) {
      localStorage.setItem(
        'pageBuilderConfig',
        JSON.stringify({ userSettings: specificConfig.userSettings }),
      )
    }
  }

  /**
   * - Entry point for initializing the Page Builder.
   * - Sets the builder as started in the state store.
   * - Shows a global loading indicator.
   * - Stores and validates the provided configuration.
   * - Updates the localStorage key name based on the config/resource.
   * - Completes builder initialization if the DOM is ready.
   *
   * @param config - The configuration object for the Page Builder.
   */
  async startBuilder(
    config: PageBuilderConfig,
    passedComponentsArray?: BuilderResourceData,
  ): Promise<StartBuilderResult> {
    console.log('SERVICE RUNNING...:')
    await initAppPromise
    // Reactive flag signals to the UI that the builder has been successfully initialized
    // Prevents builder actions to prevent errors caused by missing DOM .
    this.pageBuilderStateStore.setBuilderStarted(true)
    const pagebuilder = document.querySelector('#pagebuilder')

    let validation
    try {
      this.originalComponents = passedComponentsArray
      this.pageBuilderStateStore.setPageBuilderConfig(config)
      // Validate and normalize the config (ensure required fields are present)
      this.validateConfig(config)

      validation = this.validateUserProvidedComponents(passedComponentsArray)

      // Update the localStorage key name based on the config/resource
      this.updateLocalStorageItemName()

      if (passedComponentsArray) {
        this.savedMountComponents = passedComponentsArray
      }
      // Page Builder is not Present in the DOM but Components have been passed to the Builder
      if (!pagebuilder) {
        this.isPageBuilderMissingOnStart = true
      }
      if (passedComponentsArray && !pagebuilder) {
        this.pendingMountComponents = passedComponentsArray
      }
      // Page Builder is Present in the DOM & Components have been passed to the Builder
      if (pagebuilder) {
        this.completeBuilderInitialization(passedComponentsArray)
      }

      // result to end user
      const result: StartBuilderResult = {
        message: 'Page builder started successfully.',
      }

      if (validation) {
        result.validation = validation
      }

      // PassedComponentsArray
      if (Array.isArray(passedComponentsArray) && passedComponentsArray.length >= 0) {
        result.passedComponentsArray = passedComponentsArray
      }

      // Return messages, validation info if present etc.
      return result
    } catch (err) {
      console.error('Not able to start the Page Builder', err)
      return {
        error: true as const,
        reason: 'Failed to start the Page Builder due to an unexpected error.',
      }
    }
  }

  async completeBuilderInitialization(
    passedComponentsArray?: BuilderResourceData,
    internalPageBuilderCall?: boolean,
  ): Promise<void> {
    this.pageBuilderStateStore.setIsLoadingGlobal(true)
    await delay(400)

    // Always clear DOM and store before mounting new resource
    this.deleteAllComponentsFromDOM()

    const config = this.pageBuilderStateStore.getPageBuilderConfig
    const formType = config && config.updateOrCreate && config.updateOrCreate.formType

    const localStorageData = this.getSavedPageHtml()

    // Deselect any selected or hovered elements in the builder UI
    await this.clearHtmlSelection()

    if (formType === 'update' || formType === 'create') {
      if (!this.pendingMountComponents) {
        // Page Builder Is initially present in DOM
        if (!passedComponentsArray && this.isPageBuilderMissingOnStart && localStorageData) {
          console.log('1111:', internalPageBuilderCall)
          await this.completeMountProcess(localStorageData)
          return
        }
        if (passedComponentsArray && !localStorageData) {
          console.log('2222:', internalPageBuilderCall)
          await this.completeMountProcess(JSON.stringify(passedComponentsArray), true)
          this.saveDomComponentsToLocalStorage()
          return
        }

        if (passedComponentsArray && localStorageData) {
          console.log('3333:', internalPageBuilderCall)
          this.pageBuilderStateStore.setHasLocalDraftForUpdate(true)
          await this.completeMountProcess(JSON.stringify(passedComponentsArray), true)
          return
        }
        if (!passedComponentsArray && localStorageData && !this.savedMountComponents) {
          console.log('4444:', internalPageBuilderCall)
          await this.completeMountProcess(localStorageData)
          return
        }
        if (!passedComponentsArray && this.savedMountComponents && localStorageData) {
          console.log('5555:', internalPageBuilderCall)
          await this.completeMountProcess(JSON.stringify(this.savedMountComponents))
          return
        }

        if (!passedComponentsArray && !localStorageData && this.isPageBuilderMissingOnStart) {
          console.log('6666:', internalPageBuilderCall)
          await this.completeMountProcess(JSON.stringify([]))
          return
        }

        if (!this.isPageBuilderMissingOnStart && !localStorageData && !passedComponentsArray) {
          console.log('7777:', internalPageBuilderCall)
          await this.completeMountProcess(JSON.stringify([]))
          return
        }
      }

      // FOCUS ON: pendingMountComponents
      if (this.pendingMountComponents) {
        // No Page Builder Is  present in DOM initially
        if (localStorageData && this.isPageBuilderMissingOnStart) {
          console.log('8888:', internalPageBuilderCall)
          await this.completeMountProcess(JSON.stringify(this.pendingMountComponents), true)
          await delay(3000)
          this.pageBuilderStateStore.setHasLocalDraftForUpdate(true)
          this.pendingMountComponents = null
          return
        }
        if (!localStorageData && passedComponentsArray && this.isPageBuilderMissingOnStart) {
          console.log('9999:', internalPageBuilderCall)
          await this.completeMountProcess(JSON.stringify(this.pendingMountComponents), true)
          this.saveDomComponentsToLocalStorage()
          return
        }

        if (!passedComponentsArray && !localStorageData && this.isPageBuilderMissingOnStart) {
          console.log('XXXX:', internalPageBuilderCall)
          await this.completeMountProcess(JSON.stringify(this.pendingMountComponents), true)
          this.saveDomComponentsToLocalStorage()
          return
        }
      }
    }
    //
  }

  private async completeMountProcess(html: string, usePassedPageSettings?: boolean) {
    await this.mountComponentsToDOM(html, usePassedPageSettings)

    // Clean up any old localStorage items related to previous builder sessions
    this.deleteOldPageBuilderLocalStorage()

    this.pageBuilderStateStore.setIsRestoring(false)
    this.pageBuilderStateStore.setIsLoadingGlobal(false)

    // Wait for Vue to finish DOM updates before attaching event listeners. This ensure elements exist in the DOM.
    await nextTick()
    // Attach event listeners to all editable elements in the Builder
    await this.addListenersToEditableElements()
  }

  private applyElementClassChanges(
    cssUserSelection: string | undefined,
    CSSArray: string[],
    mutationName: string,
  ): string | undefined {
    const currentHTMLElement = this.getElement.value

    if (!currentHTMLElement) return

    const currentCSS = CSSArray.find((CSS) => {
      return currentHTMLElement.classList.contains(CSS)
    })

    // set to 'none' if undefined
    let elementClass = currentCSS || 'none'

    // If cssUserSelection is undefined, just set the current state and return
    if (cssUserSelection === undefined) {
      if (typeof mutationName === 'string' && mutationName.length > 2) {
        ;(this.pageBuilderStateStore as any)[mutationName](elementClass)
      }
      return currentCSS
    }

    // cssUserSelection examples: bg-zinc-200, px-10, rounded-full etc.
    if (typeof cssUserSelection === 'string' && cssUserSelection !== 'none') {
      if (elementClass && currentHTMLElement.classList.contains(elementClass)) {
        currentHTMLElement.classList.remove(elementClass)
      }

      currentHTMLElement.classList.add(cssUserSelection)
      elementClass = cssUserSelection
    } else if (
      typeof cssUserSelection === 'string' &&
      cssUserSelection === 'none' &&
      elementClass
    ) {
      currentHTMLElement.classList.remove(elementClass)
      elementClass = cssUserSelection
    }

    // Only call store mutations after all DOM manipulation is complete
    if (typeof mutationName === 'string' && mutationName.length > 2) {
      ;(this.pageBuilderStateStore as any)[mutationName](elementClass)
      this.pageBuilderStateStore.setElement(currentHTMLElement)
    }

    return currentCSS
  }

  public async clearClassesFromPage() {
    const pagebuilder = document.querySelector('#pagebuilder')
    if (!pagebuilder) return

    pagebuilder.removeAttribute('class')

    this.initializeElementStyles()
    await nextTick()
  }
  public async clearInlineStylesFromPagee() {
    const pagebuilder = document.querySelector('#pagebuilder')
    if (!pagebuilder) return

    pagebuilder.removeAttribute('style')

    this.initializeElementStyles()
    await nextTick()
  }

  public async globalPageStyles() {
    const pagebuilder = document.querySelector('#pagebuilder')
    if (!pagebuilder) return

    // Deselect any selected or hovered elements in the builder UI
    await this.clearHtmlSelection()
    //
    // Set the element in the store
    this.pageBuilderStateStore.setElement(pagebuilder as HTMLElement)

    // Add the data attribute for styling
    pagebuilder.setAttribute('data-global-selected', 'true')

    await nextTick()
  }

  public handleFontWeight(userSelectedFontWeight?: string): void {
    this.applyElementClassChanges(
      userSelectedFontWeight,
      tailwindFontStyles.fontWeight,
      'setFontWeight',
    )
  }

  public handleFontSizeBase(userSelectedFontSize?: string): void {
    this.applyElementClassChanges(userSelectedFontSize, tailwindFontSizes.fontBase, 'setFontBase')
  }

  public handleFontSizeDesktop(userSelectedFontSize?: string): void {
    const currentHTMLElement = this.getElement.value
    if (!currentHTMLElement) return

    // Hardcoded mapping: selected => base
    const fontSizeBaseMap: Record<string, string> = {
      'pbx-text-9xl': 'pbx-text-6xl',
      'pbx-text-8xl': 'pbx-text-5xl',
      'pbx-text-7xl': 'pbx-text-4xl',
      'pbx-text-6xl': 'pbx-text-3xl',
      'pbx-text-5xl': 'pbx-text-3xl',
      'pbx-text-4xl': 'pbx-text-2xl',
      'pbx-text-3xl': 'pbx-text-1xl',
      'pbx-text-2xl': 'pbx-text-lg',
      'pbx-text-xl': 'pbx-text-base',
      'pbx-text-lg': 'pbx-text-sm',
      'pbx-text-base': 'pbx-text-xs',
      'pbx-text-sm': 'pbx-text-xs',
      'pbx-text-xs': 'pbx-text-xs',
    }

    if (userSelectedFontSize) {
      // Remove all existing font size classes first
      Array.from(currentHTMLElement.classList).forEach((cls) => {
        if (this.fontSizeRegex.test(cls)) {
          currentHTMLElement.classList.remove(cls)
        }
      })

      // Extract the font size class (remove 'lg:' if present)
      const fontSizeClass = userSelectedFontSize.replace(/^lg:/, '')

      const baseClass = fontSizeBaseMap[fontSizeClass] || fontSizeClass
      const lgClass = `lg:${fontSizeClass}`

      if (baseClass !== fontSizeClass) {
        currentHTMLElement.classList.add(baseClass, lgClass)
      } else {
        currentHTMLElement.classList.add(baseClass)
      }
    }

    const currentCSS = tailwindFontSizes.fontDesktop.find((CSS) => {
      return currentHTMLElement.classList.contains(CSS)
    })

    if (!userSelectedFontSize) {
      this.pageBuilderStateStore.setFontDesktop('none')
    }

    if (currentCSS && !userSelectedFontSize) {
      this.pageBuilderStateStore.setFontDesktop(currentCSS)
    }
  }

  private applyHelperCSSToElements(element: HTMLElement): void {
    this.wrapElementInDivIfExcluded(element)

    // If this is a DIV and its only/main child is a heading, apply font size classes to the DIV
    if (
      element.tagName === 'DIV' &&
      element.children.length === 1 &&
      ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'].includes(element.children[0].tagName)
    ) {
      const heading = element.children[0] as HTMLElement

      element.classList.forEach((cls) => {
        if (this.fontSizeRegex.test(cls)) {
          element.classList.remove(cls)
        }
      })

      // Apply responsive font size classes based on heading type
      if (heading.tagName === 'H2') {
        element.classList.add('pbx-text-2xl', 'lg:pbx-text-4xl')
      }
      if (heading.tagName === 'H3') {
        element.classList.add('pbx-text-1xl', 'lg:pbx-text-3xl')
      }
    }
  }

  public async toggleTipTapModal(status: boolean): Promise<void> {
    this.pageBuilderStateStore.setShowModalTipTap(status)

    // Wait for Vue to finish DOM updates before attaching event listeners. This ensure elements exist in the DOM.
    await nextTick()
    // Attach event listeners to all editable elements in the Builder
    await this.addListenersToEditableElements()

    if (!status) {
      await this.handleAutoSave()
    }
  }

  private wrapElementInDivIfExcluded(element: HTMLElement): void {
    if (!element) return

    if (
      this.NoneListernesTags.includes(element.tagName) &&
      ((element.previousElementSibling && element.previousElementSibling.tagName === 'IMG') ||
        (element.nextElementSibling && element.nextElementSibling.tagName === 'IMG'))
    ) {
      const divWrapper = document.createElement('div')
      element.parentNode?.insertBefore(divWrapper, element)
      divWrapper.appendChild(element)
    }
  }

  private handleElementClick = async (e: Event, element: HTMLElement): Promise<void> => {
    e.preventDefault()
    e.stopPropagation()

    await this.handleAutoSave()

    const pagebuilder = document.querySelector('#pagebuilder')

    if (!pagebuilder) return

    this.pageBuilderStateStore.setMenuRight(true)

    const selectedElement = pagebuilder.querySelector('[selected]')
    if (selectedElement) {
      selectedElement.removeAttribute('selected')
    }

    element.removeAttribute('hovered')

    element.setAttribute('selected', '')

    this.pageBuilderStateStore.setElement(element)
  }

  private handleMouseOver = (e: Event, element: HTMLElement): void => {
    e.preventDefault()
    e.stopPropagation()

    const pagebuilder = document.querySelector('#pagebuilder')

    if (!pagebuilder) return

    const hoveredElement = pagebuilder.querySelector('[hovered]')
    if (hoveredElement) {
      hoveredElement.removeAttribute('hovered')
    }

    if (!element.hasAttribute('selected')) {
      element.setAttribute('hovered', '')
    }
  }

  private handleMouseLeave = (e: Event): void => {
    e.preventDefault()
    e.stopPropagation()

    const pagebuilder = document.querySelector('#pagebuilder')
    if (!pagebuilder) return

    const hoveredElement = pagebuilder.querySelector('[hovered]')
    if (hoveredElement) {
      hoveredElement.removeAttribute('hovered')
    }
  }

  public isEditableElement(el: Element | null): boolean {
    if (!el) return false
    return !this.NoneListernesTags.includes(el.tagName)
  }

  /**
   * The function is used to
   * attach event listeners to each element within a 'section'
   */
  private addListenersToEditableElements = async () => {
    const elementsWithListeners = new WeakSet<Element>()

    const pagebuilder = document.querySelector('#pagebuilder')
    if (!pagebuilder) return

    // Wait for Vue to finish DOM updates before attaching event listeners. This ensure elements exist in the DOM.
    await nextTick()

    pagebuilder.querySelectorAll('section *').forEach((element) => {
      // exclude NoneListernesTags && additional Tags for not listening
      if (this.isEditableElement(element)) {
        if (elementsWithListeners && !elementsWithListeners.has(element)) {
          elementsWithListeners.add(element)
          // Type assertion to HTMLElement since we know these are DOM elements
          const htmlElement = element as HTMLElement
          // Attach event listeners directly to individual elements
          htmlElement.addEventListener('click', (e) => this.handleElementClick(e, htmlElement))
          htmlElement.addEventListener('mouseover', (e) => this.handleMouseOver(e, htmlElement))
          htmlElement.addEventListener('mouseleave', (e) => this.handleMouseLeave(e))
        }
      }

      // end for each iterating over elements
    })
  }

  public handleAutoSave = async () => {
    this.startEditing()
    const passedConfig = this.pageBuilderStateStore.getPageBuilderConfig

    // Check if config is set
    if (passedConfig && passedConfig.userSettings) {
      //
      // Enabled auto save
      if (
        typeof passedConfig.userSettings.autoSave === 'boolean' &&
        passedConfig.userSettings.autoSave !== false
      ) {
        if (this.pageBuilderStateStore.getIsSaving) return

        try {
          this.pageBuilderStateStore.setIsSaving(true)
          // Deselect any selected or hovered elements in the builder UI
          //
          this.saveDomComponentsToLocalStorage()
          await delay(400)
        } catch (err) {
          console.error('Error trying auto save.', err)
        } finally {
          this.pageBuilderStateStore.setIsSaving(false)
        }
      }
    }
    if (passedConfig && !passedConfig.userSettings) {
      try {
        this.pageBuilderStateStore.setIsSaving(true)
        this.saveDomComponentsToLocalStorage()
        await delay(400)
      } catch (err) {
        console.error('Error trying saving.', err)
      } finally {
        this.pageBuilderStateStore.setIsSaving(false)
      }
    }
  }

  public handleManualSave = async () => {
    this.startEditing()

    this.pageBuilderStateStore.setIsSaving(true)
    this.saveDomComponentsToLocalStorage()
    await delay(400)
    this.pageBuilderStateStore.setIsSaving(false)
  }

  public cloneCompObjForDOMInsertion(componentObject: ComponentObject): ComponentObject {
    // Deep clone clone component
    const clonedComponent = { ...componentObject }

    const pageBuilder = document.querySelector('#pagebuilder')
    //  scoll to top or bottom
    if (pageBuilder) {
      // push to top
      if (this.getComponentArrayAddMethod.value === 'unshift') {
        pageBuilder.scrollTo({
          top: 0,
          behavior: 'smooth',
        })
      }
    }

    // Create a DOMParser instance
    const parser = new DOMParser()

    // Parse the HTML content of the clonedComponent using the DOMParser
    const doc = parser.parseFromString(clonedComponent.html_code || '', 'text/html')

    // Selects all elements within the HTML document, including elements like:
    const elements = doc.querySelectorAll('*')

    elements.forEach((element) => {
      this.applyHelperCSSToElements(element as HTMLElement)
    })

    // Add the component id to the section element
    const section = doc.querySelector('section')
    if (section) {
      // Prefix all classes inside the section
      section.querySelectorAll('[class]').forEach((el) => {
        el.setAttribute(
          'class',
          this.addTailwindPrefixToClasses(el.getAttribute('class') || '', 'pbx-'),
        )
      })

      // Generate a unique ID using uuidv4() and assign it to the section
      section.dataset.componentid = uuidv4()

      // Set the title attribute if present
      if (clonedComponent.title) {
        section.setAttribute('title', clonedComponent.title)
        section.setAttribute('data-component-title', clonedComponent.title)
      }

      // Update the clonedComponent id with the newly generated unique ID
      clonedComponent.id = section.dataset.componentid

      // Update the HTML content of the clonedComponent with the modified HTML
      clonedComponent.html_code = section.outerHTML
    }

    // return to the cloned element to be dropped
    return clonedComponent
  }

  private async removeHoveredAndSelected() {
    const pagebuilder = document.querySelector('#pagebuilder')
    if (!pagebuilder) return

    const hoveredElement = pagebuilder.querySelector('[hovered]')
    if (hoveredElement) {
      hoveredElement.removeAttribute('hovered')
    }

    const selectedElement = pagebuilder.querySelector('[selected]')

    if (selectedElement) {
      selectedElement.removeAttribute('selected')
    }
  }

  private async syncCurrentClasses() {
    // convert classList to array
    const classListArray = Array.from(this.getElement.value?.classList || [])

    // commit array to store
    this.pageBuilderStateStore.setCurrentClasses(classListArray)
  }

  private async syncCurrentStyles() {
    const style = this.getElement.value?.getAttribute('style')
    if (style) {
      const stylesObject = this.parseStyleString(style)
      this.pageBuilderStateStore.setCurrentStyles(stylesObject)
    } else {
      this.pageBuilderStateStore.setCurrentStyles({})
    }
  }

  public handleAddClasses(userSelectedClass: string): void {
    if (
      typeof userSelectedClass === 'string' &&
      userSelectedClass.trim() !== '' &&
      !userSelectedClass.includes(' ') &&
      // Check if class (with prefix) already exists
      !this.getElement.value?.classList.contains('pbx-' + userSelectedClass.trim())
    ) {
      const cleanedClass = userSelectedClass.trim()

      // Add prefix if missing
      const prefixedClass = cleanedClass.startsWith('pbx-') ? cleanedClass : 'pbx-' + cleanedClass

      this.getElement.value?.classList.add(prefixedClass)

      this.pageBuilderStateStore.setElement(this.getElement.value)
      this.pageBuilderStateStore.setClass(prefixedClass)
    }
  }

  public handleAddStyle(property: string, value: string): void {
    const element = this.getElement.value
    if (!element || !property || !value) return

    element.style.setProperty(property, value)
    this.pageBuilderStateStore.setElement(element)
  }

  public handleRemoveStyle(property: string): void {
    const element = this.getElement.value
    if (!element || !property) return

    element.style.removeProperty(property)
    this.pageBuilderStateStore.setElement(element)
  }

  public handleFontFamily(userSelectedFontFamily?: string): void {
    this.applyElementClassChanges(
      userSelectedFontFamily,
      tailwindFontStyles.fontFamily,
      'setFontFamily',
    )
  }
  public handleFontStyle(userSelectedFontStyle?: string): void {
    this.applyElementClassChanges(
      userSelectedFontStyle,
      tailwindFontStyles.fontStyle,
      'setFontStyle',
    )
  }
  public handleVerticalPadding(userSelectedVerticalPadding?: string): void {
    this.applyElementClassChanges(
      userSelectedVerticalPadding,
      tailwindPaddingAndMargin.verticalPadding,
      'setFontVerticalPadding',
    )
  }
  public handleHorizontalPadding(userSelectedHorizontalPadding?: string): void {
    this.applyElementClassChanges(
      userSelectedHorizontalPadding,
      tailwindPaddingAndMargin.horizontalPadding,
      'setFontHorizontalPadding',
    )
  }

  public handleVerticalMargin(userSelectedVerticalMargin?: string): void {
    this.applyElementClassChanges(
      userSelectedVerticalMargin,
      tailwindPaddingAndMargin.verticalMargin,
      'setFontVerticalMargin',
    )
  }
  public handleHorizontalMargin(userSelectedHorizontalMargin?: string): void {
    this.applyElementClassChanges(
      userSelectedHorizontalMargin,
      tailwindPaddingAndMargin.horizontalMargin,
      'setFontHorizontalMargin',
    )
  }

  public handleBorderStyle(borderStyle?: string): void {
    this.applyElementClassChanges(
      borderStyle,
      tailwindBorderStyleWidthPlusColor.borderStyle,
      'setBorderStyle',
    )
  }
  public handleBorderWidth(borderWidth?: string): void {
    this.applyElementClassChanges(
      borderWidth,
      tailwindBorderStyleWidthPlusColor.borderWidth,
      'setBorderWidth',
    )
  }
  public handleBorderColor(borderColor?: string): void {
    this.applyElementClassChanges(
      borderColor,
      tailwindBorderStyleWidthPlusColor.borderColor,
      'setBorderColor',
    )
  }
  // border color, style & width / end

  public handleBackgroundColor(color?: string): void {
    this.applyElementClassChanges(
      color,
      tailwindColors.backgroundColorVariables,
      'setBackgroundColor',
    )
  }

  public handleTextColor(color?: string): void {
    this.applyElementClassChanges(color, tailwindColors.textColorVariables, 'setTextColor')
  }

  handleBorderRadiusGlobal(borderRadiusGlobal?: string): void {
    this.applyElementClassChanges(
      borderRadiusGlobal,
      tailwindBorderRadius.roundedGlobal,
      'setBorderRadiusGlobal',
    )
  }
  handleBorderRadiusTopLeft(borderRadiusTopLeft?: string): void {
    this.applyElementClassChanges(
      borderRadiusTopLeft,
      tailwindBorderRadius.roundedTopLeft,
      'setBorderRadiusTopLeft',
    )
  }
  handleBorderRadiusTopRight(borderRadiusTopRight?: string): void {
    this.applyElementClassChanges(
      borderRadiusTopRight,
      tailwindBorderRadius.roundedTopRight,
      'setBorderRadiusTopRight',
    )
  }
  handleBorderRadiusBottomleft(borderRadiusBottomleft?: string): void {
    this.applyElementClassChanges(
      borderRadiusBottomleft,
      tailwindBorderRadius.roundedBottomLeft,
      'setBorderRadiusBottomleft',
    )
  }
  handleBorderRadiusBottomRight(borderRadiusBottomRight?: string): void {
    this.applyElementClassChanges(
      borderRadiusBottomRight,
      tailwindBorderRadius.roundedBottomRight,
      'setBorderRadiusBottomRight',
    )
  }
  // border radius / end

  handleFontSizeTablet(userSelectedFontSize?: string): void {
    this.applyElementClassChanges(
      userSelectedFontSize,
      tailwindFontSizes.fontTablet,
      'setFontTablet',
    )
  }
  handleFontSizeMobile(userSelectedFontSize?: string): void {
    this.applyElementClassChanges(
      userSelectedFontSize,
      tailwindFontSizes.fontMobile,
      'setFontMobile',
    )
  }

  handleBackgroundOpacity(opacity?: string): void {
    this.applyElementClassChanges(
      opacity,
      tailwindOpacities.backgroundOpacities,
      'setBackgroundOpacity',
    )
  }
  handleOpacity(opacity?: string): void {
    this.applyElementClassChanges(opacity, tailwindOpacities.opacities, 'setOpacity')
  }

  /**
   * Removes all components from both the builder state and the DOM.
   *
   * - First clears the components array in the store.
   * - Then, as a defensive measure, also manually removes all sections elements from the DOM.
   *
   * This manual DOM clearing is only optional
   *
   */

  private deleteAllComponentsFromDOM() {
    // Clear the store
    this.pageBuilderStateStore.setComponents([])

    // Also clear the DOM
    const pagebuilder = document.querySelector('#pagebuilder')
    if (pagebuilder) {
      // Remove all section elements (assuming each component is a <section>)
      pagebuilder
        .querySelectorAll('section[data-componentid]')
        .forEach((section) => section.remove())
    }
  }

  public async deleteComponentFromDOM() {
    this.syncDomToStoreOnly()
    await nextTick()

    const components = this.getComponents.value

    if (!components) return

    // Find the index of the component to delete
    const indexToDelete = components.findIndex(
      (component) => component.id === this.getComponent.value?.id,
    )

    if (indexToDelete === -1) {
      // Component not found in the array, handle this case as needed.
      return
    }

    // Create a new array without the deleted component (avoid mutating original array)
    const newComponents = [
      ...components.slice(0, indexToDelete),
      ...components.slice(indexToDelete + 1),
    ]

    this.pageBuilderStateStore.setComponents(newComponents)

    // Remove the section from the DOM as well
    const pagebuilder = document.querySelector('#pagebuilder')
    if (pagebuilder && this.getComponent.value?.id) {
      const section = pagebuilder.querySelector(
        `section[data-componentid="${this.getComponent.value.id}"]`,
      )
      if (section) section.remove()
    }

    // Wait for Vue to finish DOM updates before attaching event listeners.
    await nextTick()
    await this.addListenersToEditableElements()

    this.pageBuilderStateStore.setComponent(null)
    this.pageBuilderStateStore.setElement(null)

    // Optional: auto-save after deletion
    await this.handleAutoSave()
  }

  public async deleteElementFromDOM() {
    const element = this.getElement.value
    if (!element) return

    // Remove 'selected' attribute before deletion
    element.removeAttribute('selected')

    if (!element.parentNode) {
      this.pageBuilderStateStore.setComponent(null)
      this.pageBuilderStateStore.setElement(null)
      return
    }

    // If the element is inside a section, but not the section itself, store info for undo/restore
    if (element.parentElement?.tagName !== 'SECTION') {
      this.pageBuilderStateStore.setParentElement(element.parentNode as HTMLElement)
      this.pageBuilderStateStore.setRestoredElement(element.outerHTML)
      this.pageBuilderStateStore.setNextSibling(element.nextSibling as HTMLElement | null)
      // Remove only the element itself from the DOM
      element.remove()
    }

    // Clear selection state
    this.pageBuilderStateStore.setComponent(null)
    this.pageBuilderStateStore.setElement(null)

    // Deselect any selected or hovered elements in the builder UI
    await this.clearHtmlSelection()
    // Wait for Vue to finish DOM updates before attaching event listeners. This ensure elements exist in the DOM.
    await nextTick()
    // Attach event listeners to all editable elements in the Builder
    await this.addListenersToEditableElements()
  }

  public async restoreDeletedElementToDOM() {
    // Restore the previously deleted element to the DOM
    const restoredHTML = this.getRestoredElement.value
    const parent = this.getParentElement.value
    const nextSibling = this.getNextSibling.value

    if (restoredHTML && parent) {
      // Create a container and parse the HTML
      const container = document.createElement('div')
      container.innerHTML = restoredHTML

      // Insert the restored element before its next sibling (or append if null)
      if (container.firstChild) {
        parent.insertBefore(container.firstChild, nextSibling)
      }
    }

    // Clear restore-related state
    this.pageBuilderStateStore.setParentElement(null)
    this.pageBuilderStateStore.setRestoredElement(null)
    this.pageBuilderStateStore.setNextSibling(null)
    this.pageBuilderStateStore.setComponent(null)
    this.pageBuilderStateStore.setElement(null)

    // Wait for Vue to finish DOM updates before attaching event listeners
    await nextTick()
    await this.addListenersToEditableElements()
  }

  public handleRemoveClasses(userSelectedClass: string): void {
    // remove selected class from element
    if (this.getElement.value?.classList.contains(userSelectedClass)) {
      this.getElement.value?.classList.remove(userSelectedClass)

      this.pageBuilderStateStore.setElement(this.getElement.value)
      this.pageBuilderStateStore.removeClass(userSelectedClass)
    }
  }

  // move component
  // runs when html components are rearranged
  public reorderComponent(direction: number): void {
    if (!this.getComponents.value || !this.getComponent.value) return

    if (this.getComponents.value.length <= 1) return

    // Get the component you want to move (replace this with your actual logic)
    const componentToMove = this.getComponent.value

    // Determine the new index where you want to move the component
    const currentIndex = this.getComponents.value.findIndex(
      (component) => component.id === componentToMove.id,
    )

    if (currentIndex === -1) {
      // Component not found in the array, handle this case as needed.
      return
    }

    const newIndex = currentIndex + direction

    // Ensure the newIndex is within bounds
    if (newIndex < 0 || newIndex >= this.getComponents.value.length) {
      return
    }

    // Move the component to the new position
    this.getComponents.value.splice(currentIndex, 1)
    this.getComponents.value.splice(newIndex, 0, componentToMove)
  }

  public ensureTextAreaHasContent = () => {
    if (!this.getElement.value) return

    // text content
    if (typeof this.getElement.value.innerHTML !== 'string') {
      return
    }
    const element = this.getElement.value
    const elementTag = element.tagName

    if (
      ['DIV'].includes(elementTag) &&
      element.tagName.toLowerCase() !== 'img' &&
      element.textContent &&
      Number(element.textContent.length) === 0
    ) {
      element.classList.add('h-6')
      element.classList.add('bg-red-50')
    } else {
      element.classList.remove('h-6')
      element.classList.remove('bg-red-50')
    }
  }

  public handleTextInput = async (textContentVueModel: string): Promise<void> => {
    if (typeof this.getElement.value?.innerHTML !== 'string') {
      return
    }

    if (typeof this.getElement.value.innerHTML === 'string') {
      await nextTick()

      // Update text content
      this.getElement.value.textContent = textContentVueModel

      this.pageBuilderStateStore.setTextAreaVueModel(this.getElement.value.innerHTML)

      this.getElement.value.innerHTML = textContentVueModel
    }

    this.ensureTextAreaHasContent()
  }

  //
  //
  public ElOrFirstChildIsIframe() {
    if (
      this.getElement.value?.tagName === 'IFRAME' ||
      this.getElement.value?.firstElementChild?.tagName === 'IFRAME'
    ) {
      return true
    } else {
      return false
    }
  }
  //
  //
  //
  public isSelectedElementValidText() {
    let reachedElseStatement = false

    // Get all child elements of the parentDiv
    const childElements = this.getElement.value?.children
    if (
      this.getElement.value?.tagName === 'IMG' ||
      this.getElement.value?.firstElementChild?.tagName === 'IFRAME'
    ) {
      return
    }
    if (!childElements) {
      return
    }

    Array.from(childElements).forEach((element) => {
      if (element?.tagName === 'IMG' || element?.tagName === 'DIV') {
        reachedElseStatement = false
      } else {
        reachedElseStatement = true
      }
    })

    return reachedElseStatement
  }

  public previewCurrentDesign() {
    this.pageBuilderStateStore.setElement(null)

    const pagebuilder = document.querySelector('#pagebuilder')
    if (!pagebuilder) return

    if (pagebuilder) {
      // Get cleaned HTML from entire builder
      const cleanedHTML = extractCleanHTMLFromPageBuilder(
        pagebuilder as HTMLElement,
        this.pageBuilderStateStore.getPageBuilderConfig
          ? this.pageBuilderStateStore.getPageBuilderConfig
          : undefined,
      )

      // Store as array with one string (as your preview expects an array)
      const previewData = JSON.stringify([cleanedHTML])

      this.pageBuilderStateStore.setCurrentLayoutPreview(previewData)
    }
  }
  // Helper function to sanitize title for localStorage key
  public sanitizeForLocalStorage(input: string): string {
    return input
      .trim() // Remove leading/trailing spaces
      .toLowerCase() // Convert to lowercase
      .replace(/\s+/g, '-') // Replace one or more spaces with single hyphen
      .replace(/[^a-z0-9-]/g, '') // Remove all non-alphanumeric characters except hyphens
      .replace(/-+/g, '-') // Replace multiple consecutive hyphens with single hyphen
      .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
  }

  /**
   * Returns a clone of the given element with [hovered] and [selected] attributes
   * removed from itself and all descendants. Does NOT mutate the live DOM.
   * @param element The HTMLElement to clone and sanitize
   */
  private cloneAndRemoveSelectionAttributes(element: HTMLElement): HTMLElement {
    // Deep clone the element
    const clone = element.cloneNode(true) as HTMLElement

    // Remove [hovered] and [selected] from the clone and all descendants
    clone.querySelectorAll('[hovered]').forEach((el) => el.removeAttribute('hovered'))
    clone.querySelectorAll('[selected]').forEach((el) => el.removeAttribute('selected'))
    // Also remove from the root element itself if present
    clone.removeAttribute('hovered')
    clone.removeAttribute('selected')

    return clone
  }

  /**
   * Syncs the current DOM state into the in-memory store (getComponents),
   * but does NOT save to localStorage.
   */
  private syncDomToStoreOnly() {
    const pagebuilder = document.querySelector('#pagebuilder')
    if (!pagebuilder) return

    const componentsToSave: { html_code: string; id: string | null; title: string }[] = []

    pagebuilder.querySelectorAll('section[data-componentid]').forEach((section) => {
      const sanitizedSection = this.cloneAndRemoveSelectionAttributes(section as HTMLElement)
      componentsToSave.push({
        html_code: sanitizedSection.outerHTML,
        id: sanitizedSection.getAttribute('data-componentid'),
        title: sanitizedSection.getAttribute('data-component-title') || 'Untitled Component',
      })
    })

    this.pageBuilderStateStore.setComponents(componentsToSave)
  }

  /**
   * Saves the current DOM state (components) to localStorage.
   */
  private saveDomComponentsToLocalStorage() {
    this.updateLocalStorageItemName()
    const pagebuilder = document.querySelector('#pagebuilder')
    if (!pagebuilder) return

    const hoveredElement = pagebuilder.querySelector('[hovered]')
    if (hoveredElement) {
      hoveredElement.removeAttribute('hovered')
    }

    const componentsToSave: { html_code: string; title: string }[] = []

    pagebuilder.querySelectorAll('section[data-componentid]').forEach((section) => {
      const sanitizedSection = this.cloneAndRemoveSelectionAttributes(section as HTMLElement)

      componentsToSave.push({
        html_code: sanitizedSection.outerHTML,
        title: sanitizedSection.getAttribute('data-component-title') || 'Untitled Component',
      })
    })

    const pageSettings = {
      classes: pagebuilder.className || '',
      style: pagebuilder.getAttribute('style') || (pagebuilder as HTMLElement).style.cssText || '',
    }

    const dataToSave = {
      components: componentsToSave,
      pageBuilderContentSavedAt: new Date().toISOString(),
      pageSettings,
    }

    const keyForSavingFromDomToLocal = this.getLocalStorageItemName.value

    if (keyForSavingFromDomToLocal && typeof keyForSavingFromDomToLocal === 'string') {
      localStorage.setItem(keyForSavingFromDomToLocal, JSON.stringify(dataToSave))
    }
  }
  private async removeCurrentComponentsFromLocalStorage() {
    this.updateLocalStorageItemName()
    await nextTick()

    const key = this.getLocalStorageItemName.value
    if (key) {
      localStorage.removeItem(key)
    }
  }

  public async handleFormSubmission() {
    await this.removeCurrentComponentsFromLocalStorage()
    this.deleteAllComponentsFromDOM()
  }

  private parseStyleString(style: string): Record<string, string> {
    return style
      .split(';')
      .map((s) => s.trim())
      .filter(Boolean)
      .reduce(
        (acc, rule) => {
          const [key, value] = rule.split(':').map((str) => str.trim())
          if (key && value) acc[key] = value
          return acc
        },
        {} as Record<string, string>,
      )
  }

  deleteOldPageBuilderLocalStorage(): void {
    const config = this.pageBuilderStateStore.getPageBuilderConfig
    const formType = config && config.updateOrCreate && config.updateOrCreate.formType

    if (formType === 'update') {
      let oldCountLocalStorages = 0
      const deletedItemsLog: { Number: number; Key: string; SavedAt: string }[] = []

      // const pastTime = new Date(Date.now() - 1 * 60 * 1000) // 1 minute
      const pastTime = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000) // 2 weeks

      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)

        if (!key) continue
        if (!key.startsWith('page-builder-update-resource-')) continue

        try {
          const storeComponents = localStorage.getItem(key)
          if (!storeComponents) continue

          const storeComponentsParsed = JSON.parse(storeComponents)
          const savedAt = storeComponentsParsed.pageBuilderContentSavedAt
          if (savedAt) {
            const savedAtDate = new Date(savedAt)

            if (savedAtDate < pastTime) {
              oldCountLocalStorages++
              deletedItemsLog.push({
                Number: oldCountLocalStorages,
                Key: key,
                SavedAt: savedAt,
              })

              // Delete old items
              localStorage.removeItem(key)
            }
          }
        } catch (e) {
          // Ignore parse errors for unrelated keys
        }
      }

      if (deletedItemsLog.length > 0) {
        console.info(
          `Deleted ${deletedItemsLog.length} localStorage item(s) older than ${pastTime} days:`,
        )
        console.table(deletedItemsLog)
      }
    }
  }

  // Call this when the user starts editing (e.g., on first change or when resuming a draft)
  public startEditing() {
    this.hasStartedEditing = true
  }

  //
  public async resumeEditingFromDraft() {
    this.updateLocalStorageItemName()

    const localStorageData = this.getSavedPageHtml()

    if (localStorageData) {
      await delay(400)
      this.pageBuilderStateStore.setIsLoadingResumeEditing(true)
      await this.mountComponentsToDOM(localStorageData)
      this.pageBuilderStateStore.setIsLoadingResumeEditing(false)
    }

    // Wait for Vue to finish DOM updates before attaching event listeners. This ensure elements exist in the DOM.
    await nextTick()
    // Attach event listeners to all editable elements in the Builder
    await this.addListenersToEditableElements()
    // set loading to false
    this.pageBuilderStateStore.setIsLoadingResumeEditing(false)
  }

  public async restoreOriginalContent() {
    this.updateLocalStorageItemName()

    this.pageBuilderStateStore.setIsRestoring(true)
    await delay(400)

    // Restore the original content if available
    if (Array.isArray(this.originalComponents)) {
      await this.clearClassesFromPage()
      await this.clearInlineStylesFromPagee()
      await this.mountComponentsToDOM(JSON.stringify(this.originalComponents), true)
      this.removeCurrentComponentsFromLocalStorage()
    }

    // Wait for Vue to finish DOM updates before attaching event listeners. This ensure elements exist in the DOM.
    await nextTick()
    // Attach event listeners to all editable elements in the Builder
    await this.addListenersToEditableElements()

    this.pageBuilderStateStore.setIsRestoring(false)
  }

  public getStorageItemNameForResource(): string | null {
    return this.getLocalStorageItemName.value
  }

  public getSavedPageHtml() {
    if (!this.getLocalStorageItemName.value) return false

    const key = this.getLocalStorageItemName.value
    if (!key) return false

    const raw = localStorage.getItem(key)
    if (!raw) return false

    const parsed = JSON.parse(raw)

    // Object with components and pageSettings
    if (parsed && Array.isArray(parsed.components)) {
      const classes = (parsed.pageSettings && parsed.pageSettings.classes) || ''
      const style = (parsed.pageSettings && parsed.pageSettings.style) || ''

      const sectionsHtml = parsed.components.map((c: ComponentObject) => c.html_code).join('\n')
      return `<div id="pagebuilder" class="${classes}" style="${style}">\n${sectionsHtml}\n</div>`
    }
    return false
  }

  /**
   * Applies the staged image to the currently selected element.
   * This updates the builder state and triggers an auto-save.
   * If no element is selected or no image is staged, nothing happens.
   */
  public async applySelectedImage(image: ImageObject): Promise<void> {
    this.pageBuilderStateStore.setApplyImageToSelection(image)

    if (!this.getElement.value) return

    // Only apply if an image is staged
    if (this.getApplyImageToSelection.value && this.getApplyImageToSelection.value.src) {
      await nextTick()
      this.pageBuilderStateStore.setBasePrimaryImage(`${this.getApplyImageToSelection.value.src}`)

      await this.handleAutoSave()
    }
  }

  /**
   * Inspects the currently selected element and, if it contains exactly one <img> and no <div>,
   * sets that image's src as the base primary image in the builder state.
   * If the element does not meet these criteria, clears the base primary image.
   */
  private setBasePrimaryImageFromSelectedElement() {
    if (!this.getElement.value) return

    const currentImageContainer = document.createElement('div')
    currentImageContainer.innerHTML = this.getElement.value.outerHTML

    // Get all img and div within the current image container
    const imgElements = currentImageContainer.getElementsByTagName('img')
    const divElements = currentImageContainer.getElementsByTagName('div')

    // If exactly one img and no div, set as base primary image
    if (imgElements.length === 1 && divElements.length === 0) {
      this.pageBuilderStateStore.setBasePrimaryImage(imgElements[0].src)
      return
    }

    // Otherwise, clear the base primary image
    this.pageBuilderStateStore.setBasePrimaryImage(null)
  }

  private addHyperlinkToElement(
    hyperlinkEnable: boolean,
    urlInput: string | null,
    openHyperlinkInNewTab: boolean,
  ) {
    if (!this.getElement.value) return

    // Check if element is a proper DOM element and has closest method
    if (
      !(this.getElement.value instanceof HTMLElement) ||
      typeof this.getElement.value.closest !== 'function'
    )
      return

    const parentHyperlink = this.getElement.value.closest('a')
    const hyperlink = this.getElement.value.querySelector('a')

    this.pageBuilderStateStore.setHyperlinkError(null)

    // url validation
    const urlRegex = /^https?:\/\//

    const isValidURL = ref(true)

    if (hyperlinkEnable === true && urlInput !== null) {
      isValidURL.value = urlRegex.test(urlInput)
    }

    if (isValidURL.value === false) {
      this.pageBuilderStateStore.setHyperlinkMessage(null)

      this.pageBuilderStateStore.setHyperlinkError('URL is not valid')
      return
    }

    if (hyperlinkEnable === true && typeof urlInput === 'string') {
      // check if element contains child hyperlink tag
      // updated existing url
      if (hyperlink !== null && urlInput.length !== 0) {
        hyperlink.href = urlInput

        // Conditionally set the target attribute if openHyperlinkInNewTab is true
        if (openHyperlinkInNewTab === true) {
          hyperlink.target = '_blank'
        }
        if (openHyperlinkInNewTab === false) {
          hyperlink.removeAttribute('target')
        }

        hyperlink.textContent = this.getElement.value.textContent

        this.pageBuilderStateStore.setHyperlinkMessage('Succesfully updated element hyperlink')

        this.pageBuilderStateStore.setElementContainsHyperlink(true)

        return
      }

      // check if element contains child a tag
      if (hyperlink === null && urlInput.length !== 0) {
        // add a href
        if (parentHyperlink === null) {
          const link = document.createElement('a')
          link.href = urlInput

          // Conditionally set the target attribute if openHyperlinkInNewTab is true
          if (openHyperlinkInNewTab === true) {
            link.target = '_blank'
          }

          link.textContent = this.getElement.value.textContent
          this.getElement.value.textContent = ''
          this.getElement.value.appendChild(link)

          this.pageBuilderStateStore.setHyperlinkMessage('Successfully added hyperlink to element')

          this.pageBuilderStateStore.setElementContainsHyperlink(true)

          return
        }
      }
      //
    }

    if (hyperlinkEnable === false && urlInput === 'removeHyperlink') {
      // To remove the added hyperlink tag
      const originalText = this.getElement.value.textContent || ''
      const textNode = document.createTextNode(originalText)
      this.getElement.value.textContent = ''
      this.getElement.value.appendChild(textNode)

      this.pageBuilderStateStore.setHyberlinkEnable(false)
      this.pageBuilderStateStore.setElementContainsHyperlink(false)
    }
  }

  private checkForHyperlink() {
    if (!this.getElement.value) return

    const hyperlink = this.getElement.value.querySelector('a')
    if (hyperlink !== null) {
      this.pageBuilderStateStore.setHyberlinkEnable(true)
      this.pageBuilderStateStore.setElementContainsHyperlink(true)
      this.pageBuilderStateStore.setHyperlinkInput(hyperlink.href)
      this.pageBuilderStateStore.setHyperlinkMessage(null)
      this.pageBuilderStateStore.setHyperlinkError(null)

      if (hyperlink.target === '_blank') {
        this.pageBuilderStateStore.setOpenHyperlinkInNewTab(true)
      }
      if (hyperlink.target !== '_blank') {
        this.pageBuilderStateStore.setOpenHyperlinkInNewTab(false)
      }

      return
    }

    this.pageBuilderStateStore.setElementContainsHyperlink(false)
    this.pageBuilderStateStore.setHyperlinkInput('')
    this.pageBuilderStateStore.setHyperlinkError(null)
    this.pageBuilderStateStore.setHyperlinkMessage(null)
    this.pageBuilderStateStore.setHyberlinkEnable(false)
  }

  public handleHyperlink(
    hyperlinkEnable?: boolean,
    urlInput?: string | null,
    openHyperlinkInNewTab?: boolean,
  ): void {
    this.pageBuilderStateStore.setHyperlinkAbility(true)

    if (!this.getElement.value) return

    // Check if element is a proper DOM element and has closest method
    if (
      !(this.getElement.value instanceof HTMLElement) ||
      typeof this.getElement.value.closest !== 'function'
    )
      return

    const parentHyperlink = this.getElement.value.closest('a')

    // handle case where parent element already has an a href tag
    // when clicking directly on a hyperlink
    if (parentHyperlink !== null) {
      this.pageBuilderStateStore.setHyperlinkAbility(false)
    }
    const elementTag = this.getElement.value?.tagName.toUpperCase()

    if (
      elementTag !== 'P' &&
      elementTag !== 'H1' &&
      elementTag !== 'H2' &&
      elementTag !== 'H3' &&
      elementTag !== 'H4' &&
      elementTag !== 'H5' &&
      elementTag !== 'H6'
    ) {
      this.pageBuilderStateStore.setHyperlinkAbility(false)
    }

    if (hyperlinkEnable === undefined) {
      this.checkForHyperlink()
      return
    }

    this.addHyperlinkToElement(hyperlinkEnable, urlInput || null, openHyperlinkInNewTab || false)
  }

  // Helper method for custom components to easily add components
  public async addComponent(componentObject: ComponentObject): Promise<void> {
    try {
      const clonedComponent = this.cloneCompObjForDOMInsertion({
        html_code: componentObject.html_code,
        id: componentObject.id,
        title: componentObject.title,
      })

      this.pageBuilderStateStore.setPushComponents({
        component: clonedComponent,
        componentArrayAddMethod: this.getComponentArrayAddMethod.value
          ? this.getComponentArrayAddMethod.value
          : 'push',
      })

      const pageBuilder = document.querySelector('#pagebuilder')
      //  scoll to top or bottom
      if (pageBuilder) {
        // push to bottom
        if (this.getComponentArrayAddMethod.value === 'push') {
          pageBuilder.scrollTo({
            top: pageBuilder.scrollHeight + 50,
            behavior: 'smooth',
          })
        }
      }

      // Wait for Vue to finish DOM updates before attaching event listeners. This ensure elements exist in the DOM.
      await nextTick()
      // Attach event listeners to all editable elements in the Builder
      await this.addListenersToEditableElements()

      await this.handleAutoSave()
    } catch (error) {
      console.error('Error adding component:', error)
    }
  }

  /**
   * Automatically add Tailwind pbx- prefix to Tailwind classes in imported HTML (if not already present),
   * process each element’s class attribute and update the classes accordingly.
   */

  private addTailwindPrefixToClasses(classList: string, prefix = 'pbx-'): string {
    return classList
      .split(/\s+/)
      .map((cls) => {
        if (!cls || cls.startsWith(prefix)) return cls
        const parts = cls.split(':')
        const base = parts.pop()!
        if (base.startsWith(prefix)) return cls
        // Always prefix if not already prefixed
        return [...parts, prefix + base].join(':')
      })
      .join(' ')
  }

  private convertStyleObjectToString(
    styleObj: string | Record<string, string> | null | undefined,
  ): string {
    if (!styleObj) return ''
    if (typeof styleObj === 'string') return styleObj

    return Object.entries(styleObj)
      .map(([key, value]) => {
        const kebabKey = key.replace(/([A-Z])/g, '-$1').toLowerCase()
        return `${kebabKey}: ${value};`
      })
      .join(' ')
  }

  /**
   * Parses a string of HTML and extracts builder components and global page settings.
   *
   * ⚠️ **Important:**
   * - This method expects an **HTML string** containing one or more `<section>...</section>` elements (such as the output from `getSavedPageHtml()` or a previously saved builder HTML string).
   * - **Do NOT pass a JSON string** (such as the result of `JSON.stringify(componentsArray)`) to this method. Passing a JSON string to `DOMParser.parseFromString(..., 'text/html')` will not produce valid DOM nodes. Instead, it will treat the JSON as plain text, resulting in a `<html><head></head><body>{...json...}</body></html>` structure, not real HTML elements.
   * - If you pass a JSON string, you will see lots of `\n` and strange HTML, because the parser is just wrapping your JSON in a `<body>` tag as text.
   *
   * Why only HTML?
   * - It enforces a single source of truth for builder state (HTML).
   * - It prevents misuse (e.g., passing JSON to a DOM parser, which is always a bug).
   * - It makes your documentation and support much simpler.
   *
   * @param htmlString - The HTML string to parse (must contain `<section>...</section>` elements, not JSON).
   * @returns An object with `components` (array of builder components) and `pageSettings` (global styles for the page).
   */
  public parsePageBuilderHTML(htmlString: string): {
    components: ComponentObject[]
    pageSettings: PageSettings
  } {
    const parser = new DOMParser()
    const doc = parser.parseFromString(htmlString, 'text/html')

    // Prefix all classes in the document
    doc.querySelectorAll('[class]').forEach((element) => {
      const currentClasses = element.getAttribute('class') || ''
      const prefixedClasses = this.addTailwindPrefixToClasses(currentClasses)
      element.setAttribute('class', prefixedClasses)
    })

    const pagebuilderDiv = doc.querySelector('#pagebuilder')
    let pageSettings: PageSettings = {
      classes: '',
      style: {},
    }

    if (pagebuilderDiv) {
      const rawStyle = pagebuilderDiv.getAttribute('style') || ''
      pageSettings = {
        classes: pagebuilderDiv.className || '',
        style: this.parseStyleString(rawStyle),
      }
    }

    // Always assign sectionNodes before use
    let sectionNodes: NodeListOf<HTMLElement> = doc.querySelectorAll('section')
    if (pagebuilderDiv) {
      sectionNodes = pagebuilderDiv.querySelectorAll('section')
    }

    // Only use top-level (non-nested) sections as components
    const topLevelSections = Array.from(sectionNodes).filter(
      (section) =>
        !section.parentElement || section.parentElement.tagName.toLowerCase() !== 'section',
    )

    let components: ComponentObject[] = []

    if (topLevelSections.length > 0) {
      components = topLevelSections.map((section) => ({
        id: null,
        html_code: section.outerHTML.trim(),
        title:
          section.getAttribute('data-component-title') ||
          section.getAttribute('title') ||
          'Untitled Component',
      }))
    }
    if (topLevelSections.length === 0) {
      // No <section> found: treat each first-level child as a component, wrapped in a section
      const parent = pagebuilderDiv || doc.body
      const children = Array.from(parent.children)
      if (children.length > 0) {
        components = children.map((child) => {
          // Wrap in a section with data-componentid and data-component-title
          const section = doc.createElement('section')
          section.setAttribute('data-component-title', 'Untitled Component')
          // Optionally: generate a uuid for data-componentid if needed
          // section.setAttribute('data-componentid', uuidv4())
          section.innerHTML = child.outerHTML.trim()
          return {
            id: null,
            html_code: section.outerHTML.trim(),
            title: 'Untitled Component',
          }
        })
      }
      if (children.length === 0) {
        // No children: wrap the entire content in a <section> as a single component
        const section = doc.createElement('section')
        section.setAttribute('data-component-title', 'Untitled Component')
        section.innerHTML = parent.innerHTML.trim()
        components = [
          {
            id: null,
            html_code: section.outerHTML.trim(),
            title: 'Untitled Component',
          },
        ]
      }
    }

    return {
      components,
      pageSettings,
    }
  }

  /**
   * Parse and set components from JSON or HTML data
   *
   * Supports:
   * - JSON: Array of ComponentObject with html_code, id, title
   * - HTML: String containing <section data-componentid="..."> elements
   *
   * Auto-detects format and parses accordingly
   *
   * @param data - JSON string (e.g., '[{"html_code":"...","id":"123","title":"..."}]')
   *               OR HTML string (e.g., '<section data-componentid="123">...</section>')
   */
  private async mountComponentsToDOM(
    htmlString: string,
    usePassedPageSettings?: boolean,
  ): Promise<void> {
    /**
     * Mounts builder components to the DOM from either JSON or HTML input.
     *
     * Input format detection:
     * - If the input starts with `[` or `{`, it is treated as JSON (array or object).
     * - If the input starts with `<`, it is treated as HTML.
     *
     * When to use which format:
     *
     * 1. JSON input (from localStorage, API, or internal state like pina):
     *    - Use when restoring builder state from localStorage, an API, or a previously saved draft.
     *    - Example: `localStorage.getItem(...)` or API returns a JSON stringified array/object of components.
     *    - This is the most common format for drafts, autosave, and programmatic state management.
     *    - Example usage:
     *      await this.mountComponentsToDOM(JSON.stringify(getComponents))
     *
     * 2. HTML input (from HTML snapshot, import, or published output):
     *    - Use when restoring from a published HTML snapshot, importing a static HTML export, or loading the builder from a previously published HTML string.
     *    - Example: output from `getSavedPageHtml()` or a static HTML export.
     *    - This is used for restoring the builder from a published state, importing, or previewing published content.
     *    - Example usage:
     *      await this.mountComponentsToDOM(savedHtmlString)
     *
     * Best practice:
     * - Use JSON for local storage drafts, autosave, and API-driven workflows.
     * - Use HTML for published/imported content from DB or when restoring from a static HTML snapshot.
     *
     * The method auto-detects the format and calls the appropriate parser.
     */
    const trimmedData = htmlString.trim()

    if (trimmedData.startsWith('[') || trimmedData.startsWith('{')) {
      // JSON input: Use this when restoring from localStorage, API, or internal builder state (drafts, autosave, etc.)
      await this.parseJSONComponents(trimmedData, usePassedPageSettings)
      return
    }
    if (trimmedData.startsWith('<')) {
      // HTML input: Use this when restoring from a published HTML snapshot, import, or static HTML export
      await this.parseHTMLComponents(trimmedData, usePassedPageSettings)
      return
    }

    // Fallback: If format is unknown, default to JSON parser (defensive)
    await this.parseJSONComponents(trimmedData, usePassedPageSettings)
  }

  // Private method to parse JSON components and save pageBuilderContentSavedAt to localStorage
  private async parseJSONComponents(
    jsonData: string,
    usePassedPageSettings?: boolean,
  ): Promise<void> {
    const pageSettings =
      this.pageBuilderStateStore.getPageBuilderConfig &&
      this.pageBuilderStateStore.getPageBuilderConfig.pageSettings

    const userPageSettings = usePassedPageSettings ? pageSettings : null
    try {
      const parsedData = JSON.parse(jsonData)
      let componentsArray: ComponentObject[] = []

      if (Array.isArray(parsedData)) {
        componentsArray = parsedData
      }
      if (parsedData && Array.isArray(parsedData.components)) {
        componentsArray = parsedData.components
      }

      let savedCurrentDesign: ComponentObject[] = []

      if (componentsArray.length > 0) {
        savedCurrentDesign = componentsArray.map((component: ComponentObject) => {
          const parser = new DOMParser()
          const doc = parser.parseFromString(component.html_code, 'text/html')
          const section = doc.querySelector('section')

          if (section) {
            // Prefix Tailwind classes
            section.querySelectorAll('[class]').forEach((el) => {
              el.setAttribute(
                'class',
                this.addTailwindPrefixToClasses(el.getAttribute('class') || '', 'pbx-'),
              )
            })

            // Ensure IDs & titles
            if (!section.hasAttribute('data-componentid')) {
              const newId = uuidv4()
              section.setAttribute('data-componentid', newId)
              component.id = newId
            } else {
              component.id = section.getAttribute('data-componentid')!
            }

            const title = component.title || 'Untitled Component'
            section.setAttribute('data-component-title', title)
            component.title = title

            // Update html_code
            component.html_code = section.outerHTML
          }
          return component
        })
      }

      this.pageBuilderStateStore.setComponents(savedCurrentDesign)

      await nextTick()
      await this.addListenersToEditableElements()

      if (userPageSettings && pageSettings) {
        const pagebuilder = document.querySelector('#pagebuilder') as HTMLElement
        if (pagebuilder) {
          pagebuilder.removeAttribute('class')
          pagebuilder.removeAttribute('style')
          pagebuilder.className = pageSettings.classes || ''
          pagebuilder.setAttribute('style', this.convertStyleObjectToString(pageSettings.style))
        }
      }
    } catch (error) {
      console.error('Error parsing JSON components:', error)
      this.deleteAllComponentsFromDOM()
    }
  }

  // Private method to parse HTML components
  private async parseHTMLComponents(
    htmlData: string,
    usePassedPageSettings?: boolean,
  ): Promise<void> {
    try {
      const parser = new DOMParser()
      const doc = parser.parseFromString(htmlData, 'text/html')

      const importedPageBuilder = doc.querySelector('#pagebuilder') as HTMLElement | null
      const livePageBuilder = document.querySelector('#pagebuilder') as HTMLElement | null

      if (livePageBuilder) {
        const storedPageSettings =
          this.pageBuilderStateStore.getPageBuilderConfig &&
          this.pageBuilderStateStore.getPageBuilderConfig.pageSettings

        // Decide which pageSettings to use
        let pageSettings = null
        if (usePassedPageSettings) {
          pageSettings = storedPageSettings
        } else if (importedPageBuilder) {
          pageSettings = {
            classes: importedPageBuilder.className || '',
            style: importedPageBuilder.getAttribute('style') || '',
          }
        } else {
          pageSettings = storedPageSettings
        }

        // Restore page-level settings like class and style
        if (pageSettings) {
          livePageBuilder.removeAttribute('class')
          livePageBuilder.removeAttribute('style')
          livePageBuilder.className = pageSettings.classes || ''
          livePageBuilder.setAttribute('style', this.convertStyleObjectToString(pageSettings.style))
        }
      }

      // Select all <section> elements
      const sectionElements = doc.querySelectorAll('section')

      const extractedSections: ComponentObject[] = []
      sectionElements.forEach((section) => {
        // Prefix all classes inside section
        section.querySelectorAll('[class]').forEach((el) => {
          el.setAttribute(
            'class',
            this.addTailwindPrefixToClasses(el.getAttribute('class') || '', 'pbx-'),
          )
        })

        const htmlElement = section as HTMLElement

        // Ensure data-componentid exists
        if (!htmlElement.hasAttribute('data-componentid')) {
          htmlElement.setAttribute('data-componentid', uuidv4())
        }
        const componentId = htmlElement.getAttribute('data-componentid')!

        // Ensure data-component-title exists
        const title =
          htmlElement.getAttribute('title') ||
          htmlElement.getAttribute('data-component-title') ||
          'Untitled Component'

        htmlElement.setAttribute('data-component-title', title)

        extractedSections.push({
          html_code: htmlElement.outerHTML,
          id: componentId,
          title: title,
        })
      })

      this.pageBuilderStateStore.setComponents(extractedSections)

      // Clear selections and re-bind events
      await this.clearHtmlSelection()
      await nextTick()
      await this.addListenersToEditableElements()
    } catch (error) {
      console.error('Error parsing HTML components:', error)
      this.deleteAllComponentsFromDOM()
    }
  }

  private updateLocalStorageItemName(): void {
    const formtype =
      this.pageBuilderStateStore.getPageBuilderConfig &&
      this.pageBuilderStateStore.getPageBuilderConfig.updateOrCreate &&
      this.pageBuilderStateStore.getPageBuilderConfig.updateOrCreate.formType

    const formname =
      this.pageBuilderStateStore.getPageBuilderConfig &&
      this.pageBuilderStateStore.getPageBuilderConfig.updateOrCreate &&
      this.pageBuilderStateStore.getPageBuilderConfig.updateOrCreate.formName

    const resourceData =
      this.pageBuilderStateStore.getPageBuilderConfig &&
      this.pageBuilderStateStore.getPageBuilderConfig.resourceData

    // Logic for create resource
    if (formtype === 'create') {
      if (formname && formname.length > 0) {
        this.pageBuilderStateStore.setLocalStorageItemName(
          `page-builder-create-resource-${this.sanitizeForLocalStorage(formname)}`,
        )
        return
      }

      this.pageBuilderStateStore.setLocalStorageItemName(`page-builder-create-resource`)
      return
    }

    // Logic for create
    // Logic for update and with resource form name
    if (formtype === 'update') {
      if (typeof formname === 'string' && formname.length > 0) {
        //
        //
        if (resourceData && resourceData != null && !resourceData.title) {
          // Check if id is missing, null, undefined, or an empty string (after trimming)
          if (!resourceData.id || typeof resourceData.id === 'string') {
            this.pageBuilderStateStore.setLocalStorageItemName(
              `page-builder-update-resource-${this.sanitizeForLocalStorage(formname)}`,
            )
            return
          }
        }

        // Runs when resourceData has title but no ID
        if (resourceData && resourceData != null) {
          if (
            resourceData.title &&
            typeof resourceData.title === 'string' &&
            resourceData.title.length > 0
          ) {
            if (!resourceData.id || typeof resourceData.id === 'string') {
              this.pageBuilderStateStore.setLocalStorageItemName(
                `page-builder-update-resource-${this.sanitizeForLocalStorage(formname)}-${this.sanitizeForLocalStorage(resourceData.title)}`,
              )
              return
            }
          }
        }

        // Runs when resourceData has ID but no title
        if (resourceData && resourceData != null) {
          if (!resourceData.title && typeof resourceData.title !== 'string') {
            if (resourceData.id || typeof resourceData.id === 'number') {
              this.pageBuilderStateStore.setLocalStorageItemName(
                `page-builder-update-resource-${this.sanitizeForLocalStorage(formname)}-${this.sanitizeForLocalStorage(String(resourceData.id))}`,
              )
              return
            }
          }
        }

        // Runs when resourceData has both title and ID
        if (resourceData && resourceData != null) {
          if (
            resourceData.title &&
            typeof resourceData.title === 'string' &&
            resourceData.title.length > 0
          ) {
            if (resourceData.id || typeof resourceData.id === 'number') {
              this.pageBuilderStateStore.setLocalStorageItemName(
                `page-builder-update-resource-${this.sanitizeForLocalStorage(formname)}-${this.sanitizeForLocalStorage(resourceData.title)}-${this.sanitizeForLocalStorage(String(resourceData.id))}`,
              )
              return
            }
          }
        }
      }

      // Logic for update without without formname
      if (!formname || (typeof formname === 'string' && formname.length === 0)) {
        //
        //
        if (resourceData && resourceData != null && !resourceData.title) {
          // Check if id is missing, null, undefined, or an empty string (after trimming)
          if (!resourceData.id || typeof resourceData.id === 'string') {
            this.pageBuilderStateStore.setLocalStorageItemName(`page-builder-update-resource`)
            return
          }
        }

        // Runs when resourceData has title but no ID
        if (resourceData && resourceData != null) {
          if (
            resourceData.title &&
            typeof resourceData.title === 'string' &&
            resourceData.title.length > 0
          ) {
            if (!resourceData.id || typeof resourceData.id === 'string') {
              this.pageBuilderStateStore.setLocalStorageItemName(
                `page-builder-update-resource-${this.sanitizeForLocalStorage(resourceData.title)}`,
              )
              return
            }
          }
        }

        // Runs when resourceData has ID but no title
        if (resourceData && resourceData != null) {
          if (!resourceData.title && typeof resourceData.title !== 'string') {
            if (resourceData.id || typeof resourceData.id === 'number') {
              this.pageBuilderStateStore.setLocalStorageItemName(
                `page-builder-update-resource-${this.sanitizeForLocalStorage(String(resourceData.id))}`,
              )
              return
            }
          }
        }

        // Runs when resourceData has both title and ID
        if (resourceData && resourceData != null) {
          if (
            resourceData.title &&
            typeof resourceData.title === 'string' &&
            resourceData.title.length > 0
          ) {
            if (resourceData.id || typeof resourceData.id === 'number') {
              this.pageBuilderStateStore.setLocalStorageItemName(
                `page-builder-update-resource-${this.sanitizeForLocalStorage(resourceData.title)}-${this.sanitizeForLocalStorage(String(resourceData.id))}`,
              )
              return
            }
          }
        }
      }
    }
  }

  public async initializeElementStyles(): Promise<void> {
    // Wait for Vue to finish DOM updates before attaching event listeners.
    // This ensure elements exist in the DOM.
    await nextTick()

    this.handleHyperlink(undefined, null, false)
    this.handleOpacity(undefined)
    this.handleBackgroundOpacity(undefined)
    this.setBasePrimaryImageFromSelectedElement()
    this.handleBorderStyle(undefined)
    this.handleBorderWidth(undefined)
    this.handleBorderColor(undefined)
    this.handleBorderRadiusGlobal(undefined)
    this.handleBorderRadiusTopLeft(undefined)
    this.handleBorderRadiusTopRight(undefined)
    this.handleBorderRadiusBottomleft(undefined)
    this.handleBorderRadiusBottomRight(undefined)
    this.handleFontSizeBase(undefined)
    this.handleFontSizeDesktop(undefined)
    this.handleFontSizeTablet(undefined)
    this.handleFontSizeMobile(undefined)
    this.handleFontWeight(undefined)
    this.handleFontFamily(undefined)
    this.handleFontStyle(undefined)
    this.handleVerticalPadding(undefined)
    this.handleHorizontalPadding(undefined)
    this.handleVerticalMargin(undefined)
    this.handleHorizontalMargin(undefined)
    this.handleBackgroundColor(undefined)
    this.handleTextColor(undefined)
    await this.syncCurrentClasses()
    await this.syncCurrentStyles()
  }
}
