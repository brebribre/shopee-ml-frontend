<template>
  <div class="grid">
    <apexchart
      v-for="index in [1, 2]"
      type="line"
      :key="index"
      :options="chartOptions"
      :series="series"
    ></apexchart>
    <apexchart
      v-for="index in [1, 2]"
      :key="index"
      type="bar"
      :options="chartOptions"
      :series="series"
    ></apexchart>
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
    height: 200,
    toolbar: {
      show: false,
    },
  },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
  },
  title: {
    text: 'Monthly Sales',
    align: 'left',
  },
  grid: {
    borderColor: '#312c2c', // Set the grid line color
  },
  colors: ['#66BB6A'],
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
  gap: 48px; /* Updated gap to 48px */
  width: 100%;
}
</style>
