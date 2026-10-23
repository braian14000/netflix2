<template>
  <div class="home-view">
    <Navbar />

    <!-- Banner Principal -->
    <div 
      v-if="featuredMovie" 
      class="featured-banner" 
      :style="{ backgroundImage: `url(${featuredMovie.bannerUrl || featuredMovie.imageUrl})` }"
    >
      <div class="banner-content">
        <h1 class="banner-title">{{ featuredMovie.title }}</h1>
        <p class="banner-description">{{ featuredMovie.description }}</p>
        <div class="banner-buttons">
          <button class="play-btn" @click="selectedMovie = featuredMovie">▶ Reproducir</button>
        </div>
      </div>
      <div class="banner-fade"></div>
    </div>

    <!-- Filas por Categoría (Carrusel con Flechas) -->
    <div class="category-rows">
      <div v-for="cat in activeCategories" :key="cat._id" class="category-row">
        <h2 class="category-title">{{ cat.name }}</h2>
        
        <div class="carousel-container">
          <!-- Flecha Izquierda -->
          <button class="carousel-btn left" @click="scrollRow(cat._id, -600)">
            ‹
          </button>

          <!-- Lista de Películas -->
          <div class="movie-list" :ref="el => setRowRef(cat._id, el)">
            <div 
              v-for="item in getItemsByCategory(cat._id)" 
              :key="item._id" 
              class="movie-card"
              @click="selectedMovie = item"
            >
              <img 
                :src="item.imageUrl" 
                :alt="item.title" 
                class="movie-poster"
                @error="onImgError"
              />
              <p class="movie-card-title">{{ item.title }}</p>
            </div>
          </div>

          <!-- Flecha Derecha -->
          <button class="carousel-btn right" @click="scrollRow(cat._id, 600)">
            ›
          </button>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <MovieModal v-if="selectedMovie" :movie="selectedMovie" @close="selectedMovie = null" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import Navbar from '../components/Navbar.vue'
import MovieModal from '../components/MovieModal.vue'
import { getCategories, getMovies } from '../services/api.js'

const props = defineProps({
  filterType: {
    type: String,
    default: null
  }
})

const categories = ref([])
const movies = ref([])
const selectedMovie = ref(null)
const rowRefs = ref({})

// Guardar referencia de cada contenedor de fila para poder desplazarlo
const setRowRef = (id, el) => {
  if (el) {
    rowRefs.value[id] = el
  }
}

// Función para desplazar horizontalmente con animación suave
const scrollRow = (catId, amount) => {
  const container = rowRefs.value[catId]
  if (container) {
    container.scrollBy({
      left: amount,
      behavior: 'smooth'
    })
  }
}

const loadData = async () => {
  try {
    const [catRes, movRes] = await Promise.all([getCategories(), getMovies()])
    categories.value = catRes.data
    movies.value = movRes.data
  } catch (error) {
    console.error('Error cargando datos:', error)
  }
}

onMounted(loadData)

const filteredMovies = computed(() => {
  if (!props.filterType) return movies.value
  return movies.value.filter(m => m.type === props.filterType)
})

const featuredMovie = computed(() => {
  if (filteredMovies.value.length === 0) return null
  return filteredMovies.value.find(m => m.isFeatured) || filteredMovies.value[0]
})

const activeCategories = computed(() => {
  return categories.value.filter(cat => getItemsByCategory(cat._id).length > 0)
})

const getItemsByCategory = (catId) => {
  return filteredMovies.value.filter(m => (m.category?._id || m.category) === catId)
}

const onImgError = (e) => {
  e.target.src = 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=400&auto=format&fit=crop'
}
</script>

<style scoped>
.home-view {
  background-color: #141414;
  min-height: 100vh;
  color: white;
  padding-top: 68px;
  box-sizing: border-box;
}

.featured-banner {
  position: relative;
  height: 60vh;
  background-size: cover;
  background-position: center top;
  display: flex;
  align-items: center;
  padding: 0 4%;
  margin-top: -68px;
}

.banner-content {
  max-width: 550px;
  z-index: 2;
  margin-top: 50px;
}

.banner-title {
  font-size: 2.8rem;
  font-weight: 800;
  margin-bottom: 12px;
}

.banner-description {
  font-size: 1rem;
  line-height: 1.4;
  margin-bottom: 20px;
  color: #e5e5e5;
}

.play-btn {
  padding: 10px 24px;
  font-size: 1.1rem;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: white;
  color: black;
  transition: background-color 0.2s;
}

.play-btn:hover {
  background-color: rgba(255, 255, 255, 0.75);
}

.banner-fade {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 180px;
  background: linear-gradient(180deg, transparent, #141414);
}

.category-rows {
  padding: 20px 4%;
}

.category-row {
  margin-bottom: 35px;
}

.category-title {
  font-size: 1.4rem;
  margin-bottom: 14px;
  font-weight: 600;
}

/* ================= Estilos del Carrusel ================= */
.carousel-container {
  position: relative;
  display: flex;
  align-items: center;
}

.carousel-btn {
  position: absolute;
  top: 0;
  bottom: 28px;
  width: 45px;
  background-color: rgba(0, 0, 0, 0.65);
  color: white;
  border: none;
  font-size: 2.8rem;
  font-weight: bold;
  cursor: pointer;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease, background-color 0.2s ease, color 0.2s ease;
  user-select: none;
}

/* Aparecen al pasar el mouse por la fila */
.carousel-container:hover .carousel-btn {
  opacity: 1;
}

.carousel-btn:hover {
  background-color: rgba(0, 0, 0, 0.85);
  color: #e50914;
}

.carousel-btn.left {
  left: 0;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}

.carousel-btn.right {
  right: 0;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}

.movie-list {
  display: flex;
  gap: 12px;
  overflow-x: auto;
  padding-bottom: 10px;
  scroll-behavior: smooth;
  width: 100%;
}

.movie-list::-webkit-scrollbar {
  display: none;
}

.movie-card {
  flex: 0 0 auto;
  width: 180px;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
}

.movie-card:hover {
  transform: scale(1.05);
}

.movie-poster {
  width: 100%;
  height: 260px;
  object-fit: cover;
  border-radius: 4px;
  background-color: #222;
}

.movie-card-title {
  font-size: 13px;
  margin-top: 8px;
  color: #ccc;
  text-align: center;
}
</style>