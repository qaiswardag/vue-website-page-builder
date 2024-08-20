export default {
    namespaced: true,

    // state
    state: {
        isLoading: false,
        userSettings: null,

        // end state
    },

    // getters
    getters: {
        getIsLoading(state) {
            return state.isLoading;
        },

        getUserSettings(state) {
            return state.userSettings;
        },
        // end getters
    },

    // mutations
    mutations: {
        setIsLoading(state, payload) {
            state.isLoading = payload;
        },
        setUserSettings(state, payload) {
            state.userSettings = payload;
        },
        // end mutations
    },

    // actions
    actions: {
        // end action
    },
};
