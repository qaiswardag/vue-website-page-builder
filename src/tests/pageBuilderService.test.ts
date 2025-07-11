// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, beforeAll } from 'vitest'
import { PageBuilderService } from '../services/PageBuilderService'
import { usePageBuilderStateStore } from '../stores/page-builder-state'
import componentsArray from './componentsArray.test.json'

// Mock store (replace with your actual store or a better mock if needed)
const mockStore = {
  // Mock getters
  getApplyImageToSelection: { src: '' },
  getLocalStorageItemName: 'test-key',
  getHyberlinkEnable: false,
  getComponents: [],
  getComponent: null,
  getElement: null,
  getComponentArrayAddMethod: null,
  getShowModalTipTap: false,
  getMenuRight: false,
  getBorderStyle: null,
  getBorderWidth: null,
  getBorderColor: null,
  getBorderRadiusGlobal: null,
  getBorderRadiusTopLeft: null,
  getBorderRadiusTopRight: null,
  getBorderRadiusBottomleft: null,
  getBorderRadiusBottomRight: null,
  getElementContainsHyperlink: null,
  getHyperlinkAbility: null,
  getHyperlinkInput: null,
  getHyperlinkMessage: null,
  getHyperlinkError: null,
  getOpenHyperlinkInNewTab: null,
  getOpacity: null,
  getBackgroundOpacity: null,
  getTextAreaVueModel: null,
  getCurrentClasses: [],
  getCurrentStyles: {},
  getFontVerticalPadding: null,
  getFontHorizontalPadding: null,
  getFontVerticalMargin: null,
  getFontHorizontalMargin: null,
  getFontStyle: null,
  getFontFamily: null,
  getFontWeight: null,
  getFontBase: null,
  getFontDesktop: null,
  getFontTablet: null,
  getFontMobile: null,
  getBackgroundColor: null,
  getTextColor: null,
  getBasePrimaryImage: null,
  getPageBuilderConfig: null,
  getCurrentPreviewImage: null,
  getBuilderStarted: false,
  getIsLoadingGlobal: false,
  getIsSaving: false,
  getHasLocalDraftForUpdate: false,
  getIsLoadingResumeEditing: false,
  getIsRestoring: false,
  getCurrentLanguage: null,
  getHistoryIndex: 0,
  getHistoryLength: 0,

  // Mock actions
  setBuilderStarted: vi.fn(),
  setPageBuilderConfig: vi.fn(),
  setHistoryIndex: vi.fn(),
  setHistoryLength: vi.fn(),
  setLocalStorageItemName: vi.fn(),
  setShowModalTipTap: vi.fn(),
  setMenuRight: vi.fn(),
  setBorderStyle: vi.fn(),
  setBorderWidth: vi.fn(),
  setBorderColor: vi.fn(),
  setBorderRadiusGlobal: vi.fn(),
  setBorderRadiusTopLeft: vi.fn(),
  setBorderRadiusTopRight: vi.fn(),
  setBorderRadiusBottomleft: vi.fn(),
  setBorderRadiusBottomRight: vi.fn(),
  setElementContainsHyperlink: vi.fn(),
  setHyperlinkAbility: vi.fn(),
  setHyperlinkInput: vi.fn(),
  setHyperlinkMessage: vi.fn(),
  setHyperlinkError: vi.fn(),
  setHyberlinkEnable: vi.fn(),
  setOpenHyperlinkInNewTab: vi.fn(),
  setOpacity: vi.fn(),
  setBackgroundOpacity: vi.fn(),
  setTextAreaVueModel: vi.fn(),
  setClass: vi.fn(),
  removeClass: vi.fn(),
  setCurrentClasses: vi.fn(),
  setCurrentStyles: vi.fn(),
  setFontVerticalPadding: vi.fn(),
  setFontHorizontalPadding: vi.fn(),
  setFontVerticalMargin: vi.fn(),
  setFontHorizontalMargin: vi.fn(),
  setFontStyle: vi.fn(),
  setFontFamily: vi.fn(),
  setFontWeight: vi.fn(),
  setFontBase: vi.fn(),
  setFontDesktop: vi.fn(),
  setFontTablet: vi.fn(),
  setFontMobile: vi.fn(),
  setBackgroundColor: vi.fn(),
  setTextColor: vi.fn(),
  setElement: vi.fn(),
  setComponent: vi.fn(),
  setComponents: vi.fn(),
  setPushComponents: vi.fn(),
  setBasePrimaryImage: vi.fn(),
  setCurrentLayoutPreview: vi.fn(),
  setApplyImageToSelection: vi.fn(),
  setCurrentPreviewImage: vi.fn(),
  setIsLoadingGlobal: vi.fn(),
  setIsSaving: vi.fn(),
  setHasLocalDraftForUpdate: vi.fn(),
  setIsLoadingResumeEditing: vi.fn(),
  setIsRestoring: vi.fn(),
  setCurrentLanguage: vi.fn(),
} as unknown as ReturnType<typeof usePageBuilderStateStore>

const configPageBuilder = {
  updateOrCreate: {
    formType: 'update',
    formName: 'collection',
  },
  // ...other config options as needed
} as const

beforeAll(() => {
  // Create a fake #pagebuilder element in the DOM for the test
  const div = document.createElement('div')
  div.id = 'pagebuilder'
  document.body.appendChild(div)
})

describe('PageBuilderService', () => {
  let service: PageBuilderService

  beforeEach(() => {
    // Reset mocks before each test
    Object.values(mockStore).forEach(
      (fn) =>
        typeof fn === 'function' &&
        typeof (fn as { mockClear?: () => void }).mockClear === 'function' &&
        (fn as { mockClear: () => void }).mockClear(),
    )
    service = new PageBuilderService(mockStore)
  })

  it('should start builder and return a success message', async () => {
    const result = await service.startBuilder(configPageBuilder, componentsArray)
    expect(result).toHaveProperty('message', 'Page builder started successfully.')
    expect(mockStore.setBuilderStarted).toHaveBeenCalledWith(true)
    expect(mockStore.setPageBuilderConfig).toHaveBeenCalledWith(configPageBuilder)
    // Add more assertions as needed
  })

  it('should handle missing components array gracefully', async () => {
    const result = await service.startBuilder(configPageBuilder)
    expect(result).toHaveProperty('validation.error', true)
    expect(result).toHaveProperty('validation.reason', 'Components data must be an array.')
  })
})
