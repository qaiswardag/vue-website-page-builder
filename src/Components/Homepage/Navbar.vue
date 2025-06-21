<script setup>
const emit = defineEmits(['handleButton'])

// first button function
const handleButton = function () {
  emit('handleButton')
}
</script>

<template>
  <nav
    class="pbx-px-6 pbx-py-6 pbx-mx-auto pbx-flex pbx-items-center pbx-justify-between pbx-bg-gray-50 lg:pbx-h-[10vh] pbx-h-[10vh]"
    aria-label="Global"
  >
    <img class="pbx-h-6" src="/logo/logo.svg" alt="Logo" />

    <div class="pbx-flex lg:pbx-gap-x-12 pbx-myPrimaryGap">
      <div
        class="pbx-text-lg pbx-font-medium pbx-text-myPrimaryDarkGrayColor pbx-flex pbx-gap-2 pbx-items-center"
      >
        Page Builder
      </div>
    </div>
  </nav>
</template>
