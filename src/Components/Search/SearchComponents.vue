<script setup>
import Modal from '@/Components/Modals/Modal.vue';
import { ref, computed, onMounted, onBeforeMount, nextTick } from 'vue';
import componentHelpers from '@/utils/builder/html-elements/componentHelpers';
import PageBuilder from '@/composables/PageBuilder';
import SmallUniversalSpinner from '@/Components/Loaders/SmallUniversalSpinner.vue';
import { usePageBuilderStateStore } from '@/stores/page-builder-state';
import { useMediaLibraryStore } from '@/stores/media-library';

const mediaLibraryStore = useMediaLibraryStore();
const pageBuilderStateStore = usePageBuilderStateStore();
const props = defineProps({
  firstButtonText: {
    required: true,
  },
  title: {
    required: true,
  },
  show: {
    type: Boolean,
    default: false,
    required: true,
  },
});
const emit = defineEmits(['firstModalButtonSearchComponentsFunction']);

// first button function
const firstButton = function () {
  emit('firstModalButtonSearchComponentsFunction');
};

const search_query = ref('');
const categorySelected = ref({ name: 'Components', id: null });

const handlecategorySelected = function (category) {
  categorySelected.value = category;
};
const pageBuilder = new PageBuilder(pageBuilderStateStore, mediaLibraryStore);

const getFetchedComponents = computed(() => {
  return pageBuilderStateStore.getFetchedComponents;
});

const getComponentArrayAddMethod = computed(() => {
  return pageBuilderStateStore.getComponentArrayAddMethod;
});

const handleDropComponent = async function (componentObject) {
  await nextTick();
  const clonedComponent = pageBuilder.cloneCompObjForDOMInsertion({
    html_code: componentObject.html_code,
    id: componentObject.id,
  });

  await nextTick();

  pageBuilderStateStore.setPushComponents({
    component: clonedComponent,
    componentArrayAddMethod: getComponentArrayAddMethod.value,
  });

  await nextTick();
  pageBuilder.setEventListenersForElements();

  // Close modal
  firstButton();
};

const handleAddHelperComponent = async function (helperComponentObject) {
  await nextTick();
  const clonedComponent = pageBuilder.cloneCompObjForDOMInsertion({
    html_code: helperComponentObject.html_code,
    id: helperComponentObject.id,
  });

  await nextTick();

  pageBuilderStateStore.setPushComponents({
    component: clonedComponent,
    componentArrayAddMethod: getComponentArrayAddMethod.value,
  });

  await nextTick();
  pageBuilder.setEventListenersForElements();

  // Close modal
  firstButton();
};

const fetchComponents = function (page) {
  //remember old search value while paginating
  if (getFetchedComponents.value?.fetchedData?.oldInput?.search_query) {
    search_query.value =
      getFetchedComponents.value?.fetchedData?.oldInput?.search_query;
  }
  //
  pageBuilderStateStore.setLoadComponents({
    page: page,
    search_query: search_query.value,
  });
};

//
onMounted(async () => {
  fetchComponents(1);
});
</script>

<template>
  <Modal
    maxWidth="5xl"
    :show="show"
    @close="firstButton"
    minHeight=""
    maxHeight=""
  >
    <div
      class="w-full relative inline-block align-bottom text-left overflow-hidden transform transition-all sm:align-middle"
    >
      <div class="flex items-center border-b border-gray-200 p-4 mb-2">
        <div class="flex-1">
          <h3 class="tertiaryHeader my-0 py-0">
            {{ title }}
          </h3>
        </div>
        <div
          class="h-10 w-10 flex-start cursor-pointer rounded-full flex items-center border-none justify-center bg-gray-50 aspect-square hover:bg-myPrimaryLinkColor hover:text-white hover:fill-white focus-visible:ring-0"
          @click="firstButton"
        >
          <span class="material-symbols-outlined"> close </span>
        </div>
      </div>

      <div class="p-4">
        <!-- content start -->
        <template
          v-if="!getFetchedComponents.isLoading && getFetchedComponents.isError"
        >
          <p class="myPrimaryInputError">
            {{ getFetchedComponents.error }}
          </p>
        </template>

        <!--  -->

        <!-- Loading # start -->
        <template v-if="getFetchedComponents && getFetchedComponents.isLoading">
          <SmallUniversalSpinner
            class="h-40"
            width="w-6"
            height="h-6"
            border="border-4"
          ></SmallUniversalSpinner>
        </template>

        <!-- Actual data # start -->
        <template
          v-if="
            !getFetchedComponents.isError && !getFetchedComponents.isLoading
          "
        >
          <div class="flex gap-2 flex-wrap">
            <button
              @click="handlecategorySelected({ name: 'Components', id: null })"
              class="myPrimaryTag font-medium"
            >
              Components
            </button>
            <button
              @click="
                handlecategorySelected({ name: 'HTML Elements', id: null })
              "
              class="myPrimaryTag font-medium"
            >
              HTML Elements
            </button>
          </div>

          <div
            class="h-full flex md:flex-row flex-col myPrimaryGap mt-2 p-2 overflow-y-scroll"
          >
            <section class="md:w-4/6">
              <template
                v-if="
                  categorySelected && categorySelected.name === 'Components'
                "
              >
                <div
                  class="overflow-scroll min-h-[25rem] max-h-[25rem] grid myPrimaryGap md:grid-cols-2 grid-cols-2 w-full myPrimaryGap px-2 p-4 border border-myPrimaryLightGrayColor rounded-lg"
                >
                  <div
                    class="overflow-hidden whitespace-pre-line flex-1 h-auto rounded-lg border border-gray-200 lg:py-10 py-8 px-2"
                    v-for="component in getFetchedComponents &&
                    getFetchedComponents.fetchedData &&
                    getFetchedComponents.fetchedData.components &&
                    Array.isArray(
                      getFetchedComponents.fetchedData.components.data
                    ) &&
                    getFetchedComponents.fetchedData.components.data"
                    :key="component.id"
                  >
                    <div class="relative">
                      <template v-if="component && component.cover_image">
                        <img
                          :src="component.cover_image"
                          alt="placeholder"
                          class="max-h-72 cursor-pointer object-contain bg-white mx-auto"
                          @click="handleDropComponent(component)"
                        />
                      </template>
                    </div>
                  </div>
                </div>
              </template>
              <template
                v-if="
                  categorySelected && categorySelected.name === 'HTML Elements'
                "
              >
                <div
                  class="overflow-scroll min-h-[25rem] max-h-[25rem] px-2 p-4 border border-myPrimaryLightGrayColor rounded-lg"
                >
                  <div class="flex gap-4 flex-wrap w-full">
                    <!-- Unique HTML Component # start -->
                    <div
                      v-for="helperComponent in componentHelpers"
                      :key="helperComponent.title"
                    >
                      <div
                        class="flex justify-left items-center gap-4 text-xs font-medium"
                      >
                        <button
                          @click="handleAddHelperComponent(helperComponent)"
                          type="button"
                          class="mySecondaryButton"
                        >
                          <span class="material-symbols-outlined text-sm">
                            add
                          </span>
                          <span>
                            {{ helperComponent.title }}
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </section>
            <aside
              class="md:w-2/6 overflow-scroll min-h-[30rem] max-h-[30rem] w-full border rounded-lg py-4 px-2"
            >
              <div class="flex gap-4 flex-wrap w-full">
                <!-- Unique HTML Component # start -->
                <div
                  v-for="helperComponent in componentHelpers"
                  :key="helperComponent.title"
                >
                  <div
                    class="flex justify-left items-center gap-4 text-xs font-medium"
                  >
                    <button
                      @click="handleAddHelperComponent(helperComponent)"
                      type="button"
                      class="mySecondaryButton"
                    >
                      <span class="material-symbols-outlined text-sm">
                        add
                      </span>
                      <span>
                        {{ helperComponent.title }}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </template>
        <!-- Actual data # start -->
      </div>
    </div>
    <div
      v-if="!getFetchedComponents.isError"
      class="bg-slate-50 px-2 py-4 flex sm:justify-end justify-center"
    >
      <div class="sm:w-3/6 w-full px-2 my-2 flex gap-2 justify-end">
        <button
          v-if="firstButtonText"
          ref="firstButtonRef"
          class="mySecondaryButton"
          type="button"
          @click="firstButton"
        >
          {{ firstButtonText }}
        </button>
      </div>
    </div>
  </Modal>
</template>
