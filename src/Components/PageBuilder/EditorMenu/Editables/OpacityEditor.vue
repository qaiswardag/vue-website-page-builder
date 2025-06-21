<script setup>
import EditorAccordion from '../EditorAccordion.vue'
import ManageBackgroundOpacity from './ManageBackgroundOpacity.vue'
import ManageOpacity from './ManageOpacity.vue'
</script>

<template>
  <EditorAccordion>
    <template #title>Opacity & Transparency </template>
    <template #content>
      <ManageOpacity></ManageOpacity>
      <hr />
      <ManageBackgroundOpacity></ManageBackgroundOpacity>
    </template>
  </EditorAccordion>
</template>
