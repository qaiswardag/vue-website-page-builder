import { createStore } from 'vuex';
import user from './modules/user';
import mediaLibrary from './modules/media-library';
import pageBuilderState from './modules/page-builder-state';

const store = createStore({
  modules: {
    user: user,
    mediaLibrary: mediaLibrary,
    pageBuilderState: pageBuilderState,
  },
});

export default store;
