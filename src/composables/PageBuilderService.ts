// Type definitions
import type { ComponentObject, ImageObject, PageBuilderConfig } from '../types'

import type { usePageBuilderStateStore } from '../stores/page-builder-state'

import tailwindFontSizes from '../utils/builder/tailwind-font-sizes'
import tailwindColors from '../utils/builder/tailwaind-colors'
import tailwindOpacities from '../utils/builder/tailwind-opacities'
import tailwindFontStyles from '../utils/builder/tailwind-font-styles'
import tailwindPaddingAndMargin from '../utils/builder/tailwind-padding-margin'
import tailwindBorderRadius from '../utils/builder/tailwind-border-radius'
import tailwindBorderStyleWidthPlusColor from '../utils/builder/tailwind-border-style-width-color'
import { computed, ref, nextTick } from 'vue'
import type { ComputedRef } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { delay } from './delay'
import { isEmptyObject } from '../helpers/isEmptyObject'

export class PageBuilderService {
  // Class properties with types
  private nextTick: Promise<void>
  private containsPagebuilder: Element | null
  // private pageBuilder: Element | null
  private pageBuilderStateStore: ReturnType<typeof usePageBuilderStateStore>
  private getTextAreaVueModel: ComputedRef<string | null>
  private getLocalStorageItemName: ComputedRef<string | null>
  private getCurrentImage: ComputedRef<ImageObject>
  private getHyberlinkEnable: ComputedRef<boolean>
  private getComponents: ComputedRef<ComponentObject[] | null>
  private getComponent: ComputedRef<ComponentObject | null>
  private getElement: ComputedRef<HTMLElement | null>
  private getNextSibling: ComputedRef<HTMLElement | null>
  private getParentElement: ComputedRef<HTMLElement | null>
  private getRestoredElement: ComputedRef<string | null>
  private getComponentArrayAddMethod: ComputedRef<string | null>
  private NoneListernesTags: string[]
  private delay: (ms?: number) => Promise<void>
  private hasStartedEditing: boolean = false
  private originalComponents: string | null = null

  constructor(pageBuilderStateStore: ReturnType<typeof usePageBuilderStateStore>) {
    this.nextTick = nextTick()
    this.hasStartedEditing = false
    this.containsPagebuilder = document.querySelector('#contains-pagebuilder')
    this.pageBuilderStateStore = pageBuilderStateStore

    this.getTextAreaVueModel = computed(() => this.pageBuilderStateStore.getTextAreaVueModel)
    this.getLocalStorageItemName = computed(
      () => this.pageBuilderStateStore.getLocalStorageItemName,
    )

    this.getCurrentImage = computed(() => this.pageBuilderStateStore.getCurrentImage)
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
    ]

    this.delay = delay
  }

  // Load existing content from HTML when in update mode
  async clearHtmlSelection(): Promise<void> {
    this.pageBuilderStateStore.setComponent(null)
    this.pageBuilderStateStore.setElement(null)
    await this.#removeHoveredAndSelected()
  }

  #ensureUpdateOrCreateConfig(config: PageBuilderConfig): void {
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

  #validateConfig(config: PageBuilderConfig): void {
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
      this.#ensureUpdateOrCreateConfig(config)
    }
  }

  /**
   * Initializes the Page Builder with the provided configuration.
   * Handles config validation, local storage, and sets up the builder state.
   */
  async startBuilder(config: PageBuilderConfig): Promise<void> {
    // Show a global loading indicator while initializing
    this.pageBuilderStateStore.setIsLoadingGlobal(true)

    // Wait briefly to ensure UI updates and async processes settle
    await this.delay(300)

    // Store the provided config in the builder's state store
    this.pageBuilderStateStore.setPageBuilderConfig(config)

    // Validate and normalize the config (ensure required fields are present)
    this.#validateConfig(config)

    // Update the localStorage key name based on the config/resource
    this.#updateLocalStorageItemName()

    // If there is a local draft for this resource, mark it in the state
    if (await this.#hasLocalDraftForUpdate()) {
      this.pageBuilderStateStore.setHasLocalDraftForUpdate(true)
    }

    // Clean up any old localStorage items related to previous builder sessions
    this.deleteOldPageBuilderLocalStorage()

    // Clear any selected HTML elements in the builder UI
    await this.clearHtmlSelection()

    // Attach event listeners to all editable elements in the builder
    await this.addListenersToEditableElements()

    // Hide the global loading indicator and mark the builder as started
    this.pageBuilderStateStore.setIsLoadingGlobal(false)
    this.pageBuilderStateStore.setBuilderStarted(true)
  }

  #applyElementClassChanges(
    selectedCSS: string | undefined,
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

    // If selectedCSS is undefined, just set the current state and return
    if (selectedCSS === undefined) {
      if (typeof mutationName === 'string' && mutationName.length > 2) {
        ;(this.pageBuilderStateStore as any)[mutationName](elementClass)
      }
      return currentCSS
    }

    // selectedCSS examples: bg-zinc-200, px-10, rounded-full etc.
    if (typeof selectedCSS === 'string' && selectedCSS !== 'none') {
      if (elementClass && currentHTMLElement.classList.contains(elementClass)) {
        currentHTMLElement.classList.remove(elementClass)
      }

      currentHTMLElement.classList.add(selectedCSS)
      elementClass = selectedCSS
    } else if (typeof selectedCSS === 'string' && selectedCSS === 'none' && elementClass) {
      currentHTMLElement.classList.remove(elementClass)
      elementClass = selectedCSS
    }

    // Only call store mutations after all DOM manipulation is complete
    if (typeof mutationName === 'string' && mutationName.length > 2) {
      ;(this.pageBuilderStateStore as any)[mutationName](elementClass)
      this.pageBuilderStateStore.setElement(currentHTMLElement)
    }

    return currentCSS
  }

  #applyHelperCSSToElements(element: HTMLElement): void {
    this.#wrapElementInDivIfExcluded(element)

    if (element.tagName === 'IMG') {
      element.classList.add('smooth-transition')
    }

    // Add padding to DIV
    if (element.tagName === 'DIV') {
      if (element.classList.length === 0) {
        // element.classList.add("p-2");
      }
    }
  }

  #wrapElementInDivIfExcluded(element: HTMLElement): void {
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

  #handleElementClick = async (e: Event, element: HTMLElement): Promise<void> => {
    e.preventDefault()
    e.stopPropagation()

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

  #handleMouseOver = (e: Event, element: HTMLElement): void => {
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

  #handleMouseLeave = (e: Event): void => {
    e.preventDefault()
    e.stopPropagation()

    const pagebuilder = document.querySelector('#pagebuilder')
    if (!pagebuilder) return

    const hoveredElement = pagebuilder.querySelector('[hovered]')
    if (hoveredElement) {
      hoveredElement.removeAttribute('hovered')
    }
  }

  isEditableElement(el: Element | null): boolean {
    if (!el) return false
    return !this.NoneListernesTags.includes(el.tagName)
  }

  /**
   * The function is used to
   * attach event listeners to each element within a 'section'
   */
  addListenersToEditableElements = async () => {
    const elementsWithListeners = new WeakSet<Element>()

    const pagebuilder = document.querySelector('#pagebuilder')

    if (!pagebuilder) return

    // Wait for any pending DOM updates
    await nextTick()
    await new Promise((resolve) => requestAnimationFrame(resolve))

    pagebuilder.querySelectorAll('section *').forEach((element) => {
      // exclude NoneListernesTags && additional Tags for not listening
      if (this.isEditableElement(element)) {
        if (elementsWithListeners && !elementsWithListeners.has(element)) {
          elementsWithListeners.add(element)
          // Type assertion to HTMLElement since we know these are DOM elements
          const htmlElement = element as HTMLElement
          // Attach event listeners directly to individual elements
          htmlElement.addEventListener('click', (e) => this.#handleElementClick(e, htmlElement))
          htmlElement.addEventListener('mouseover', (e) => this.#handleMouseOver(e, htmlElement))
          htmlElement.addEventListener('mouseleave', (e) => this.#handleMouseLeave(e))
        }
      }

      // end for each iterating over elements
    })
  }

  handleAutoSave = async () => {
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
          await this.saveComponentsLocalStorage()
          await this.delay(500)
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
        await this.saveComponentsLocalStorage()
        await this.delay(300)
      } catch (err) {
        console.error('Error trying saving.', err)
      } finally {
        this.pageBuilderStateStore.setIsSaving(false)
      }
    }
  }

  handleManualSave = async () => {
    this.startEditing()
    const passedConfig = this.pageBuilderStateStore.getPageBuilderConfig

    // Check if config is set
    if (passedConfig && passedConfig.userSettings) {
      //
      //
      // Enabled auto save
      if (
        (typeof passedConfig.userSettings.autoSave === 'boolean' &&
          !passedConfig.userSettings.autoSave) ||
        (typeof passedConfig.userSettings.autoSave === 'boolean' &&
          passedConfig.userSettings.autoSave)
      ) {
        this.pageBuilderStateStore.setIsSaving(true)
        await this.saveComponentsLocalStorage()
        await this.delay(300)

        this.pageBuilderStateStore.setIsSaving(false)
      }
    }
    if (passedConfig && !passedConfig.userSettings) {
      this.pageBuilderStateStore.setIsSaving(true)
      await this.saveComponentsLocalStorage()
      await this.delay(300)

      this.pageBuilderStateStore.setIsSaving(false)
    }
  }

  cloneCompObjForDOMInsertion(componentObject: ComponentObject): ComponentObject {
    // Deep clone clone component
    const clonedComponent = { ...componentObject }

    //  scoll to top or bottom # end
    if (this.containsPagebuilder) {
      if (
        this.getComponentArrayAddMethod.value === 'unshift' ||
        this.getComponentArrayAddMethod.value === 'push'
      ) {
        // push to top
        if (this.getComponentArrayAddMethod.value === 'unshift') {
          this.containsPagebuilder.scrollTo({
            top: 0,
            behavior: 'smooth',
          })
        }

        // push to bottom
        if (this.getComponentArrayAddMethod.value === 'push') {
          const maxHeight = this.containsPagebuilder.scrollHeight
          this.containsPagebuilder.scrollTo({
            top: maxHeight,
            behavior: 'smooth',
          })
        }
      }
    }

    // Create a DOMParser instance
    const parser = new DOMParser()

    // Parse the HTML content of the clonedComponent using the DOMParser
    const doc = parser.parseFromString(clonedComponent.html_code || '', 'text/html')

    // Selects all elements within the HTML document, including elements like:
    const elements = doc.querySelectorAll('*')

    elements.forEach((element) => {
      this.#applyHelperCSSToElements(element as HTMLElement)
    })

    // Add the component id to the section element
    const section = doc.querySelector('section')
    if (section) {
      // Prefix all classes inside the section
      section.querySelectorAll('[class]').forEach((el) => {
        el.setAttribute(
          'class',
          this.#addTailwindPrefixToClasses(el.getAttribute('class') || '', 'pbx-'),
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

  async #removeHoveredAndSelected() {
    await new Promise((resolve) => requestAnimationFrame(resolve))

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

  async #syncCurrentClasses() {
    await new Promise((resolve) => requestAnimationFrame(resolve))

    // convert classList to array
    const classListArray = Array.from(this.getElement.value?.classList || [])

    // commit array to store
    this.pageBuilderStateStore.setCurrentClasses(classListArray)
  }

  handleAddClasses(userSelectedClass: string): void {
    if (
      typeof userSelectedClass === 'string' &&
      userSelectedClass !== '' &&
      !userSelectedClass.includes(' ') &&
      // Check if class already exists
      !this.getElement.value?.classList.contains(userSelectedClass)
    ) {
      // Remove any leading/trailing spaces
      const cleanedClass = userSelectedClass.trim()

      this.getElement.value?.classList.add(cleanedClass)

      this.pageBuilderStateStore.setElement(this.getElement.value)

      this.pageBuilderStateStore.setClass(userSelectedClass)
    }
  }

  handleRemoveClasses(userSelectedClass: string): void {
    // remove selected class from element
    if (this.getElement.value?.classList.contains(userSelectedClass)) {
      this.getElement.value?.classList.remove(userSelectedClass)

      this.pageBuilderStateStore.setElement(this.getElement.value)
      this.pageBuilderStateStore.removeClass(userSelectedClass)
    }
  }

  handleDeleteElement() {
    // Get the element to be deleted
    const element = this.getElement.value

    if (!element) return

    if (!element?.parentNode) {
      this.pageBuilderStateStore.setComponent(null)
      this.pageBuilderStateStore.setElement(null)
      return
    }

    // Store the parent of the deleted element
    // if parent element tag is section remove the hole component
    if (element.parentElement?.tagName !== 'SECTION') {
      this.pageBuilderStateStore.setParentElement(element.parentNode as HTMLElement)

      // Store the outerHTML of the deleted element
      this.pageBuilderStateStore.setRestoredElement(element.outerHTML)

      // Store the next sibling of the deleted element
      this.pageBuilderStateStore.setNextSibling(element.nextSibling as HTMLElement | null)
    }

    // if parent element tag is section remove the hole component
    if (element.parentElement?.tagName === 'SECTION') {
      this.deleteSelectedComponent()
    }

    // Remove the element from the DOM
    element.remove()
    this.pageBuilderStateStore.setComponent(null)
    this.pageBuilderStateStore.setElement(null)
  }

  async handleRestoreElement() {
    // Get the stored deleted element and its parent
    if (this.getRestoredElement.value && this.getParentElement.value) {
      // Create a new element from the stored outerHTML
      const newElement = document.createElement('div')
      // Fixed type conversion issue
      newElement.innerHTML = this.getRestoredElement.value

      // Append the restored element to its parent
      // Insert the restored element before its next sibling in its parent
      if (newElement.firstChild && this.getParentElement.value) {
        // insertBefore can accept null as second parameter (will append to end)
        this.getParentElement.value.insertBefore(newElement.firstChild, this.getNextSibling.value)
      }
    }

    // Clear
    this.pageBuilderStateStore.setParentElement(null)
    this.pageBuilderStateStore.setRestoredElement(null)
    this.pageBuilderStateStore.setNextSibling(null)
    this.pageBuilderStateStore.setComponent(null)
    this.pageBuilderStateStore.setElement(null)

    await this.addListenersToEditableElements()
  }

  handleFontWeight(userSelectedFontWeight?: string): void {
    this.#applyElementClassChanges(
      userSelectedFontWeight,
      tailwindFontStyles.fontWeight,
      'setFontWeight',
    )
  }
  handleFontFamily(userSelectedFontFamily?: string): void {
    this.#applyElementClassChanges(
      userSelectedFontFamily,
      tailwindFontStyles.fontFamily,
      'setFontFamily',
    )
  }
  handleFontStyle(userSelectedFontStyle?: string): void {
    this.#applyElementClassChanges(
      userSelectedFontStyle,
      tailwindFontStyles.fontStyle,
      'setFontStyle',
    )
  }
  handleVerticalPadding(userSelectedVerticalPadding?: string): void {
    this.#applyElementClassChanges(
      userSelectedVerticalPadding,
      tailwindPaddingAndMargin.verticalPadding,
      'setFontVerticalPadding',
    )
  }
  handleHorizontalPadding(userSelectedHorizontalPadding?: string): void {
    this.#applyElementClassChanges(
      userSelectedHorizontalPadding,
      tailwindPaddingAndMargin.horizontalPadding,
      'setFontHorizontalPadding',
    )
  }

  handleVerticalMargin(userSelectedVerticalMargin?: string): void {
    this.#applyElementClassChanges(
      userSelectedVerticalMargin,
      tailwindPaddingAndMargin.verticalMargin,
      'setFontVerticalMargin',
    )
  }
  handleHorizontalMargin(userSelectedHorizontalMargin?: string): void {
    this.#applyElementClassChanges(
      userSelectedHorizontalMargin,
      tailwindPaddingAndMargin.horizontalMargin,
      'setFontHorizontalMargin',
    )
  }

  handleBorderStyle(borderStyle?: string): void {
    this.#applyElementClassChanges(
      borderStyle,
      tailwindBorderStyleWidthPlusColor.borderStyle,
      'setBorderStyle',
    )
  }
  handleBorderWidth(borderWidth?: string): void {
    this.#applyElementClassChanges(
      borderWidth,
      tailwindBorderStyleWidthPlusColor.borderWidth,
      'setBorderWidth',
    )
  }
  handleBorderColor(borderColor?: string): void {
    this.#applyElementClassChanges(
      borderColor,
      tailwindBorderStyleWidthPlusColor.borderColor,
      'setBorderColor',
    )
  }
  // border color, style & width / end

  handleBackgroundColor(color?: string): void {
    this.#applyElementClassChanges(
      color,
      tailwindColors.backgroundColorVariables,
      'setBackgroundColor',
    )
  }

  handleTextColor(color?: string): void {
    this.#applyElementClassChanges(color, tailwindColors.textColorVariables, 'setTextColor')
  }

  handleBorderRadiusGlobal(borderRadiusGlobal?: string): void {
    this.#applyElementClassChanges(
      borderRadiusGlobal,
      tailwindBorderRadius.roundedGlobal,
      'setBorderRadiusGlobal',
    )
  }
  handleBorderRadiusTopLeft(borderRadiusTopLeft?: string): void {
    this.#applyElementClassChanges(
      borderRadiusTopLeft,
      tailwindBorderRadius.roundedTopLeft,
      'setBorderRadiusTopLeft',
    )
  }
  handleBorderRadiusTopRight(borderRadiusTopRight?: string): void {
    this.#applyElementClassChanges(
      borderRadiusTopRight,
      tailwindBorderRadius.roundedTopRight,
      'setBorderRadiusTopRight',
    )
  }
  handleBorderRadiusBottomleft(borderRadiusBottomleft?: string): void {
    this.#applyElementClassChanges(
      borderRadiusBottomleft,
      tailwindBorderRadius.roundedBottomLeft,
      'setBorderRadiusBottomleft',
    )
  }
  handleBorderRadiusBottomRight(borderRadiusBottomRight?: string): void {
    this.#applyElementClassChanges(
      borderRadiusBottomRight,
      tailwindBorderRadius.roundedBottomRight,
      'setBorderRadiusBottomRight',
    )
  }
  // border radius / end

  handleFontSizeBase(userSelectedFontSize?: string): void {
    this.#applyElementClassChanges(userSelectedFontSize, tailwindFontSizes.fontBase, 'setFontBase')
  }

  handleFontSizeDesktop(userSelectedFontSize?: string): void {
    this.#applyElementClassChanges(
      userSelectedFontSize,
      tailwindFontSizes.fontDesktop,
      'setFontDesktop',
    )
  }
  handleFontSizeTablet(userSelectedFontSize?: string): void {
    this.#applyElementClassChanges(
      userSelectedFontSize,
      tailwindFontSizes.fontTablet,
      'setFontTablet',
    )
  }
  handleFontSizeMobile(userSelectedFontSize?: string): void {
    this.#applyElementClassChanges(
      userSelectedFontSize,
      tailwindFontSizes.fontMobile,
      'setFontMobile',
    )
  }

  handleBackgroundOpacity(opacity?: string): void {
    this.#applyElementClassChanges(
      opacity,
      tailwindOpacities.backgroundOpacities,
      'setBackgroundOpacity',
    )
  }
  handleOpacity(opacity?: string): void {
    this.#applyElementClassChanges(opacity, tailwindOpacities.opacities, 'setOpacity')
  }

  deleteAllComponents() {
    this.pageBuilderStateStore.setComponents([])
  }

  async deleteSelectedComponent() {
    if (!this.getComponents.value || !this.getComponent.value) return

    // Find the index of the component to delete
    const indexToDelete = this.getComponents.value.findIndex(
      (component) => component.id === this.getComponent.value?.id,
    )

    if (indexToDelete === -1) {
      // Component not found in the array, handle this case as needed.
      return
    }

    // Remove the component from the array
    this.getComponents.value.splice(indexToDelete, 1)
    this.pageBuilderStateStore.setComponents(this.getComponents.value)
    await nextTick()
    await this.addListenersToEditableElements()

    this.pageBuilderStateStore.setComponent(null)
    this.pageBuilderStateStore.setElement(null)
  }

  // move component
  // runs when html components are rearranged
  reorderComponent(direction: number): void {
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

  ensureTextAreaHasContent = () => {
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

  handleTextInput = async (textContentVueModel: string): Promise<void> => {
    if (typeof this.getElement.value?.innerHTML !== 'string') {
      return
    }

    if (typeof this.getElement.value.innerHTML === 'string') {
      await this.nextTick

      // Update text content
      this.getElement.value.textContent = textContentVueModel

      this.pageBuilderStateStore.setTextAreaVueModel(this.getElement.value.innerHTML)

      this.getElement.value.innerHTML = textContentVueModel
    }

    this.ensureTextAreaHasContent()
  }

  //
  //
  ElOrFirstChildIsIframe() {
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
  isSelectedElementValidText() {
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

  previewCurrentDesign() {
    this.pageBuilderStateStore.setElement(null)

    const pagebuilder = document.querySelector('#pagebuilder')

    if (!pagebuilder) return

    const addedHtmlComponents = ref<string[]>([])
    // preview current design in external browser tab
    // iterate over each top-level section component within pagebuilder only
    pagebuilder.querySelectorAll('section:not(section section)').forEach((section) => {
      // remove hovered and selected

      // remove hovered
      const hoveredElement = section.querySelector('[hovered]')
      if (hoveredElement) {
        hoveredElement.removeAttribute('hovered')
      }

      // remove selected
      const selectedElement = section.querySelector('[selected]')
      if (selectedElement) {
        selectedElement.removeAttribute('selected')
      }

      // push outer html into the array
      addedHtmlComponents.value.push(section.outerHTML)
    })

    // stringify added html components
    const stringifiedComponents = JSON.stringify(addedHtmlComponents.value)

    // commit
    this.pageBuilderStateStore.setCurrentLayoutPreview(stringifiedComponents)

    // set added html components back to empty array
    addedHtmlComponents.value = []

    //
  }

  // Helper function to sanitize title for localStorage key
  private sanitizeForLocalStorage(input: string): string {
    return input
      .trim() // Remove leading/trailing spaces
      .toLowerCase() // Convert to lowercase
      .replace(/\s+/g, '-') // Replace one or more spaces with single hyphen
      .replace(/[^a-z0-9-]/g, '') // Remove all non-alphanumeric characters except hyphens
      .replace(/-+/g, '-') // Replace multiple consecutive hyphens with single hyphen
      .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
  }

  #updateLocalStorageItemName(): void {
    const updateOrCreate =
      this.pageBuilderStateStore.getPageBuilderConfig &&
      this.pageBuilderStateStore.getPageBuilderConfig.updateOrCreate &&
      this.pageBuilderStateStore.getPageBuilderConfig.updateOrCreate.formType

    const resourceData = this.pageBuilderStateStore.getPageBuilderConfig?.resourceData

    const resourceFormName =
      this.pageBuilderStateStore.getPageBuilderConfig?.updateOrCreate?.formName

    // Logic for create resource
    if (updateOrCreate === 'create') {
      if (resourceFormName && resourceFormName.length > 0) {
        this.pageBuilderStateStore.setLocalStorageItemName(
          `page-builder-create-resource-${this.sanitizeForLocalStorage(resourceFormName)}`,
        )
        return
      }

      this.pageBuilderStateStore.setLocalStorageItemName(`page-builder-create-resource`)
      return
    }

    // Logic for create
    // Logic for update and with resource form name
    if (updateOrCreate === 'update') {
      if (typeof resourceFormName === 'string' && resourceFormName.length > 0) {
        //
        //
        if (resourceData && resourceData != null && !resourceData.title) {
          // Check if id is missing, null, undefined, or an empty string (after trimming)
          if (!resourceData.id || typeof resourceData.id === 'string') {
            this.pageBuilderStateStore.setLocalStorageItemName(
              `page-builder-update-resource-${this.sanitizeForLocalStorage(resourceFormName)}`,
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
                `page-builder-update-resource-${this.sanitizeForLocalStorage(resourceFormName)}-${this.sanitizeForLocalStorage(resourceData.title)}`,
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
                `page-builder-update-resource-${this.sanitizeForLocalStorage(resourceFormName)}-${this.sanitizeForLocalStorage(String(resourceData.id))}`,
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
                `page-builder-update-resource-${this.sanitizeForLocalStorage(resourceFormName)}-${this.sanitizeForLocalStorage(resourceData.title)}-${this.sanitizeForLocalStorage(String(resourceData.id))}`,
              )
              return
            }
          }
        }
      }

      // Logic for update without without resourceFormName
      if (
        !resourceFormName ||
        (typeof resourceFormName === 'string' && resourceFormName.length === 0)
      ) {
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

  /**
   * Components from DOM → JS (not JS → DOM).
   * Saving the current DOM state into JS this.getComponents (for example, before saving to localStorage).
   * This function Only copies the current DOM HTML into JS this.getComponents (component.html_code).
   */
  #domToComponentsSync = async () => {
    const pagebuilder = document.querySelector('#pagebuilder')
    if (!pagebuilder) return

    const hoveredElement = pagebuilder.querySelector('[hovered]')
    if (hoveredElement) {
      hoveredElement.removeAttribute('hovered')
    }

    const componentsToSave: { html_code: string; id: string | null; title: string }[] = []

    pagebuilder.querySelectorAll('section[data-componentid]').forEach((section) => {
      componentsToSave.push({
        html_code: section.outerHTML,
        id: section.getAttribute('data-componentid'),
        title: section.getAttribute('data-component-title') || 'Untitled Component',
      })
    })

    // Save to localStorage with pageBuilderContentSavedAt using the correct key
    const dataToSave = {
      components: componentsToSave,
      pageBuilderContentSavedAt: new Date().toISOString(),
    }

    const keyForSavingFromDomToLocal = this.getLocalStorageItemName.value

    if (keyForSavingFromDomToLocal && typeof keyForSavingFromDomToLocal === 'string') {
      localStorage.setItem(keyForSavingFromDomToLocal, JSON.stringify(dataToSave))
    }

    // No DOM mutation here!
    await new Promise<void>((resolve) => resolve())
  }

  // save to local storage
  async saveComponentsLocalStorage() {
    await this.nextTick

    await this.#domToComponentsSync()
  }

  async removeItemComponentsLocalStorage() {
    await this.nextTick

    if (this.getLocalStorageItemName.value) {
      localStorage.removeItem(this.getLocalStorageItemName.value)
    }
  }

  //
  deleteOldPageBuilderLocalStorage(): void {
    if (
      this.pageBuilderStateStore.getPageBuilderConfig &&
      this.pageBuilderStateStore.getPageBuilderConfig.updateOrCreate &&
      typeof this.pageBuilderStateStore.getPageBuilderConfig.updateOrCreate.formType === 'string' &&
      this.pageBuilderStateStore.getPageBuilderConfig.updateOrCreate.formType === 'update'
    ) {
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

  async #hasLocalDraftForUpdate(): Promise<boolean> {
    if (this.hasStartedEditing) return false

    if (
      this.pageBuilderStateStore.getPageBuilderConfig &&
      this.pageBuilderStateStore.getPageBuilderConfig.updateOrCreate &&
      typeof this.pageBuilderStateStore.getPageBuilderConfig.updateOrCreate.formType === 'string' &&
      this.pageBuilderStateStore.getPageBuilderConfig.updateOrCreate.formType === 'update'
    ) {
      const key = this.getLocalStorageItemName.value
      if (typeof key === 'string') {
        const draft = localStorage.getItem(key)
        if (draft) {
          try {
            await this.delay(500)

            return true
            // const dbComponents = this.getComponents.value
            // const draftParsed = JSON.parse(draft)
            // return JSON.stringify(draftParsed.components) !== JSON.stringify(dbComponents)
          } catch (err) {
            console.error('Unable to mount components to DOM.', err)
            return false
          }
        }
      }
    }
    return false
  }

  // Call this when the user starts editing (e.g., on first change or when resuming a draft)
  startEditing() {
    this.hasStartedEditing = true
  }

  //
  async resumeEditingForUpdate() {
    if (
      this.pageBuilderStateStore.getPageBuilderConfig &&
      this.pageBuilderStateStore.getPageBuilderConfig.updateOrCreate &&
      typeof this.pageBuilderStateStore.getPageBuilderConfig.updateOrCreate.formType === 'string' &&
      this.pageBuilderStateStore.getPageBuilderConfig.updateOrCreate.formType === 'update'
    ) {
      const key = this.getLocalStorageItemName.value

      if (typeof key === 'string') {
        const updateDraftFromLocalStorage = localStorage.getItem(key)

        if (typeof updateDraftFromLocalStorage === 'string') {
          this.pageBuilderStateStore.setIsResumeEditing(true)
          await delay(500)
          this.mountComponentsToDOM(updateDraftFromLocalStorage)
          this.pageBuilderStateStore.setIsResumeEditing(false)
        }
      }
    }
  }

  async restoreOriginalContent() {
    if (
      this.pageBuilderStateStore.getPageBuilderConfig &&
      this.pageBuilderStateStore.getPageBuilderConfig.updateOrCreate &&
      typeof this.pageBuilderStateStore.getPageBuilderConfig.updateOrCreate.formType === 'string' &&
      this.pageBuilderStateStore.getPageBuilderConfig.updateOrCreate.formType === 'update'
    ) {
      this.pageBuilderStateStore.setIsRestoring(true)
      await this.delay(300)

      // Restore the original content if available
      if (this.originalComponents) {
        this.mountComponentsToDOM(this.originalComponents)
      }

      await nextTick()
      await this.addListenersToEditableElements()

      this.pageBuilderStateStore.setIsRestoring(false)
    }
  }

  getStorageItemNameForResource(): string | null {
    return this.getLocalStorageItemName.value
  }
  loadStoredComponentsFromStorage() {
    if (!this.getLocalStorageItemName.value) return false

    if (
      this.getLocalStorageItemName.value &&
      typeof this.getLocalStorageItemName.value === 'string' &&
      localStorage.getItem(this.getLocalStorageItemName.value)
    ) {
      const savedCurrentDesign = localStorage.getItem(this.getLocalStorageItemName.value)

      if (savedCurrentDesign) {
        return savedCurrentDesign
      }
    }

    return false
  }
  //
  //
  async updateBasePrimaryImage(): Promise<void> {
    if (!this.getElement.value) return

    // If no data provided, apply current image if available (new simplified usage)
    if (this.getCurrentImage.value && this.getCurrentImage.value.src) {
      await this.nextTick
      this.pageBuilderStateStore.setBasePrimaryImage(`${this.getCurrentImage.value.src}`)
      await this.handleAutoSave()
    }
  }

  setBasePrimaryImageFromCurrent() {
    if (!this.getElement.value) return

    const currentImageContainer = document.createElement('div')

    currentImageContainer.innerHTML = this.getElement.value.outerHTML

    // Get all img and div within the current image container
    const imgElements = currentImageContainer.getElementsByTagName('img')
    const divElements = currentImageContainer.getElementsByTagName('div')

    // Check if there is exactly one img and no div
    if (imgElements.length === 1 && divElements.length === 0) {
      // Return the source of the only img

      this.pageBuilderStateStore.setBasePrimaryImage(imgElements[0].src)

      return
    }

    this.pageBuilderStateStore.setBasePrimaryImage(null)
  }

  #addHyperlinkToElement(
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

  #checkForHyperlink() {
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

  handleHyperlink(
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
      this.#checkForHyperlink()
      return
    }

    this.#addHyperlinkToElement(hyperlinkEnable, urlInput || null, openHyperlinkInNewTab || false)
  }

  // Helper method for custom components to easily add components
  async addComponent(componentObject: ComponentObject): Promise<void> {
    try {
      const clonedComponent = this.cloneCompObjForDOMInsertion({
        html_code: componentObject.html_code,
        id: componentObject.id,
        title: componentObject.title,
      })

      this.pageBuilderStateStore.setPushComponents({
        component: clonedComponent,
        componentArrayAddMethod: this.getComponentArrayAddMethod.value || 'push',
      })

      // Wait for the DOM to update before setting event listeners
      await nextTick()
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

  #addTailwindPrefixToClasses(classList: string, prefix = 'pbx-'): string {
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
  #setComponentsFromData(htmlString: string): void {
    // Auto-detect if input is JSON or HTML
    const trimmedData = htmlString.trim()

    if (trimmedData.startsWith('[') || trimmedData.startsWith('{')) {
      // Looks like JSON - parse as JSON
      this.#parseJSONComponents(trimmedData)
    } else if (trimmedData.startsWith('<')) {
      // Looks like HTML - parse as HTML
      this.#parseHTMLComponents(trimmedData)
    } else {
      this.#parseJSONComponents(trimmedData)
    }
  }

  // Private method to parse JSON components and save pageBuilderContentSavedAt to localStorage
  async #parseJSONComponents(jsonData: string): Promise<void> {
    try {
      const parsedData = JSON.parse(jsonData)
      let componentsArray: ComponentObject[] = []
      // Support both old and new structure
      if (Array.isArray(parsedData)) {
        componentsArray = parsedData
      } else if (parsedData && Array.isArray(parsedData.components)) {
        componentsArray = parsedData.components
      }

      let savedCurrentDesign: ComponentObject[] = []

      if (componentsArray.length > 0) {
        savedCurrentDesign = componentsArray.map((component: ComponentObject) => {
          const parser = new DOMParser()
          const doc = parser.parseFromString(component.html_code, 'text/html')
          const section = doc.querySelector('section')

          if (section) {
            // Process all elements inside section to add prefix to classes
            section.querySelectorAll('[class]').forEach((el) => {
              el.setAttribute(
                'class',
                this.#addTailwindPrefixToClasses(el.getAttribute('class') || '', 'pbx-'),
              )
            })

            // Ensure data-componentid exists
            if (!section.hasAttribute('data-componentid')) {
              const newId = uuidv4()
              section.setAttribute('data-componentid', newId)
              component.id = newId
            } else {
              component.id = section.getAttribute('data-componentid')!
            }

            // Ensure data-component-title exists
            const title = component.title || 'Untitled Component'
            section.setAttribute('data-component-title', title)
            component.title = title

            // Update html_code with modified section
            component.html_code = section.outerHTML
          }

          return component
        })
      }

      this.pageBuilderStateStore.setComponents(savedCurrentDesign)

      await this.clearHtmlSelection()
      await this.addListenersToEditableElements()
    } catch (error) {
      console.error('Error parsing JSON components:', error)
      this.pageBuilderStateStore.setComponents([])
    }
  }
  // Private method to parse HTML components
  #parseHTMLComponents(htmlData: string): void {
    try {
      const parser = new DOMParser()
      const doc = parser.parseFromString(htmlData, 'text/html')

      // Select all <section> elements (with or without data-componentid)
      const sectionElements = doc.querySelectorAll('section')

      const extractedSections: ComponentObject[] = []
      sectionElements.forEach((section) => {
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
    } catch (error) {
      console.error('Error parsing HTML components:', error)
      this.pageBuilderStateStore.setComponents([])
    }
  }

  /**
   * Mount Components to DOM
   * @param passedData - HTML/JSON string to inject (optional)
   * @param preferLocalStorage - if true, always try localStorage first
   */
  mountComponentsToDOM(passedData: string): void {
    // Save the original content only once, in update mode, and only if passedData is provided
    // Form type Update
    if (
      this.pageBuilderStateStore.getPageBuilderConfig &&
      this.pageBuilderStateStore.getPageBuilderConfig.updateOrCreate &&
      typeof this.pageBuilderStateStore.getPageBuilderConfig.updateOrCreate.formType === 'string' &&
      this.pageBuilderStateStore.getPageBuilderConfig.updateOrCreate.formType === 'update' &&
      passedData &&
      !this.originalComponents
    ) {
      this.originalComponents = passedData
    }

    this.pageBuilderStateStore.setComponents([])

    if (!this.pageBuilderStateStore.getPageBuilderConfig) return

    // Form type Update
    if (
      this.pageBuilderStateStore.getPageBuilderConfig &&
      this.pageBuilderStateStore.getPageBuilderConfig.updateOrCreate &&
      typeof this.pageBuilderStateStore.getPageBuilderConfig.updateOrCreate.formType === 'string' &&
      this.pageBuilderStateStore.getPageBuilderConfig.updateOrCreate.formType === 'update'
    ) {
      if (passedData) {
        this.#setComponentsFromData(passedData)
        return
      }
    }

    // Form type Create
    const localStorageData = this.loadStoredComponentsFromStorage()

    if (
      this.pageBuilderStateStore.getPageBuilderConfig &&
      this.pageBuilderStateStore.getPageBuilderConfig.updateOrCreate &&
      typeof this.pageBuilderStateStore.getPageBuilderConfig.updateOrCreate.formType === 'string' &&
      this.pageBuilderStateStore.getPageBuilderConfig.updateOrCreate.formType === 'create'
    ) {
      if (localStorageData) {
        this.#setComponentsFromData(localStorageData)
        return
      }

      // If no localStorage, but passedData exists (for demo), use it
      if (passedData) {
        this.#setComponentsFromData(passedData)
        return
      }
    }
  }

  async toggleTipTapModal(status: boolean): Promise<void> {
    this.pageBuilderStateStore.setShowModalTipTap(status)

    if (!status) {
      await this.handleAutoSave()
    }
  }

  async initializeElementStyles(): Promise<void> {
    if (!this.pageBuilderStateStore.getPageBuilderConfig) return
    await new Promise((resolve) => requestAnimationFrame(resolve))

    // handle custom URL
    this.handleHyperlink(undefined, null, false)
    // handle opacity
    this.handleOpacity(undefined)
    // handle BG opacity
    this.handleBackgroundOpacity(undefined)
    // displayed image
    this.setBasePrimaryImageFromCurrent()
    // border style
    this.handleBorderStyle(undefined)
    // border width
    this.handleBorderWidth(undefined)
    // border color
    this.handleBorderColor(undefined)
    // border radius
    this.handleBorderRadiusGlobal(undefined)
    // border radius
    this.handleBorderRadiusTopLeft(undefined)
    // border radius
    this.handleBorderRadiusTopRight(undefined)
    // border radius
    this.handleBorderRadiusBottomleft(undefined)
    // border radius
    this.handleBorderRadiusBottomRight(undefined)
    // handle font size
    this.handleFontSizeBase(undefined)
    this.handleFontSizeDesktop(undefined)
    this.handleFontSizeTablet(undefined)
    this.handleFontSizeMobile(undefined)
    // handle font weight
    this.handleFontWeight(undefined)
    // handle font family
    this.handleFontFamily(undefined)
    // handle font style
    this.handleFontStyle(undefined)
    // handle vertical padding
    this.handleVerticalPadding(undefined)
    // handle horizontal padding
    this.handleHorizontalPadding(undefined)
    // handle vertical margin
    this.handleVerticalMargin(undefined)
    // handle horizontal margin
    this.handleHorizontalMargin(undefined)
    // handle color
    this.handleBackgroundColor(undefined)
    // handle text color
    this.handleTextColor(undefined)
    // handle classes
    await this.#syncCurrentClasses()
  }
}
