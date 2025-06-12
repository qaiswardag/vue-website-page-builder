<script setup>
import SlideOverRightParent from '../Slidebars/SlideOverRightParent.vue'
import AdvancedPageBuilderSettings from './AdvancedPageBuilderSettings.vue'
import { ref, computed } from 'vue'
import { sharedPageBuilderStore } from '../../../stores/shared-store'
import fullHTMLContent from '../../../utils/builder/html-doc-declaration-with-components'
import PageBuilderClass from '../../../composables/PageBuilderClass.ts'
import { isEmptyObject } from '../../../helpers/isEmptyObject.ts'
const version = __APP_VERSION__

// Use shared store instance
const pageBuilderStateStore = sharedPageBuilderStore

// Initialize PageBuilder with store
const pageBuilderClass = new PageBuilderClass(pageBuilderStateStore)

const showAdvancedSettingsSlideOverRight = ref(false)
const titleSettingsSlideOverRight = ref('')
const downloadedComponents = ref(null)

const getConfigPageBuilder = computed(() => {
  return pageBuilderStateStore.getConfigPageBuilder
})

// handle slideover window
const handleAdvancedSettingsSlideOver = function () {
  titleSettingsSlideOverRight.value = 'Advanced Settings'
  showAdvancedSettingsSlideOverRight.value = true
}

// handle slideover window
const settingsAdvancedSlideOverButton = function () {
  showAdvancedSettingsSlideOverRight.value = false
}

const getComponents = computed(() => {
  return pageBuilderStateStore.getComponents
})

// generate HTML
const generateHTML = function (filename, HTML) {
  const element = document.createElement('a')
  element.setAttribute(
    'href',
    'data:text/html;charset=utf-8,' + encodeURIComponent(fullHTMLContent(HTML)),
  )
  element.setAttribute('download', filename)

  element.style.display = 'none'
  document.body.appendChild(element)

  element.click()

  document.body.removeChild(element)
}

// handle download HTML
const handleDownloadHTML = function () {
  downloadedComponents.value = getComponents.value.map((component) => {
    return component.html_code
  })

  generateHTML('downloaded_html.html', downloadedComponents.value.join(''))
}
</script>

<template>
  <div>
    <SlideOverRightParent
      :open="showAdvancedSettingsSlideOverRight"
      :title="titleSettingsSlideOverRight"
      @slideOverButton="settingsAdvancedSlideOverButton"
    >
      <AdvancedPageBuilderSettings></AdvancedPageBuilderSettings>
    </SlideOverRightParent>
    <!-- Advanced Settings - start -->
    <div
      class="mt-4 mb-4 py-8 border-b border-myPrimbryLightGrayColor flex gap-4 flex-col divide-y divide-gray-300"
    >
      <div class="flex items-left flex-col gap-2">
        <h3 class="myQuaternaryHeader">Selections Overview</h3>
        <p class="myPrimaryParagraph text-xs">
          Manage advanced settings here. Like an overview of Selected Element, Component, and
          Components in real-time.
        </p>

        <div class="my-4">
          <button
            @click="handleAdvancedSettingsSlideOver"
            type="button"
            class="myPrimaryButton text"
          >
            Open Overview
          </button>
        </div>
      </div>

      <!-- Advanced Settings - start -->
      <div class="mt-4 mb-4 py-8 border-b border-myPrimbryLightGrayColor">
        <div class="flex items-left flex-col gap-1">
          <h3 class="myQuaternaryHeader">Configuration Overview</h3>
          <p class="myPrimaryParagraph text-xs">
            A summary of current user preferences, application settings, and system metadata
            including UI theme, language, saved components, and logo configuration.
          </p>
        </div>

        <!-- Version Information Table - start -->
        <div class="mt-8">
          <h4 class="myQuaternaryHeader text-sm mb-2">Version Information</h4>
          <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-300">
                <thead class="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Component
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Version
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Page Builder
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span
                        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {{ version }}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <!-- Version Information Table - end -->

        <!-- Resource Data Table - start -->
        <div
          class="mt-4"
          v-if="
            getConfigPageBuilder?.resourceData && !isEmptyObject(getConfigPageBuilder.resourceData)
          "
        >
          <h4 class="myQuaternaryHeader text-sm mb-2">Resource Data</h4>
          <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-300">
                <thead class="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Property
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Value
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-if="getConfigPageBuilder?.resourceData?.title">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Title
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {{ getConfigPageBuilder.resourceData.title }}
                    </td>
                  </tr>
                  <tr v-if="getConfigPageBuilder?.resourceData?.id">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ID
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {{ getConfigPageBuilder.resourceData.id }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <!-- Resource Data Table - end -->

        <!-- User Information Table - start -->
        <div
          class="mt-8"
          v-if="
            getConfigPageBuilder?.userForPageBuilder &&
            !isEmptyObject(getConfigPageBuilder.userForPageBuilder)
          "
        >
          <h4 class="myQuaternaryHeader text-sm mb-2">User Information</h4>
          <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-300">
                <thead class="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Property
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Value
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      User Name
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {{ getConfigPageBuilder.userForPageBuilder.name }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <!-- User Information Table - end -->

        <!-- User Settings Table - start -->
        <div
          class="mt-8"
          v-if="
            getConfigPageBuilder?.userSettings && !isEmptyObject(getConfigPageBuilder.userSettings)
          "
        >
          <h4 class="myQuaternaryHeader text-sm mb-2">User Settings</h4>
          <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-300">
                <thead class="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Setting
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Value
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-if="getConfigPageBuilder?.userSettings?.theme">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Theme
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {{ getConfigPageBuilder.userSettings.theme }}
                    </td>
                  </tr>
                  <tr v-if="getConfigPageBuilder?.userSettings?.language">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Language
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {{ getConfigPageBuilder.userSettings.language }}
                    </td>
                  </tr>
                  <tr v-if="getConfigPageBuilder?.userSettings?.autoSave !== undefined">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Auto Save
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span
                        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                        :class="
                          getConfigPageBuilder.userSettings.autoSave
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        "
                      >
                        {{ getConfigPageBuilder.userSettings.autoSave ? 'Enabled' : 'Disabled' }}
                      </span>
                    </td>
                  </tr>
                  <tr v-if="getConfigPageBuilder?.userSettings?.notifications !== undefined">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Notifications
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span
                        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                        :class="
                          getConfigPageBuilder.userSettings.notifications
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        "
                      >
                        {{
                          getConfigPageBuilder.userSettings.notifications ? 'Enabled' : 'Disabled'
                        }}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <!-- User Settings Table - end -->

        <!-- Page Builder Logo Table - start -->
        <div
          class="mt-8"
          v-if="
            getConfigPageBuilder.pageBuilderLogo &&
            !isEmptyObject(getConfigPageBuilder.pageBuilderLogo)
          "
        >
          <h4 class="myQuaternaryHeader text-sm mb-2">Logo Configuration</h4>
          <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-300">
                <thead class="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Property
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Value
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Logo
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div class="flex items-center space-x-3">
                        <div class="border-r border-gray-200 pr-6">
                          <img
                            class="h-3"
                            :src="getConfigPageBuilder.pageBuilderLogo.src"
                            alt="Logo"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Logo URL
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div class="flex items-center space-x-3">
                        <div class="border-r border-gray-200 pr-6">
                          <div class="flex items-center space-x-3">
                            <span class="whitespace-nowrap">{{
                              getConfigPageBuilder.pageBuilderLogo.src
                            }}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <!-- Page Builder Logo Table - end -->

        <!-- Form Type Table - start -->
        <div
          class="mt-8"
          v-if="
            getConfigPageBuilder?.updateOrCreate &&
            !isEmptyObject(getConfigPageBuilder.updateOrCreate)
          "
        >
          <h4 class="myQuaternaryHeader text-sm mb-2">Form Type</h4>
          <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-300">
                <thead class="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Mode
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Form Type
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span
                        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                        :class="
                          getConfigPageBuilder.updateOrCreate === 'create'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-blue-100 text-blue-800'
                        "
                      >
                        <span
                          v-if="
                            getConfigPageBuilder &&
                            getConfigPageBuilder.updateOrCreate.formType === 'create'
                          "
                        >
                          {{ getConfigPageBuilder.updateOrCreate.formType }}
                        </span>
                        <span
                          v-if="
                            getConfigPageBuilder &&
                            getConfigPageBuilder.updateOrCreate.formType === 'update'
                          "
                        >
                          {{ getConfigPageBuilder.updateOrCreate.formType }}
                        </span>
                      </span>
                    </td>
                  </tr>
                  <tr
                    v-if="
                      getConfigPageBuilder.updateOrCreate.createNewResourceFormName &&
                      getConfigPageBuilder.updateOrCreate.createNewResourceFormName.length > 0
                    "
                  >
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Form Name
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span
                        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                      >
                        {{ getConfigPageBuilder.updateOrCreate.createNewResourceFormName }}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <!-- Form Type Table - end -->

        <div
          class="mt-8"
          v-if="
            getConfigPageBuilder?.updateOrCreate &&
            !isEmptyObject(getConfigPageBuilder.updateOrCreate)
          "
        >
          <h4 class="myQuaternaryHeader text-sm mb-2">Delete Saved Layout</h4>
          <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-300">
                <thead class="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Option
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Description
                    </th>
                  </tr>
                </thead>

                <tbody class="bg-white divide-y divide-gray-200">
                  <tr>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Form Type
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span
                        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                        :class="
                          getConfigPageBuilder.updateOrCreate === 'create'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-blue-100 text-blue-800'
                        "
                      >
                        <span
                          v-if="
                            getConfigPageBuilder &&
                            getConfigPageBuilder.updateOrCreate.formType === 'create'
                          "
                        >
                          {{ getConfigPageBuilder.updateOrCreate.formType }}
                        </span>
                        <span
                          v-if="
                            getConfigPageBuilder &&
                            getConfigPageBuilder.updateOrCreate.formType === 'update'
                          "
                        >
                          {{ getConfigPageBuilder.updateOrCreate.formType }}
                        </span>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Delete
                    </td>
                    <td
                      v-if="getConfigPageBuilder?.updateOrCreate.formType === 'create'"
                      class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                    >
                      <button
                        class="myPrimaryDeleteButton w-full"
                        @click="pageBuilderClass.removeItemComponentsLocalStorageCreate"
                        type="button"
                      >
                        Delete
                      </button>
                    </td>
                    <td
                      v-if="getConfigPageBuilder?.updateOrCreate.formType === 'update'"
                      class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                    >
                      <button
                        class="myPrimaryDeleteButton w-full"
                        @click="pageBuilderClass.removeItemComponentsLocalStorageUpdate"
                        type="button"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <!-- Delete Draft - end -->
      </div>
    </div>
    <!-- Advanced Settings - end -->
    <!-- Download Layout HTML - start -->
    <div class="mt-4 mb-4 py-8 border-b border-myPrimbryLightGrayColor">
      <div class="flex items-left flex-col gap-1">
        <h3 class="myQuaternaryHeader">Download Page as HTML</h3>
        <p class="myPrimaryParagraph text-xs">Download current page layout.</p>
      </div>
      <div class="mt-4">
        <button @click="handleDownloadHTML" type="button" class="myPrimaryButton">
          Download HTML file
        </button>
      </div>
    </div>
  </div>
  <!-- Download Layout HTML - end -->
</template>
