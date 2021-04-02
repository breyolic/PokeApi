<template>
  <div class="home">
    <div class="row home__figure">
      <div class="home__image"></div>
    </div>
    <div class="row home__title">Welcome to Pokédex</div>
    <div class="row home__body">
      <p class="home__copy">
        The digital encyclopedia created by Professor Oak is an invaluable tool
        to Trainers in the Pokémon world.
      </p>
    </div>
    <div class="row home__footer">
      <button-filled
        :disabled="false"
        :width="131"
        @my-button-click="getStarted"
      >
        Get started
      </button-filled>
    </div>
  </div>
</template>
<script>
import ButtonFilled from "@/components/Buttons/ButtonFilled";
import { mapActions } from "vuex";
export default {
  components: {
    ButtonFilled: ButtonFilled,
  },
  methods: {
    ...mapActions("browser/browser", ["checkAuthorization", "goToBrowser"]),
    ...mapActions("shared", ["setLoading", "unsetLoading"]),
    async getStarted() {
      this.setLoading();
      const isAuthorized = this.checkAuthorization();
      if (!isAuthorized) {
        console.log("It's not authorized to enter to the PokeApi");
      }
      await this.unsetLoading();
      this.goToBrowser();
    },
  },
};
</script>
<style lang="scss" scoped>
.home {
  &__image {
    margin-top: 7rem;
    width: 256px;
    height: 256px;
    background-image: url("../assets/pikachu.png");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }

  &__title {
    color: var(--color-dark-1);
    font-size: 2.6rem;
    font-weight: 700;
    margin-top: 6rem;
  }

  &__body {
    margin-top: 3rem;
  }

  &__copy {
    width: 570px;
    text-align: center;
  }

  &__footer {
    margin-top: 5rem;
  }
}
@media screen and (max-width: 720px) {
  .home {
    &__copy {
      width: 150px;
    }
  }
}
</style>
