<template>
  <div class="container">

    <NuxtLink to="/admin">
      ← Volver al Panel
    </NuxtLink>

    <h1>Cambiar Contraseña</h1>

    <form @submit.prevent="cambiarPassword">

      <input
        v-model="email"
        type="email"
        placeholder="Correo"
        readonly
      />

      <input
        v-model="newPassword"
        type="password"
        placeholder="Nueva contraseña"
        required
      />

      <button type="submit">
        Actualizar Contraseña
      </button>

    </form>

    <p>{{ mensaje }}</p>

  </div>
</template>

<script setup>

definePageMeta({
  middleware: ['admin']
})

import { ref, onMounted } from 'vue'

const email = ref('')
const newPassword = ref('')
const mensaje = ref('')

onMounted(() => {

  const usuario = JSON.parse(
    localStorage.getItem('usuario')
  )

  if (usuario) {
    email.value = usuario.email
  }

})

const cambiarPassword = async () => {

  try {

    await $fetch(
      'http://localhost:3001/api/auth/reset-password',
      {
        method: 'POST',

        body: {
          email: email.value,
          newPassword: newPassword.value
        }
      }
    )

    mensaje.value =
      'Contraseña actualizada correctamente'

    newPassword.value = ''

  } catch (error) {

    mensaje.value =
      'Error al actualizar contraseña'

    console.error(error)
  }
}
</script>

<style scoped>
.container{
  max-width:500px;
  margin:40px auto;
}

form{
  display:flex;
  flex-direction:column;
  gap:15px;
  margin-top:20px;
}

input{
  padding:10px;
}

button{
  padding:10px;
  cursor:pointer;
}
</style>