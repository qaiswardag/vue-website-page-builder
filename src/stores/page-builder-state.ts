import { defineStore } from 'pinia'
import { nextTick } from 'vue'
import { vueFetch } from '@/composables/vueFetch'
import type {
  ComponentObject,
  FetchedComponentsResponse,
  SetPushComponentsPayload,
  LoadComponentsData,
  ImageObject,
  UserSettings,
  User,
} from '@/types'

// Media Library interfaces
interface UnsplashImagesData {
  fetchedMedia: unknown
  isError: boolean | null
  error: unknown
  errors: unknown
  isLoading: boolean | null
  isSuccess: boolean | null
}

interface LoadUnsplashImagesPayload {
  orientation?: string
  currentPage: number
  searchTerm?: string
}

interface PageBuilderState {
  // Core Page Builder State
  pageBuilderLogo: string | null
  componentArrayAddMethod: string | null
  localStorageItemName: string | null
  showModalTipTap: boolean
  menuRight: boolean
  borderStyle: string | null
  borderWidth: string | null
  borderColor: string | null
  borderRadiusGlobal: string | null
  borderRadiusTopLeft: string | null
  borderRadiusTopRight: string | null
  borderRadiusBottomleft: string | null
  borderRadiusBottomRight: string | null
  elementContainsHyperlink: boolean | null
  hyperlinkAbility: boolean | null
  hyperlinkInput: string | null
  hyperlinkMessage: string | null
  hyperlinkError: string | null
  hyberlinkEnable: boolean
  openHyperlinkinkInNewTab: boolean | null
  opacity: string | null
  backgroundOpacity: string | null
  textAreaVueModel: string | null
  nextSibling: HTMLElement | null
  parentElement: HTMLElement | null
  restoredElement: string | null
  currentClasses: string[]
  fontVerticalPadding: string | null
  fontHorizontalPadding: string | null
  fontVerticalMargin: string | null
  fontHorizontalMargin: string | null
  fontStyle: string | null
  fontFamily: string | null
  fontWeight: string | null
  fontBase: string | null
  fontDesktop: string | null
  fontTablet: string | null
  fontMobile: string | null
  backgroundColor: string | null
  textColor: string | null
  element: (HTMLElement & { src?: string }) | null
  component: ComponentObject | null
  components: ComponentObject[]
  basePrimaryImage: string | null
  fetchedComponents: FetchedComponentsResponse | null
  currentResourceData: { title: string; id: number } | null
  updateOrCreate: string

  // Media Library State
  currentImage: ImageObject
  currentPreviewImage: string | null

  // User State
  isLoading: boolean
  userSettings: UserSettings | null
  currentUser: User | null

  // Unsplash State
  unsplashImages: UnsplashImagesData | null
  searchTerm: string
  currentPageNumber: number
  orientationValue: string | null
}

// get components
const {
  handleData: handlefetchComponents,
  fetchedData: fetchedComponents,
  isLoading,
  isError,
  error,
} = vueFetch()

// get unsplash images
const {
  handleData: handleGetImages,
  fetchedData: fetchedMedia,
  isError: isErrorImages,
  error: errorImages,
  errors: errorsImages,
  isLoading: isLoadingImages,
  isSuccess: isSuccessImages,
} = vueFetch()

export const usePageBuilderStateStore = defineStore('pageBuilderState', {
  state: (): PageBuilderState => ({
    // Core Page Builder State
    pageBuilderLogo: null,
    componentArrayAddMethod: null,
    localStorageItemName: null,
    showModalTipTap: false,
    menuRight: true,
    borderStyle: null,
    borderWidth: null,
    borderColor: null,
    borderRadiusGlobal: null,
    borderRadiusTopLeft: null,
    borderRadiusTopRight: null,
    borderRadiusBottomleft: null,
    borderRadiusBottomRight: null,
    elementContainsHyperlink: null,
    hyperlinkAbility: null,
    hyperlinkInput: null,
    hyperlinkMessage: null,
    hyperlinkError: null,
    hyberlinkEnable: false,
    openHyperlinkinkInNewTab: null,
    opacity: null,
    backgroundOpacity: null,
    textAreaVueModel: null,
    nextSibling: null,
    parentElement: null,
    restoredElement: null,
    currentClasses: [],
    fontVerticalPadding: null,
    fontHorizontalPadding: null,
    fontVerticalMargin: null,
    fontHorizontalMargin: null,
    fontStyle: null,
    fontFamily: null,
    fontWeight: null,
    fontBase: null,
    fontDesktop: null,
    fontTablet: null,
    fontMobile: null,
    backgroundColor: null,
    textColor: null,
    element: null,
    component: null,
    components: [],
    basePrimaryImage: null,
    fetchedComponents: null,
    currentResourceData: null,
    updateOrCreate: '',

    // Media Library State
    currentImage: { src: '' },
    currentPreviewImage: null,

    // User State
    isLoading: false,
    userSettings: null,
    currentUser: null,

    // Unsplash State
    unsplashImages: null,
    searchTerm: '',
    currentPageNumber: 1,
    orientationValue: null,
  }),
  getters: {
    // Core Page Builder Getters
    getPageBuilderLogo(state: PageBuilderState): string | null {
      return state.pageBuilderLogo
    },
    getComponentArrayAddMethod(state: PageBuilderState): string | null {
      return state.componentArrayAddMethod
    },
    getLocalStorageItemName(state: PageBuilderState): string | null {
      return state.localStorageItemName
    },
    getShowModalTipTap(state: PageBuilderState): boolean {
      return state.showModalTipTap
    },
    getMenuRight(state: PageBuilderState): boolean {
      return state.menuRight
    },
    getBorderStyle(state: PageBuilderState): string | null {
      return state.borderStyle
    },
    getBorderWidth(state: PageBuilderState): string | null {
      return state.borderWidth
    },
    getBorderColor(state: PageBuilderState): string | null {
      return state.borderColor
    },
    getBorderRadiusGlobal(state: PageBuilderState): string | null {
      return state.borderRadiusGlobal
    },
    getBorderRadiusTopLeft(state: PageBuilderState): string | null {
      return state.borderRadiusTopLeft
    },
    getBorderRadiusTopRight(state: PageBuilderState): string | null {
      return state.borderRadiusTopRight
    },
    getBorderRadiusBottomleft(state: PageBuilderState): string | null {
      return state.borderRadiusBottomleft
    },
    getBorderRadiusBottomRight(state: PageBuilderState): string | null {
      return state.borderRadiusBottomRight
    },
    getElementContainsHyperlink(state: PageBuilderState): boolean | null {
      return state.elementContainsHyperlink
    },
    getHyperlinkAbility(state: PageBuilderState): boolean | null {
      return state.hyperlinkAbility
    },
    getHyperlinkInput(state: PageBuilderState): string | null {
      return state.hyperlinkInput
    },
    getHyperlinkMessage(state: PageBuilderState): string | null {
      return state.hyperlinkMessage
    },
    getHyperlinkError(state: PageBuilderState): string | null {
      return state.hyperlinkError
    },
    getHyberlinkEnable(state: PageBuilderState): boolean {
      return state.hyberlinkEnable
    },
    getOpenHyperlinkInNewTab(state: PageBuilderState): boolean | null {
      return state.openHyperlinkinkInNewTab
    },
    getOpacity(state: PageBuilderState): string | null {
      return state.opacity
    },
    getBackgroundOpacity(state: PageBuilderState): string | null {
      return state.backgroundOpacity
    },
    getTextAreaVueModel(state: PageBuilderState): string | null {
      return state.textAreaVueModel
    },
    getNextSibling(state: PageBuilderState): HTMLElement | null {
      return state.nextSibling
    },
    getParentElement(state: PageBuilderState): HTMLElement | null {
      return state.parentElement
    },
    getRestoredElement(state: PageBuilderState): string | null {
      return state.restoredElement
    },
    getCurrentClasses(state: PageBuilderState): string[] {
      return state.currentClasses
    },
    getFontStyle(state: PageBuilderState): string | null {
      return state.fontStyle
    },
    getFontVerticalPadding(state: PageBuilderState): string | null {
      return state.fontVerticalPadding
    },
    getFontHorizontalPadding(state: PageBuilderState): string | null {
      return state.fontHorizontalPadding
    },
    getFontVerticalMargin(state: PageBuilderState): string | null {
      return state.fontVerticalMargin
    },
    getFontHorizontalMargin(state: PageBuilderState): string | null {
      return state.fontHorizontalMargin
    },
    getFontFamily(state: PageBuilderState): string | null {
      return state.fontFamily
    },
    getFontWeight(state: PageBuilderState): string | null {
      return state.fontWeight
    },
    getFontBase(state: PageBuilderState): string | null {
      return state.fontBase
    },
    getFontDesktop(state: PageBuilderState): string | null {
      return state.fontDesktop
    },
    getFontTablet(state: PageBuilderState): string | null {
      return state.fontTablet
    },
    getFontMobile(state: PageBuilderState): string | null {
      return state.fontMobile
    },
    getBackgroundColor(state: PageBuilderState): string | null {
      return state.backgroundColor
    },
    getTextColor(state: PageBuilderState): string | null {
      return state.textColor
    },
    getElement(state: PageBuilderState): HTMLElement | null {
      return state.element
    },
    getComponent(state: PageBuilderState): ComponentObject | null {
      return state.component
    },
    getComponents(state: PageBuilderState): ComponentObject[] {
      return state.components
    },
    getBasePrimaryImage(state: PageBuilderState): string | null {
      return state.basePrimaryImage
    },
    getFetchedComponents(): {
      isLoading: boolean
      isError: boolean
      error: string | null
      fetchedData: unknown
    } {
      return {
        isLoading: isLoading.value,
        isError: isError.value,
        error: error.value,
        fetchedData: fetchedComponents.value,
      }
    },
    getFetchedComponentsData(state: PageBuilderState): FetchedComponentsResponse | null {
      return state.fetchedComponents
    },
    getCurrentResourceData(state: PageBuilderState): { title: string; id: number } | null {
      return state.currentResourceData
    },
    getUpdateOrCreate(state: PageBuilderState): string {
      return state.updateOrCreate
    },

    // Media Library Getters
    getCurrentImage(state: PageBuilderState): ImageObject {
      return state.currentImage
    },
    getCurrentPreviewImage(state: PageBuilderState): string | null {
      return state.currentPreviewImage
    },

    // User Getters
    getIsLoading: (state: PageBuilderState): boolean => state.isLoading,
    getUserSettings: (state: PageBuilderState): UserSettings | null => state.userSettings,
    getCurrentUser: (state: PageBuilderState): User | null => state.currentUser,

    // Unsplash Getters
    getUnsplashImages: (state: PageBuilderState): UnsplashImagesData | null => {
      return state.unsplashImages
    },
    getSearchTerm: (state: PageBuilderState): string => state.searchTerm,
    getCurrentPageNumber: (state: PageBuilderState): number => state.currentPageNumber,
    getOrientationValue: (state: PageBuilderState): string | null => state.orientationValue,
  },
  actions: {
    // Core Page Builder Actions
    setPageBuilderLogo(payload: string | null): void {
      this.pageBuilderLogo = payload
    },
    setComponentArrayAddMethod(payload: string | null): void {
      this.componentArrayAddMethod = payload
    },
    setLocalStorageItemName(payload: string | null): void {
      this.localStorageItemName = payload
    },
    setShowModalTipTap(payload: boolean): void {
      this.showModalTipTap = payload
    },
    setMenuRight(payload: boolean): void {
      this.menuRight = payload
    },
    setBorderStyle(payload: string | null): void {
      this.borderStyle = payload
    },
    setBorderWidth(payload: string | null): void {
      this.borderWidth = payload
    },
    setBorderColor(payload: string | null): void {
      this.borderColor = payload
    },
    setBorderRadiusGlobal(payload: string | null): void {
      this.borderRadiusGlobal = payload
    },
    setBorderRadiusTopLeft(payload: string | null): void {
      this.borderRadiusTopLeft = payload
    },
    setBorderRadiusTopRight(payload: string | null): void {
      this.borderRadiusTopRight = payload
    },
    setBorderRadiusBottomleft(payload: string | null): void {
      this.borderRadiusBottomleft = payload
    },
    setBorderRadiusBottomRight(payload: string | null): void {
      this.borderRadiusBottomRight = payload
    },
    setElementContainsHyperlink(payload: boolean | null): void {
      this.elementContainsHyperlink = payload
    },
    setHyperlinkAbility(payload: boolean | null): void {
      this.hyperlinkAbility = payload
    },
    setHyperlinkInput(payload: string | null): void {
      this.hyperlinkInput = payload
    },
    setHyperlinkMessage(payload: string | null): void {
      this.hyperlinkMessage = payload
    },
    setHyperlinkError(payload: string | null): void {
      this.hyperlinkError = payload
    },
    setHyberlinkEnable(payload: boolean): void {
      this.hyberlinkEnable = payload
    },
    setOpenHyperlinkInNewTab(payload: boolean | null): void {
      this.openHyperlinkinkInNewTab = payload
    },
    setOpacity(payload: string | null): void {
      this.opacity = payload
    },
    setBackgroundOpacity(payload: string | null): void {
      this.backgroundOpacity = payload
    },
    setTextAreaVueModel(payload: string | null): void {
      this.textAreaVueModel = payload
    },
    setNextSibling(payload: HTMLElement | null): void {
      this.nextSibling = payload
    },
    setParentElement(payload: HTMLElement | null): void {
      this.parentElement = payload
    },
    setRestoredElement(payload: string | null): void {
      this.restoredElement = payload
    },
    setClass(payload: string): void {
      this.currentClasses = [...this.currentClasses, payload]
    },
    removeClass(payload: string): void {
      this.currentClasses = this.currentClasses.filter((cls) => cls !== payload)
    },
    setCurrentClasses(payload: string[] | ArrayLike<string>): void {
      this.currentClasses = Array.from(payload)
    },
    setFontVerticalPadding(payload: string | null): void {
      this.fontVerticalPadding = payload
    },
    setFontHorizontalPadding(payload: string | null): void {
      this.fontHorizontalPadding = payload
    },
    setFontVerticalMargin(payload: string | null): void {
      this.fontVerticalMargin = payload
    },
    setFontHorizontalMargin(payload: string | null): void {
      this.fontHorizontalMargin = payload
    },
    setFontStyle(payload: string | null): void {
      this.fontStyle = payload
    },
    setFontFamily(payload: string | null): void {
      this.fontFamily = payload
    },
    setFontWeight(payload: string | null): void {
      this.fontWeight = payload
    },
    setFontBase(payload: string | null): void {
      this.fontBase = payload
    },
    setFontDesktop(payload: string | null): void {
      this.fontDesktop = payload
    },
    setFontTablet(payload: string | null): void {
      this.fontTablet = payload
    },
    setFontMobile(payload: string | null): void {
      this.fontMobile = payload
    },
    setBackgroundColor(payload: string | null): void {
      this.backgroundColor = payload
    },
    setTextColor(payload: string | null): void {
      this.textColor = payload
    },
    setElement(payload: HTMLElement | null): void {
      this.element = {} as HTMLElement
      nextTick(() => {
        this.element = payload
      })
    },
    setComponent(payload: ComponentObject | null): void {
      console.log('setComponent called:', payload)
      if (!payload) {
        this.element = null
        this.component = null
        return
      }
      this.component = {} as ComponentObject
      nextTick(() => {
        this.component = payload
      })
    },

    setComponents(payload: ComponentObject[] | null): void {
      this.components = {} as ComponentObject[]
      nextTick(() => {
        this.components = payload || []
      })
    },
    setPushComponents(payload: SetPushComponentsPayload): void {
      const method = payload.componentArrayAddMethod ?? 'push'
      if (method === 'push') {
        this.components.push(payload.component)
      } else if (method === 'unshift') {
        this.components.unshift(payload.component)
      }
    },

    setBasePrimaryImage(payload: string | null): void {
      if (this.element) {
        this.element.src = payload ?? undefined
      }

      this.basePrimaryImage = payload
    },
    setCurrentLayoutPreview(payload: string): void {
      localStorage.setItem('preview', payload)
    },
    setFetchedComponents(payload: FetchedComponentsResponse | null): void {
      this.fetchedComponents = payload
    },

    async setLoadComponents(_data: LoadComponentsData): Promise<void> {
      this.setFetchedComponents(null)

      try {
        await handlefetchComponents('/components.json', {}, { additionalCallTime: 500 })
      } catch (err) {
        console.log(`Error: ${err}`)
      }

      // fetchedComponents.value is an object containing a components property
      this.setFetchedComponents(
        fetchedComponents &&
          fetchedComponents.value &&
          typeof fetchedComponents.value === 'object' &&
          'components' in fetchedComponents.value
          ? (fetchedComponents.value as FetchedComponentsResponse)
          : null,
      )
    },
    setCurrentResourceData(payload: { title: string; id: number } | null): void {
      this.currentResourceData = payload
    },
    setUpdateOrCreate(payload: string): void {
      this.updateOrCreate = payload
    },

    // Media Library Actions
    setCurrentImage(payload: ImageObject): void {
      this.currentImage = payload
    },
    setCurrentPreviewImage(payload: string | null): void {
      this.currentPreviewImage = payload
    },

    // User Actions
    setIsLoading(payload: boolean): void {
      this.isLoading = payload
    },
    setUserSettings(payload: UserSettings | null): void {
      this.userSettings = payload
    },
    setCurrentUser(payload: User | null): void {
      this.currentUser = payload
    },

    // Unsplash Actions
    setUnsplashImages(payload: UnsplashImagesData | null): void {
      this.unsplashImages = payload
    },
    setSearchTerm(payload: string): void {
      this.searchTerm = payload
    },
    setCurrentPageNumber(payload: number): void {
      this.currentPageNumber = payload
    },
    setOrientationValue(payload: string | null): void {
      this.orientationValue = payload
    },

    // Load Unsplash images
    async setLoadUnsplashImages(payload: LoadUnsplashImagesPayload): Promise<void> {
      this.setUnsplashImages({
        fetchedMedia: null,
        isError: null,
        error: null,
        errors: null,
        isLoading: true,
        isSuccess: null,
      })

      const orientationType = payload.orientation ? `&orientation=${payload.orientation}` : ''

      const unsplashKey = import.meta.env.VITE_UNSPLASH_KEY as string

      try {
        await handleGetImages(
          `https://api.unsplash.com/search/photos?page=${payload.currentPage}&per_page=24&query=${payload.searchTerm || 'a'}${orientationType}`,
          {
            headers: {
              'Accept-Version': 'v1',
              Authorization: unsplashKey,
            },
          },
          { additionalCallTime: 500 },
        )
      } catch (err) {
        console.log(`Error: ${err}`)
      }

      // Update state directly instead of committing mutations
      this.setUnsplashImages({
        fetchedMedia: fetchedMedia.value,
        isError: isErrorImages.value,
        error: errorImages.value,
        errors: errorsImages.value,
        isLoading: isLoadingImages.value,
        isSuccess: isSuccessImages.value,
      })
    },
  },
})
