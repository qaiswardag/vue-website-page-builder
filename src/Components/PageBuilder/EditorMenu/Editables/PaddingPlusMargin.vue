<script setup>
import tailwindPaddingPlusMargin from "@/utils/builder/tailwind-padding-margin";
import PageBuilder from "@/composables/PageBuilder";
import EditorAccordion from "@/Components/PageBuilder/EditorMenu/EditorAccordion.vue";
import { useStore } from "vuex";
import { computed, ref, watch } from "vue";

const store = useStore();

const pageBuilder = new PageBuilder(store);

const fontVerticalPadding = ref(null);
const fontHorizontalPadding = ref(null);
const fontVerticalMargin = ref(null);
const fontHorizontalMargin = ref(null);

const getFontVerticalPadding = computed(() => {
    return store.getters["pageBuilderState/getFontVerticalPadding"];
});
const getFontHorizontalPadding = computed(() => {
    return store.getters["pageBuilderState/getFontHorizontalPadding"];
});
const getFontVerticalMargin = computed(() => {
    return store.getters["pageBuilderState/getFontVerticalMargin"];
});
const getFontHorizontalMargin = computed(() => {
    return store.getters["pageBuilderState/getFontHorizontalMargin"];
});

watch(
    getFontVerticalPadding,
    (newValue) => {
        fontVerticalPadding.value = newValue;
    },
    { immediate: true }
);
watch(
    getFontHorizontalPadding,
    (newValue) => {
        fontHorizontalPadding.value = newValue;
    },
    { immediate: true }
);
watch(
    getFontVerticalMargin,
    (newValue) => {
        fontVerticalMargin.value = newValue;
    },
    { immediate: true }
);
watch(
    getFontHorizontalMargin,
    (newValue) => {
        fontHorizontalMargin.value = newValue;
    },
    { immediate: true }
);
</script>
<template>
    <EditorAccordion>
        <template #title>Padding & Margin</template>
        <template #content>
            <p class="myPrimaryParagraph font-medium py-0 my-4">Padding</p>
            <div class="my-3 py-3">
                <label class="myPrimaryInputLabel"> Padding Y-axis </label>
                <select
                    v-model="fontVerticalPadding"
                    class="myPrimarySelect"
                    @change="
                        pageBuilder.handleVerticalPadding(fontVerticalPadding)
                    "
                >
                    <option disabled value="">Select</option>
                    <option
                        v-for="verticalPadding in tailwindPaddingPlusMargin.verticalPadding"
                        :key="verticalPadding"
                    >
                        {{ verticalPadding }}
                    </option>
                </select>
            </div>
            <div class="my-3 py-3">
                <label class="myPrimaryInputLabel"> Padding X-axis </label>
                <select
                    v-model="fontHorizontalPadding"
                    class="myPrimarySelect"
                    @change="
                        pageBuilder.handleHorizontalPadding(
                            fontHorizontalPadding
                        )
                    "
                >
                    <option disabled value="">Select</option>
                    <option
                        v-for="horizontalPadding in tailwindPaddingPlusMargin.horizontalPadding"
                        :key="horizontalPadding"
                    >
                        {{ horizontalPadding }}
                    </option>
                </select>
            </div>
            <p class="myPrimaryParagraph font-medium py-0 my-4">Margin</p>
            <div class="my-3 py-3">
                <label class="myPrimaryInputLabel"> Margin Y-axis </label>
                <select
                    v-model="fontVerticalMargin"
                    class="myPrimarySelect"
                    @change="
                        pageBuilder.handleVerticalMargin(fontVerticalMargin)
                    "
                >
                    <option disabled value="">Select</option>
                    <option
                        v-for="verticalMargin in tailwindPaddingPlusMargin.verticalMargin"
                        :key="verticalMargin"
                    >
                        {{ verticalMargin }}
                    </option>
                </select>
            </div>
            <div class="my-3 py-3">
                <label class="myPrimaryInputLabel"> Margin X-axis </label>
                <select
                    v-model="fontHorizontalMargin"
                    class="myPrimarySelect"
                    @change="
                        pageBuilder.handleHorizontalMargin(fontHorizontalMargin)
                    "
                >
                    <option disabled value="">Select</option>
                    <option
                        v-for="horizontalMargin in tailwindPaddingPlusMargin.horizontalMargin"
                        :key="horizontalMargin"
                    >
                        {{ horizontalMargin }}
                    </option>
                </select>
            </div>
        </template>
    </EditorAccordion>
</template>
