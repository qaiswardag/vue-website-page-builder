<script setup>
import { router } from "@inertiajs/vue3";
import FullScreenSpinner from "@/Components/Loaders/FullScreenSpinner.vue";
import Flash from "@/Components/Actions/Flash.vue";
import { ref, computed, watch } from "vue";
import { usePage } from "@inertiajs/vue3";
import { useStore } from "vuex";
defineProps({
    title: {
        required: false,
    },
});

const store = useStore();

const getIsLoading = computed(() => {
    return store.getters["user/getIsLoading"];
});

// DOM is loaded
router.on("start", () => {
    store.commit("user/setIsLoading", true);
});

router.on("finish", (event) => {
    store.commit("user/setIsLoading", false);
});

const shouldShowFlash = ref(false);

const flashState = computed(() => {
    return usePage().props.flash;
});

watch(flashState, (newValue) => {
    if (newValue) {
        shouldShowFlash.value = true;
    }
    setTimeout(() => {
        shouldShowFlash.value = false;
    }, 1000);
});
</script>

<template>
    <Flash
        v-show="shouldShowFlash"
        :showCloseButton="false"
        :flash="$page.props.flash"
    ></Flash>

    <teleport to="body">
        <FullScreenSpinner v-if="getIsLoading"></FullScreenSpinner>
    </teleport>
    <slot />
</template>
