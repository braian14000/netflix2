<template>
  <div 
    v-if="movie" 
    class="featured" 
    :style="{ backgroundImage: `linear-gradient(to top, #141414 10%, transparent 80%), linear-gradient(to right, rgba(0,0,0,0.85) 20%, transparent 80%), url(${movie.bannerUrl || movie.imageUrl})` }"
  >
    <div class="featured-content">
      <h1 class="title">{{ movie.title }}</h1>
      <p class="description">{{ movie.description }}</p>
      <div class="buttons">
        <button class="btn btn-play" @click="$emit('select', movie)">
          <span>▶</span> Reproducir
        </button>
        <button class="btn btn-info" @click="$emit('select', movie)">
          <span>ℹ</span> Más información
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  movie: Object
})
defineEmits(['select'])
</script>

<style scoped>
.featured {
  width: 100%;
  height: 80vh;
  background-size: cover;
  background-position: center center;
  display: flex;
  align-items: flex-end;
  padding: 0 4% 80px 4%;
  box-sizing: border-box;
}

.featured-content {
  max-width: 600px;
}

.title {
  font-size: 3.5rem;
  font-weight: 900;
  color: white;
  margin-bottom: 16px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6);
  line-height: 1.1;
}

.description {
  color: #e5e5e5;
  font-size: 1.1rem;
  line-height: 1.4;
  margin-bottom: 24px;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.8);
}

.buttons {
  display: flex;
  gap: 12px;
}

.btn {
  padding: 12px 28px;
  font-size: 1rem;
  font-weight: 700;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  transition: all 0.2s ease;
}

.btn-play {
  background-color: #ffffff;
  color: #000000;
}

.btn-play:hover {
  background-color: rgba(255, 255, 255, 0.75);
}

.btn-info {
  background-color: rgba(109, 109, 110, 0.7);
  color: #ffffff;
}

.btn-info:hover {
  background-color: rgba(109, 109, 110, 0.4);
}
</style>