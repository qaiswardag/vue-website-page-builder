<script setup>
import { computed } from 'vue';
import { useMediaLibraryStore } from '@/stores/media-library';

const mediaLibraryStore = useMediaLibraryStore();

const getCurrentImage = computed(() => {
  return mediaLibraryStore.getCurrentImage;
});
</script>

<template>
  <!-- Loading # end -->
  <div
    v-if="getCurrentImage && getCurrentImage.file"
    class="pb-6 space-y-6"
  >
    <img
      class="mx-auto block w-full object-cover object-center cursor-pointer"
      :src="`${getCurrentImage.file}`"
      alt="file"
    />

    <div class="md:px-3 px-2">
      <div>
        <h3 class="font-normal text-gray-900">Information</h3>
        <dl
          class="mt-2 border-t border-b border-gray-200 divide-y divide-gray-200"
        >
          <div
            class="py-3 flex justify-between text-sm font-normal items-center"
          >
            <dt class="text-gray-500">From</dt>
            <dd class="text-gray-900">Unsplash</dd>
          </div>
        </dl>
      </div>
    </div>
  </div>
</template>
