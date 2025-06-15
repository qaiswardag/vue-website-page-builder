<script setup>
import { computed } from 'vue'
import { sharedPageBuilderStore } from '../../../stores/shared-store'
import ClassEditor from './Editables/ClassEditor.vue'
import ImageEditor from './Editables/ImageEditor.vue'
import OpacityEditor from './Editables/OpacityEditor.vue'
import Typography from './Editables/Typography.vue'
import PaddingPlusMargin from './Editables/PaddingPlusMargin.vue'
import DeleteElement from './Editables/DeleteElement.vue'
import BorderRadius from './Editables/BorderRadius.vue'
import BackgroundColorEditor from './Editables/BackgroundColorEditor.vue'
import Borders from './Editables/Borders.vue'
import LinkEditor from './Editables/LinkEditor.vue'
import TipTap from '../../TipTap/TipTap.vue'
import EditGetElement from './Editables/EditGetElement.vue'
import ElementEditor from './Editables/ElementEditor.vue'

// Use shared store instance
const pageBuilderStateStore = sharedPageBuilderStore

// emit
const emit = defineEmits(['closeEditor'])

// get current element tag
const getElement = computed(() => {
  return pageBuilderStateStore.getElement
})

// Get tagName of element
const elementTag = computed(() => {
  return getElement.value?.tagName
})

const isHeadingElement = computed(() => {
  return (
    (getElement.value instanceof HTMLElement && getElement.value.innerText.trim() !== ' ') ||
    getElement.value instanceof HTMLImageElement
  )
})
</script>

<template>
  <div class="flex max-h-[50rem] flex-col">
    <div class="flex flex-row justify-between pt-7 pr-4 pl-4 items-center mb-3">
      <button
        type="button"
        @click="$emit('closeEditor')"
        class="h-10 w-10 cursor-pointer rounded-full flex items-center border-none justify-center bg-gray-50 aspect-square hover:bg-myPrimaryLinkColor hover:text-white focus-visible:ring-0"
      >
        <span class="material-symbols-outlined"> close </span>
      </button>
      <p class="font-medium text-sm">
        Editing
        <span class="lowercase">&lt;{{ elementTag }}&gt;</span>
      </p>
    </div>

    <div class="pl-3 pr-3 mb-4 overflow-y-scroll md:pb-24 pb-12">
      <div v-show="isHeadingElement === true">
        <article class="py-0.5">
          <ImageEditor> </ImageEditor>
        </article>
        <article class="py-0.5">
          <TipTap></TipTap>
        </article>
        <article
          class="py-0.5"
          v-if="
            false &&
            $page.props.user.superadmin !== null &&
            $page.props.user.superadmin.role === 'admin'
          "
        >
          <LinkEditor></LinkEditor>
        </article>
        <article
          class="py-0.5"
          v-if="
            false &&
            $page.props.user.superadmin !== null &&
            $page.props.user.superadmin.role === 'admin'
          "
        >
          <Typography></Typography>
        </article>

        <article class="py-0.5">
          <OpacityEditor> </OpacityEditor>
        </article>
        <article class="py-0.5">
          <PaddingPlusMargin> </PaddingPlusMargin>
        </article>
        <article class="py-0.5">
          <BorderRadius></BorderRadius>
        </article>
        <article class="py-0.5">
          <Borders></Borders>
        </article>
        <article class="py-0.5">
          <ClassEditor></ClassEditor>
        </article>
      </div>

      <div>
        <article class="py-0.5">
          <ElementEditor></ElementEditor>
        </article>
      </div>
      <article class="py-0.5"></article>
    </div>
  </div>
</template>
