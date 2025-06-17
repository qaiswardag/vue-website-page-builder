<script setup lang="ts">
import PageBuilderClass from '../../composables/PageBuilderClass'
import { sharedPageBuilderStore } from '../../stores/shared-store'

// Use shared store instance
const pageBuilderStateStore = sharedPageBuilderStore

const pageBuilderClass = new PageBuilderClass(pageBuilderStateStore)
</script>

<template>
  <div>
    <div class="blockease-linear duration-200 block ease-linear">
      <template v-if="pageBuilderClass.selectedElementIsValidText()">
        <div class="flex items-center justify-center mb-6">
          <div class="px-2 flex items-center justify-start gap-2 w-max">
            <button
              @click="pageBuilderClass.toggleTipTapModal(true)"
              type="button"
              class="myPrimaryTag"
            >
              <span class="material-symbols-outlined"> edit </span>
              <span>Edit text and links</span>
            </button>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
