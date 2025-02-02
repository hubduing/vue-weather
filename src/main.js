import { createApp } from 'vue';
import App from './App.vue';
import store from './store/store';

const app = createApp(App);

// Отключаем предупреждение о режиме производства
app.config.productionTip = false;

// Фильтр для округления чисел
app.config.globalProperties.$filters = {
  round(value, decimals) {
    if (!value) value = 0;
    if (!decimals) decimals = 0;
    return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
  },
};

// Подключаем Vuex и монтируем приложение
app.use(store).mount('#app');
