<template>
  <div>
    <Navbar />

    <div class="container">
      <h1>Sistema de Reserva de Canchas</h1>

      <p>
        Bienvenido al sistema de gestión y reservas.
      </p>

      <div class="actions">
        <NuxtLink to="/canchas">
          Ver Canchas
        </NuxtLink>

        <NuxtLink to="/reservas">
          Mis Reservas
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import Navbar from '../../../components/Navbar.vue'
</script>

<style scoped>
.container{
  padding:40px;
  text-align:center;
}

.actions{
  margin-top:30px;
  display:flex;
  justify-content:center;
  gap:20px;
}

.actions a{
  padding:10px 20px;
  background:#2563eb;
  color:white;
  text-decoration:none;
  border-radius:6px;
}
</style>