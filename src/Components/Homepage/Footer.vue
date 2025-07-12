<script setup>
const version = __APP_VERSION__
</script>

<template>
  <div
    class="pbx-flex pbx-justify-between pbx-gap-2 pbx-bg-red-100 pbx-py-10 lg:pbx-px-12 pbx-px-4"
  >
    <div>
      <p class="pbx-myPrimaryParagraph">
        <a
          href="https://www.npmjs.com/package/@myissue/vue-website-page-builder"
          target="_blank"
          class="pbx-myPrimaryLink pbx-text-myPrimaryDarkGrayColor"
        >
          Install via npm
        </a>
      </p>
      <p class="pbx-myPrimaryParagraph pbx-mt-3">
        <a
          href="https://github.com/myissue-org/vue-website-page-builder"
          target="_blank"
          class="pbx-myPrimaryLink pbx-text-myPrimaryDarkGrayColor"
        >
          View on GitHub
        </a>
      </p>
    </div>
    <p class="pbx-myPrimaryParagraph pbx-mt-3">
      <span class="pbx-text-myPrimaryDarkGrayColor pbx-text-sm">{{ version }}</span>
    </p>
  </div>
</template>
