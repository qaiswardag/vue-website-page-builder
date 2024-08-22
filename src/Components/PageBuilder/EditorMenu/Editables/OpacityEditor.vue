<script setup>
import EditorAccordion from '@/Components/PageBuilder/EditorMenu/EditorAccordion.vue';
import ManageBackgroundOpacity from '@/Components/PageBuilder/EditorMenu/Editables/ManageBackgroundOpacity.vue';
import ManageOpacity from '@/Components/PageBuilder/EditorMenu/Editables/ManageOpacity.vue';
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
