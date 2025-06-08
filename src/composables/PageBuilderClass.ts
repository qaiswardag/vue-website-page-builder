// Type definitions
import type {
  ComponentObject,
  ImageObject,
  TimerHandle,
  MutationObserver as MutationObserverType,
  TailwindColors,
  TailwindOpacities,
  TailwindFontSizes,
  TailwindFontStyles,
  TailwindPaddingAndMargin,
  TailwindBorderRadius,
  TailwindBorderStyleWidthColor,
} from '@/types'
import type { usePageBuilderStateStore } from '@/stores/page-builder-state'

import tailwindColors from '@/utils/builder/tailwaind-colors'
import tailwindOpacities from '@/utils/builder/tailwind-opacities'
import tailwindFontSizes from '@/utils/builder/tailwind-font-sizes'
import tailwindFontStyles from '@/utils/builder/tailwind-font-styles'
import tailwindPaddingAndMargin from '@/utils/builder/tailwind-padding-margin'
import tailwindBorderRadius from '@/utils/builder/tailwind-border-radius'
import tailwindBorderStyleWidthPlusColor from '@/utils/builder/tailwind-border-style-width-color'
import { computed, ref, nextTick, inject } from 'vue'
import type { ComputedRef } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { delay } from '@/composables/delay'

class PageBuilderClass {
  // Class properties with types
  private elementsWithListeners: WeakSet<Element>
  private nextTick: Promise<void>
  private containsPagebuilder: Element | null
  private timer: number | null
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
  private headerTags: string[]
  private additionalTagsNoneListernes: string[]
  private structuringTags: string[]
  private showRunningMethodLogs: boolean
  private delay: ReturnType<typeof delay>
  private observer?: MutationObserverType

  constructor(pageBuilderStateStore: ReturnType<typeof usePageBuilderStateStore>) {
    /**
     * Initialize an instance variable 'elementsWithListeners' as a WeakSet.
     *
     * A WeakSet is a special type of Set that holds weak references to its elements,
     * meaning that an element could be garbage collected if there is no other reference to it.
     * This is especially useful in the context of managing DOM elements and their associated events,
     * as it allows for efficient and automated cleanup of references to DOM elements that have been removed.
     *
     * By checking if an element is in this WeakSet before attaching an event listener,
     * we can prevent redundant addition of the same event listener to an element.
     * This helps in managing the memory usage and performance of the application.
     */
    this.elementsWithListeners = new WeakSet()

    this.nextTick = nextTick()

    this.containsPagebuilder = document.querySelector('#contains-pagebuilder')

    this.timer = null

    // Store is now required parameter - no fallback to inject
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

    this.headerTags = ['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'IFRAME']

    this.additionalTagsNoneListernes = [
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

    this.structuringTags = [
      'DIV',
      'IFRAME',
      'HEADER',
      'NAV',
      'MAIN',
      'ARTICLE',
      'SECTION',
      'ASIDE',
      'FOOTER',
    ]

    this.showRunningMethodLogs = false

    this.delay = delay()
  }

  #applyElementClassChanges(
    selectedCSS: string | undefined,
    CSSArray: string[],
    mutationName: string,
  ): string | undefined {
    //
    //
    if (this.showRunningMethodLogs) {
      console.log('#applyElementClassChanges')
    }

    const currentHTMLElement = this.getElement.value
    if (!currentHTMLElement) return

    // currentCSS array example: ["none","py-0", "py-2", ...] or ['none', 'rounded-sm', 'rounded', 'rounded-md', ...]
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

    if (this.showRunningMethodLogs) {
      console.log('#applyHelperCSSToElements')
    }

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
    if (this.showRunningMethodLogs) {
      console.log('#wrapElementInDivIfExcluded')
    }

    if (
      this.headerTags.includes(element.tagName) &&
      ((element.previousElementSibling && element.previousElementSibling.tagName === 'IMG') ||
        (element.nextElementSibling && element.nextElementSibling.tagName === 'IMG'))
    ) {
      const divWrapper = document.createElement('div')
      element.parentNode?.insertBefore(divWrapper, element)
      divWrapper.appendChild(element)
    }
  }

  #handleElementClick = (e: Event, element: HTMLElement): void => {
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
    if (this.showRunningMethodLogs) {
      console.log('#handleMouseOver')
    }

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
    if (this.showRunningMethodLogs) {
      console.log('#handleMouseLeave')
    }

    e.preventDefault()
    e.stopPropagation()

    const pagebuilder = document.querySelector('#pagebuilder')
    if (!pagebuilder) return

    const hoveredElement = pagebuilder.querySelector('[hovered]')
    if (hoveredElement) {
      hoveredElement.removeAttribute('hovered')
    }
  }

  /**
   * The function is used to
   * attach event listeners to each element within a 'section'
   */
  setEventListenersForElements = async () => {
    console.log('setEventListenersForElements called')

    if (this.showRunningMethodLogs) {
      console.log('setEventListenersForElements')
    }

    const pagebuilder = document.querySelector('#pagebuilder')

    if (!pagebuilder) return

    // Wait for any pending DOM updates
    await nextTick()
    await new Promise((resolve) => requestAnimationFrame(resolve))

    pagebuilder.querySelectorAll('section *').forEach(async (element) => {
      // exclude headerTags && additional Tags for not listening
      if (
        !this.headerTags.includes(element.tagName) &&
        !this.additionalTagsNoneListernes.includes(element.tagName)
      ) {
        if (this.elementsWithListeners && !this.elementsWithListeners.has(element)) {
          this.elementsWithListeners.add(element)
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

  /**
   * The Intersection Observer API provides a way to asynchronously observe changes in the
   * intersection of a target element with an ancestor element or with a top-level document's viewport.
   */
  synchronizeDOMAndComponents = async () => {
    if (this.showRunningMethodLogs) {
      console.log('synchronizeDOMAndComponents')
    }
    if (!this.getComponents.value) {
      this.pageBuilderStateStore.setComponents([])
    }

    const hoveredElement = document.querySelector('[hovered]')
    if (hoveredElement) {
      hoveredElement.removeAttribute('hovered')
    }

    this.getComponents.value?.forEach((component) => {
      const section = document.querySelector(`section[data-componentid="${component.id}"]`)

      if (section) {
        component.html_code = section.outerHTML
      }
    })

    // Initialize the MutationObserver
    this.observer = new MutationObserver((mutationsList, observer) => {
      // Once we have seen a mutation, stop observing and resolve the promise
      observer.disconnect()
    })

    // Start observing the document with the configured parameters
    this.observer.observe(document, {
      attributes: true,
      childList: true,
      subtree: true,
    })

    // Use the MutationObserver to wait for the next DOM change
    await new Promise<void>((resolve) => {
      resolve()
    })
  }

  cloneCompObjForDOMInsertion(componentObject: ComponentObject): ComponentObject {
    if (this.showRunningMethodLogs) {
      console.log('cloneCompObjForDOMInsertion')
    }

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
      // Generate a unique ID using uuidv4() and assign it to the section
      section.dataset.componentid = uuidv4()

      // Find all images within elements with "flex" or "grid" classes inside the section
      const images = section.querySelectorAll('img')

      // Add a unique ID as a data attribute to each image element
      images.forEach((image) => {
        image.setAttribute('data-image', uuidv4())
      })

      // Update the clonedComponent id with the newly generated unique ID
      clonedComponent.id = section.dataset.componentid

      // Update the HTML content of the clonedComponent with the modified HTML
      clonedComponent.html_code = section.outerHTML
    }

    // return to the cloned element to be dropped
    return clonedComponent
  }

  async removeHoveredAndSelected() {
    if (this.showRunningMethodLogs) {
      console.log('removeHoveredAndSelected')
    }

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

  async currentClasses() {
    if (this.showRunningMethodLogs) {
      console.log('handleAddClasses')
    }

    await new Promise((resolve) => requestAnimationFrame(resolve))

    // convert classList to array
    const classListArray = Array.from(this.getElement.value?.classList || [])

    // commit array to store
    this.pageBuilderStateStore.setCurrentClasses(classListArray)
  }

  handleAddClasses(userSelectedClass: string): void {
    if (this.showRunningMethodLogs) {
      console.log('handleAddClasses')
    }

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
    if (this.showRunningMethodLogs) {
      console.log('handleRemoveClasses')
    }

    // remove selected class from element
    if (this.getElement.value?.classList.contains(userSelectedClass)) {
      this.getElement.value?.classList.remove(userSelectedClass)

      this.pageBuilderStateStore.setElement(this.getElement.value)
      this.pageBuilderStateStore.removeClass(userSelectedClass)
    }
  }

  handleDeleteElement() {
    if (this.showRunningMethodLogs) {
      console.log('handleDeleteElement')
    }

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
      this.deleteComponent()
    }

    // Remove the element from the DOM
    element.remove()
    this.pageBuilderStateStore.setComponent(null)
    this.pageBuilderStateStore.setElement(null)
  }

  handleRestoreElement() {
    if (this.showRunningMethodLogs) {
      console.log('handleRestoreElement')
    }

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

    this.setEventListenersForElements()
  }

  handleFontWeight(userSelectedFontWeight?: string): void {
    if (this.showRunningMethodLogs) {
      console.log('handleFontWeight')
    }

    this.#applyElementClassChanges(
      userSelectedFontWeight,
      tailwindFontStyles.fontWeight,
      'setFontWeight',
    )
  }
  handleFontFamily(userSelectedFontFamily?: string): void {
    if (this.showRunningMethodLogs) {
      console.log('handleFontFamily')
    }

    this.#applyElementClassChanges(
      userSelectedFontFamily,
      tailwindFontStyles.fontFamily,
      'setFontFamily',
    )
  }
  handleFontStyle(userSelectedFontStyle?: string): void {
    if (this.showRunningMethodLogs) {
      console.log('handleFontStyle')
    }

    this.#applyElementClassChanges(
      userSelectedFontStyle,
      tailwindFontStyles.fontStyle,
      'setFontStyle',
    )
  }
  handleVerticalPadding(userSelectedVerticalPadding?: string): void {
    if (this.showRunningMethodLogs) {
      console.log('handleVerticalPadding')
    }

    this.#applyElementClassChanges(
      userSelectedVerticalPadding,
      tailwindPaddingAndMargin.verticalPadding,
      'setFontVerticalPadding',
    )
  }
  handleHorizontalPadding(userSelectedHorizontalPadding?: string): void {
    if (this.showRunningMethodLogs) {
      console.log('handleHorizontalPadding')
    }

    this.#applyElementClassChanges(
      userSelectedHorizontalPadding,
      tailwindPaddingAndMargin.horizontalPadding,
      'setFontHorizontalPadding',
    )
  }

  handleVerticalMargin(userSelectedVerticalMargin?: string): void {
    if (this.showRunningMethodLogs) {
      console.log('handleVerticalMargin')
    }

    this.#applyElementClassChanges(
      userSelectedVerticalMargin,
      tailwindPaddingAndMargin.verticalMargin,
      'setFontVerticalMargin',
    )
  }
  handleHorizontalMargin(userSelectedHorizontalMargin?: string): void {
    if (this.showRunningMethodLogs) {
      console.log('handleHorizontalMargin')
    }

    this.#applyElementClassChanges(
      userSelectedHorizontalMargin,
      tailwindPaddingAndMargin.horizontalMargin,
      'setFontHorizontalMargin',
    )
  }

  // border color, style & width / start
  handleBorderStyle(borderStyle?: string): void {
    if (this.showRunningMethodLogs) {
      console.log('handleBorderStyle')
    }

    this.#applyElementClassChanges(
      borderStyle,
      tailwindBorderStyleWidthPlusColor.borderStyle,
      'setBorderStyle',
    )
  }
  handleBorderWidth(borderWidth?: string): void {
    if (this.showRunningMethodLogs) {
      console.log('handleBorderWidth')
    }

    this.#applyElementClassChanges(
      borderWidth,
      tailwindBorderStyleWidthPlusColor.borderWidth,
      'setBorderWidth',
    )
  }
  handleBorderColor(borderColor?: string): void {
    if (this.showRunningMethodLogs) {
      console.log('handleBorderColor')
    }

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

  // border radius / start
  handleBorderRadiusGlobal(borderRadiusGlobal?: string): void {
    if (this.showRunningMethodLogs) {
      console.log('handleBorderRadiusGlobal')
    }

    this.#applyElementClassChanges(
      borderRadiusGlobal,
      tailwindBorderRadius.roundedGlobal,
      'setBorderRadiusGlobal',
    )
  }
  handleBorderRadiusTopLeft(borderRadiusTopLeft?: string): void {
    if (this.showRunningMethodLogs) {
      console.log('handleBorderRadiusTopLeft')
    }

    this.#applyElementClassChanges(
      borderRadiusTopLeft,
      tailwindBorderRadius.roundedTopLeft,
      'setBorderRadiusTopLeft',
    )
  }
  handleBorderRadiusTopRight(borderRadiusTopRight?: string): void {
    if (this.showRunningMethodLogs) {
      console.log('handleBorderRadiusTopRight')
    }

    this.#applyElementClassChanges(
      borderRadiusTopRight,
      tailwindBorderRadius.roundedTopRight,
      'setBorderRadiusTopRight',
    )
  }
  handleBorderRadiusBottomleft(borderRadiusBottomleft?: string): void {
    if (this.showRunningMethodLogs) {
      console.log('handleBorderRadiusBottomleft')
    }

    this.#applyElementClassChanges(
      borderRadiusBottomleft,
      tailwindBorderRadius.roundedBottomLeft,
      'setBorderRadiusBottomleft',
    )
  }
  handleBorderRadiusBottomRight(borderRadiusBottomRight?: string): void {
    if (this.showRunningMethodLogs) {
      console.log('handleBorderRadiusBottomRight')
    }

    this.#applyElementClassChanges(
      borderRadiusBottomRight,
      tailwindBorderRadius.roundedBottomRight,
      'setBorderRadiusBottomRight',
    )
  }
  // border radius / end

  handleFontSize(userSelectedFontSize?: string): void {
    if (this.showRunningMethodLogs) {
      console.log('handleFontSize')
    }

    if (!userSelectedFontSize) return
    if (!this.getElement.value) return

    let fontBase = tailwindFontSizes.fontBase.find((size: string) => {
      return this.getElement.value?.classList.contains(size)
    })
    if (fontBase === undefined) {
      fontBase = 'base:none'
    }

    let fontDesktop = tailwindFontSizes.fontDesktop.find((size: string) => {
      return this.getElement.value?.classList.contains(size)
    })
    if (fontDesktop === undefined) {
      fontDesktop = 'lg:none'
    }

    let fontTablet = tailwindFontSizes.fontTablet.find((size: string) => {
      return this.getElement.value?.classList.contains(size)
    })
    if (fontTablet === undefined) {
      fontTablet = 'md:none'
    }

    let fontMobile = tailwindFontSizes.fontMobile.find((size: string) => {
      return this.getElement.value?.classList.contains(size)
    })
    if (fontMobile === undefined) {
      fontMobile = 'sm:none'
    }

    // set fonts
    this.pageBuilderStateStore.setFontBase(fontBase)
    this.pageBuilderStateStore.setFontDesktop(fontDesktop)
    this.pageBuilderStateStore.setFontTablet(fontTablet)
    this.pageBuilderStateStore.setFontMobile(fontMobile)

    const getFontBase = computed(() => {
      return this.pageBuilderStateStore.getFontBase
    })
    const getFontDesktop = computed(() => {
      return this.pageBuilderStateStore.getFontDesktop
    })
    const getFontTablet = computed(() => {
      return this.pageBuilderStateStore.getFontTablet
    })
    const getFontMobile = computed(() => {
      return this.pageBuilderStateStore.getFontMobile
    })

    if (userSelectedFontSize !== undefined && this.getElement.value) {
      if (
        !userSelectedFontSize.includes('sm:') &&
        !userSelectedFontSize.includes('md:') &&
        !userSelectedFontSize.includes('lg:')
      ) {
        if (getFontBase.value) {
          this.getElement.value.classList.remove(getFontBase.value)
        }
        if (!userSelectedFontSize.includes('base:none')) {
          this.getElement.value.classList.add(userSelectedFontSize)
        }

        this.pageBuilderStateStore.setFontBase(userSelectedFontSize)
      }
      if (userSelectedFontSize.includes('lg:')) {
        if (getFontDesktop.value) {
          this.getElement.value.classList.remove(getFontDesktop.value)
        }
        if (!userSelectedFontSize.includes('lg:none')) {
          this.getElement.value.classList.add(userSelectedFontSize)
        }

        this.pageBuilderStateStore.setFontDesktop(userSelectedFontSize)
      }
      if (userSelectedFontSize.includes('md:')) {
        if (getFontTablet.value) {
          this.getElement.value.classList.remove(getFontTablet.value)
        }
        if (!userSelectedFontSize.includes('md:none')) {
          this.getElement.value.classList.add(userSelectedFontSize)
        }

        this.pageBuilderStateStore.setFontTablet(userSelectedFontSize)
      }
      if (userSelectedFontSize.includes('sm:')) {
        if (getFontMobile.value) {
          this.getElement.value.classList.remove(getFontMobile.value)
        }
        if (!userSelectedFontSize.includes('sm:none')) {
          this.getElement.value.classList.add(userSelectedFontSize)
        }

        this.pageBuilderStateStore.setFontMobile(userSelectedFontSize)
      }
      this.pageBuilderStateStore.setElement(this.getElement.value)
    }
  }

  handleBackgroundOpacity(opacity?: string): void {
    if (this.showRunningMethodLogs) {
      console.log('handleBackgroundOpacity')
    }

    this.#applyElementClassChanges(
      opacity,
      tailwindOpacities.backgroundOpacities,
      'setBackgroundOpacity',
    )
  }
  handleOpacity(opacity?: string): void {
    if (this.showRunningMethodLogs) {
      console.log('handleOpacity')
    }

    this.#applyElementClassChanges(opacity, tailwindOpacities.opacities, 'setOpacity')
  }

  deleteAllComponents() {
    if (this.showRunningMethodLogs) {
      console.log('deleteAllComponents')
    }

    this.pageBuilderStateStore.setComponents([])
  }

  deleteComponent() {
    if (this.showRunningMethodLogs) {
      console.log('deleteComponent')
    }

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

    this.pageBuilderStateStore.setComponent(null)
    this.pageBuilderStateStore.setElement(null)
  }

  // move component
  // runs when html components are rearranged
  moveComponent(direction: number): void {
    if (this.showRunningMethodLogs) {
      console.log('moveComponent')
    }

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
    if (this.showRunningMethodLogs) {
      console.log('ensureTextAreaHasContent')
    }

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

  //
  handleTextInput = async (textContentVueModel: string): Promise<void> => {
    if (this.showRunningMethodLogs) {
      console.log('handleTextInput')
    }

    // // text content
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
  selectedElementIsValidText() {
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
    if (this.showRunningMethodLogs) {
      console.log('previewCurrentDesign')
    }

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

  updateLocalStorageItemName(): void {
    const updateOrCreate = this.pageBuilderStateStore.getUpdateOrCreate

    const resourceData = this.pageBuilderStateStore.getCurrentResourceData

    // Logic for update
    if (updateOrCreate === 'create') {
      this.pageBuilderStateStore.setLocalStorageItemName(`page-builder-create-resource`)
      return
    }

    // Logic for update
    if (updateOrCreate === 'update') {
      // if resource data is null
      if (resourceData === null) {
        this.pageBuilderStateStore.setLocalStorageItemName(`page-builder-update-resource`)
        return
      }

      // If resource is present

      // Runs when resourceData has id but no title
      if (typeof resourceData === 'object' && 'id' in resourceData && !('title' in resourceData)) {
        const sanitizedId = this.sanitizeForLocalStorage(String(resourceData['id']))
        console.log('ID BUT NOT TITLE:', `page-builder-update-resource-${sanitizedId}`)

        this.pageBuilderStateStore.setLocalStorageItemName(
          `page-builder-update-resource-${sanitizedId}`,
        )
        return
      }

      // Runs when resourceData has title but no id
      if (typeof resourceData === 'object' && 'title' in resourceData && !('id' in resourceData)) {
        const sanitizedTitle = this.sanitizeForLocalStorage(String(resourceData['title']))
        console.log('TITLE BUT NOT ID:', `page-builder-update-resource-${sanitizedTitle}`)

        this.pageBuilderStateStore.setLocalStorageItemName(
          `page-builder-update-resource-${sanitizedTitle}`,
        )
        return
      }

      // Runs when resourceData has both title and id
      if (typeof resourceData === 'object' && 'title' in resourceData && 'id' in resourceData) {
        const sanitizedId = this.sanitizeForLocalStorage(String(resourceData['id']))
        const sanitizedTitle = this.sanitizeForLocalStorage(String(resourceData['title']))

        this.pageBuilderStateStore.setLocalStorageItemName(
          `page-builder-update-resource-${sanitizedTitle}-${sanitizedId}`,
        )
        return
      }

      console.log('both are there...')
    }
  }

  async saveComponentsLocalStorage() {
    await this.nextTick
    this.synchronizeDOMAndComponents()

    if (this.showRunningMethodLogs) {
      console.log('saveComponentsLocalStorage')
    }

    await this.nextTick
    if (this.getLocalStorageItemName.value) {
      localStorage.setItem(
        this.getLocalStorageItemName.value,
        JSON.stringify(this.getComponents.value),
      )
    }
  }

  async removeItemComponentsLocalStorageCreate() {
    console.log('removeItemComponentsLocalStorageCreate')
    if (this.showRunningMethodLogs) {
      console.log('removeItemComponentsLocalStorageCreate')
    }

    await this.nextTick

    if (this.getLocalStorageItemName.value) {
      localStorage.removeItem(this.getLocalStorageItemName.value)
    }
  }

  async removeItemComponentsLocalStorageUpdate() {
    console.log('removeItemComponentsLocalStorageUpdate')
    if (this.showRunningMethodLogs) {
      console.log('saveComponentsLocalStorageUpdate')
    }

    if (this.getLocalStorageItemName.value) {
      localStorage.removeItem(this.getLocalStorageItemName.value)
    }
  }

  areComponentsStoredInLocalStorage() {
    if (this.showRunningMethodLogs) {
      console.log('areComponentsStoredInLocalStorage')
    }

    if (!this.getLocalStorageItemName.value) return false

    if (
      this.getLocalStorageItemName.value &&
      localStorage.getItem(this.getLocalStorageItemName.value)
    ) {
      const savedCurrentDesign = localStorage.getItem(this.getLocalStorageItemName.value)

      if (savedCurrentDesign) {
        let components = JSON.parse(savedCurrentDesign)

        // Ensure components is always an array
        components = Array.isArray(components) ? components : []

        // Transform HTML strings to component objects if needed
        if (components.length > 0 && typeof components[0] === 'string') {
          components = components.map((htmlString: string) => ({
            html_code: htmlString,
          }))
        }

        this.pageBuilderStateStore.setComponents(components)

        return true
      }
    }

    return false
  }
  //
  //
  async updateBasePrimaryImage(data?: { type: string }): Promise<void> {
    if (this.showRunningMethodLogs) {
      console.log('updateBasePrimaryImage')
    }

    if (!this.getElement.value) return

    // If data is provided, check for specific type (backward compatibility)
    if (data && data.type === 'unsplash' && this.getCurrentImage.value) {
      if (this.getCurrentImage.value.src) {
        await this.nextTick
        this.pageBuilderStateStore.setBasePrimaryImage(`${this.getCurrentImage.value.src}`)
      }
    }
    // If no data provided, apply current image if available (new simplified usage)
    if (this.getCurrentImage.value && this.getCurrentImage.value.src) {
      await this.nextTick
      this.pageBuilderStateStore.setBasePrimaryImage(`${this.getCurrentImage.value.src}`)
    }
  }

  showBasePrimaryImage() {
    if (this.showRunningMethodLogs) {
      console.log('showBasePrimaryImage')
    }

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
    if (this.showRunningMethodLogs) {
      console.log('#addHyperlinkToElement')
    }

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
    if (this.showRunningMethodLogs) {
      console.log('#checkForHyperlink')
    }

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
    if (this.showRunningMethodLogs) {
      console.log('handleHyperlink')
    }

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
    //
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

  async handlePageBuilderMethods(): Promise<void> {
    await new Promise((resolve) => requestAnimationFrame(resolve))

    this.pageBuilderStateStore.setParentElement(null)
    this.pageBuilderStateStore.setRestoredElement(null)

    // handle custom URL
    this.handleHyperlink(undefined, null, false)
    // handle opacity
    this.handleOpacity(undefined)
    // handle BG opacity
    this.handleBackgroundOpacity(undefined)
    // displayed image
    this.showBasePrimaryImage()
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
    this.handleFontSize(undefined)
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
    await this.currentClasses()
  }

  // Helper method for custom components to easily add components
  async addComponent(componentObject: ComponentObject): Promise<void> {
    if (this.showRunningMethodLogs) {
      console.log('addComponent')
    }

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
      this.setEventListenersForElements()
    } catch (error) {
      console.error('Error adding component:', error)
    }
  }

  // Load existing content from HTML when in update mode
  loadExistingContent(): void {
    if (this.showRunningMethodLogs) {
      console.log('loadExistingContent')
    }

    if (this.pageBuilderStateStore.getUpdateOrCreate === 'update') {
      if (this.areComponentsStoredInLocalStorage()) {
        try {
          // set components
          const htmlOutput =
            Array.isArray(this.getComponents.value) &&
            this.getComponents.value
              .map((component) => {
                return component.html_code
              })
              .join('')
        } catch (error) {
          console.error('Error loading existing content:', error)
        }
      }
    }
  }
}

export default PageBuilderClass
