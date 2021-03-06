<template>
  <div class="browser">
    <div class="row browser__input">
      <input-text
        :name="'Search'"
        v-model="searchValue"
        @my-keyup-enter="searchPokemon"
      ></input-text>
    </div>
    <div class="row browser__error" v-if="listToShow.length === 0">
      <div class="browser__error__title">Uh-oh!</div>
      <div class="browser__error__body">You look lost on your journey</div>
      <button-filled :disabled="false" :width="155" @my-button-click="goHome">
        Go back home
      </button-filled>
    </div>
    <div class="row browser__results" v-if="listToShow">
      <div
        class="row browser__results__item"
        v-for="(p, index) in listToShow"
        :key="index"
      >
        <div
          class="browser__results__item__name"
          @click="getPokemonInfo(p.name, index)"
        >
          {{ p.name }}
        </div>
        <div class="row browser__results__item__fav">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            fill="currentColor"
            class="bi bi-star-fill"
            :class="{ star: p.favorite }"
            viewBox="0 0 16 16"
            @click="setFavorite(p.name)"
          >
            <path
              d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
            />
          </svg>
        </div>
      </div>
    </div>
    <div class="row browser__footer">
      <button-filled-icon :isActive="buttonAll" @my-button-click="seeAll">
        <template v-slot:icon>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            fill="currentColor"
            class="bi bi-list-ul"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
            />
          </svg>
        </template>
        All
      </button-filled-icon>
      <button-filled-icon
        :isActive="buttonFavorites"
        @my-button-click="seeFavorites"
      >
        <template v-slot:icon>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            fill="currentColor"
            class="bi bi-star-fill"
            viewBox="0 0 16 16"
          >
            <path
              d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
            />
          </svg>
        </template>
        Favorites
      </button-filled-icon>
    </div>
    <div class="row browser__modal" v-if="pokemonSelected">
      <card-base></card-base>
    </div>
  </div>
</template>
<script>
import pokeapi from "@/api/pokeapi";
import InputText from "@/components/Inputs/InputText.vue";
import ButtonFilled from "@/components/Buttons/ButtonFilled.vue";
import ButtonFilledIcon from "@/components/Buttons/ButtonFilledIcon.vue";
import CardBase from "@/components/Cards/CardBase.vue";
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
  data: () => ({
    buttonAll: true,
    buttonFavorites: false,
    listToShow: [],
    showModal: false,
  }),
  components: {
    InputText: InputText,
    ButtonFilled: ButtonFilled,
    ButtonFilledIcon: ButtonFilledIcon,
    CardBase: CardBase,
  },
  computed: {
    ...mapGetters("browser/browser", [
      "pokemons",
      "pokemonSelected",
      "favorites",
    ]),
    searchValue: {
      get() {
        return this.$store.state.browser.browser.searchValue;
      },
      set(value) {
        this.$store.commit("browser/browser/SET_SEARCH_VALUE", value);
      },
    },
  },
  methods: {
    ...mapActions("shared", ["goHome"]),
    ...mapActions("browser/browser", ["setPokemonSelected"]),
    ...mapMutations("browser/browser", [
      "CLEAR_DATA",
      "ADD_FAVORITE",
      "DELETE_FAVORITE",
    ]),
    setFavorite(name) {
      const index = this.pokemons.findIndex(
        (p) => p.name.toLowerCase() === name.toLowerCase()
      );
      if (index >= 0) {
        !this.pokemons[index].favorite
          ? this.ADD_FAVORITE(index)
          : this.DELETE_FAVORITE(index);
      }
    },
    seeAll() {
      this.buttonAll = true;
      this.buttonFavorites = false;
      this.listToShow = this.pokemons;
      this.searchValue = "";
    },
    seeFavorites() {
      this.buttonFavorites = true;
      this.buttonAll = false;
      this.listToShow = this.favorites.sort((p) => p.name);
      this.searchValue = "";
    },
    async searchPokemon() {
      const data = [];
      const results = await pokeapi.getPokemons(this.searchValue);
      if (results) {
        results.favorite = false;
        data.push(results);
        if (!this.pokemons.find((p) => p.name === results.name)) {
          this.pokemons.push(results);
        }
        this.listToShow = data;
      } else {
        this.listToShow = [];
        this.searchValue = "";
      }
      this.buttonAll = false;
      this.buttonFavorites = false;
    },
    async getPokemonInfo(name, index) {
      const pokemon = await pokeapi.getPokemons(name);
      pokemon.favorite = this.pokemons[index].favorite;
      this.setPokemonSelected(pokemon);
    },
  },
  async created() {
    const { results } = await pokeapi.getPokemons();
    this.$store.dispatch("browser/browser/setPokemons", results);
    this.seeAll();
  },
  beforeDestroy() {
    this.CLEAR_DATA();
  },
};
</script>
<style lang="scss" scoped>
.browser {
  position: relative;

  &__input {
    width: 570px;
    margin: 0 auto;
    margin-top: 3.5rem;
  }

  &__error {
    flex-direction: column;
    align-items: center;
    margin-top: 5rem;
    &__title {
      font-weight: 700;
      font-size: 3.6rem;
      color: var(--color-dark-1);
      margin-bottom: 1rem;
    }
    &__body {
      font-size: 2rem;
      margin-bottom: 2.5rem;
    }
  }

  &__results {
    margin-top: 4rem;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: start;
    max-height: calc(100% - 205px);
    overflow-y: scroll;
    scrollbar-width: none;

    &__item {
      margin-bottom: 1rem;
      width: 570px;
      margin-left: 3rem;
      margin-right: 3rem;
      justify-content: space-between;
      align-items: center;
      background-color: var(--color-white);

      &__name {
        text-transform: capitalize;
        padding-left: 2rem;
        color: var(--color-dark-1);
        font-size: 2.2rem;
        cursor: pointer;
        height: 60px;
        display: flex;
        align-items: center;
      }
      &__fav {
        background-color: var(--color-light-2);
        height: 4.4rem;
        width: 4.4rem;
        border-radius: 100%;
        justify-content: center;
        align-items: center;
        margin-right: 1rem;
        & svg {
          color: var(--color-dark-3);
          cursor: pointer;
        }
      }
    }
  }

  &__footer {
    position: fixed;
    bottom: 0;
    right: 0;
    height: 80px;
    width: 100%;
    background-color: var(--color-white);
    justify-content: space-evenly;
    align-items: center;
    box-shadow: var(--shadow-top);
  }

  &__modal {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
  }
}
.star {
  color: var(--color-star) !important;
}

@media screen and (max-width: 720px) {
  .browser {
    &__input {
      width: 315px;
    }

    &__results {
      &__item {
        width: 315px;
      }
    }
  }
}
</style>
