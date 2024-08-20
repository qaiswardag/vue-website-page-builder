<script setup>
defineProps({
    description: {
        required: false,
    },
});
</script>

<template>
    <div class="relative my-16">
        <div class="absolute inset-0 flex items-center" aria-hidden="true">
            <div class="w-full border-t border-gray-300" />
        </div>
        <div class="relative flex justify-center">
            <span class="bg-white px-2 text-sm text-gray-500">{{
                description ? description : "Continue"
            }}</span>
        </div>
    </div>
</template>
