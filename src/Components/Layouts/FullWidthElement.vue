<script setup>
defineProps({
  descriptionArea: {
    Type: Boolean,
    required: true,
    default: true,
  },
  headerArea: {
    Type: Boolean,
    default: true,
  },
});
</script>

<template>
  <!-- chimp start -->
  <div class="myPrimaryWidthScreenModule">
    <template v-if="headerArea">
      <div class="myPrimaryContentSection">
        <h2 class="mySecondaryHeader">
          <slot name="title" />
        </h2>
        <template v-if="descriptionArea === true">
          <p class="myPrimaryParagraph font-normal">
            <slot name="description" />
          </p>
        </template>
      </div>
    </template>
    <div class="myPrimaryContentSection">
      <slot name="content" />
    </div>
  </div>
</template>
