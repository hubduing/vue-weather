<template>
  <div id="app" class="app">
    <div class="card">
      <WeatherTitle />
    </div>
    <div class="footer-title">
      <h3>Footer</h3>
    </div>
  </div>
</template>

<script setup>
import WeatherTitle from "./WeatherTitle.vue";
</script>

<style lang="less">
@import url("https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,400;0,700;0,800;0,900;1,300;1,500&display=swap");

:root {
  --cardWidth: 360px;
  --darkColor: #444;
  --grayColor: #777;
  --cardBgColor: #ffffff;
  --cardBorderColor: #e0e0e0;
  --cloudAnimateTime: 150s;
  --clearAnimationTime: 120s;
  --snowAnimateTime: 15s;
  --rainAnimateTime: 70s;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Jost", sans-serif;
}

body {
  background-color: rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.app {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.card {
  max-width: var(--cardWidth);
  width: 100%;
  padding: 40px;
  margin: 20px;
  border-radius: 15px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  z-index: 9999;
  background-color: var(--cardBgColor);
  border: 1px solid var(--cardBorderColor);

  @media (max-height: 767px) {
    padding: 30px;
  }
}

@media (max-width: 480px) {
  .card {
    padding: 20px;
  }
}

.footer-text {
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
  color: var(--darkColor);

  .link {
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    color: #007bff;
    font-weight: 600;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);

    span {
      font-size: 18px;
      margin-left: 5px;
    }

    &:hover {
      text-decoration: underline;
      color: #0056b3;
    }
  }
}
</style>
