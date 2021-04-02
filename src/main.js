import Vue from "vue";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";
import axios from "axios";

axios.defaults.baseURL = process.env.VUE_APP_API_URL;
axios.defaults.timeout = 10000;

axios.interceptors.request.use(
  async (config) => {
    await store.dispatch("shared/setLoading");
    await setTimeout(() => {
      console.log("Ha pasado 1 segundo");
    }, 1000);
    return config;
  },
  async (error) => {
    await store.dispatch("shared/setLoading");
    console.log(error);
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  async (response) => {
    await store.dispatch("shared/unsetLoading");
    return response;
  },
  async (error) => {
    await store.dispatch("shared/unsetLoading");
    console.log(error);
    return Promise.reject(error);
  }
);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
