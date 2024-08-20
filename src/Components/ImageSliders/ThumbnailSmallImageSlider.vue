<script setup>
import { computed, onMounted, ref } from 'vue';

const props = defineProps({
  images: {
    required: true,
  },
  imageSize: {
    required: true,
    type: String,
  },
  imageHeight: {
    type: String,
  },
  imageWidth: {
    required: true,
    type: String,
  },
  roundedFull: {
    required: true,
    type: Boolean,
  },
  squareButtons: {
    required: false,
    type: Boolean,
  },
  imageClickable: {
    required: false,
    type: Boolean,
  },
  isLoading: {
    required: false,
  },
});

const emit = defineEmits(['firstButtonClick']);
const firstButtonClick = function () {
  emit('firstButtonClick');
};

const currentImageIndex = ref(0);

const prevSlide = function () {
  currentImageIndex.value =
    (currentImageIndex.value - 1 + props.images.length) % props.images.length;
};

const nextSlide = function () {
  currentImageIndex.value = (currentImageIndex.value + 1) % props.images.length;
};

const sortedImages = computed(() => {
  // Find the primary image
  const primaryImage = props.images.find((image) => {
    return image?.pivot?.primary;
  });

  if (primaryImage) {
    // If a primary image is found, create a new array with the primary image first
    const otherImages = props.images.filter((image) => image !== primaryImage);
    return [primaryImage, ...otherImages];
  }

  // If no primary image is found, return the original array
  return props.images;
});
</script>

<template>
  <div
    v-if="Array.isArray(images)"
    class="relative flex justify-center items-center"
  >
    <div
      class="justify-center items-center flex-col"
      :class="[`${imageWidth}`]"
    >
      <!-- Carousel wrapper -->
      <div
        v-for="(image, index) in Array.isArray(sortedImages) && sortedImages"
        :key="image.id"
        class="w-full flex justify-center"
      >
        <div
          id="imagePlaceholder"
          :style="{
            height:
              currentImageIndex === index
                ? typeof Number(image.height) === 'number'
                  ? Number(image.height) + 'px'
                  : '600px'
                : '',
          }"
          class="relative shrink-0 rounded"
          :class="[
            `${imageHeight}`,
            `${imageWidth}`,
            `bg-red-50`,
            { hidden: currentImageIndex !== index },
            { 'rounded-full': roundedFull === true },
          ]"
        >
          <img
            alt="image"
            @click="firstButtonClick"
            :style="{
              height:
                currentImageIndex === index
                  ? typeof Number(image.height) === 'number'
                    ? Number(image.height) + 'px'
                    : '600px'
                  : '',
            }"
            :src="`${image[imageSize]}`"
            class="absolute inset-0 z-20 rounded"
            :class="[
              `${imageHeight}`,
              `${imageWidth}`,
              { 'rounded-full': roundedFull === true },
              { 'bg-white': image.extension === 'png' },
              { 'cursor-pointer': imageClickable === true },
            ]"
          />
          <div
            :style="{
              height:
                currentImageIndex === index
                  ? typeof Number(image.height) === 'number'
                    ? Number(image.height) + 'px'
                    : '600px'
                  : '',
            }"
            :class="[
              `${imageHeight}`,
              `${imageWidth}`,
              { 'rounded-full': roundedFull === true },
            ]"
            class="absolute inset-0 z-10 top-0 left-0 w-full"
          ></div>
          <div class="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
        </div>
        <!-- image #end -->
      </div>
      <!-- Slider controls -->
      <div
        v-if="images.length >= 2"
        class="flex gap-[60%] items-center justify-center z-30"
      >
        <button
          type="button"
          @click="prevSlide"
          class="z-20 bg-opacity-20 hover:bg-opacity-70 absolute cursor-pointer flex items-center justify-center bg-gray-50 aspect-square hover:bg-red-50 hover:text-gray-800"
          :class="[
            {
              'rounded-none h-full top-0 bottom-0 left-0 w-8': squareButtons,
            },
            {
              'bg-opacity-50 top-[45%] left-[4px] shaddow h-10 w-10 rounded-full ':
                !squareButtons,
            },
          ]"
          style="touch-action: manipulation"
        >
          <span class="material-symbols-outlined"> keyboard_arrow_left </span>
        </button>

        <button
          type="button"
          @click="nextSlide"
          class="z-20 bg-opacity-20 hover:bg-opacity-70 absolute cursor-pointer flex items-center justify-center bg-gray-50 aspect-square hover:bg-red-50 hover:text-gray-800"
          :class="[
            {
              'rounded-none h-full top-0 right-0 bottom-0 w-8': squareButtons,
            },
            {
              'bg-opacity-50 top-[45%] right-[4px] shaddow h-10 w-10 rounded-full ':
                !squareButtons,
            },
          ]"
          style="touch-action: manipulation"
        >
          <span class="material-symbols-outlined"> keyboard_arrow_right </span>
        </button>
      </div>
    </div>
  </div>
</template>
