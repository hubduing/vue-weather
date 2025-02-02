<template>
  <div class="weather-search">
    <input
      type="text"
      placeholder="Search City"
      class="search-control"
      v-model.trim="search"
      @keydown.enter="getData"
    />
    <span class="country" v-if="isSearched">({{ getWeatherCountry }})</span>
    <div class="error" v-if="getError">Результатов не найдено. Пожалуйста повторите попытку.</div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const search = ref(store.state.search);

const isSearched = computed(() => store.getters.isSearched);
const getWeatherCountry = computed(() => store.getters.getWeatherCountry);
const getError = computed(() => store.getters.getError);

const fetchWeatherData = (city) => {
  store.dispatch('fetchWeatherData', city);
};

const getData = () => {
  if (search.value) {
    fetchWeatherData(search.value);
  }
};
</script>

<style lang="less" scoped>
.weather-search {
  position: relative;

  .search-control {
    width: 100%;
    height: 50px;
    border: 2px solid rgba(0, 0, 0, 0.1);
    border-radius: 100px;
    outline: none;
    background-color: transparent;
    font-size: 16px;
    padding-left: 25px;
    padding-right: 25px;
    transition: all 0.4s;

    &::placeholder {
      color: rgba(0, 0, 0, 0.6);
    }

    &:focus {
      background-color: #fff;
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.25);
      border-color: rgba(0, 0, 0, 0.05);
      font-weight: 600;

      &::placeholder {
        font-weight: 400;
      }
    }
  }

  .error {
    position: absolute;
    color: red;
    text-align: center;
    bottom: -35px;
    left: 0;
    right: 0;
    margin: auto;
    font-size: 14px;
  }

  .country {
    position: absolute;
    top: 50%;
    right: 30px;
    transform: translateY(-50%);
    color: var(--grayColor);
  }
}
</style>
