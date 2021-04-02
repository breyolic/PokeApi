<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view class="scrollable"></router-view>
    </transition>
    <div v-if="getLoading">
      <loader-base></loader-base>
    </div>
  </div>
</template>
<script>
import LoaderBase from "@/components/Loaders/LoaderBase";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    LoaderBase: LoaderBase,
  },
  computed: {
    ...mapGetters("shared", ["getLoading"]),
  },
  methods: {
    ...mapActions("shared", ["unsetLoading"]),
  },
};
</script>

<style lang="scss">
:root {
  --color-primary: #f22539;
  --color-secondary: #c00e20; //primary-hovered
  --color-star: #eca539;

  --color-white: #ffffff;

  --color-light-1: #e8e8e8;
  --color-light-2: #f5f5f5;
  --color-light-3: #f9f9f9; //bg

  --color-dark-1: #353535; //titles
  --color-dark-2: #5e5e5e; //text
  --color-dark-3: #bfbfbf; //button-disabled

  --shadow-light: 0px 2px 10px rgba(0, 0, 0, 0.04);
  --shadow-top: 0px -5px 4px rgba(0, 0, 0, 0.05);
}

* {
  margin: 0;
  padding: 0;
  font-family: inherit;
}

*,
*::before,
*::after {
  box-sizing: inherit;
}

html {
  box-sizing: border-box;
  font-size: 62.5%; //1 rem = 10px, 10px/16px = 62.5%
}

body {
  font-family: "Lato", sans-serif;
  font-weight: 500;
  line-height: 1.6;
  color: var(--color-dark-2);
  background-color: var(--color-light-3);
  font-size: 1.8rem;
  min-width: 375px;
  margin: 0 auto;
}

#app {
  height: 100vh;
  background-color: var(--color-bg);
  margin: 0 auto;

  display: flex;
  flex-direction: column;
}

.scrollable {
  flex: 1;
  overflow-y: scroll;
  scrollbar-width: none;
}

.scrollable::-webkit-scrollbar {
  display: none;
}
/*
* ESTILOS GLOBALES PARA COMPONENTES
*/
.row {
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  flex-wrap: wrap;
}

/*
* NAVIGATION
*/
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.75s ease;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
.child-view {
  transition: all 0.75s cubic-bezier(0.55, 0, 0.1, 1);
}
.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(30px, 0);
  transform: translate(30px, 0);
}
.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(-30px, 0);
  transform: translate(-30px, 0);
}
</style>
