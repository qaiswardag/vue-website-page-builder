<script setup>
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

const downloadedComponents = ref(null)

const getConfigPageBuilder = computed(() => {
  return pageBuilderStateStore.getConfigPageBuilder
})

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
  <div class="w-full inset-x-0 h-[90vh] bg-white overflow-x-scroll lg:pt-2 pt-2">
    <!-- Advanced Settings - start -->
    <div class="flex gap-4 flex-col divide-y divide-gray-300">
      <!-- Advanced Settings - start -->
      <div class="mb-4 pb-8 border-b border-myPrimbryLightGrayColor">
        <div class="flex items-left flex-col gap-1">
          <h3 class="myQuaternaryHeader">Configuration Overview</h3>
          <p class="myPrimaryParagraph text-xs">
            A summary of current user preferences, application settings, and system metadata
            including UI theme, language, saved components, and logo configuration.
          </p>
        </div>

        <!-- Version Information Table - start -->
        <div class="px-2">
          <div class="mt-8">
            <h4 class="myQuaternaryHeader text-sm mb-2">Version Information</h4>
            <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <div class="overflow-x-auto">
                <table class="min-w-full">
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
                        <div class="min-w-[30rem] w-max">Page Builder</div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div class="min-w-[30rem] w-max">
                          <span
                            class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                          >
                            {{ version }}
                          </span>
                        </div>
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
              getConfigPageBuilder?.resourceData &&
              !isEmptyObject(getConfigPageBuilder.resourceData)
            "
          >
            <h4 class="myQuaternaryHeader text-sm mb-2">Resource Data</h4>
            <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <div class="overflow-x-auto">
                <table class="min-w-full">
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
                        <div class="min-w-[30rem] w-max">Title</div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div class="min-w-[30rem] w-max">
                          {{ getConfigPageBuilder.resourceData.title }}
                        </div>
                      </td>
                    </tr>
                    <tr v-if="getConfigPageBuilder?.resourceData?.id">
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        <div class="min-w-[30rem] w-max">ID</div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div class="min-w-[30rem] w-max">
                          {{ getConfigPageBuilder.resourceData.id }}
                        </div>
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
                <table class="min-w-full">
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
                        <div class="min-w-[30rem] w-max">User Name</div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div class="min-w-[30rem] w-max">
                          {{ getConfigPageBuilder.userForPageBuilder.name }}
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        <div class="min-w-[30rem] w-max">Image</div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div class="min-w-[30rem] w-max">
                          <div class="flex items-center space-x-3">
                            <img
                              class="block inset-0 object-top h-10 min-h-10 max-h-10 w-10 min-w-10 max-w-10 object-cover rounded-full"
                              :src="getConfigPageBuilder.userForPageBuilder.image"
                              alt="image"
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        <div class="min-w-[30rem] w-max">Image URL</div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div class="min-w-[30rem] w-max">
                          {{ getConfigPageBuilder.userForPageBuilder.image }}
                        </div>
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
              getConfigPageBuilder?.userSettings &&
              !isEmptyObject(getConfigPageBuilder.userSettings)
            "
          >
            <h4 class="myQuaternaryHeader text-sm mb-2">User Settings</h4>
            <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <div class="overflow-x-auto">
                <table class="min-w-full">
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
                        <div class="min-w-[30rem] w-max">Theme</div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div class="min-w-[30rem] w-max">
                          {{ getConfigPageBuilder.userSettings.theme }}
                        </div>
                      </td>
                    </tr>
                    <tr v-if="getConfigPageBuilder?.userSettings?.language">
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        <div class="min-w-[30rem] w-max">Language</div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div class="min-w-[30rem] w-max">
                          {{ getConfigPageBuilder.userSettings.language }}
                        </div>
                      </td>
                    </tr>
                    <tr v-if="getConfigPageBuilder?.userSettings?.autoSave !== undefined">
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        <div class="min-w-[30rem] w-max">Auto Save</div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div class="min-w-[30rem] w-max">
                          <span
                            class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                            :class="
                              getConfigPageBuilder.userSettings.autoSave
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            "
                          >
                            {{
                              getConfigPageBuilder.userSettings.autoSave ? 'Enabled' : 'Disabled'
                            }}
                          </span>
                        </div>
                      </td>
                    </tr>
                    <tr v-if="getConfigPageBuilder?.userSettings?.notifications !== undefined">
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        <div class="min-w-[30rem] w-max">Notifications</div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div class="min-w-[30rem] w-max">
                          <span
                            class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                            :class="
                              getConfigPageBuilder.userSettings.notifications
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            "
                          >
                            {{
                              getConfigPageBuilder.userSettings.notifications
                                ? 'Enabled'
                                : 'Disabled'
                            }}
                          </span>
                        </div>
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
                <table class="min-w-full">
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
                        <div class="min-w-[30rem] w-max">Logo</div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div class="min-w-[30rem] w-max">
                          <div class="flex items-center space-x-3">
                            <img
                              class="h-4"
                              :src="getConfigPageBuilder.pageBuilderLogo.src"
                              alt="Logo"
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        <div class="min-w-[30rem] w-max">Logo URL</div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div class="min-w-[30rem] w-max">
                          <div class="flex items-center space-x-3">
                            <div class="border-r border-gray-200 pr-6">
                              <div class="flex items-center space-x-3">
                                <span class="whitespace-nowrap">{{
                                  getConfigPageBuilder.pageBuilderLogo.src
                                }}</span>
                              </div>
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
                <table class="w-max">
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
                        <div class="min-w-[30rem] w-max">Form Type</div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div class="min-w-[30rem] w-max">
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
                        </div>
                      </td>
                    </tr>
                    <tr
                      v-if="
                        getConfigPageBuilder.updateOrCreate.formName &&
                        getConfigPageBuilder.updateOrCreate.formName.length > 0
                      "
                    >
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        <div class="min-w-[30rem] w-max">Form Name</div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div class="min-w-[30rem] w-max">
                          <span
                            class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                          >
                            {{ getConfigPageBuilder.updateOrCreate.formName }}
                          </span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <!-- Form Type Table - end -->
        </div>
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
    <!-- Download Layout HTML - end -->

    <!-- Congig - start -->
    <div class="mt-4 mb-4 py-8 border-b border-myPrimbryLightGrayColor">
      <div class="flex items-left flex-col gap-1">
        <h3 class="myQuaternaryHeader">Complete Configuration Overview</h3>
        <p class="myPrimaryParagraph text-xs">
          omplete configuration object currently used by the Page Builder. It includes information
          about the user, form behavior, branding settings, and other context-specific data needed
          for rendering and managing the builder environment.
        </p>
      </div>

      <div class="mt-4 whitespace-pre-wrap text-white overflow-hidden bg-gray-900">
        <div class="flex bg-gray-800/40 ring-1 ring-white/5">
          <div class="-mb-px flex text-xs font-medium text-myPrimaryMediumGrayColor">
            <div class="px-4 py-4 text-white">Configuration</div>
          </div>
        </div>
        <div class="px-4 pb-8 pt-4 text-white text-xs break-all">
          <p class="myPrimaryParagraph text-xs text-white">
            config: {{ JSON.stringify(getConfigPageBuilder, null, 4) }}
          </p>
        </div>
      </div>
    </div>
    <!-- Config - end -->
  </div>
</template>
