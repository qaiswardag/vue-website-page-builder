<template>
  <div class="flex flex-col border border-gray-400" :class="{ 'pb-8': expanded }">
    <div
      class="flex flex-row justify-between items-center pl-3 pr-3 py-5 cursor-pointer duration-200 hover:bg-myPrimaryLightGrayColor border-b border-gray-200"
      @click="expanded = !expanded"
    >
      <p class="myPrimaryParagraph font-medium my-0 py-0">
        <slot name="title" />
      </p>

      <template v-if="expanded">
        <span class="material-symbols-outlined"> keyboard_arrow_down </span>
      </template>
      <template v-if="!expanded">
        <span class="material-symbols-outlined"> chevron_right </span>
      </template>
    </div>
    <div :class="[expanded ? 'block' : 'hidden']" class="px-4 ease-linear duration-75">
      <slot name="content" />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const expanded = ref(false)

    return {
      expanded,
    }
  },
}
</script>
