import router from "@/router/index";

const state = {
  searchValue: "",
  pokemons: [],
};

const mutations = {
  CLEAR_DATA(state) {
    state.searchValue = "";
    state.pokemons = [];
  },
  SET_SEARCH_VALUE(state, value) {
    state.searchValue = value;
  },
  SET_POKEMONS(state, value) {
    state.pokemons = value;
  },
};

const actions = {
  checkAuthorization() {
    // validar permisos, accesos, tokens, etc
    return true;
  },
  goToBrowser() {
    router.push("browser");
  },
  setPokemons({ commit }, pokemons) {
    pokemons = pokemons.map((pokemon) => {
      pokemon.favorite = false;
      return pokemon;
    });
    commit("SET_POKEMONS", pokemons);
  },
};

const getters = {
  pokemons(state) {
    if (state.pokemons.length > 0) {
      return state.pokemons;
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
