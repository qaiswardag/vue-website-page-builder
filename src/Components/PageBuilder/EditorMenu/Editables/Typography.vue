<script setup>
import PageBuilder from '@/composables/PageBuilder';
import EditorAccordion from '@/Components/PageBuilder/EditorMenu/EditorAccordion.vue';
import tailwindFontSizes from '@/utils/builder/tailwind-font-sizes';
import tailwindFontStyles from '@/utils/builder/tailwind-font-styles';
import { computed, ref, watch } from 'vue';
import { usePageBuilderStateStore } from '@/stores/page-builder-state';

const pageBuilderStateStore = usePageBuilderStateStore();
const pageBuilder = new PageBuilder(pageBuilderStateStore, mediaLibraryStore);
const fontBase = ref(null);
const fontDesktop = ref(null);
const fontTablet = ref(null);
const fontMobile = ref(null);
const fontWeight = ref(null);
const fontFamily = ref(null);
const fontStyle = ref(null);
const getFontBase = computed(() => {
  return pageBuilderStateStore.getFontBase;
});
const getFontDesktop = computed(() => {
  return pageBuilderStateStore.getFontDesktop;
});
const getFontTablet = computed(() => {
  return pageBuilderStateStore.getFontTablet;
});
const getFontMobile = computed(() => {
  return pageBuilderStateStore.getFontMobile;
});
const getFontWeight = computed(() => {
  return pageBuilderStateStore.getFontWeight;
});
const getFontFamily = computed(() => {
  return pageBuilderStateStore.getFontFamily;
});
const getFontStyle = computed(() => {
  return pageBuilderStateStore.getFontStyle;
});

watch(
  getFontBase,
  (newValue) => {
    fontBase.value = newValue;
    pageBuilder.handlePageBuilderMethods();
  },
  { immediate: true }
);
watch(
  getFontDesktop,
  (newValue) => {
    fontDesktop.value = newValue;
    pageBuilder.handlePageBuilderMethods();
  },
  { immediate: true }
);
watch(
  getFontTablet,
  (newValue) => {
    fontTablet.value = newValue;
    pageBuilder.handlePageBuilderMethods();
  },
  { immediate: true }
);
watch(
  getFontMobile,
  (newValue) => {
    fontMobile.value = newValue;
    pageBuilder.handlePageBuilderMethods();
  },
  { immediate: true }
);
watch(
  getFontWeight,
  (newValue) => {
    fontWeight.value = newValue;
    pageBuilder.handlePageBuilderMethods();
  },
  { immediate: true }
);
watch(
  getFontFamily,
  (newValue) => {
    fontFamily.value = newValue;
    pageBuilder.handlePageBuilderMethods();
  },
  { immediate: true }
);
watch(
  getFontStyle,
  (newValue) => {
    fontStyle.value = newValue;
    pageBuilder.handlePageBuilderMethods();
  },
  { immediate: true }
);
</script>

<template>
  <EditorAccordion>
    <template #title> Typographies </template>
    <template #content>
      <!-- FONT SIZES -->
      <p class="myPrimaryParagraph font-medium py-0 my-4">Font sizes</p>
      <div class="my-3 py-3">
        <label class="myPrimaryInputLabel"> Font Base </label>
        <select
          v-model="fontBase"
          class="myPrimarySelect"
          @change="pageBuilder.handleFontSize(fontBase)"
        >
          <option
            disabled
            value=""
          >
            Select
          </option>
          <option
            v-for="fontSize in tailwindFontSizes.fontBase"
            :key="fontSize"
          >
            {{ fontSize }}
          </option>
        </select>
      </div>
      <div class="my-3 py-3">
        <label class="myPrimaryInputLabel"> Font desktop size </label>
        <select
          v-model="fontDesktop"
          class="myPrimarySelect"
          @change="pageBuilder.handleFontSize(fontDesktop)"
        >
          <option
            disabled
            value=""
          >
            Select
          </option>
          <option
            v-for="fontSize in tailwindFontSizes.fontDesktop"
            :key="fontSize"
          >
            {{ fontSize }}
          </option>
        </select>
      </div>
      <div class="my-3 py-3">
        <label class="myPrimaryInputLabel"> Font tablet size </label>
        <select
          v-model="fontTablet"
          class="myPrimarySelect"
          @change="pageBuilder.handleFontSize(fontTablet)"
        >
          <option
            disabled
            value=""
          >
            Select
          </option>
          <option
            v-for="fontSize in tailwindFontSizes.fontTablet"
            :key="fontSize"
          >
            {{ fontSize }}
          </option>
        </select>
      </div>
      <div class="my-3 py-3">
        <label class="myPrimaryInputLabel"> Font mobile size </label>
        <select
          v-model="fontMobile"
          class="myPrimarySelect"
          @change="pageBuilder.handleFontSize(fontMobile)"
        >
          <option
            disabled
            value=""
          >
            Select
          </option>
          <option
            v-for="fontSize in tailwindFontSizes.fontMobile"
            :key="fontSize"
          >
            {{ fontSize }}
          </option>
        </select>
      </div>
      <hr />
      <p class="myPrimaryParagraph font-medium py-0 my-4">Font general</p>
      <div class="my-3 py-3">
        <label class="myPrimaryInputLabel"> Font weight </label>
        <select
          v-model="fontWeight"
          class="myPrimarySelect"
          @change="pageBuilder.handleFontWeight(fontWeight)"
        >
          <option
            disabled
            value=""
          >
            Select
          </option>
          <option
            v-for="fontWeight in tailwindFontStyles.fontWeight"
            :key="fontWeight"
          >
            {{ fontWeight }}
          </option>
        </select>
      </div>
      <div class="my-3 py-3">
        <label class="myPrimaryInputLabel"> Font family </label>
        <select
          v-model="fontFamily"
          class="myPrimarySelect"
          @change="pageBuilder.handleFontFamily(fontFamily)"
        >
          <option
            disabled
            value=""
          >
            Select
          </option>
          <option
            v-for="fontFamily in tailwindFontStyles.fontFamily"
            :key="fontFamily"
          >
            {{ fontFamily }}
          </option>
        </select>
      </div>
      <div class="my-3 py-3">
        <label class="myPrimaryInputLabel"> Font Style </label>
        <select
          v-model="fontStyle"
          class="myPrimarySelect"
          @change="pageBuilder.handleFontStyle(fontStyle)"
        >
          <option
            disabled
            value=""
          >
            Select
          </option>
          <option
            v-for="fontStyle in tailwindFontStyles.fontStyle"
            :key="fontStyle"
          >
            {{ fontStyle }}
          </option>
        </select>
      </div>
    </template>
  </EditorAccordion>
</template>
