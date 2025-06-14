<script setup>
import { ref, computed } from 'vue'
import { sharedPageBuilderStore } from '../../../stores/shared-store'

// Use shared store instance
const pageBuilderStateStore = sharedPageBuilderStore

const getElement = computed(() => {
  return pageBuilderStateStore.getElement
})
const getComponent = computed(() => {
  return pageBuilderStateStore.getComponent
})
const getComponents = computed(() => {
  return pageBuilderStateStore.getComponents
})
const current = ref('element')

const updateCurrentTab = function (tab) {
  current.value = tab
}

function prettifyHtml(html) {
  if (!html) return ''
  return html
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
</script>

<template>
  <div class="my-8">
    <div class="flex items-left flex-col myPrimaryGap border-myPrimaryMediumGrayColor">
      <h4 class="myQuaternaryHeader">Selected HTML</h4>
      <p class="myPrimaryParagraph text-xs">
        Overview of Selected Element, Component, and Components. This section provides real-time
        updates based on your HTML selection.
      </p>

      <!-- Types - start -->
      <div>
        <h4 class="myPrimaryParagraph text-sm pb-2">Types</h4>
        <div class="text-white overflow-hidden bg-gray-900 max-w-2xl">
          <div class="flex bg-gray-800/40 ring-1 ring-white/5">
            <div class="-mb-px flex text-xs font-medium text-myPrimaryMediumGrayColor">
              <div class="px-4 py-4 text-white">Types</div>
            </div>
          </div>
          <div class="px-4 pb-8 pt-4 text-white text-xs">
            <p v-if="getElement === null || getElement === undefined" class="text-xs pb-2"></p>
            <p v-if="getElement !== null && getElement !== undefined" class="text-xs pb-2">
              <span>Element type: </span>
              <span>
                {{ typeof getElement }}
              </span>
            </p>

            <p v-if="getComponent === null || getComponent === undefined" class="text-xs pb-2">
              <span>Component type: </span>
              {{ JSON.stringify(getComponent) }}
            </p>
            <p v-if="getComponent !== null && getComponent !== undefined" class="text-xs pb-2">
              <span>Component type: </span>
              <span>
                {{ Array.isArray(getComponent) === true ? 'array' : typeof getComponent }}
              </span>
            </p>
            <p class="text-xs pb-2">
              <span>Components: </span>
              <span>
                {{ Array.isArray(getComponents) === true ? 'array' : typeof getComponents }}
              </span>
            </p>
          </div>
        </div>
      </div>
      <!-- Types - end -->
      <!-- Code Block Component - start-->
      <div>
        <h4 class="myPrimaryParagraph text-sm pb-2">Content</h4>
        <div class="overflow-hidden bg-gray-900 max-w-2xl">
          <div class="flex bg-gray-800/40 ring-1 ring-white/5">
            <div class="-mb-px flex text-xs font-medium text-myPrimaryMediumGrayColor">
              <div
                @click="updateCurrentTab('element')"
                class="px-4 py-4 cursor-pointer"
                :class="[current === 'element' ? 'text-white' : '']"
              >
                Element
              </div>
              <div
                @click="updateCurrentTab('component')"
                class="px-4 py-4 cursor-pointer"
                :class="[current === 'component' ? 'text-white' : '']"
              >
                Component
              </div>
              <div
                @click="updateCurrentTab('components')"
                class="px-4 py-4 cursor-pointer"
                :class="[current === 'components' ? 'text-white' : '']"
              >
                Components
                {{ Array.isArray(getComponents) && getComponents.length }}
              </div>
            </div>
          </div>
          <div class="px-4 pb-8 pt-4 text-white text-xs break-all">
            <div v-if="current === 'element'">
              <div v-if="!getComponent">
                <p class="pb-2">
                  {{ getComponent === null ? 'NULL' : typeof getComponent }}
                </p>
              </div>
              <div
                v-if="getElement"
                class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg"
              >
                <div class="bg-gray-50 pt-4 pb-1 border-b border-gray-200">
                  <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-300">
                      <thead class="bg-gray-50">
                        <tr>
                          <th
                            class="px-6 py-3 text-left text-xs font-medium text-gray-900 tracking-wider"
                          >
                            Selected HTML:
                          </th>
                        </tr>
                      </thead>
                      <tbody class="bg-white divide-y divide-gray-200">
                        <tr>
                          <td class="px-6 py-4 text-sm text-gray-500">
                            {{ getElement?.outerHTML }}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-300">
                      <thead class="bg-gray-50">
                        <tr>
                          <th
                            class="px-6 py-3 text-left text-xs font-medium text-gray-900 tracking-wider"
                          >
                            Element src:
                          </th>
                        </tr>
                      </thead>
                      <tbody class="bg-white divide-y divide-gray-200">
                        <tr>
                          <td class="px-6 py-4 text-sm text-gray-500 whitespace-pre-line">
                            {{ getElement?.src ? getElement?.src : typeof getElement?.src }}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div class="overflow-x-auto">
                  <table class="min-w-full divide-y divide-gray-300">
                    <thead class="bg-gray-50">
                      <tr>
                        <th
                          class="px-6 py-3 text-left text-xs font-medium text-gray-900 tracking-wider"
                        >
                          Element classes
                        </th>
                      </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                      <tr>
                        <td class="px-6 py-4 text-sm text-gray-500">
                          {{
                            getElement?.classList
                              ? getElement?.classList
                              : typeof getElement?.classList
                          }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div v-if="current === 'component'">
              <div v-if="!getComponent">
                <p class="pb-2">
                  {{ getComponent === null ? 'NULL' : typeof getComponent }}
                </p>
              </div>
              <div
                v-if="getComponent"
                class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg"
              >
                <div class="bg-gray-50 pt-4 pb-1 border-b border-gray-200">
                  <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-300">
                      <thead class="bg-gray-50">
                        <tr>
                          <th
                            class="px-6 py-3 text-left text-xs font-medium text-gray-900 tracking-wider"
                          >
                            ID
                          </th>
                        </tr>
                      </thead>
                      <tbody class="bg-white divide-y divide-gray-200">
                        <tr>
                          <td class="px-6 py-4 text-sm text-gray-500">
                            {{ getComponent?.id }}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-300">
                      <thead class="bg-gray-50">
                        <tr>
                          <th
                            class="px-6 py-3 text-left text-xs font-medium text-gray-900 tracking-wider"
                          >
                            Title
                          </th>
                        </tr>
                      </thead>
                      <tbody class="bg-white divide-y divide-gray-200">
                        <tr>
                          <td class="px-6 py-4 text-sm text-gray-500 whitespace-pre-line">
                            {{ getComponent?.title }}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div class="overflow-x-auto">
                  <table class="min-w-full divide-y divide-gray-300">
                    <thead class="bg-gray-50">
                      <tr>
                        <th
                          class="px-6 py-3 text-left text-xs font-medium text-gray-900 tracking-wider"
                        >
                          HTML Code
                        </th>
                      </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                      <tr>
                        <td class="px-6 py-4 text-sm text-gray-500">
                          <pre
                            class="py-4 text-sm text-gray-500 whitespace-pre-lines font-sans flex items-start justify-left"
                          >
                              <code class="font-sans" v-html="prettifyHtml(getComponent?.html_code)"></code>
                            </pre>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div v-if="current === 'components'">
              <div v-if="!getComponents">
                <p class="pb-2">
                  {{ getComponents === null ? 'NULL' : typeof getComponents }}
                </p>
              </div>

              <div v-if="getComponents">
                <div
                  v-for="component in getComponents"
                  :key="component.id"
                  class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg mb-6"
                >
                  <!-- ID and Title above the table, styled to look connected -->
                  <div class="bg-gray-50 pt-4 pb-1 border-b border-gray-200">
                    <div class="overflow-x-auto">
                      <table class="min-w-full divide-y divide-gray-300">
                        <thead class="bg-gray-50">
                          <tr>
                            <th
                              class="px-6 py-3 text-left text-xs font-medium text-gray-900 tracking-wider"
                            >
                              ID
                            </th>
                          </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                          <tr>
                            <td class="px-6 py-4 text-sm text-gray-500">
                              {{ component.id }}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div class="overflow-x-auto">
                      <table class="min-w-full divide-y divide-gray-300">
                        <thead class="bg-gray-50">
                          <tr>
                            <th
                              class="px-6 py-3 text-left text-xs font-medium text-gray-900 tracking-wider"
                            >
                              Title
                            </th>
                          </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                          <tr>
                            <td class="px-6 py-4 text-sm text-gray-500 whitespace-pre-line">
                              {{ component.title }}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-300">
                      <thead class="bg-gray-50">
                        <tr>
                          <th
                            class="px-6 py-3 text-left text-xs font-medium text-gray-900 tracking-wider"
                          >
                            HTML Code
                          </th>
                        </tr>
                      </thead>
                      <tbody class="bg-white divide-y divide-gray-200">
                        <tr>
                          <td class="px-6 py-4 text-sm text-gray-500">
                            <pre
                              class="py-4 text-sm text-gray-500 whitespace-pre-lines font-sans flex items-start justify-left"
                            >
                              <code class="font-sans" v-html="prettifyHtml(component.html_code)"></code>
                            </pre>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Code Block Component - end-->
    </div>
  </div>
</template>
