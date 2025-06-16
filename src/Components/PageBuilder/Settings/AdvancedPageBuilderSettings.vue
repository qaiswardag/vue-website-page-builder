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
  <div class="w-full inset-x-0 h-[90vh] bg-white overflow-x-scroll lg:pt-2 pt-2">
    <div class="flex items-left flex-col myPrimaryGap border-myPrimaryMediumGrayColor">
      <p class="myPrimaryParagraph">
        Overview of Selected Element, Component, and Components. This section provides real-time
        updates based on your HTML selection.
      </p>

      <!-- Types - start -->
      <div>
        <h4 class="myPrimaryParagraph text-sm pb-2">Types</h4>
        <div class="text-white overflow-hidden bg-gray-900">
          <div class="flex bg-gray-800/40 ring-1 ring-white/5">
            <div class="-mb-px flex text-xs font-medium text-myPrimaryMediumGrayColor">
              <div class="px-4 py-4 text-white">Types</div>
            </div>
          </div>
          <div class="px-4 pb-8 pt-4 text-white text-xs">
            <p class="text-xs pb-2">
              <span>Element type: </span>
              <span>
                {{ typeof getElement }}
              </span>
            </p>

            <p class="text-xs pb-2">
              <span>Component type: </span>
              {{ typeof getComponent }}
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
        <div class="overflow-hidden bg-gray-900">
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
                  {{ getComponent === null ? 'No Element selected' : typeof getComponent }}
                </p>
              </div>
              <div v-if="getElement" class="overflow-hidden border border-gray-100 mb-6 rounded">
                <div class="bg-gray-900 pt-4 pb-1 border-b border-gray-200">
                  <div class="overflow-x-auto">
                    <table class="min-w-full">
                      <thead class="bg-gray-900">
                        <tr>
                          <th class="px-6 py-3 text-left text-sm text-white font-normal">
                            Selected HTML:
                          </th>
                        </tr>
                      </thead>
                      <tbody class="bg-gray-900 divide-y divide-gray-200">
                        <tr>
                          <td class="px-6 py-3 text-left text-sm text-white font-normal border-b">
                            {{ getElement?.outerHTML }}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div class="overflow-x-auto">
                    <table class="min-w-full">
                      <thead class="bg-gray-900">
                        <tr>
                          <th class="px-6 py-3 text-left text-sm text-white font-normal">
                            Element src:
                          </th>
                        </tr>
                      </thead>
                      <tbody class="bg-gray-900 divide-y divide-gray-200">
                        <tr>
                          <td
                            class="px-6 py-3 text-left text-sm text-white font-normal whitespace-pre-line"
                          >
                            {{ getElement?.src ? getElement?.src : typeof getElement?.src }}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div class="overflow-x-auto">
                  <table class="min-w-full">
                    <thead class="bg-gray-900">
                      <tr>
                        <th class="px-6 py-3 text-left text-sm text-white font-normal">
                          Element classes:
                        </th>
                      </tr>
                    </thead>
                    <tbody class="bg-gray-900 divide-y divide-gray-200">
                      <tr>
                        <td class="px-6 py-3 text-left text-sm text-white font-normal">
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
                  {{ getComponent === null ? 'No Component selected' : typeof getComponent }}
                </p>
              </div>
              <div v-if="getComponent" class="overflow-hidden border border-gray-100 mb-6 rounded">
                <div class="bg-gray-900 pt-4 pb-1 border-b border-gray-200">
                  <div class="overflow-x-auto">
                    <table class="min-w-full">
                      <thead class="bg-gray-900">
                        <tr>
                          <th class="px-6 py-3 text-left text-sm text-white font-normal">ID:</th>
                        </tr>
                      </thead>
                      <tbody class="bg-gray-900 divide-y divide-gray-200">
                        <tr>
                          <td class="px-6 py-3 text-left text-sm text-white font-normal">
                            {{ getComponent?.id }}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div class="overflow-x-auto">
                    <table class="min-w-full">
                      <thead class="bg-gray-900">
                        <tr>
                          <th class="px-6 py-3 text-left text-sm text-white font-normal border-t">
                            Title:
                          </th>
                        </tr>
                      </thead>
                      <tbody class="bg-gray-900 divide-y divide-gray-200">
                        <tr>
                          <td
                            class="px-6 py-3 text-left text-sm text-white font-normal whitespace-pre-line"
                          >
                            {{ getComponent?.title }}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div class="overflow-x-auto">
                  <table class="min-w-full">
                    <thead class="bg-gray-900">
                      <tr>
                        <th class="px-6 py-3 text-left text-sm text-white font-normal">
                          HTML Code:
                        </th>
                      </tr>
                    </thead>
                    <tbody class="bg-gray-900 divide-y divide-gray-200">
                      <tr>
                        <td class="px-6 py-3 text-left text-sm text-white font-normal">
                          <pre
                            class="text-sm text-white whitespace-pre-lines font-sans flex items-start justify-left"
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
              <div>
                <p class="pb-2">
                  {{
                    Array.isArray(getComponents) && getComponents.length === 0
                      ? 'No Components added yet'
                      : ''
                  }}
                </p>
              </div>

              <div v-if="getComponents">
                <div
                  v-for="component in getComponents"
                  :key="component.id"
                  class="overflow-hidden border border-gray-100 mb-6 rounded"
                >
                  <!-- Id and Title above the table, styled to look connected -->
                  <div class="bg-gray-900 pt-4 pb-1 border-b border-gray-200">
                    <div class="overflow-x-auto">
                      <table class="min-w-full">
                        <thead class="bg-gray-900">
                          <tr>
                            <th class="px-6 py-3 text-left text-sm text-white font-normal">ID:</th>
                          </tr>
                        </thead>
                        <tbody class="bg-gray-900 divide-y divide-gray-200">
                          <tr>
                            <td class="px-6 py-3 text-left text-sm text-white font-normal">
                              {{ component.id }}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div class="overflow-x-auto">
                      <table class="min-w-full">
                        <thead class="bg-gray-900">
                          <tr>
                            <th class="px-6 py-3 text-left text-sm text-white font-normal border-t">
                              Title:
                            </th>
                          </tr>
                        </thead>
                        <tbody class="bg-gray-900 divide-y divide-gray-200">
                          <tr>
                            <td
                              class="px-6 py-3 text-left text-sm text-white font-normal whitespace-pre-line"
                            >
                              {{ component.title }}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div class="overflow-x-auto">
                    <table class="min-w-full">
                      <thead class="bg-gray-900">
                        <tr>
                          <th class="px-6 py-3 text-left text-sm text-white font-normal">
                            HTML Code:
                          </th>
                        </tr>
                      </thead>
                      <tbody class="bg-gray-900 divide-y divide-gray-200">
                        <tr>
                          <td class="px-6 py-3 text-left text-sm text-white font-normal">
                            <pre
                              class="text-sm text-white whitespace-pre-lines font-sans flex items-start justify-left"
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
