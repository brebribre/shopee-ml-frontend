<template>
  <div class="grid">
    <apexchart v-for="x in (2)" type="line" :options="chartOptions" :series="series"></apexchart>
    <apexchart v-for="x in (2)" type="bar" :options="chartOptions" :series="series"></apexchart>
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
    height: 500,
    toolbar: {
      show: false, // Disable the toolbar buttons
    },
  },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
  },
  title: {
    text: 'Monthly Sales',
    align: 'left',
  },
  tooltip: {
    enabled: true, // Ensure the tooltip is enabled
    theme: 'dark', // Optional: Set the theme of the tooltip
    x: {
      show: true, // Show the x-axis value in the tooltip
    },
    y: {
      formatter: function (val: number) {
        return val; // Customize the y-axis value display
      },
    },
  },
});
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}


</style>
