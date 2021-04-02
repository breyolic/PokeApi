<template>
  <div class="card">
    <div class="card__close" @click="unsetPokemonSelected">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="26"
        height="26"
        fill="currentColor"
        class="bi bi-x-circle-fill"
        viewBox="0 0 16 16"
      >
        <path
          d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"
        />
      </svg>
    </div>
    <div class="card__aside">
      <div class="card__figure">
        <img
          :src="pokemonSelected.sprites.front_default"
          :alt="pokemonSelected.name"
          class="card__image"
        />
      </div>
    </div>
    <div class="card__body">
      <text-box-base>
        <template v-slot:label> Name: </template>
        <template v-slot:value>
          {{ pokemonSelected.name }}
        </template>
      </text-box-base>
      <text-box-base>
        <template v-slot:label> Weight: </template>
        <template v-slot:value>
          {{ pokemonSelected.weight }}
        </template>
      </text-box-base>
      <text-box-base>
        <template v-slot:label> Height: </template>
        <template v-slot:value>
          {{ pokemonSelected.height }}
        </template>
      </text-box-base>
      <text-box-base>
        <template v-slot:label> Types: </template>
        <template v-slot:value>
          {{ pokemonTypes }}
        </template>
      </text-box-base>
    </div>
    <div class="card__footer">
      <button-filled :width="195" @my-button-click="copyInfo">
        Share to my friends
      </button-filled>
      <div class="row card__footer__fav">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          fill="currentColor"
          class="bi bi-star-fill"
          :class="{ star: pokemonSelected.favorite }"
          viewBox="0 0 16 16"
          @click="setFavorite(pokemonSelected.name)"
        >
          <path
            d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
          />
        </svg>
      </div>
    </div>
  </div>
</template>
<script>
import TextBoxBase from "@/components/TextBoxes/TextBoxBase.vue";
import ButtonFilled from "@/components/Buttons/ButtonFilled.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    TextBoxBase,
    ButtonFilled,
  },
  computed: {
    ...mapGetters("browser/browser", ["pokemonSelected"]),
    pokemonTypes() {
      return this.pokemonSelected.types
        .reduce((acc, cur) => {
          const string = cur.type.name;
          const array = string.split("");
          array[0] = array[0].toUpperCase();
          acc.push(array.join(""));
          return acc;
        }, [])
        .join(", ");
    },
  },
  methods: {
    ...mapActions("browser/browser", ["unsetPokemonSelected", "setFavorite"]),
    copyInfo() {
      const aux = document.createElement("input");
      const string = `${this.pokemonSelected.name}, ${this.pokemonSelected.weight}, ${this.pokemonSelected.height}, ${this.pokemonTypes}`;
      aux.setAttribute("value", string);
      document.body.appendChild(aux);
      aux.select();
      document.execCommand("copy");
      document.body.removeChild(aux);
    },
  },
};
</script>
<style lang="scss" scoped>
.card {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;

  &__close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    color: var(--color-white);
    cursor: pointer;
  }

  &__aside {
    height: 220px;
    width: 315px;
  }

  &__figure {
    background-image: url("../../assets/landscape.png");
    height: 100%;
    background-size: cover;
    text-align: center;
  }

  &__image {
    height: 100%;
  }

  &__body {
    width: 315px;
    background-color: var(--color-white);
    padding-top: 1rem;
  }

  &__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 3rem 2rem;
    background-color: var(--color-white);
    width: 100%;

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
.star {
  color: var(--color-star) !important;
}
</style>
