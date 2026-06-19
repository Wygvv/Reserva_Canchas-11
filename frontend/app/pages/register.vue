<template>
  <div>
    <Navbar />

    <div class="form-container">
      <h2>Registro</h2>

      <form @submit.prevent="registrar">

        <input
          v-model="nombre"
          placeholder="Nombre"
          required
        />

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
          Registrarse
        </button>

      </form>

      <p>{{ mensaje }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Navbar from '../../../components/Navbar.vue'

const nombre = ref('')
const email = ref('')
const password = ref('')
const mensaje = ref('')

const registrar = async () => {
  try {

    await $fetch('http://localhost:3001/api/auth/register', {
      method: 'POST',
      body: {
        nombre: nombre.value,
        email: email.value,
        password: password.value
      }
    })

    mensaje.value = 'Usuario registrado correctamente'

  } catch (error) {
    mensaje.value = 'Error al registrar usuario'
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