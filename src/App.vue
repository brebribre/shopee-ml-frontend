<script setup lang="ts">
import Dashboard from './components/containers/Dashboard.vue';
import NavigationBar from './components/containers/NavigationBar.vue';
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
  border-bottom: 4px solid #312c2c;
}
</style>
