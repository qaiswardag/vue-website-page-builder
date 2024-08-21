<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import {
  Dialog,
  DialogOverlay,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';

// new version
import { useStore } from 'vuex';
import DynamicModal from '@/Components/Modals/DynamicModal.vue';
import SidebarUnsplash from '@/Components/MediaLibrary/SidebarUnsplash.vue';
import Unsplash from '@/Components/MediaLibrary/Unsplash.vue';
import SmallUniversalSpinner from '@/Components/Loaders/SmallUniversalSpinner.vue';

// store
const store = useStore();

const getCurrentImage = computed(() => {
  return store.getters['mediaLibrary/getCurrentImage'];
});

const getCurrentPreviewImage = computed(() => {
  return store.getters['mediaLibrary/getCurrentPreviewImage'];
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
