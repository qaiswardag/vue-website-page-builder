// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, beforeAll } from 'vitest'
import { PageBuilderService } from '../composables/PageBuilderService'
import componentsArray from './componentsArray.test.json'

// Mock store (replace with your actual store or a better mock if needed)
const mockStore = {
  setBuilderStarted: vi.fn(),
  setPageBuilderConfig: vi.fn(),
  getPageBuilderConfig: {},
  setComponents: vi.fn(),
  setIsLoadingGlobal: vi.fn(),
  setIsRestoring: vi.fn(),
  setIsLoadingResumeEditing: vi.fn(),
  setHasLocalDraftForUpdate: vi.fn(),
  setComponent: vi.fn(),
  setElement: vi.fn(),
  getLocalStorageItemName: 'test-key',
  setLocalStorageItemName: vi.fn(),
  // ...add more as needed for your test
}

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
    Object.values(mockStore).forEach((fn) => typeof fn === 'function' && fn.mockClear())
    service = new PageBuilderService(mockStore as any)
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
    expect(result).toHaveProperty('message', 'Page builder started successfully.')
    // Add more assertions for this scenario
  })
})
