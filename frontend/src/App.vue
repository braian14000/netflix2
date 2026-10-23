<template>
  <div class="app-layout">
    <Navbar />
    <router-view />
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue'
</script>

<style scoped>
.app-layout {
  width: 100%;
  min-height: 100vh;
  background-color: #141414;
}
</style>