<script setup>
import { onMounted, computed, ref, watch, nextTick } from 'vue';
import PageBuilder from '@/composables/PageBuilder';
import PageBuilderPreviewModal from '@/Components/Modals/PageBuilderPreviewModal.vue';
import Preview from '@/PageBuilder/PageBuilder/Preview.vue';
import ComponentTopMenu from '@/Components/PageBuilder/EditorMenu/Editables/ComponentTopMenu.vue';
import EditGetElement from '@/Components/PageBuilder/EditorMenu/Editables/EditGetElement.vue';
import SearchComponents from '@/Components/Search/SearchComponents.vue';

import {
  Bars3Icon,
  XMarkIcon,
  EyeIcon,
  BellIcon,
  EyeSlashIcon,
  AdjustmentsVerticalIcon,
  Square3Stack3DIcon,
  Squares2X2Icon,
  XCircleIcon,
  BoltSlashIcon,
  FolderPlusIcon,
  DevicePhoneMobileIcon,
} from '@heroicons/vue/24/outline';
import { useStore } from 'vuex';
import OptionsDropdown from '@/Components/PageBuilder/DropdownsPlusToggles/OptionsDropdown.vue';
import RightSidebarEditor from '@/Components/PageBuilder/EditorMenu/RightSidebarEditor.vue';

const emit = defineEmits(['previewCurrentDesign']);

const props = defineProps({
  team: {
    required: false,
  },
});

const store = useStore();
const pageBuilder = new PageBuilder(store);

const getMenuRight = computed(() => {
  return store.getters['pageBuilderState/getMenuRight'];
});

const previewCurrentDesign = function () {
  pageBuilder.previewCurrentDesign();
};

const openDesignerPreviewModal = ref(false);
const firstDesignerPreviewModalButtonFunction = ref(null);

const handleDesignerPreview = function () {
  previewCurrentDesign();
  // set modal standards
  openDesignerPreviewModal.value = true;
  // handle click
  firstDesignerPreviewModalButtonFunction.value = function () {
    // set open modal
    openDesignerPreviewModal.value = false;
  };
  // end modal
};

const showModalAddComponent = ref(false);
const titleModalAddComponent = ref('');
const firstButtonTextSearchComponents = ref('');
const firstModalButtonSearchComponentsFunction = ref(null);

const handleAddComponent = function () {
  store.commit('pageBuilderState/setComponent', null);

  //
  titleModalAddComponent.value = 'Add Components to Page';
  firstButtonTextSearchComponents.value = 'Close';
  showModalAddComponent.value = true;

  firstModalButtonSearchComponentsFunction.value = function () {
    // handle show modal for unique content
    showModalAddComponent.value = false;
  };

  // end modal
};

const getComponents = computed(() => {
  return store.getters['pageBuilderState/getComponents'];
});
const getComponent = computed(() => {
  return store.getters['pageBuilderState/getComponent'];
});
const getElement = computed(() => {
  return store.getters['pageBuilderState/getElement'];
});

const getElementAttributes = computed(() => {
  if (!getElement.value) {
    return new Object();
  }

  // Extract the attributes you want to watch
  const attributesToWatch = {
    src: getElement.value.getAttribute('src'),
    href: getElement.value.getAttribute('href'),
    style: getElement.value.getAttribute('style'),
    class: getElement.value.getAttribute('class'),
  };

  return attributesToWatch;
});

watch(getElementAttributes, (newAttributes, oldAttributes) => {
  // Check if any of the specified attributes have changed
  if (
    newAttributes?.src !== oldAttributes?.src ||
    newAttributes?.href !== oldAttributes?.href ||
    newAttributes?.style !== oldAttributes?.style ||
    newAttributes?.class !== oldAttributes?.class
  ) {
    // Trigger your method when any of the specified attributes change
    pageBuilder.handlePageBuilderMethods();
    pageBuilder.setEventListenersForElements();
  }
});

const handleSelectComponent = function (componentObject) {
  store.commit('pageBuilderState/setComponent', componentObject);
};

const draggableZone = ref(null);

onMounted(async () => {
  pageBuilder.setEventListenersForElements();
});
</script>

<template>
  <SearchComponents
    v-if="showModalAddComponent"
    :show="showModalAddComponent"
    :team="team"
    :firstButtonText="firstButtonTextSearchComponents"
    :title="titleModalAddComponent"
    @firstModalButtonSearchComponentsFunction="
      firstModalButtonSearchComponentsFunction
    "
  ></SearchComponents>
  <PageBuilderPreviewModal
    :show="openDesignerPreviewModal"
    @firstDesignerPreviewModalButtonFunction="
      firstDesignerPreviewModalButtonFunction
    "
  >
    <Preview></Preview>
  </PageBuilderPreviewModal>

  <div
    class="w-full inset-x-0 h-[90vh] z-10 bg-white overflow-x-scroll lg:pt-2 pt-2"
  >
    <div class="relative h-full flex">
      <div
        @click.self="store.commit('pageBuilderState/setComponent', null)"
        class="min-w-[3.5rem] pt-6 pb-2 my-2 mx-2 bg-myPrimaryLightGrayColor rounded-full shadow"
      >
        <div class="mx-2 flex flex-col myPrimaryGap">
          <div class="flex gap-2 items-center justify-center">
            <button
              type="button"
              @click="
                () => {
                  store.commit(
                    'pageBuilderState/setComponentArrayAddMethod',
                    'unshift'
                  );
                  handleAddComponent();
                }
              "
              class="h-10 w-10 cursor-pointer rounded-full flex items-center border-none justify-center bg-gray-50 aspect-square hover:bg-myPrimaryLinkColor hover:text-white focus-visible:ring-0"
            >
              <span class="myMediumIcon material-symbols-outlined"> add </span>
            </button>
          </div>

          <div
            @click.self="store.commit('pageBuilderState/setComponent', null)"
          >
            <ComponentTopMenu v-if="getElement"></ComponentTopMenu>
          </div>
        </div>
      </div>
      <main
        class="flex flex-col h-full grow rounded-2xl duration-300 shadow-2xl"
      >
        <div
          class="flex items-center justify-between primary-gap rounded-t-2xl bg-myPrimaryLightGrayColor"
        >
          <div
            @click.self="store.commit('pageBuilderState/setComponent', null)"
            class="w-4/12 flex justify-start items-center py-2 pl-2 h-full"
          >
            <div class="flex gap-2">
              <span class="w-2 h-2 rounded-full bg-red-400"></span>
              <span class="w-2 h-2 rounded-full bg-yellow-400"></span>
              <span class="w-2 h-2 rounded-full bg-green-400"></span>
            </div>
          </div>

          <div
            @click.self="store.commit('pageBuilderState/setComponent', null)"
            class="w-4/12 flex justify-center py-2"
          >
            <OptionsDropdown
              @previewCurrentDesign="previewCurrentDesign"
            ></OptionsDropdown>
          </div>

          <div
            @click.self="store.commit('pageBuilderState/setComponent', null)"
            class="w-4/12 flex justify-end py-2 pr-2"
          >
            <div class="flex items-center justify-center gap-2">
              <button
                type="button"
                @click="
                  () => {
                    store.commit(
                      'pageBuilderState/setComponentArrayAddMethod',
                      'unshift'
                    );
                    handleAddComponent();
                  }
                "
                class="h-10 w-10 cursor-pointer rounded-full flex items-center border-none justify-center bg-gray-50 aspect-square hover:bg-myPrimaryLinkColor hover:text-white focus-visible:ring-0"
              >
                <span class="myMediumIcon material-symbols-outlined">
                  add
                </span>
              </button>
              <button
                type="button"
                @click="
                  () => {
                    store.commit('pageBuilderState/setMenuRight', false);
                    handleDesignerPreview();
                  }
                "
                class="h-10 w-10 cursor-pointer rounded-full flex items-center border-none justify-center bg-gray-50 aspect-square hover:bg-myPrimaryLinkColor hover:text-white focus-visible:ring-0"
              >
                <span class="material-symbols-outlined"> visibility </span>
              </button>

              <button
                type="button"
                v-if="getMenuRight === false"
                @click="store.commit('pageBuilderState/setMenuRight', true)"
                class="h-10 w-10 cursor-pointer rounded-full flex items-center border-none justify-center bg-gray-50 aspect-square hover:bg-myPrimaryLinkColor hover:text-white focus-visible:ring-0"
              >
                <span class="material-symbols-outlined"> gesture </span>
              </button>
            </div>
          </div>
        </div>

        <EditGetElement></EditGetElement>
        <div
          @click="store.commit('pageBuilderState/setComponent', null)"
          id="contains-pagebuilder"
          class="pl-4 pr-4 pb-4 overflow-y-auto h-screen pt-1"
        >
          <div id="pagebuilder">
            <div ref="draggableZone">
              <!-- Added Components to DOM # start -->
              <div
                v-for="component in Array.isArray(getComponents) &&
                getComponents"
                :key="component"
                id="page-builder-editor-editable-area"
                class="bg-white grow"
              >
                <div
                  @mouseup="handleSelectComponent(component)"
                  class="relative group"
                >
                  <div v-html="component.html_code"></div>
                </div>
              </div>
            </div>
            <!-- Added Components to DOM # end -->

            <!-- Add Component # start -->
            <div
              class="rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 my-12 mx-8"
            >
              <h3 class="mt-2 text-sm font-medium text-gray-900">
                Add Components
              </h3>
              <p class="mt-1 text-sm text-gray-500">
                Get started by adding components using the drag & drop Page
                Builder.
              </p>
              <div class="mt-6 flex items-center gap-2 justify-center">
                <button
                  @click="
                    () => {
                      store.commit(
                        'pageBuilderState/setComponentArrayAddMethod',
                        'push'
                      );
                      handleAddComponent();
                    }
                  "
                  type="button"
                  class="myPrimaryButton flex items-center gap-2 justify-center"
                >
                  <span class="myMediumIcon material-symbols-outlined">
                    add
                  </span>
                  Add component
                </button>
              </div>
            </div>
            <!-- Add Component # end -->
          </div>
        </div>
        <!-- Add Component # end -->
      </main>

      <aside
        aria-label="Menu"
        :class="{ 'w-0': !getMenuRight, 'w-80 ml-4': getMenuRight }"
        class="h-full duration-300 z-20 flex-shrink-0 overflow-hidden shadow-2xl rounded-l-2xl bg-white"
      >
        <RightSidebarEditor
          :team="team"
          @closeEditor="store.commit('pageBuilderState/setMenuRight', false)"
        >
        </RightSidebarEditor>
      </aside>
    </div>
  </div>
</template>

<style>
#pagebuilder a {
  cursor: default;
}

#pagebuilder [element] {
  outline: rgba(255, 255, 255, 0) dashed 3px !important;
  outline-offset: -3px !important;
}
#pagebuilder [hovered] {
  outline: rgb(0, 140, 14, 1) dashed 3px !important;
  outline-offset: -3px !important;
}

#pagebuilder [selected] {
  position: relative;

  outline: rgb(185, 16, 16) dashed 3px !important;
  outline-offset: -3px !important;
}

/* sortable */

.sortable-ghost {
  display: flex;
  justify-content: center;
}

.sortable-ghost > * {
  width: 100%;
}
</style>
