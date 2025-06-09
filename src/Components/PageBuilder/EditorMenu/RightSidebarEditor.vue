<script setup>
import { computed, inject } from 'vue'
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

// Get stores from parent PageBuilder component
const pageBuilderStateStore = inject('pageBuilderStateStore')

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
  <div class="h-full w-80 bg-white">
    <div class="h-screen flex flex-col">
      <div class="flex flex-row justify-between pt-2.5 pr-4 pl-4 items-center mb-3">
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
          <article>
            <ImageEditor> </ImageEditor>
          </article>
          <article>
            <TipTap></TipTap>
          </article>
          <article
            v-if="
              false &&
              $page.props.user.superadmin !== null &&
              $page.props.user.superadmin.role === 'admin'
            "
          >
            <LinkEditor></LinkEditor>
          </article>
          <article
            v-if="
              false &&
              $page.props.user.superadmin !== null &&
              $page.props.user.superadmin.role === 'admin'
            "
          >
            <Typography></Typography>
          </article>

          <article>
            <OpacityEditor> </OpacityEditor>
          </article>
          <article>
            <PaddingPlusMargin> </PaddingPlusMargin>
          </article>
          <article>
            <BorderRadius></BorderRadius>
          </article>
          <article>
            <Borders></Borders>
          </article>
          <article>
            <ClassEditor></ClassEditor>
          </article>
        </div>

        <div>
          <article>
            <ElementEditor></ElementEditor>
          </article>
        </div>
        <article class="min-h-[12em]"></article>
      </div>
    </div>
  </div>
</template>
