<script setup>
defineProps({
    width: {
        required: false,
    },
    height: {
        required: false,
    },
    border: {
        required: false,
    },
});
</script>

<template>
    <div class="flex items-center justify-center min-h-80 max-h-80">
        <div
            class="inline-block animate-spin rounded-full border-solid border-current border-r-transparent"
            :class="[
                width ? width : 'w-4',
                height ? height : 'h-4',
                border ? border : 'border-2',
            ]"
        ></div>
    </div>
</template>
