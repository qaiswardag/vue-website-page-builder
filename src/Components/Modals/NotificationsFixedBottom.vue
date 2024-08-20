<script setup>
import {
    CheckIcon,
    ChevronUpDownIcon,
    XMarkIcon,
} from "@heroicons/vue/24/outline";

import { ref } from "vue";

const props = defineProps({
    listOfMessages: {
        type: Array,
        required: true,
    },
    show: {
        type: Boolean,
        required: true,
    },
});

const emit = defineEmits(["notificationsModalButton"]);

const notificationsModalButton = function () {
    emit("notificationsModalButton");
};
</script>

<template>
    <div
        aria-live="assertive"
        class="pointer-events-none fixed right-0 bottom-0 left-0 flex items-end px-4 py-6 sm:items-start sm:p-6 z-40"
    >
        <div class="flex w-full flex-col items-center space-y-4 sm:items-end">
            <!-- Notification panel, dynamically insert this into the live region when it needs to be displayed -->
            <transition
                enter-active-class="transform ease-out duration-300 transition"
                enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
                enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
                leave-active-class="transition ease-in duration-100"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
            >
                <div
                    v-if="show"
                    class="pointer-events-auto w-full max-w-sm rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5"
                >
                    <div class="p-4">
                        <div class="flex items-start">
                            <div class="ml-3 w-0 flex-1">
                                <p
                                    class="myPrimaryParagraph mt-2 mb-2 font-normal"
                                >
                                    <slot></slot>
                                </p>
                                <p
                                    v-if="listOfMessages.length === 0"
                                    class="myPrimaryParagraph text-myPrimaryDarkGrayColor"
                                >
                                    No Messages
                                </p>

                                <ul
                                    v-if="listOfMessages.length !== 0"
                                    class="list-disc list-outside"
                                >
                                    <li
                                        v-for="(
                                            message, index
                                        ) in listOfMessages"
                                        :key="index"
                                    >
                                        <span
                                            class="myPrimaryParagraph text-myPrimaryDarkGrayColor"
                                        >
                                            {{ message }}
                                        </span>
                                    </li>
                                </ul>
                            </div>
                            <div class="ml-4 flex flex-shrink-0">
                                <button
                                    type="button"
                                    @click="notificationsModalButton"
                                    class="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-myPrimaryBrandColor focus:ring-offset-2"
                                >
                                    <span class="sr-only">Close</span>
                                    <span class="material-symbols-outlined">
                                        close
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>
