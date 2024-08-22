<script setup>
import tailwindBorderRadius from '@/utils/builder/tailwind-border-radius';
import PageBuilder from '@/composables/PageBuilder';
import EditorAccordion from '@/Components/PageBuilder/EditorMenu/EditorAccordion.vue';
import { computed, ref, watch } from 'vue';
import { usePageBuilderStateStore } from '@/stores/page-builder-state';
import { useMediaLibraryStore } from '@/stores/media-library';

const mediaLibraryStore = useMediaLibraryStore();
const pageBuilderStateStore = usePageBuilderStateStore();
const pageBuilder = new PageBuilder(pageBuilderStateStore, mediaLibraryStore);
const borderRadiusGlobal = ref(null);
const borderRadiusTopLeft = ref(null);
const borderRadiusTopRight = ref(null);
const borderRadiusBottomleft = ref(null);
const borderRadiusBottomRight = ref(null);
const getBorderRadiusGlobal = computed(() => {
  return pageBuilderStateStore.getBorderRadiusGlobal;
});
const getBorderRadiusTopLeft = computed(() => {
  return pageBuilderStateStore.getBorderRadiusTopLeft;
});
const getBorderRadiusTopRight = computed(() => {
  return pageBuilderStateStore.getBorderRadiusTopRight;
});
const getBorderRadiusBottomleft = computed(() => {
  return pageBuilderStateStore.getBorderRadiusBottomleft;
});
const getBorderRadiusBottomRight = computed(() => {
  return pageBuilderStateStore.getBorderRadiusBottomRight;
});

watch(
  getBorderRadiusGlobal,
  (newValue) => {
    borderRadiusGlobal.value = newValue;
    pageBuilder.handlePageBuilderMethods();
  },
  { immediate: true }
);
watch(
  getBorderRadiusTopLeft,
  (newValue) => {
    borderRadiusTopLeft.value = newValue;
    pageBuilder.handlePageBuilderMethods();
  },
  { immediate: true }
);
watch(
  getBorderRadiusTopRight,
  (newValue) => {
    borderRadiusTopRight.value = newValue;
    pageBuilder.handlePageBuilderMethods();
  },
  { immediate: true }
);
watch(
  getBorderRadiusBottomleft,
  (newValue) => {
    borderRadiusBottomleft.value = newValue;
    pageBuilder.handlePageBuilderMethods();
  },
  { immediate: true }
);
watch(
  getBorderRadiusBottomRight,
  (newValue) => {
    borderRadiusBottomRight.value = newValue;
    pageBuilder.handlePageBuilderMethods();
  },
  { immediate: true }
);
</script>

<template>
  <EditorAccordion>
    <template #title>Border Radius</template>
    <template #content>
      <p class="myPrimaryParagraph font-medium py-0 my-4">Global</p>
      <div class="my-3 py-3">
        <label class="myPrimaryInputLabel"> Border Radius </label>
        <select
          v-model="borderRadiusGlobal"
          class="myPrimarySelect"
          @change="pageBuilder.handleBorderRadiusGlobal(borderRadiusGlobal)"
        >
          <option
            disabled
            value=""
          >
            Select
          </option>
          <option
            v-for="borderRadiusGlobal in tailwindBorderRadius.roundedGlobal"
            :key="borderRadiusGlobal"
          >
            {{ borderRadiusGlobal }}
          </option>
        </select>
      </div>
      <p class="myPrimaryParagraph font-medium py-0 my-4">Specific</p>
      <div class="my-3 py-3">
        <label class="myPrimaryInputLabel"> Border Radius top left </label>
        <select
          v-model="borderRadiusTopLeft"
          class="myPrimarySelect"
          @change="pageBuilder.handleBorderRadiusTopLeft(borderRadiusTopLeft)"
        >
          <option
            disabled
            value=""
          >
            Select
          </option>
          <option
            v-for="borderRadiusTopLeft in tailwindBorderRadius.roundedTopLeft"
            :key="borderRadiusTopLeft"
          >
            {{ borderRadiusTopLeft }}
          </option>
        </select>
      </div>
      <div class="my-3 py-3">
        <label class="myPrimaryInputLabel"> Border Radius top right </label>
        <select
          v-model="borderRadiusTopRight"
          class="myPrimarySelect"
          @change="pageBuilder.handleBorderRadiusTopRight(borderRadiusTopRight)"
        >
          <option
            disabled
            value=""
          >
            Select
          </option>
          <option
            v-for="borderRadiusTopRight in tailwindBorderRadius.roundedTopRight"
            :key="borderRadiusTopRight"
          >
            {{ borderRadiusTopRight }}
          </option>
        </select>
      </div>
      <div class="my-3 py-3">
        <label class="myPrimaryInputLabel"> Border Radius bottom left </label>
        <select
          v-model="borderRadiusBottomleft"
          class="myPrimarySelect"
          @change="
            pageBuilder.handleBorderRadiusBottomleft(borderRadiusBottomleft)
          "
        >
          <option
            disabled
            value=""
          >
            Select
          </option>
          <option
            v-for="borderRadiusBottomleft in tailwindBorderRadius.roundedBottomLeft"
            :key="borderRadiusBottomleft"
          >
            {{ borderRadiusBottomleft }}
          </option>
        </select>
      </div>
      <div class="my-3 py-3">
        <label class="myPrimaryInputLabel"> Border Radius bottom right </label>
        <select
          v-model="borderRadiusBottomRight"
          class="myPrimarySelect"
          @change="
            pageBuilder.handleBorderRadiusBottomRight(borderRadiusBottomRight)
          "
        >
          <option
            disabled
            value=""
          >
            Select
          </option>
          <option
            v-for="borderRadiusBottomRight in tailwindBorderRadius.roundedBottomRight"
            :key="borderRadiusBottomRight"
          >
            {{ borderRadiusBottomRight }}
          </option>
        </select>
      </div>
    </template>
  </EditorAccordion>
</template>
