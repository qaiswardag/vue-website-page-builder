<script setup lang="ts">
import { getPageBuilder } from '../../composables/builderInstance'
import { useTranslations } from '../../composables/useTranslations'

const { translate } = useTranslations()
const pageBuilderService = getPageBuilder()
</script>

<template>
  <div>
    <div class="pbx-blockease-linear pbx-duration-200 pbx-block pbx-ease-linear">
      <template v-if="pageBuilderService.isSelectedElementValidText()">
        <hr />
        <div class="pbx-flex pbx-items-center pbx-justify-start pbx-mb-6 pbx-pt-4">
          <div
            class="pbx-pr-2 pbx-pl-1 pbx-flex pbx-items-center pbx-justify-start pbx-gap-2 pbx-w-max"
          >
            <div
              @click="pageBuilderService.toggleTipTapModal(true)"
              class="pbx-myPrimaryParagraph pbx-cursor-pointer pbx-textsm pbx-flex pbx-items-center pbx-gap-2"
            >
              <div
                class="pbx-h-10 pbx-w-10 pbx-cursor-pointer pbx-rounded-full pbx-flex pbx-items-center pbx-border-none pbx-justify-center pbx-bg-gray-50 pbx-aspect-square hover:pbx-bg-myPrimaryLinkColor hover:pbx-text-white focus-visible:pbx-ring-0 pbx-text-black hover:pbx-text-white"
              >
                <span class="material-symbols-outlined"> edit </span>
              </div>
              <span class="pbx-text-xs">{{ translate('Edit text and links') }}</span>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
