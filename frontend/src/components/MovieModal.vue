<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-container">
      <button class="close-btn" @click="$emit('close')">✕</button>

      <!-- Reproductor de Video -->
      <div class="modal-header">
        <iframe 
          v-if="embedVideoUrl"
          :src="embedVideoUrl" 
          title="Tráiler de película" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen
          class="video-player"
        ></iframe>
      </div>

      <!-- Información Corta y Acciones -->
      <div class="modal-body">
        <div class="title-row">
          <h2 class="movie-title">{{ movie.title }}</h2>
          <button class="fav-btn" @click="$emit('toggle-fav', movie._id)">
            {{ isFavorite ? '✓ En Mi Lista' : '+ Mi Lista' }}
          </button>
        </div>

        <div class="meta-info">
          <span class="match-score">98% para ti</span>
          <span class="year">{{ movie.releaseYear || 2023 }}</span>
          <span class="badge">{{ movie.duration || '2h 15m' }}</span>
          <span class="type-badge">{{ movie.type === 'series' ? 'Serie' : 'Película' }}</span>
        </div>

        <p class="description">{{ movie.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  movie: { type: Object, required: true },
  isFavorite: { type: Boolean, default: false }
})

defineEmits(['close', 'toggle-fav'])

// Diccionario de IDs de YouTube por título para asignar tráiler único a cada una
const TRAILER_IDS = {
  'John Wick': 'C0BMx-qxsP4',
  'Gladiador': 'P5ieIbInF50',
  'Batman: El Caballero de la Noche': 'EXeTwQWrcwY',
  'Misión Imposible': '2m1drlOZSDw',
  'Mad Max: Furia en el Camino': 'hEJnMQGLai8',
  'Top Gun: Maverick': 'giXco2jaZ_4',
  'Avengers: Endgame': 'TcMBFSGVi1c',
  'Pantera Negra': 'xjDjIWPwcPU',
  'Rápidos y Furiosos 5': '3k82G3z4lCo',
  'Matrix': 'vKQi3bBA1y8',
  'Atómica': 'nI7HVnZlleo',
  'Ip Man': '1TUOPSeR90U',
  'Interstellar': 'zSWdZVtXT7E',
  'Blade Runner 2049': 'gCcx85zbxz4',
  'Dune': 'Way9Dexny3w',
  'El Origen (Inception)': 'YoHD9XEInc0',
  'Arrival': 'tFMo3UJ4B4g',
  'Ex Machina': 'bggUmgeMCdc',
  'Avatar': '5PSNL1qE6VY',
  'Jurassic Park': 'QWBKEmWWL38',
  'Volver al Futuro': 'qvsgGtivCgs',
  'Star Wars: Episodio V': 'JNwNXF9Y6kY',
  'Tenet': 'LdOM0yUB35E',
  'Gravedad': 'OiTiKOy59o4',
  'Minority Report': 'aGWQyL9aC9I',
  'El Padrino': 'gCVj1LeYnsc',
  'Oppenheimer': 'uYPbbksJxIg',
  'Sueño de Fuga': '6hB3S9bIaco',
  'Club de la Pelea': 'qtRKDVmRISc',
  'Forrest Gump': 'bLvqoHBptjg',
  'Parasite': '5xH0jLA9UXA',
  'Whiplash': '7d_jQy3A860',
  'La Lista de Schindler': 'gG22XNhtnoY',
  'Joker': 'zAGVQLHvwOY',
  'Rescatando al Soldado Ryan': '9CiW_D_1gDA',
  'La Red Social': '2RB33RN768A',
  'Historia de un Matrimonio': 'BHi-a11A_0A',
  'En Busca de la Felicidad': '00uTFVjneM8',
  'Superbad': '4eaZ_48ZYog',
  '¿Qué pasó ayer?': 'tlize92131I',
  'La Máscara': 'LZl69yk5lEY',
  'Son Como Niños': '3C8qJ3dIe00',
  'Shrek': 'CwXOrWvPBPk',
  'Deadpool': 'ONHBaC-pfsk',
  'Loco por Mary': 'e8Gq3L_I-vM',
  'Dumb and Dumber': 'l13yPhim2_0',
  'Zombieland': '8m9EVP8X7N4',
  'Intocables': '34WIbmXkewU',
  'Mentiroso Mentiroso': 'C1no75lpO1E',
  'Klaus': 'taE3PwurhYM',
  'Stranger Things': 'b9EkMc79ZSU',
  'Black Mirror': 'V0XOApF5nLU',
  'Dark': 'rrwycJ08PSA',
  'The Mandalorian': 'aOC8E8z_ifw',
  'Westworld': '9BqTbfI3-7U',
  'Love, Death & Robots': 'wUFwunMKa4E',
  'Severance': 'xEQP4VVuyrY',
  'Foundation': 'X4QYV5GTz7c',
  'Altered Carbon': 'dhFM8akm9a4',
  'The Expanse': 'kQu46v4x18c',
  'Doctor Who': 'L734T-1g74U',
  'Sense8': 'iKpKmsU6SBU',
  'Rick y Morty': 'BFTSrbB2wII',
  'Peaky Blinders': 'oVzVdvGIC7U',
  'La Casa de Papel': '3y-6iaveY6c',
  'The Witcher': 'ndl1W4ltcmg',
  'Vikings': '9GgxinPwAGc',
  'The Boys': '06rueu_fh30',
  'El Juego del Calamar': 'oqxAJKy0ii4',
  'Daredevil': 'jAy6NJ_D5vU',
  'Cobra Kai': 'xCwwxNbtK6s',
  'Jack Ryan': '1KsyZF56iRY',
  'Narcos': 'xl8zdCY-abw',
  'Lupin': 'ga0iTWXCGa0',
  'Reacher': 'GSycMV-_Csw',
  'Breaking Bad': 'HhesaQXLuRY',
  'Game of Thrones': 'gcTkNV5Vg1E',
  'Better Call Saul': 'HN4oyqkJ2A0',
  'Succession': 'OzYxJV_rmE8',
  'The Crown': 'JWtnJjn6ng0',
  'Euphoria': 'c3g1-2jW3QY',
  'Gambito de Dama': 'CDrieqwSdgI',
  'Mindhunter': 'QkKInM4v1wA',
  'Ozark': '5hAXVq34bVI',
  'Los Soprano': 'u9qp2f_Kbgk',
  'The Last of Us': 'uLtkt8BonwM',
  'Mad Men': 'aX24M884L30',
  'Chernobyl': 's9APLXM9Ei8',
  'The Office': 'tS3M91J4N4Q',
  'Friends': 'IEEbUzffzjg',
  'Brooklyn Nine-Nine': 'sEOuJ4z5aTC',
  'Sex Education': 'o308rJlW1eM',
  'Ted Lasso': '3u7EIiohs6U',
  'Modern Family': 'X0lRjbrH-L8',
  'Bojack Horseman': 'i1eJMig5Ik4',
  'How I Met Your Mother': 'aJ_yE33zU10',
  'The Big Bang Theory': 'WBb3fojgW0Q',
  'Fleabag': 'aX24M884L30',
  'Merlina (Wednesday)': 'Q73UhUTs6y0',
  'Community': 'W1zO1aT5Wls'
}

const embedVideoUrl = computed(() => {
  let videoId = TRAILER_IDS[props.movie?.title]

  // Si la película ya traía una videoUrl completa desde la DB, extraer el ID
  if (!videoId && props.movie?.videoUrl) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = props.movie.videoUrl.match(regExp)
    if (match && match[2].length === 11) {
      videoId = match[2]
    }
  }

  // Fallback si no está mapeada
  if (!videoId) {
    videoId = 'b9EkMc79ZSU'
  }

  return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&rel=0`
})
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
  padding: 20px;
  box-sizing: border-box;
}

.modal-container {
  background-color: #181818;
  width: 100%;
  max-width: 850px;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.9);
  color: white;
  animation: fadeIn 0.25s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

.close-btn {
  position: absolute;
  top: 15px;
  right: 15px;
  background-color: rgba(0, 0, 0, 0.75);
  color: white;
  border: none;
  font-size: 1.2rem;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 10;
  transition: background-color 0.2s;
}

.close-btn:hover {
  background-color: #e50914;
}

.modal-header {
  width: 100%;
  height: 420px;
  background-color: black;
}

.video-player {
  width: 100%;
  height: 100%;
}

.modal-body {
  padding: 25px 35px;
}

.title-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.movie-title {
  font-size: 2rem;
  font-weight: bold;
  margin: 0;
}

.fav-btn {
  background-color: rgba(255, 255, 255, 0.15);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.4);
  padding: 8px 18px;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;
}

.fav-btn:hover {
  background-color: white;
  color: black;
}

.meta-info {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 18px;
  font-size: 0.95rem;
}

.match-score {
  color: #46d369;
  font-weight: bold;
}

.badge {
  border: 1px solid rgba(255, 255, 255, 0.4);
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 0.8rem;
}

.type-badge {
  background-color: #e50914;
  padding: 2px 8px;
  border-radius: 3px;
  font-weight: bold;
  font-size: 0.8rem;
}

.description {
  font-size: 1.05rem;
  line-height: 1.5;
  color: #ccc;
}
</style>