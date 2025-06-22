<script setup lang="ts">
import { getPageBuilder } from '../../composables/builderInstance'
const pageBuilderService = getPageBuilder()
</script>

<template>
  <div>
    <div class="pbx-blockease-linear pbx-duration-200 pbx-block pbx-ease-linear">
      <template v-if="pageBuilderClass.isSelectedElementValidText()">
        <div class="pbx-flex pbx-items-center pbx-justify-center pbx-mb-6">
          <div class="pbx-px-2 pbx-flex pbx-items-center pbx-justify-start pbx-gap-2 pbx-w-max">
            <button
              @click="pageBuilderClass.toggleTipTapModal(true)"
              type="button"
              class="pbx-myPrimaryTag"
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
