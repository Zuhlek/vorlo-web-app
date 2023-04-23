import { createStore } from "vuex";

const store = createStore({
    state: {
      selectedProjectId: null,
      selectedProject: null,
      projectWasSelected: false,
    },
    mutations: {
      // Functions to modify the state
    },
    actions: {
      // Functions to perform asynchronous operations and call mutations
    },
    getters: {
      // Functions to compute derived state based on the state
    },
  });

export default store;
