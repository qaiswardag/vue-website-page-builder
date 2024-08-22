<script setup>
import PageBuilder from '@/composables/PageBuilder';
import { usePageBuilderStateStore } from '@/stores/page-builder-state';
import { useMediaLibraryStore } from '@/stores/media-library';

const mediaLibraryStore = useMediaLibraryStore();
const pageBuilderStateStore = usePageBuilderStateStore();
const pageBuilder = new PageBuilder(pageBuilderStateStore, mediaLibraryStore);
</script>

<template>
  <div>
    <div class="blockease-linear duration-200 block ease-linear">
      <template v-if="pageBuilder.selectedElementIsValidText()">
        <div
          class="border-t border-myPrimaryLightGrayColor flex flex-row justify-between items-center pl-3 pr-3 py-5 duration-200 hover:bg-myPrimaryLightGrayColor"
        >
          <div class="px-2 flex items-center justify-start gap-2">
            <button
              @click="pageBuilderStateStore.setShowModalTipTap(true)"
              type="button"
              class="text-[12.5px] gap-2 text-nowrap pl-2 pr-3 w-full h-10 cursor-pointer rounded-full flex items-center border-none justify-center bg-gray-50 hover:bg-myPrimaryLinkColor hover:text-white focus-visible:ring-0"
            >
              <span class="material-symbols-outlined"> edit </span>
              <span>Edit text</span>
            </button>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
