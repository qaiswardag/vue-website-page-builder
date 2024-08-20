<script setup>
import { useStore } from "vuex";
import { computed } from "vue";
import EditorAccordion from "@/Components/PageBuilder/EditorMenu/EditorAccordion.vue";
import SlideOverRight from "@/Components/PageBuilder/Slidebars/SlideOverRight.vue";
import ManageBackgroundOpacity from "@/Components/PageBuilder/EditorMenu/Editables/ManageBackgroundOpacity.vue";
import ManageOpacity from "@/Components/PageBuilder/EditorMenu/Editables/ManageOpacity.vue";

import {
    XMarkIcon,
    SwatchIcon,
    CubeTransparentIcon,
} from "@heroicons/vue/24/outline";
import { ref, watch } from "vue";
</script>

<template>
    <EditorAccordion>
        <template #title>Opacity settings</template>
        <template #content>
            <!-- Text color - end -->
            <ManageOpacity></ManageOpacity>
            <ManageBackgroundOpacity></ManageBackgroundOpacity>
        </template>
    </EditorAccordion>
</template>
