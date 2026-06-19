<template>
  <div>
    <Navbar />

    <div class="form-container">
      <h2>Iniciar Sesión</h2>

      <form @submit.prevent="login">

        <input
          v-model="email"
          type="email"
          placeholder="Correo"
          required
        />

        <input
          v-model="password"
          type="password"
          placeholder="Contraseña"
          required
        />

        <button type="submit">
          Ingresar
        </button>

      </form>

      <p>{{ mensaje }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { navigateTo } from '#app'
import Navbar from '../../../components/Navbar.vue'

const email = ref('')
const password = ref('')
const mensaje = ref('')

const login = async () => {
  try {

    const response = await $fetch(
      'http://localhost:3001/api/auth/login',
      {
        method: 'POST',
        body: {
          email: email.value,
          password: password.value
        }
      }
    )

    localStorage.setItem('token', response.token)
    localStorage.setItem('usuario', JSON.stringify(response.usuario))

    mensaje.value = 'Login exitoso'

if (response.usuario.rol === 'admin') {

  navigateTo('/admin')

} else {

  navigateTo('/')

}

  } catch (error) {
    mensaje.value = 'Credenciales inválidas'
  }
}
</script>

<style scoped>
.form-container{
  max-width:400px;
  margin:40px auto;
}

form{
  display:flex;
  flex-direction:column;
  gap:10px;
}

input{
  padding:10px;
}

button{
  padding:10px;
}
</style>