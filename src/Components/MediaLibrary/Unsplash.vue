<script setup>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';

// store
const store = useStore();
const searchQuery = ref('');
const currentPage = ref(1);
const orientation = ref(null);

// getters
const getCurrentPageNumber = computed(() => {
  return store.getters['unsplash/getCurrentPageNumber'];
});
const getOrientationValue = computed(() => {
  return store.getters['unsplash/getOrientationValue'];
});
const getSearchTerm = computed(() => {
  return store.getters['unsplash/getSearchTerm'];
});
// unspalsh images
const getUnsplashImages = computed(() => {
  return store.getters['unsplash/getUnsplashImages'];
});
//
//
const handleImageClick = function (file, imageDetails) {
  console.log(`"you clicked me.."`);
  // store.commit('mediaLibrary/setCurrentImage', null);
  // store.commit('mediaLibrary/setCurrentPreviewImage', null);
};
//
//
// search by orientation
const searchByOrientation = function (orientationParameter) {
  // check if search term length is more than 0
  if (
    getSearchTerm.value.length > 0 &&
    orientation.value !== orientationParameter
  ) {
    orientation.value = orientationParameter;
    currentPage.value = 1;
    searchUnsplash();
  }
};
//
// load images for previous page
const previousPage = function () {
  searchUnsplash();
};

// load images for next page
const nextPage = function () {
  searchUnsplash();
};
//
//
// search images
const searchUnsplash = function () {
  if (
    getUnsplashImages.value &&
    getUnsplashImages.value.fetchedMedia &&
    Array.isArray(getUnsplashImages.value.fetchedMedia.results) &&
    getUnsplashImages.value.fetchedMedia.results.length === 0
  ) {
    currentPage.value = 1;
  }
  // set values in store
  store.commit('unsplash/setSearchTerm', searchQuery.value);
  store.commit('unsplash/setSearchTerm', searchQuery.value);
  store.commit('unsplash/setCurrentPageNumber', currentPage.value);
  store.commit('unsplash/setOrientationValue', orientation.value);
  store.dispatch('unsplash/loadUnsplashImages', {
    searchTerm: getSearchTerm.value,
    currentPage: currentPage.value,
    orientation: orientation.value,
  });
};

// on mounted
onMounted(() => {
  searchQuery.value = 'Magazine';
  searchUnsplash();
});
</script>

<template>
  <form @submit.prevent="searchUnsplash">
    <label
      for="default-search"
      class="mb-2 text-sm font-normal text-gray-900 sr-only dark:text-gray-300"
      >Search</label
    >

    <div class="mysearchBarWithOptions">
      <div class="relative w-full">
        <div
          class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
        >
          <span class="material-symbols-outlined"> search </span>
        </div>
        <input
          type="search"
          id="search_query"
          v-model="searchQuery"
          class="myPrimarySearchInput"
          autocomplete="off"
          placeholder="Search..."
        />
      </div>

      <button
        type="submit"
        class="myPrimaryButton"
      >
        Search
      </button>
    </div>

    <div class="flex justify-start items-center gap-2 py-2 mb-1">
      <button
        @click="searchByOrientation('landscape')"
        type="button"
        class="myPrimaryTag"
        :class="{
          'bg-myPrimaryBrandColor text-white': orientation === 'landscape',
          '': orientation !== 'landscape',
        }"
      >
        Landscape
      </button>
      <button
        @click="searchByOrientation('portrait')"
        type="button"
        class="myPrimaryTag"
        :class="{
          'bg-myPrimaryBrandColor text-white': orientation === 'portrait',
          '': orientation !== 'portrait',
        }"
      >
        Portrait
      </button>
      <button
        @click="searchByOrientation('squarish')"
        type="button"
        class="myPrimaryTag"
        :class="{
          'bg-myPrimaryBrandColor text-white': orientation === 'squarish',
          '': orientation !== 'squarish',
        }"
      >
        Squarish
      </button>

      <svg
        @click="searchByOrientation(null)"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
        class="w-4 h-4 cursor-pointer"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </div>
  </form>

  <div
    v-if="
      getUnsplashImages &&
      getUnsplashImages.isLoading === false &&
      getUnsplashImages.isError === true &&
      getUnsplashImages.isSuccess === false
    "
  >
    <p class="myPrimaryParagraphError">{{ getUnsplashImages.error }}</p>
  </div>

  <div
    v-if="
      getUnsplashImages &&
      getUnsplashImages.fetchedMedia &&
      getUnsplashImages.fetchedMedia.results &&
      getUnsplashImages.isLoading === false &&
      getUnsplashImages.isError === false
    "
    class="mt-2 pb-16"
  >
    <nav
      class="flex items-center justify-around border-t border-gray-200 bg-white py-3 mt-4 gap-2"
      aria-label="Pagination"
    >
      <p class="myPrimaryTag">
        Images {{ getUnsplashImages.fetchedMedia.total }}
      </p>
      <p class="myPrimaryTag">
        Pages {{ getUnsplashImages.fetchedMedia.total_pages }}
      </p>
      <div
        class="flex flex-1 justify-between sm:justify-end items-center gap-2"
      >
        <span
          v-if="currentPage !== 1"
          class="myPrimaryParagraph italic pr-2 pl-1 cursor-pointer text-xs underline"
          @click="nextPage((currentPage = 1))"
        >
          first page
        </span>
        <button
          v-if="currentPage > 1"
          :disabled="currentPage < 1"
          class="myPrimaryButton"
          @click="previousPage(currentPage--)"
        >
          {{ `Prev ${currentPage > 0 ? currentPage - 1 : currentPage - 1}` }}
        </button>

        <span class="myPrimaryTag p-2.5">
          {{ currentPage }}
        </span>
        <button
          :disabled="currentPage >= getUnsplashImages.fetchedMedia.total_pages"
          class="myPrimaryButton"
          :class="{
            'opacity-50':
              currentPage >= getUnsplashImages.fetchedMedia.total_pages,
          }"
          @click="nextPage(currentPage++)"
        >
          {{ `Next ${currentPage > 0 ? currentPage + 1 : currentPage + 1}` }}
        </button>
      </div>
    </nav>
    <div
      class="overflow-y-scroll md:min-h-[38.6rem] md:max-h-[38.6rem] min-h-[15rem] max-h-[15rem] pr-1 rounded"
    >
      <div class="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-2">
        <div
          v-for="image in getUnsplashImages.fetchedMedia.results"
          :key="image.id"
          @click="handleImageClick(image.urls.regular, image)"
          class="border border-myPrimaryLightGrayColor rounded px-2 p-2 cursor-pointer bg-gray-50"
        >
          <img
            alt="image"
            class="group aspect-w-10 aspect-h-7 block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-myPrimaryBrandColor focus-within:ring-offset-2 focus-within:ring-offset-gray-100 cursor-pointer"
            :src="image.urls.thumb"
          />
          <p class="myPrimaryParagraph text-xs font-normal mt-2">
            By: {{ image.user.name }}
          </p>
        </div>
      </div>

      <div v-if="getUnsplashImages.fetchedMedia.results.length < 1">
        <p class="myPrimaryParagraph">
          <span v-if="currentPage === 1">
            We did not find any images. Make a new search.
          </span>
          <span
            v-if="currentPage > 1"
            @click="nextPage(1)"
            class="myPrimaryLink"
          >
            No results on current page. Navigate to First Page.
          </span>
        </p>
      </div>
    </div>
  </div>

  <div
    v-if="
      getUnsplashImages &&
      getUnsplashImages.isLoading === true &&
      getUnsplashImages.isError === false
    "
  >
    <div class="flex items-center justify-center">
      <div
        class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      >
        <span
          class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
          >Loading...</span
        >
      </div>
    </div>
  </div>
</template>
