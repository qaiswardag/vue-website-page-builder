<script setup>
import EditorAccordion from '../EditorAccordion.vue'
import ManageBackgroundOpacity from './ManageBackgroundOpacity.vue'
import ManageOpacity from './ManageOpacity.vue'
</script>

<template>
  <EditorAccordion>
    <template #title>Opacity settings</template>
    <template #content>
      <p class="myPrimaryParagraph font-medium py-0 my-4">Opacity</p>
      <!-- Text color - end -->
      <ManageOpacity></ManageOpacity>
      <ManageBackgroundOpacity></ManageBackgroundOpacity>
    </template>
  </EditorAccordion>
</template>
