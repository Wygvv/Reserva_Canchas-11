<template>
  <div class="container">
    <h1>Panel de Administración</h1>

    <button @click="cerrarSesion">
      Cerrar Sesión
    </button>

    <p>Bienvenido administrador</p>

    <div class="menu">
      <NuxtLink to="/admin/dashboard">
        Dashboard
      </NuxtLink>

      <NuxtLink to="/admin/canchas">
        Gestionar Canchas
      </NuxtLink>

      <NuxtLink to="/admin/reservas">
        Gestionar Reservas
      </NuxtLink>

      <NuxtLink to="/admin/usuarios">
        Gestionar Usuarios
      </NuxtLink>

      <NuxtLink to="/admin/password">
        Cambiar Contraseña
      </NuxtLink>
    </div>
  </div>
</template>
<script setup>

definePageMeta({
  middleware: ['admin']
})

import { navigateTo } from '#app'

const cerrarSesion = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('usuario')

  navigateTo('/login')
}
</script>

<style scoped>
.container{
  padding:30px;
}

.menu{
  display:flex;
  flex-direction:column;
  gap:15px;
  margin-top:20px;
}

a{
  padding:12px;
  border:1px solid #ccc;
  text-decoration:none;
}
</style>