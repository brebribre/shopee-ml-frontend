import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import VueApexCharts from 'vue3-apexcharts';
import PrimeVue from 'primevue/config';
import { createPinia } from 'pinia';

const pinia = createPinia();
const app = createApp(App);

app.use(VueApexCharts);

app.use(PrimeVue, {
  unstyled: true,
});

app.use(pinia);

app.mount('#app');
