import { vueFetch } from "@/composables/vueFetch";

// get image
const {
    handleData: handleGetImage,
    fetchedData: fetchedImage,
    isError: isErrorImage,
    error: errorImage,
    errors: errorsImage,
    isLoading: isLoadingImage,
    isSuccess: isSuccessImage,
} = vueFetch();

// get images
const {
    handleData: handleGetImages,
    fetchedData: fetchedMedia,
    isError: isErrorImages,
    error: errorImages,
    errors: errorsImages,
    isLoading: isLoadingImages,
    isSuccess: isSuccessImages,
} = vueFetch();

export default {
    namespaced: true,

    // state
    state: {
        currentImage: {},
        currentMedia: null,
        currentPreviewImage: null,
        // end state
    },

    // getters
    getters: {
        getCurrentImage(state) {
            return state.currentImage;
        },
        getCurrentMedia(state) {
            return state.currentMedia;
        },
        getCurrentPreviewImage(state) {
            return state.currentPreviewImage;
        },

        // end getters
    },

    // mutations
    mutations: {
        setCurrentImage(state, payload) {
            state.currentImage = payload;
        },
        setCurrentMedia(state, payload) {
            state.currentMedia = payload;
        },
        setCurrentPreviewImage(state, payload) {
            state.currentPreviewImage = payload;
        },

        // end mutations
    },

    // actions
    actions: {
        // get images
        loadUserMedia(context, data) {
            if (data.search_query === undefined) {
                data.search_query = "";
            }
            if (data.page === undefined) {
                data.page = "";
            }

            handleGetImages(
                route("user.media.index", {
                    search_query: data.search_query,
                    page: data.page,
                })
            );

            // context & send to mutation
            context.commit("setCurrentMedia", {
                fetchedMedia: fetchedMedia,
                isError: isErrorImages,
                error: errorImages,
                errors: errorsImages,
                isLoading: isLoadingImages,
                isSuccess: isSuccessImages,
            });
        },

        // get images
        loadMedia(context, data) {
            if (data.search_query === undefined) {
                data.search_query = "";
            }
            if (data.page === undefined) {
                data.page = "";
            }

            handleGetImages(
                route("team.media.index", {
                    team: data.team.id,
                    search_query: data.search_query,
                    page: data.page,
                })
            );

            // context & send to mutation
            context.commit("setCurrentMedia", {
                fetchedMedia: fetchedMedia,
                isError: isErrorImages,
                error: errorImages,
                errors: errorsImages,
                isLoading: isLoadingImages,
                isSuccess: isSuccessImages,
            });
        },

        //
        // get image
        loadUserImage(context, data) {
            handleGetImage(
                route("media.user.edit", {
                    mediaLibraryUser: data.mediaLibraryId,
                })
            );

            // // context & send to mutation
            context.commit("setCurrentImage", {
                currentImage: fetchedImage,
                isError: isErrorImage,
                error: errorImage,
                errors: errorsImage,
                isLoading: isLoadingImage,
                isSuccess: isSuccessImage,
            });
        },

        // get image
        loadImage(context, data) {
            handleGetImage(
                route("media.edit", {
                    mediaLibrary: data.mediaLibraryId,
                    team: data.teamId,
                })
            );

            // // context & send to mutation
            context.commit("setCurrentImage", {
                currentImage: fetchedImage,
                isError: isErrorImage,
                error: errorImage,
                errors: errorsImage,
                isLoading: isLoadingImage,
                isSuccess: isSuccessImage,
            });
        },
        // end action
    },
};
