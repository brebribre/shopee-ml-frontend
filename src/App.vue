<script setup lang="ts">
import Dashboard from './components/Dashboard.vue'
</script>

<template>
  <div class="main">
    <Dashboard class="dashboard" />
  </div>
</template>

<style scoped>
.main{
  display: flex;
  height: 100vh;
}

.sidebar{
  width: 20%;
  border-right: 0.5vh solid hwb(0 9% 90%);
}

.dashboard{
  width: 80%;
}
</style>
