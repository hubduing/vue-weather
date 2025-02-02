<template>
  <div class="weather-card">
    <div class="weather-feels-like" v-if="getWeatherMain">
      Feels like
      <strong>
        {{ roundedFeelsLike }}
        <sup>&deg;</sup>
      </strong>
    </div>
    <div class="weather-temp" v-if="getWeatherMain">
      <div class="weather-icon" :style="iconStyle"></div>
      <span>{{ roundedTemp }}</span>
      <sup>&deg;</sup>
    </div>
    <div class="weather-description" v-if="getWeatherMain">
      {{ getWeatherMain.description || "No description available" }}
    </div>
    <div class="weather-wind" v-if="getWeatherWind">
      Wind Speed: {{ getWeatherWind.speed || "N/A" }} m/s
    </div>
    <div v-else>
      <p>Loading weather data...</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const getWeatherMain = computed(() => store.getters.weatherMain || {});
const getWeatherWind = computed(() => store.getters.weatherWind || {});

// Проверка на наличие данных перед использованием
const roundedTemp = computed(() => {
  return getWeatherMain.value.temp !== undefined
    ? Math.round(getWeatherMain.value.temp)
    : "N/A";
});
const roundedFeelsLike = computed(() => {
  return getWeatherMain.value.feelsLike !== undefined
    ? Math.round(getWeatherMain.value.feelsLike)
    : "N/A";
});

// Стиль для иконки погоды
const iconStyle = computed(() => {
  const icon = getWeatherMain.value.icon;
  return icon
    ? {
        backgroundImage: `url(http://openweathermap.org/img/wn/${icon}d@2x.png)`,
      }
    : {};
});
</script>

<style lang="less" scoped>
.weather-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin: 40px 0;

  .weather-feels-like,
  .weather-description {
    font-size: 18px;
    color: var(--darkColor);
    text-transform: capitalize;
  }

  .weather-temp {
    position: relative;
    width: 150px;
    height: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100%;
    box-shadow: 0 0 40px rgba(0, 0, 0, 0.2);
    background-color: #fff;
    margin: 40px 0;

    span {
      font-size: 80px;
      font-weight: 800;
      letter-spacing: -2px;
      position: relative;
    }

    sup {
      position: relative;
      top: -21px;
      font-size: 40px;
    }
  }

  .weather-icon {
    position: absolute;
    top: -35px;
    left: -35px;
    width: 110px;
    height: 110px;
    background-repeat: no-repeat;
    background-size: 100%;
    filter: drop-shadow(1px 1px 0 rgba(0, 0, 0, 0.3))
      drop-shadow(-5px -5px 0 rgba(0, 0, 0, 0.8));
  }
}

@media (max-height: 767px) {
  .weather-main {
    margin: 30px 0;

    .weather-temp {
      width: 125px;
      height: 125px;
      margin: 30px 0;
    }
  }
}
</style>
