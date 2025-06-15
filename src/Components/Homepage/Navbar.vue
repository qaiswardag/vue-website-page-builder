<script setup>
const emit = defineEmits(['handleButton'])

// first button function
const handleButton = function () {
  emit('handleButton')
}
</script>

<template>
  <nav
    class="px-6 py-6 mx-auto flex items-center justify-between bg-gray-50 lg:h-[10vh] h-[10vh]"
    aria-label="Global"
  >
    <img class="h-6" src="/logo/logo.svg" alt="Logo" />

    <div class="flex lg:gap-x-12 myPrimaryGap">
      <div class="text-lg font-medium text-myPrimaryDarkGrayColor flex gap-2 items-center">
        Page Builder
      </div>
    </div>
  </nav>
</template>
