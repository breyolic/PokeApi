import Vue from "vue";
import Vuex from "vuex";

import shared from "./modules/Shared";
import browser from "./modules/Browser/index";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    shared,
    browser,
  },
});
