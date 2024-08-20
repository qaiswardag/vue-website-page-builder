<script setup>
import { computed, ref } from "vue";
import { MagnifyingGlassIcon } from "@heroicons/vue/24/outline";
import {
    ExclamationTriangleIcon,
    FolderIcon,
    LifebuoyIcon,
} from "@heroicons/vue/24/outline";
import {
    Combobox,
    ComboboxInput,
    ComboboxOptions,
    ComboboxOption,
    Dialog,
    DialogPanel,
    TransitionChild,
    TransitionRoot,
} from "@headlessui/vue";

const props = defineProps({
    open: {
        type: Boolean,
        required: true,
    },
});

const emit = defineEmits(["searchAnythingModalButton"]);
// search anything modal button
const searchAnythingModalButton = function () {
    emit("searchAnythingModalButton");
};
</script>

<template>
    <teleport to="body">
        <TransitionRoot
            :show="open"
            as="template"
            @after-leave="rawQuery = ''"
            appear
        >
            <Dialog
                as="div"
                class="relative z-40"
                @close="searchAnythingModalButton"
            >
                <TransitionChild
                    as="template"
                    enter="ease-out duration-300"
                    enter-from="opacity-0"
                    enter-to="opacity-100"
                    leave="ease-in duration-200"
                    leave-from="opacity-100"
                    leave-to="opacity-0"
                >
                    <div
                        class="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity"
                    />
                </TransitionChild>

                <div
                    class="fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-20"
                >
                    <TransitionChild
                        as="template"
                        enter="ease-out duration-300"
                        enter-from="opacity-0 scale-95"
                        enter-to="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leave-from="opacity-100 scale-100"
                        leave-to="opacity-0 scale-95"
                    >
                        <DialogPanel
                            class="mx-auto max-w-xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all"
                        >
                            <div
                                class="flex justify-end items-center p-2 bg-gray-50"
                            >
                                <div @click="searchAnythingModalButton">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                        class="h-6 w-6 text-myPrimaryLightTextColor self-center cursor-pointer"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M6 18L18 6M6 6l12 12"
                                        ></path>
                                    </svg>
                                </div>
                            </div>

                            <Combobox>
                                <div class="pl-4 relative flex items-center">
                                    <span class="material-symbols-outlined">
                                        search
                                    </span>
                                    <ComboboxInput
                                        class="h-14 w-full border-0 bg-transparent pl-11 pr-4 text-myPrimaryDarkGrayColor placeholder-gray-400 focus:ring-0 sm:text-sm"
                                        placeholder="Search..."
                                        @change="rawQuery = $event.target.value"
                                    />
                                </div>

                                <ComboboxOptions
                                    v-if="false"
                                    static
                                    class="max-h-80 scroll-py-10 scroll-pb-2 space-y-4 overflow-y-auto p-4 pb-2"
                                >
                                    <!-- content here # start  -->
                                </ComboboxOptions>

                                <div
                                    v-if="false"
                                    class="py-14 px-6 text-center text-sm sm:px-14"
                                >
                                    <LifebuoyIcon
                                        class="mx-auto h-6 w-6 text-myPrimaryLightTextColor"
                                        aria-hidden="true"
                                    />
                                    <p
                                        class="mt-4 font-normal text-myPrimaryDarkGrayColor"
                                    >
                                        Help with searching
                                    </p>
                                    <p class="mt-2 text-myPrimaryDarkGrayColor">
                                        Use this tool to quickly search for
                                        users and projects across our entire
                                        platform. You can also use the search
                                        modifiers found in the footer below to
                                        limit the results to just users or
                                        projects.
                                    </p>
                                </div>

                                <div
                                    v-if="false"
                                    class="py-14 px-6 text-center text-sm sm:px-14"
                                >
                                    <ExclamationTriangleIcon
                                        class="mx-auto h-6 w-6 text-myPrimaryLightTextColor"
                                        aria-hidden="true"
                                    />
                                    <p
                                        class="mt-4 font-normal text-myPrimaryDarkGrayColor"
                                    >
                                        No results found
                                    </p>
                                    <p class="mt-2 text-myPrimaryDarkGrayColor">
                                        We couldn’t find anything with that
                                        term. Please try again.
                                    </p>
                                </div>

                                <div
                                    class="flex flex-wrap items-center bg-gray-50 py-2.5 px-4 text-xs text-myPrimaryDarkGrayColor"
                                >
                                    Type
                                    <kbd
                                        class="mx-1 flex h-5 w-5 items-center justify-center rounded border bg-white font-normal sm:mx-2"
                                        >#</kbd
                                    >
                                    <span class="sm:hidden">for projects,</span>
                                    <span class="hidden sm:inline"
                                        >to access projects,</span
                                    >
                                    <kbd
                                        class="mx-1 flex h-5 w-5 items-center justify-center rounded border bg-white font-normal sm:mx-2"
                                        >&gt;</kbd
                                    >
                                    for users, and
                                    <kbd
                                        class="mx-1 flex h-5 w-5 items-center justify-center rounded border bg-white font-normal sm:mx-2"
                                        >?</kbd
                                    >
                                    for help.
                                </div>
                            </Combobox>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </Dialog>
        </TransitionRoot>
    </teleport>
</template>
