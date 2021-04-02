import router from "@/router/index";

const state = {
  loading: false,
};

const mutations = {
  CLEAR_DATA(state) {
    state.loading = false;
  },
  SET_LOADING(state) {
    state.loading = true;
  },
  UNSET_LOADING(state) {
    setTimeout(() => {
      state.loading = false;
    }, 1000);
  },
};

const actions = {
  setLoading({ commit }) {
    commit("SET_LOADING");
  },
  async unsetLoading({ commit }) {
    await commit("UNSET_LOADING");
  },
  goHome() {
    router.push({ name: "Home" });
  },
};

const getters = {
  getLoading(state) {
    return state.loading;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
