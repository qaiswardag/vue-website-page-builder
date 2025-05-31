<script setup>
import { usePageBuilderStateStore } from '@/stores/page-builder-state';
import PageBuilder from '@/composables/PageBuilder';

const pageBuilderStateStore = usePageBuilderStateStore();

import { computed } from 'vue';

const pageBuilder = new PageBuilder(pageBuilderStateStore);

import EditorAccordion from '@/Components/PageBuilder/EditorMenu/EditorAccordion.vue';

const getElement = computed(() => {
  return pageBuilderStateStore.getElement;
});

const getRestoredElement = computed(() => {
  return pageBuilderStateStore.getRestoredElement;
});
</script>

<template>
  <EditorAccordion>
    <template #title>Element Editor</template>
    <template #content>
      <div class="flex flex-row flex-wrap gap-2 mt-2"></div>
      <div>
        <!-- delete & restore element # start -->
        <template v-if="getRestoredElement">
          <div class="px-2 flex items-center justify-start gap-2">
            <button
              @click="pageBuilder.handleRestoreElement"
              type="button"
              class="text-[12.5px] gap-2 text-nowrap pl-2 pr-3 w-full h-10 cursor-pointer rounded-full flex items-center border-none justify-center bg-gray-50 hover:bg-myPrimaryLinkColor hover:text-white focus-visible:ring-0"
            >
              <span class="material-symbols-outlined"> undo </span>
              <span>Undo</span>
            </button>
          </div>
        </template>

        <template v-if="getElement && !getRestoredElement">
          <div class="px-2 flex items-center justify-start gap-2">
            <button
              @click="pageBuilder.handleDeleteElement"
              type="button"
              class="text-[12.5px] gap-2 text-nowrap pl-2 pr-3 w-full h-10 cursor-pointer rounded-full flex items-center border-none justify-center bg-gray-50 hover:text-white focus-visible:ring-0 hover:bg-myPrimaryErrorColor"
            >
              <span class="material-symbols-outlined"> delete </span>
              <span class="hover:text-white">Delete element</span>
            </button>
          </div>
        </template>
        <!-- delete & restore element # end -->
      </div>
    </template>
  </EditorAccordion>
</template>
