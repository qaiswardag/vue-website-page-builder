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
  <div
    class="pbx-w-full pbx-inset-x-0 pbx-h-[90vh] pbx-bg-white pbx-overflow-x-scroll lg:pbx-pt-2 pbx-pt-2"
  >
    <div
      class="pbx-flex pbx-items-left pbx-flex-col pbx-myPrimaryGap pbx-border-myPrimaryMediumGrayColor"
    >
      <p class="pbx-myPrimaryParagraph">
        Overview of Selected Element, Component, and Components. This section provides real-time
        updates based on your HTML selection.
      </p>

      <!-- Types - start -->
      <div>
        <h4 class="pbx-myPrimaryParagraph pbx-text-xs pbx-pb-2">Types</h4>
        <div class="pbx-text-gray-100 pbx-overflow-hidden pbx-bg-stone-800">
          <div class="pbx-flex pbx-bg-stone-800 pbx-ring-1 ring-white/5">
            <div
              class="pbx-mb-px pbx-flex pbx-text-xs pbx-font-medium pbx-text-myPrimaryMediumGrayColor"
            >
              <div class="pbx-px-4 pbx-py-4 pbx-text-gray-100">Types</div>
            </div>
          </div>
          <div class="pbx-px-4 pbx-pb-8 pbx-pt-4 pbx-text-gray-100 pbx-text-xs">
            <p class="pbx-text-xs pbx-pb-2">
              <span>Element type: </span>
              <span>
                {{ typeof getElement }}
              </span>
            </p>

            <p class="pbx-text-xs pbx-pb-2">
              <span>Component type: </span>
              {{ typeof getComponent }}
            </p>
            <p class="pbx-text-xs pbx-pb-2">
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
        <h4 class="pbx-myPrimaryParagraph pbx-text-xs pbx-pb-2">Content</h4>
        <div class="pbx-overflow-hidden pbx-bg-stone-800">
          <div class="pbx-flex pbx-bg-stone-800 pbx-ring-1 ring-white/5">
            <div
              class="pbx-mb-px pbx-flex pbx-text-xs pbx-font-medium pbx-text-myPrimaryMediumGrayColor"
            >
              <div
                @click="updateCurrentTab('element')"
                class="pbx-px-4 pbx-py-4 pbx-cursor-pointer"
                :class="[current === 'element' ? 'pbx-text-gray-100' : '']"
              >
                Element
              </div>
              <div
                @click="updateCurrentTab('component')"
                class="pbx-px-4 pbx-py-4 pbx-cursor-pointer"
                :class="[current === 'component' ? 'pbx-text-gray-100' : '']"
              >
                Component
              </div>
              <div
                @click="updateCurrentTab('components')"
                class="pbx-px-4 pbx-py-4 pbx-cursor-pointer"
                :class="[current === 'components' ? 'pbx-text-gray-100' : '']"
              >
                Components added
                {{ Array.isArray(getComponents) && getComponents.length }}
              </div>
            </div>
          </div>
          <div class="pbx-px-4 pbx-pb-8 pbx-pt-4 pbx-text-gray-100 pbx-text-xs pbx-break-all">
            <div v-if="current === 'element'">
              <div v-if="!getComponent">
                <p class="pbx-pb-2 pbx-text-xs">
                  {{ getComponent === null ? 'No Element selected' : typeof getComponent }}
                </p>
              </div>
              <div
                v-if="getElement"
                class="pbx-overflow-hidden pbx-border-solid pbx-border pbx-border-gray-100 pbx-mb-6"
              >
                <div
                  class="pbx-border-0 pbx-bg-stone-800 pbx-pt-4 pbx-1 pbx-border-solid pbx-border-b pbx-border-gray-200"
                >
                  <div class="pbx-overflow-x-auto">
                    <table class="pbx-min-w-full">
                      <thead class="pbx-bg-stone-800">
                        <tr>
                          <th
                            class="pbx-px-6 pbx-py-3 pbx-text-left pbx-text-xs pbx-text-gray-100 pbx-font-normal"
                          >
                            Selected HTML:
                          </th>
                        </tr>
                      </thead>
                      <tbody class="pbx-bg-stone-800 pbx-divide-y pbx-divide-gray-200">
                        <tr>
                          <td
                            class="pbx-border-0 pbx-px-6 pbx-py-3 pbx-text-left pbx-text-xs pbx-text-gray-100 pbx-font-normal pbx-border-solid pbx-border-b"
                          >
                            {{ getElement?.outerHTML }}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div class="pbx-overflow-x-auto">
                    <table class="pbx-min-w-full">
                      <thead class="pbx-bg-stone-800">
                        <tr>
                          <th
                            class="pbx-px-6 pbx-py-3 pbx-text-left pbx-text-xs pbx-text-gray-100 pbx-font-normal"
                          >
                            Element src:
                          </th>
                        </tr>
                      </thead>
                      <tbody class="pbx-bg-stone-800 pbx-divide-y pbx-divide-gray-200">
                        <tr>
                          <td
                            class="pbx-px-6 pbx-py-3 pbx-text-left pbx-text-xs pbx-text-gray-100 pbx-font-normal pbx-whitespace-pre-line"
                          >
                            {{ getElement?.src ? getElement?.src : typeof getElement?.src }}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div class="pbx-overflow-x-auto">
                  <table class="pbx-min-w-full">
                    <thead class="pbx-bg-stone-800">
                      <tr>
                        <th
                          class="pbx-px-6 pbx-py-3 pbx-text-left pbx-text-xs pbx-text-gray-100 pbx-font-normal"
                        >
                          Element classes:
                        </th>
                      </tr>
                    </thead>
                    <tbody class="pbx-bg-stone-800 pbx-divide-y pbx-divide-gray-200">
                      <tr>
                        <td
                          class="pbx-px-6 pbx-py-3 pbx-text-left pbx-text-xs pbx-text-gray-100 pbx-font-normal"
                        >
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
                <p class="pbx-pb-2 pbx-text-xs">
                  {{ getComponent === null ? 'No Component selected' : typeof getComponent }}
                </p>
              </div>
              <div
                v-if="getComponent"
                class="pbx-overflow-hidden pbx-border-solid pbx-border pbx-border-gray-100 pbx-mb-6"
              >
                <div
                  class="pbx-border-0 pbx-bg-stone-800 pbx-pt-4 pbx-1 pbx-border-solid pbx-border-b pbx-border-gray-200"
                >
                  <div class="pbx-overflow-x-auto">
                    <table class="pbx-min-w-full">
                      <thead class="pbx-bg-stone-800">
                        <tr>
                          <th
                            class="pbx-px-6 pbx-py-3 pbx-text-left pbx-text-xs pbx-text-gray-100 pbx-font-normal"
                          >
                            ID:
                          </th>
                        </tr>
                      </thead>
                      <tbody class="pbx-bg-stone-800 pbx-divide-y pbx-divide-gray-200">
                        <tr>
                          <td
                            class="pbx-px-6 pbx-py-3 pbx-text-left pbx-text-xs pbx-text-gray-100 pbx-font-normal"
                          >
                            {{ getComponent?.id }}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div class="pbx-overflow-x-auto">
                    <table class="pbx-min-w-full">
                      <thead class="pbx-bg-stone-800">
                        <tr>
                          <th
                            class="pbx-border-0 pbx-px-6 pbx-py-3 pbx-text-left pbx-text-xs pbx-text-gray-100 pbx-font-normal pbx-border-solid pbx-border-t pbx-border-gray-200"
                          >
                            Title:
                          </th>
                        </tr>
                      </thead>
                      <tbody class="pbx-bg-stone-800 pbx-divide-y pbx-divide-gray-200">
                        <tr>
                          <td
                            class="pbx-px-6 pbx-py-3 pbx-text-left pbx-text-xs pbx-text-gray-100 pbx-font-normal pbx-whitespace-pre-line"
                          >
                            {{ getComponent?.title }}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div class="pbx-overflow-x-auto">
                  <table class="pbx-min-w-full">
                    <thead class="pbx-bg-stone-800">
                      <tr>
                        <th
                          class="pbx-px-6 pbx-py-3 pbx-text-left pbx-text-xs pbx-text-gray-100 pbx-font-normal"
                        >
                          HTML Code:
                        </th>
                      </tr>
                    </thead>
                    <tbody class="pbx-bg-stone-800 pbx-divide-y pbx-divide-gray-200">
                      <tr>
                        <td
                          class="pbx-px-6 pbx-py-3 pbx-text-left pbx-text-xs pbx-text-gray-100 pbx-font-normal"
                        >
                          <pre
                            class="pbx-text-xs pbx-text-gray-100 pbx-whitespace-pre-lines pbx-font-sans pbx-flex pbx-items-start pbx-justify-left"
                          >
                              <code class="pbx-font-sans" v-html="prettifyHtml(getComponent?.html_code)"></code>
                            </pre>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div v-if="current === 'components'">
              <div v-if="Array.isArray(getComponents) && getComponents.length === 0">
                <p class="pbx-pb-2 pbx-text-xs">No Components added yet</p>
              </div>

              <div v-if="getComponents">
                <div
                  v-for="component in getComponents"
                  :key="component.id"
                  class="pbx-overflow-hidden pbx-border-solid pbx-border pbx-border-gray-100 pbx-mb-6"
                >
                  <!-- Id and Title above the table, styled to look connected -->
                  <div
                    class="pbx-border-0 pbx-bg-stone-800 pbx-pt-4 pbx-1 pbx-border-solid pbx-border-b pbx-border-gray-200"
                  >
                    <div class="pbx-overflow-x-auto">
                      <table class="pbx-min-w-full">
                        <thead class="pbx-bg-stone-800">
                          <tr>
                            <th
                              class="pbx-px-6 pbx-py-3 pbx-text-left pbx-text-xs pbx-text-gray-100 pbx-font-normal"
                            >
                              ID:
                            </th>
                          </tr>
                        </thead>
                        <tbody class="pbx-bg-stone-800 pbx-divide-y pbx-divide-gray-200">
                          <tr>
                            <td
                              class="pbx-px-6 pbx-py-3 pbx-text-left pbx-text-xs pbx-text-gray-100 pbx-font-normal"
                            >
                              {{ component.id }}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div class="pbx-overflow-x-auto">
                      <table class="pbx-min-w-full">
                        <thead class="pbx-bg-stone-800">
                          <tr>
                            <th
                              class="pbx-border-0 pbx-px-6 pbx-py-3 pbx-text-left pbx-text-xs pbx-text-gray-100 pbx-font-normal pbx-border-solid pbx-border-t pbx-border-gray-200"
                            >
                              Title:
                            </th>
                          </tr>
                        </thead>
                        <tbody class="pbx-bg-stone-800 pbx-divide-y pbx-divide-gray-200">
                          <tr>
                            <td
                              class="pbx-px-6 pbx-py-3 pbx-text-left pbx-text-xs pbx-text-gray-100 pbx-font-normal pbx-whitespace-pre-line"
                            >
                              {{ component.title }}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div class="pbx-overflow-x-auto">
                    <table class="pbx-min-w-full">
                      <thead class="pbx-bg-stone-800">
                        <tr>
                          <th
                            class="pbx-px-6 pbx-py-3 pbx-text-left pbx-text-xs pbx-text-gray-100 pbx-font-normal"
                          >
                            HTML Code:
                          </th>
                        </tr>
                      </thead>
                      <tbody class="pbx-bg-stone-800 pbx-divide-y pbx-divide-gray-200">
                        <tr>
                          <td
                            class="pbx-px-6 pbx-py-3 pbx-text-left pbx-text-xs pbx-text-gray-100 pbx-font-normal"
                          >
                            <pre
                              class="pbx-text-xs pbx-text-gray-100 pbx-whitespace-pre-lines pbx-font-sans pbx-flex pbx-items-start pbx-justify-left"
                            >
                              <code class="pbx-font-sans" v-html="prettifyHtml(component.html_code)"></code>
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
