import router from "@/router/index";

const state = {
  searchValue: "",
  pokemons: [],
  pokemonSelected: {},
  favorites: [],
};

const mutations = {
  CLEAR_DATA(state) {
    state.searchValue = "";
    state.pokemons = [];
    state.pokemonSelected = {};
    state.favorites = [];
  },
  SET_SEARCH_VALUE(state, value) {
    state.searchValue = value;
  },
  SET_POKEMONS(state, value) {
    state.pokemons = value;
  },
  SET_POKEMON_SELECTED(state, value) {
    state.pokemonSelected = value;
  },
  UNSET_POKEMON_SELECTED(state) {
    state.pokemonSelected = {};
  },
  ADD_FAVORITE(state, index) {
    state.pokemons[index].favorite = true;
    state.favorites.push(state.pokemons[index]);
  },
  DELETE_FAVORITE(state, index) {
    state.pokemons[index].favorite = false;
    const order = state.favorites.indexOf(state.pokemons[index]);
    state.favorites.splice(order, 1);
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
  setPokemonSelected({ commit }, pokemon) {
    commit("SET_POKEMON_SELECTED", pokemon);
  },
  unsetPokemonSelected({ commit }) {
    commit("UNSET_POKEMON_SELECTED");
  },
  setFavorite({ commit, state }, name) {
    const index = state.pokemons.findIndex(
      (p) => p.name.toLowerCase() === name.toLowerCase()
    );
    if (index >= 0) {
      !state.pokemonSelected.favorite
        ? commit("ADD_FAVORITE", index)
        : commit("DELETE_FAVORITE", index);
      state.pokemonSelected.favorite = !state.pokemonSelected.favorite;
    }
  },
};

const getters = {
  pokemons(state) {
    if (state.pokemons.length > 0) {
      return state.pokemons;
    }
  },
  pokemonSelected(state) {
    if (Object.prototype.hasOwnProperty.call(state.pokemonSelected, "name")) {
      return state.pokemonSelected;
    }
  },
  favorites(state) {
    return state.favorites;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
