<template>
  <div class="movie-row">
    <h2 class="row-title">{{ title }}</h2>
    <div class="movie-list">
      <div 
        v-for="movie in movies" 
        :key="movie._id" 
        class="movie-card"
        @click="$emit('selectMovie', movie)"
      >
        <img :src="movie.imageUrl" :alt="movie.title" />
        <p class="movie-card-title">{{ movie.title }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  movies: Array
})
defineEmits(['selectMovie'])
</script>

<style scoped>
.movie-row {
  width: 100%;
  padding: 0 4%;
  margin-bottom: 40px;
  box-sizing: border-box;
}

.row-title {
  color: #e5e5e5;
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 12px;
}

.movie-list {
  display: flex;
  gap: 16px;
  overflow-x: auto;
  padding: 10px 0;
  scrollbar-width: none;
}

.movie-list::-webkit-scrollbar {
  display: none;
}

.movie-card {
  flex: 0 0 auto;
  width: 220px;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.movie-card:hover {
  transform: scale(1.08);
}

.movie-card img {
  width: 100%;
  height: 310px;
  object-fit: cover;
  border-radius: 4px;
}

.movie-card-title {
  color: #e5e5e5;
  font-size: 0.9rem;
  margin-top: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>