<template>
  <nav class="navbar">

    <div class="logo">
      Reserva de Canchas
    </div>

    <div class="links">

      <NuxtLink to="/">
        Inicio
      </NuxtLink>

      <NuxtLink to="/canchas">
        Canchas
      </NuxtLink>

      <NuxtLink to="/reservas">
        Reservas
      </NuxtLink>

      <template v-if="!usuario">

        <NuxtLink to="/login">
          Login
        </NuxtLink>

        <NuxtLink to="/register">
          Registro
        </NuxtLink>

      </template>

      <template v-else>

        <span>
          {{ usuario.nombre }}
        </span>

        <button @click="cerrarSesion">
          Salir
        </button>

      </template>

    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuth } from '../composables/useAuth.js'

const usuario = ref(null)

const { getUsuario, logout } = useAuth()

onMounted(() => {
  usuario.value = getUsuario()
})

const cerrarSesion = () => {
  logout()
  location.reload()
}
</script>

<style scoped>
.navbar{
  display:flex;
  justify-content:space-between;
  align-items:center;
  padding:15px 30px;
  background:#1f2937;
}

.logo{
  color:white;
  font-weight:bold;
}

.links{
  display:flex;
  align-items:center;
  gap:20px;
}

a{
  color:white;
  text-decoration:none;
}

span{
  color:white;
}

button{
  cursor:pointer;
}
</style>