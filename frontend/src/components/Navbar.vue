<template>
  <nav class="navbar">
    <div class="nav-left">
      <router-link to="/" class="logo">NETFLIX</router-link>
      <ul class="nav-links">
        <li><router-link to="/">Inicio</router-link></li>
        <li><router-link to="/series">Series</router-link></li>
        <li><router-link to="/peliculas">Películas</router-link></li>
        <li><router-link to="/mi-lista">Mi Lista</router-link></li>
      </ul>
    </div>

    <div class="nav-right">
      <!-- Buscador en Tiempo Real -->
      <div class="search-box" :class="{ active: isSearchOpen }">
        <button class="search-icon" @click="toggleSearch" type="button">🔍</button>
        <input 
          ref="searchInput"
          type="text" 
          v-model="searchQuery" 
          placeholder="Títulos, géneros..." 
          @input="onSearchInput"
        />
      </div>

      <router-link to="/login" @click="logout" class="logout-btn">Cerrar Sesión</router-link>
    </div>
  </nav>
</template>

<script setup>
import { ref, nextTick } from 'vue'

const emit = defineEmits(['search'])

const searchQuery = ref('')
const isSearchOpen = ref(false)
const searchInput = ref(null)

const onSearchInput = () => {
  emit('search', searchQuery.value)
}

const toggleSearch = () => {
  isSearchOpen.value = !isSearchOpen.value
  if (isSearchOpen.value) {
    nextTick(() => searchInput.value?.focus())
  } else {
    searchQuery.value = ''
    emit('search', '') // Notifica a HomeView para restaurar las filas
  }
}

const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
}
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 68px;
  background-color: rgba(20, 20, 20, 0.95);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 4%;
  z-index: 1000;
  box-sizing: border-box;
}

.nav-left, .nav-right {
  display: flex;
  align-items: center;
  gap: 20px;
}

.logo {
  color: #e50914;
  font-size: 1.8rem;
  font-weight: 900;
  text-decoration: none;
  letter-spacing: 1px;
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 20px;
  margin: 0;
  padding: 0;
}

.nav-links a {
  color: #e5e5e5;
  text-decoration: none;
  font-size: 0.95rem;
  transition: color 0.3s;
}

.nav-links a.router-link-active,
.nav-links a:hover {
  color: #ffffff;
  font-weight: bold;
}

/* Buscador Animado */
.search-box {
  display: flex;
  align-items: center;
  border: 1px solid transparent;
  padding: 4px 8px;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.search-box.active {
  background-color: rgba(0, 0, 0, 0.85);
  border-color: white;
}

.search-icon {
  background: none;
  border: none;
  color: white;
  font-size: 1.1rem;
  cursor: pointer;
}

.search-box input {
  width: 0;
  border: none;
  background: transparent;
  color: white;
  outline: none;
  transition: width 0.3s ease;
  font-size: 0.9rem;
}

.search-box.active input {
  width: 200px;
  padding-left: 8px;
}

.logout-btn {
  color: #fff;
  text-decoration: none;
  font-size: 0.9rem;
  background-color: #e50914;
  padding: 6px 14px;
  border-radius: 4px;
}
</style>