<script setup>
const version = __APP_VERSION__
</script>

<template>
  <div class="flex justify-between gap-2 bg-red-100 py-10 lg:px-12 px-4">
    <div>
      <p class="myPrimaryParagraph">
        <a
          href="https://www.npmjs.com/package/@myissue/vue-website-page-builder"
          target="_blank"
          class="myPrimaryLink text-myPrimaryDarkGrayColor"
        >
          Install via npm
        </a>
      </p>
      <p class="myPrimaryParagraph mt-3">
        <a
          href="https://github.com/qaiswardag/vue-website-page-builder"
          target="_blank"
          class="myPrimaryLink text-myPrimaryDarkGrayColor"
        >
          View on GitHub
        </a>
      </p>
    </div>
    <p class="myPrimaryParagraph mt-3">
      <span class="text-myPrimaryDarkGrayColor text-sm">{{ version }}</span>
    </p>
  </div>
</template>
