<script setup>
import { ref, computed, onMounted } from 'vue';
import { useUnsplashStore } from '@/stores/unsplash';
import { useMediaLibraryStore } from '@/stores/media-library';
const mediaLibraryStore = useMediaLibraryStore();
const unsplashStore = useUnsplashStore();
const searchQuery = ref('');
const currentPage = ref(1);
const orientation = ref(null);

const getSearchTerm = computed(() => {
  return unsplashStore.getSearchTerm;
});
// unspalsh images
const getUnsplashImages = computed(() => {
  return unsplashStore.getUnsplashImages;
});

const handleImageClick = function (file) {
  mediaLibraryStore.setCurrentImage({ file });
  mediaLibraryStore.setCurrentPreviewImage(null);
};

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

  localStorage.setItem('unsplash-query', searchQuery.value);

  unsplashStore.setSearchTerm(searchQuery.value);
  unsplashStore.setCurrentPageNumber(currentPage.value);
  unsplashStore.setOrientationValue(orientation.value);
  unsplashStore.setLoadUnsplashImages({
    searchTerm: getSearchTerm.value,
    currentPage: currentPage.value,
    orientation: orientation.value,
  });
};

// on mounted
onMounted(() => {
  if (
    localStorage.getItem('unsplash-query') &&
    localStorage.getItem('unsplash-query').length > 0
  ) {
    unsplashStore.setSearchTerm(localStorage.getItem('unsplash-query'));
    searchQuery.value = localStorage.getItem('unsplash-query');
    searchUnsplash();
  } else {
    searchQuery.value = 'Magazine';
    searchUnsplash();
  }
});
</script>

<template>
  <div>
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
    </form>

    <div
      v-if="
        getUnsplashImages &&
        !getUnsplashImages.isLoading &&
        getUnsplashImages.isError &&
        !getUnsplashImages.isSuccess
      "
    >
      <p class="myPrimaryParagraphError">{{ getUnsplashImages.error }}</p>
    </div>

    <div
      v-if="
        getUnsplashImages &&
        getUnsplashImages.fetchedMedia &&
        getUnsplashImages.fetchedMedia.results &&
        !getUnsplashImages.isLoading &&
        !getUnsplashImages.isError
      "
      class="mt-2"
    >
      <div
        class="flex lg:justify-between justify-end items-center gap-2 py-2 mb-1"
      >
        <div class="lg:flex hidden justify-left items-center gap-2">
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

        <nav
          class="flex items-center gap-2 justify-start"
          aria-label="Pagination"
        >
          <p class="myPrimaryParagraph text-xs italic">
            Total pages {{ getUnsplashImages.fetchedMedia.total_pages }}
          </p>
          <p class="myPrimaryParagraph text-xs italic">
            Images {{ getUnsplashImages.fetchedMedia.total }}
          </p>
          <div
            class="flex flex-1 justify-between sm:justify-end items-center gap-2"
          >
            <span
              v-if="currentPage !== 1"
              class="myPrimaryParagraph text-xs italic pr-2 pl-1 cursor-pointer underline"
              @click="nextPage((currentPage = 1))"
            >
              First page
            </span>
          </div>
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
            :disabled="
              currentPage >= getUnsplashImages.fetchedMedia.total_pages
            "
            class="myPrimaryButton"
            :class="{
              'opacity-50':
                currentPage >= getUnsplashImages.fetchedMedia.total_pages,
            }"
            @click="nextPage(currentPage++)"
          >
            {{ `Next ${currentPage > 0 ? currentPage + 1 : currentPage + 1}` }}
          </button>
        </nav>
      </div>

      <div
        class="overflow-y-scroll pr-1 rounded-lg md:min-h-[25.5rem] md:max-h-[25.5em] min-h-[12rem] max-h-[12rem]"
      >
        <div class="grid md:grid-cols-6 sm:grid-cols-4 grid-cols-2 gap-2">
          <div
            v-for="image in getUnsplashImages.fetchedMedia.results"
            :key="image.id"
            @click="handleImageClick(image.urls.regular)"
            class="border border-myPrimaryLightGrayColor rounded-lg px-2 p-2 cursor-pointer bg-gray-50"
          >
            <img
              :alt="image.user.name"
              class="group aspect-w-10 aspect-h-7 block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-myPrimaryBrandColor focus-within:ring-offset-2 focus-within:ring-offset-gray-100 cursor-pointer"
              :src="image.urls.thumb"
            />
            <p class="myPrimaryParagraph text-xs font-normal mt-2">
              By: {{ image.user.name }}
            </p>
          </div>
        </div>

        <div v-if="getUnsplashImages.fetchedMedia.results.length < 1">
          <p class="myPrimaryParagraph py-4 px-4">
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
        getUnsplashImages.isLoading &&
        !getUnsplashImages.isError
      "
    >
      <div class="flex items-center justify-center mt-4">
        <div
          class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        >
          <span
            class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
            >Loading...</span
          >
        </div>
      </div>
    </div>
  </div>
</template>
