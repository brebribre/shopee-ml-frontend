<template>
  <div class="container">
    <apexchart type="line" :options="chartOptions" :series="series"></apexchart>
    <apexchart type="line" :options="chartOptions" :series="series"></apexchart>
    <apexchart type="line" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const series = ref([
  {
    name: 'Sales',
    data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
  },
]);

const chartOptions = ref({
  chart: {
    height: 350,
    type: 'line',
  },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
  },
  title: {
    text: 'Monthly Sales',
    align: 'left',
  },
});
</script>

<style scoped>
.container {
  display: grid;
  grid-template-columns: 1fr 1fr; /* Two equal-width columns */
}
</style>
