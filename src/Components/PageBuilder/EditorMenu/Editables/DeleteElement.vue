<script setup>
import EditorAccordion from '../EditorAccordion.vue';
import { computed, ref } from 'vue';
import PageBuilder from '@/composables/PageBuilder';
import { usePageBuilderStateStore } from '@/stores/page-builder-state';
import { useMediaLibraryStore } from '@/stores/media-library';

const mediaLibraryStore = useMediaLibraryStore();
const pageBuilderStateStore = usePageBuilderStateStore();
const pageBuilder = new PageBuilder(pageBuilderStateStore, mediaLibraryStore);
const getRestoredElement = computed(() => {
  return pageBuilderStateStore.getRestoredElement;
});
</script>

<template>
  <EditorAccordion>
    <template #title>Delete or restore</template>
    <template #content>
      <div class="my-2">
        <button
          v-if="getRestoredElement !== null"
          @click="pageBuilder.handleRestoreElement"
          type="button"
          class="myPrimaryButton gap-2 items-center w-full"
        >
          <span class="material-symbols-outlined"> refresh </span>
          Restore Element
        </button>
        <button
          v-if="getRestoredElement === null"
          @click="pageBuilder.handleDeleteElement"
          type="button"
          class="myPrimaryDeleteButton gap-2 items-center w-full"
        >
          <span class="myMediumIcon material-symbols-outlined"> delete </span>
          Delete Element
        </button>
      </div>
    </template>
  </EditorAccordion>
</template>
