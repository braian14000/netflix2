<template>
  <div class="auth-container">
    <div class="auth-box">
      <h2>Registrarse</h2>
      <p v-if="errorMessage" class="error-msg">{{ errorMessage }}</p>

      <form @submit.prevent="handleRegister">
        <div class="input-group">
          <input type="text" v-model="name" placeholder="Nombre completo" required />
        </div>
        <div class="input-group">
          <input type="email" v-model="email" placeholder="Email" required />
        </div>
        <div class="input-group">
          <input type="password" v-model="password" placeholder="Contraseña" required />
        </div>
        <button type="submit" class="auth-btn">Registrarse</button>
      </form>

      <div class="auth-footer">
        <span>¿Ya tienes una cuenta?</span>
        <router-link to="/login">Inicia sesión.</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { registerUser } from '../services/api.js'

const name = ref('')
const email = ref('')
const password = ref('')
const errorMessage = ref('')
const router = useRouter()

const handleRegister = async () => {
  try {
    errorMessage.value = ''
    const response = await registerUser({ name: name.value, email: email.value, password: password.value })
    localStorage.setItem('token', response.data.token)
    localStorage.setItem('user', JSON.stringify(response.data.user))
    router.push('/')
  } catch (error) {
    errorMessage.value = error.response?.data?.message || 'Error al registrarse'
  }
}
</script>

<style scoped>
.auth-container {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.8)), url('https://assets.nflxext.com/ffe/siteui/vlv3/ef282772-0120-497d-ae58-1f486d34bf3c/53545b79-e337-4c40-9a40-2059a43a0e71/US-es-20230213-popsignuptwoweeks-perspective_alpha_website_medium.jpg') center/cover;
  display: flex;
  justify-content: center;
  align-items: center;
}

.auth-box {
  background-color: rgba(0, 0, 0, 0.75);
  padding: 60px 68px;
  width: 100%;
  max-width: 450px;
  border-radius: 4px;
}

.auth-box h2 {
  color: white;
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 28px;
}

.input-group {
  margin-bottom: 16px;
}

.input-group input {
  width: 100%;
  padding: 16px;
  background-color: #333;
  border: none;
  border-radius: 4px;
  color: white;
  font-size: 16px;
  box-sizing: border-box;
}

.input-group input:focus {
  outline: none;
  background-color: #454545;
}

.auth-btn {
  width: 100%;
  padding: 16px;
  background-color: #E50914;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 24px;
}

.auth-btn:hover {
  background-color: #f40612;
}

.error-msg {
  color: #e87c03;
  margin-bottom: 16px;
  font-size: 14px;
}

.auth-footer {
  margin-top: 40px;
  color: #737373;
  font-size: 16px;
  display: flex;
  gap: 8px;
}

.auth-footer a {
  color: white;
  text-decoration: none;
}

.auth-footer a:hover {
  text-decoration: underline;
}
</style>