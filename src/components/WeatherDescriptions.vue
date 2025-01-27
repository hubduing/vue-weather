<template>
    <div class="weather-description">
      <div class="weather-item" title="Wind">
        <WindIcon size="1.7x" class="icon"></WindIcon>
        <span class="value">{{ getWeatherInfo.wind }} km/h</span>
      </div>
      <div class="weather-item" title="Humidity">
        <DropletIcon size="1.4x" class="icon"></DropletIcon>
        <span class="value">{{ getWeatherInfo.humidity }}%</span>
      </div>
      <div class="weather-item" title="Cloud Cover">
        <CloudIcon size="1.7x" class="icon"></CloudIcon>
        <span class="value">{{ getWeatherInfo.clouds }}%</span>
      </div>
      <div class="weather-item" title="Temperature">
        <TemperatureIcon size="1.7x" class="icon"></TemperatureIcon>
        <span class="value">{{ getWeatherInfo.temperature }} °C</span>
      </div>
    </div>
  </template>
  
  <script>
  import { DropletIcon, WindIcon, CloudIcon, TemperatureIcon } from "vue-feather-icons";
  import { mapGetters } from "vuex";
  
  export default {
    components: {
      WindIcon,
      DropletIcon,
      CloudIcon,
      TemperatureIcon
    },
    computed: {
      ...mapGetters(["getWeatherInfo"])
    }
  };
  </script>
  
  <style lang="less" scoped>
  .weather-description {
    display: flex;
    align-items: center;
    justify-content: space-around;
    border-top: 2px solid rgba(0, 0, 0, 0.1);
    padding-top: 15px;
    background-color: var(--cardBgColor);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
  
    .weather-item {
      display: flex;
      align-items: center;
      color: var(--darkColor);
      transition: transform 0.3s, color 0.3s;
  
      &:hover {
        transform: scale(1.1);
        color: #007BFF;
      }
  
      .icon {
        margin-right: 8px;
        color: var(--grayColor);
        transition: color 0.3s;
  
        &:hover {
          color: #007BFF;
        }
      }
  
      .value {
        margin-left: 5px;
        font-weight: 600;
        font-size: 1.2em;
      }
    }
  }
  </style>
  