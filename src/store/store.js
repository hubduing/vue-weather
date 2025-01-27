import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    apiBase: "https://api.openweathermap.org/data/3.0/",
    apiKey: "YOUR_API_KEY", // Замените на ваш API ключ
    defaultSearch: "Moskow",
    search: "",
    isError: false,
    weatherData: {},
  },
  getters: {
    weatherMain(state) {
      const { temp, feelsLike, description, icon, info } = state.weatherData;
      return { temp, feelsLike, description, icon, info };
    },
    weatherInfo(state) {
      const { wind, clouds, humidity } = state.weatherData;
      return { wind, clouds, humidity };
    },
    weatherCountry(state) {
      return state.weatherData.country;
    },
    isSearched(state) {
      return !!state.search;
    },
    hasError(state) {
      return state.isError;
    },
  },
  mutations: {
    SET_SEARCH(state, search) {
      state.search = search.toLowerCase();
    },
    SET_WEATHER_DATA(state, data) {
      state.weatherData = data;
    },
    SET_ERROR(state, value) {
      state.isError = value;
    },
  },
  actions: {
    async fetchWeatherData({ commit, state }, search) {
      commit("SET_SEARCH", search);
      try {
        const response = await axios.get(
          `${state.apiBase}weather?q=${search}&units=metric&APPID=${state.apiKey}`
        );

        const { name, main, weather, wind, clouds, sys } = response.data;
        const newWeatherData = {
          name,
          temp: main.temp,
          tempMin: main.temp_min,
          tempMax: main.temp_max,
          feelsLike: main.feels_like,
          description: weather[0].description,
          icon: weather[0].icon.substring(0, 2),
          info: weather[0].main,
          wind: wind.speed,
          humidity: main.humidity,
          clouds: clouds.all,
          country: sys.country,
        };

        commit("SET_WEATHER_DATA", newWeatherData);
        commit("SET_ERROR", false);
      } catch (error) {
        console.error("Error fetching weather data:", error);
        commit("SET_ERROR", true);
        commit("SET_WEATHER_DATA", {});
      }
    },
  },
});

export default store;
