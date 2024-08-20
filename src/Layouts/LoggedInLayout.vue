<script setup>
import { ref } from 'vue';
import Banner from '@/Components/Banners/Banner.vue';
import LoggedInSidebar from '@/Components/Sidebars/LoggedInSidebar.vue';
import LoggedInNavbar from '@/Components/Navbars/LoggedInNavbar.vue';
import ApplicationLogo from '@/Components/Logos/ApplicationLogo.vue';

import {
  Dialog,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue';

import ApplicationMark from '@/Components/MarkComponents/ApplicationMark.vue';
import DynamicModal from '@/Components/Modals/DynamicModal.vue';

const sidebarOpen = ref(false);
</script>

<template>
  <!-- Static sidebar for mobile - start -->
  <TransitionRoot
    as="template"
    :show="sidebarOpen"
  >
    <Dialog
      as="div"
      class="relative z-40 md:hidden"
      @close="sidebarOpen = false"
    >
      <TransitionChild
        as="template"
        enter="transition-opacity ease-linear duration-100"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="transition-opacity ease-linear duration-100"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-myPrimaryDarkGrayColor bg-opacity-75" />
      </TransitionChild>

      <div class="fixed inset-0 z-40 flex">
        <TransitionChild
          as="template"
          enter="transition ease-in-out duration-100 transform"
          enter-from="-translate-x-full"
          enter-to="translate-x-0"
          leave="transition ease-in-out duration-100 transform"
          leave-from="translate-x-0"
          leave-to="-translate-x-full"
        >
          <DialogPanel
            class="relative flex w-full max-w-xs flex-1 flex-col bg-white pt-5 pb-4"
          >
            <TransitionChild
              as="template"
              enter="ease-in-out duration-100"
              enter-from="opacity-0"
              enter-to="opacity-100"
              leave="ease-in-out duration-100"
              leave-from="opacity-100"
              leave-to="opacity-0"
            >
              <div class="flex items-center justify-between pr-4">
                <div
                  class="flex flex-shrink-0 items-center px-4 justify-between"
                >
                  <ApplicationLogo></ApplicationLogo>
                </div>
                <button
                  type="button"
                  class="h-10 w-10 cursor-pointer rounded-full flex items-center border-none justify-center bg-gray-50 aspect-square hover:bg-myPrimaryLinkColor hover:text-white focus-visible:ring-0"
                  @click="sidebarOpen = false"
                >
                  <span class="sr-only">Close sidebar</span>
                  <span class="material-symbols-outlined"> close </span>
                </button>
              </div>
            </TransitionChild>
            <div class="mt-5 h-0 flex-1 overflow-y-auto">
              <LoggedInSidebar></LoggedInSidebar>
            </div>
          </DialogPanel>
        </TransitionChild>
        <div
          class="w-14 flex-shrink-0"
          aria-hidden="true"
        >
          <!-- Dummy element to force sidebar to shrink to fit close icon -->
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
  <!-- Static sidebar for mobile - end -->

  <!-- Static sidebar for desktop - start -->
  <div
    class="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col bg-white z-20"
  >
    <!-- Sidebar component, swap this element with another sidebar if you like -->
    <div
      class="flex flex-grow flex-col overflow-y-auto border-r border-gray-200"
    >
      <div
        class="flex flex-shrink-0 items-center px-4 justify-between h-16 border-b-2 border-transparent"
      >
        <ApplicationLogo></ApplicationLogo>
      </div>
      <div class="mt-5 flex flex-grow flex-col">
        <LoggedInSidebar></LoggedInSidebar>
      </div>
    </div>
  </div>
  <!-- Static sidebar for desktop - end -->

  <!-- Topbar - start -->
  <div class="flex flex-1 flex-col md:pl-64">
    <div
      class="h-16 sticky top-0 z-30 flex flex-shrink-0 justify-between items-center bg-white border-b-2 border-gray-100"
    >
      <button
        type="button"
        class="h-10 w-10 cursor-pointer rounded-full flex items-center border-none justify-center bg-gray-50 aspect-square hover:bg-myPrimaryLinkColor hover:text-white focus-visible:ring-2 focus-visible:ring-red-400 md:hidden ml-2"
        @click="sidebarOpen = true"
      >
        <span class="sr-only">Open sidebar</span>
        <span class="material-symbols-outlined"> drag_handle </span>
      </button>
      <LoggedInNavbar></LoggedInNavbar>
    </div>

    <main class="flex-1 bg-gray-50 relative">
      <slot name="breadcrumbs" />
      <Banner />
      <header v-if="$slots.header">
        <h2 class="myTertiaryHeader text-center py-12 pb-8">
          <slot name="header" />
        </h2>
      </header>
      <div
        class="mx-auto max-w-7xl min-h-screen px-4 sm:px-6 md:px-8 md:pb-16 pb-12"
      >
        <main>
          <slot />
        </main>
      </div>
    </main>
  </div>
</template>
