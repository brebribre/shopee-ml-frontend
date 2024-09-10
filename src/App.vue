<script setup lang="ts">
import Dashboard from './components/Dashboard.vue';
import NavigationBar from './components/NavigationBar.vue';
</script>

<template>
  <div class="main">
    <NavigationBar class="nav" />
    <Dashboard class="dashboard" />
  </div>
</template>

<style scoped>
.nav {
  height: 5vh;
}
</style>
