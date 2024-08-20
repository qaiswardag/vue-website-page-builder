<script setup>
import Modal from "@/Components/Modals/Modal.vue";
import ThumbnailSmallImageSlider from "@/Components/ImageSliders/ThumbnailSmallImageSlider.vue";

import { router } from "@inertiajs/vue3";
import {
    CheckIcon,
    ExclamationCircleIcon,
    BellIcon,
    AdjustmentsHorizontalIcon,
    ArrowRightCircleIcon,
    ArrowRightIcon,
    Bars3BottomLeftIcon,
    Bars3Icon,
    CalendarIcon,
    ChartBarIcon,
    FolderIcon,
    HomeIcon,
    InboxIcon,
    UserIcon,
    UsersIcon,
    XMarkIcon,
} from "@heroicons/vue/24/outline";
import {} from "@headlessui/vue";

const props = defineProps({
    show: {
        type: Boolean,
        default: false,
        required: true,
    },
});

const emit = defineEmits(["firstModalMenuButtonFunction"]);

// first button function
const firstButton = function () {
    emit("firstModalMenuButtonFunction");
};

const handleLogout = () => {
    router.post(route("logout"));
};
</script>

<template>
    <Modal :show="show" @close="firstButton" maxWidth="md">
        <div class="flex items-center border-b border-gray-200 p-4 mb-2">
            <div class="flex-1">
                <h3 class="myQuaternaryHeader my-0 py-0">Menu</h3>
            </div>
            <button
                @click="firstButton"
                aria-label="Close menu"
                class="-m-1 p-1"
                type="button"
                data-headlessui-state="open"
                tabindex="0"
            >
                <span class="material-symbols-outlined"> close </span>
            </button>
        </div>

        <div
            class="px-4 relative inline-block align-bottom text-left overflow-hidden transform transition-all sm:align-middle w-full pb-6"
        >
            <div class="myPrimaryParagraph flex flex-col gap-1">
                <p
                    class="px-2 py-2 rounded-lg bg-gray-50 text-xs font-medium mt-4 mb-4"
                >
                    Logged in as {{ $page.props.user.first_name }}
                    {{ $page.props.user.last_name }}
                </p>

                <template
                    v-if="
                        $page.props.user.all_teams &&
                        $page.props.user.all_teams.length > 0 &&
                        $page.props.user.current_team &&
                        $page.props.jetstream.hasTeamFeatures
                    "
                >
                    <p class="italic text-xs py-2 px-2 rounded-lg">
                        Manage Company
                    </p>
                    <Link
                        :href="
                            route(
                                'teams.show',
                                $page.props.user.current_team.id
                            )
                        "
                        class="myPrimaryParagraph cursor-pointer"
                    >
                        <div
                            class="group relative flex gap-x-2 rounded-lg px-4 py-2 items-center bg-myPrimaryLightGrayColor cursor-pointer"
                            :class="[
                                route().current('teams.show') ||
                                route().current('team.update.information') ||
                                route().current('team.members') ||
                                route().current('team.delete')
                                    ? 'bg-red-100 '
                                    : '',
                            ]"
                        >
                            <button
                                type="button"
                                class="h-10 w-10 cursor-pointer rounded-full flex items-center border-none justify-center bg-gray-50 aspect-square hover:bg-myPrimaryLinkColor hover:text-white focus-visible:ring-0"
                            >
                                <span
                                    class="myMediumIcon material-symbols-outlined"
                                >
                                    settings
                                </span>
                            </button>
                            <div>Company Settings</div>
                        </div>
                    </Link>
                </template>

                <p class="italic text-xs py-2 px-2 rounded-lg">
                    Manage Account
                </p>

                <Link
                    :href="route('profile.show')"
                    :active="
                        route().current('profile.show') ||
                        route().current('user.profile.update') ||
                        route().current('user.profile.password') ||
                        route().current('user.profile.security')
                    "
                    class="myPrimaryParagraph cursor-pointer"
                >
                    <div
                        class="group relative flex gap-x-2 rounded-lg px-4 py-2 items-center bg-myPrimaryLightGrayColor cursor-pointer"
                        :class="[
                            route().current('profile.show') ||
                            route().current('user.profile.update') ||
                            route().current('user.profile.password') ||
                            route().current('user.profile.security')
                                ? 'bg-red-100'
                                : '',
                        ]"
                    >
                        <div>
                            <div
                                v-if="
                                    $page.props.user &&
                                    Array.isArray(
                                        $page.props.user.user_photo
                                    ) &&
                                    $page.props.user.user_photo.length !== 0
                                "
                            >
                                <ThumbnailSmallImageSlider
                                    :images="$page.props.user.user_photo"
                                    imageSize="thumbnail_path"
                                    imageHeight="h-10 min-h-10 max-h-10"
                                    imageWidth="w-10 min-w-10 max-w-10 object-cover"
                                    :roundedFull="true"
                                ></ThumbnailSmallImageSlider>
                            </div>

                            <template
                                v-if="
                                    $page.props.user.user_photo &&
                                    Array.isArray(
                                        $page.props.user.user_photo
                                    ) &&
                                    $page.props.user.user_photo.length === 0
                                "
                            >
                                <button
                                    type="button"
                                    class="h-10 w-10 cursor-pointer rounded-full flex items-center border-none justify-center bg-gray-50 aspect-square hover:bg-myPrimaryLinkColor hover:text-white focus-visible:ring-0"
                                >
                                    <span
                                        class="myMediumIcon material-symbols-outlined"
                                    >
                                        person
                                    </span>
                                </button>
                            </template>
                        </div>
                        <div>Your Profile</div>
                    </div>
                </Link>

                <form @submit.prevent="handleLogout">
                    <div
                        @click="handleLogout"
                        class="group relative flex gap-x-2 rounded-lg px-4 py-2 items-center bg-myPrimaryLightGrayColor cursor-pointer"
                    >
                        <button
                            type="button"
                            class="h-10 w-10 cursor-pointer rounded-full flex items-center border-none justify-center bg-gray-50 aspect-square hover:bg-myPrimaryLinkColor hover:text-white focus-visible:ring-0"
                        >
                            <span
                                class="myMediumIcon material-symbols-outlined"
                            >
                                arrow_forward
                            </span>
                        </button>
                        <div>Log out</div>
                    </div>
                </form>
            </div>
            <slot></slot>
        </div>
    </Modal>
</template>
