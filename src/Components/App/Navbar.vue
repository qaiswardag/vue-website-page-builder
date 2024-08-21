<script setup>
const emit = defineEmits(['handleButton']);

// first button function
const handleButton = function () {
  emit('handleButton');
};
</script>

<template>
  <nav
    class="px-6 py-6 mx-auto flex items-center justify-between bg-gray-50 h-[14vh]"
    aria-label="Global"
  >
    <a href="/">
      <img
        class="h-6"
        src="/logo/logo.svg"
        alt="Logo"
      />
    </a>

    <div class="flex lg:gap-x-12 myPrimaryGap">
      <p
        @click="handleButton"
        class="text-sm font-medium text-myPrimaryDarkGrayColor flex gap-2 items-center cursor-pointer"
      >
        Start Builder
      </p>
    </div>
  </nav>
</template>
