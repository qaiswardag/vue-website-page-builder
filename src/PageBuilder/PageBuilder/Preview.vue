<template>
    <div
        class="w-full inset-x-0 h-[90vh] z-10 bg-white overflow-x-scroll lg:pt-2 pt-2"
    >
        <div id="page-builder-editor">
            <div class="" v-html="htmlPage"></div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from "vue";

// router
// const router = useRouter();
// preview content
const htmlPage = ref("");
// get preview item from local storage
htmlPage.value = localStorage.getItem("preview");
// parse
htmlPage.value = JSON.parse(htmlPage.value);
// join
htmlPage.value = htmlPage.value.join("");
</script>
