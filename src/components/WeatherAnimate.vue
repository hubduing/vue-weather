<template>
  <div>
    <div
      class="weather-animate"
      :class="[
        { 'weather-rain': getWeatherMain.info === 'Rain' }, // Если погода - дождь
        { 'weather-snow': getWeatherMain.info === 'Snow' }, // Если погода - снег
        {
          'weather-clear':
            getWeatherMain.info === 'Clear' || getWeatherMain.info === 'Mist',
        }, // Если погода - ясная или туман
        {
          'weather-clouds':
            getWeatherMain.info === 'Clouds' || getWeatherMain.info === 'Haze',
        }, // Если погода - облачная или дымка
        { error: getError }, // Если есть ошибка
      ]"
    ></div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

// Используем Vuex для доступа к состоянию
const store = useStore();

// Получаем данные о погоде из состояния Vuex
const getWeatherMain = computed(() => store.getters.getWeatherMain);
// Получаем состояние ошибки из состояния Vuex
const getError = computed(() => store.getters.getError);
</script>

<style lang="less" scoped>
.weather-animate {
  position: absolute; // Абсолютное позиционирование для фона
  top: 0;
  left: 0;
  width: 100%; // Ширина на 100%
  height: 100vh; // Высота на 100% от высоты окна
  background-size: cover; // Фон покрывает весь элемент
  background-repeat: no-repeat; // Фон не повторяется
  transition: background-image 2s; // Плавный переход для изменения фона
}

// Состояние по умолчанию
&.weather-default {
  &::after {
    content: ""; // Псевдоэлемент для градиента
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-image: linear-gradient(
      -45deg,
      var(--grayColor),
      var(--darkColor)
    ); // Градиент по умолчанию
  }
}

// Ясная погода
&.weather-clear {
  background-image: url("../assets/images/clear.jpg"); // Фон для ясной погоды
  &::after,
  &::before {
    content: ""; // Псевдоэлементы для облаков
    background-image: url("../assets/images/fog.png");
    height: 810px;
    position: absolute;
    width: 100%;
    background-repeat: repeat-x; // Облака повторяются по горизонтали
  }
  &::after {
    top: -50px;
    animation: animateCloud var(--cloudAnimateTime) linear infinite
      alternate-reverse; // Анимация облаков
  }
  &::before {
    top: 200px;
    animation: animateCloud calc(var(--clearAnimationTime) / 2) linear infinite
      alternate; // Вторая анимация облаков
  }
}

// Облачная погода
&.weather-clouds {
  background-image: url("../assets/images/clouds.jpg"); 
  &::after,
  &::before {
    content: ""; 
    background-image: url("../assets/images/fog.png");
    height: 810px;
    position: absolute;
    width: 100%;
    background-repeat: repeat-x;
  }
  &::after {
    top: -50px;
    animation: animateCloud var(--cloudAnimateTime) linear infinite
      alternate-reverse; 
  }
  &::before {
    top: 300px;
    animation: animateCloud calc(var(--cloudAnimateTime) / 2) linear infinite
      alternate; 
  }
}

// Снежная погода
&.weather-snow {
  background-image: url("../assets/images/snow.jpg"); 
  &::after {
    content: ""; 
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    animation: animateSnow var(--snowAnimateTime)
      cubic-bezier(0.28, 0.54, 0.47, 0.56) infinite normal; 
    background-image: url("../assets/images/snow2.png"),
      url("../assets/images/snow3.png"), url("../assets/images/snow4.png"),
      url("../assets/images/snow3.png"); 
  }
}

// Дождливая погода
&.weather-rain {
  background-image: url("../assets/images/rain-bg.jpg"); 
  &::after {
    content: ""; 
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-repeat: repeat; 
    animation: animateRain var(--rainAnimateTime)
      cubic-bezier(0.28, 0.54, 0.47, 0.56) infinite normal; 
    background-image: url("../assets/images/rain-1.png"),
      url("../assets/images/rain-2.png");
    opacity: 0.8; 
  }
}

// Состояние ошибки
&.error {
  background-image: url("../assets/images/error.jpg"); 
}

// Ключевые кадры для анимации облаков
@keyframes animateCloud {
  0% {
    background-position: -1000px 0; // Начальная позиция
  }
  100% {
    background-position: 100% 0; // Конечная позиция
  }
}

// Ключевые кадры для анимации снега
@keyframes animateSnow {
  0% {
    background-position: 0px 0px, 0px 0px, 0px 0px; 
  }
  100% {
    background-position: 400px 1100px, 400px 400px, 600px 600px; 
  }
}

// Ключевые кадры для анимации дождя
@keyframes animateRain {
  0% {
    background-position: 0px 0px, 0px 0px; 
  }
  100% {
    background-position: 400px 1100px, 400px 400px; 
  }
}
</style>
