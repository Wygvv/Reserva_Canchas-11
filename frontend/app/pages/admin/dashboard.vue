<template>
<NuxtLink to="/admin">← Volver al Panel</NuxtLink>
  <div class="container">
    <h1>Dashboard Administrador</h1>

    <div v-if="loading">
      Cargando estadísticas...
    </div>

    <div
      v-else
      class="cards"
    >
      <div class="card">
        <h2>{{ dashboard.totalCanchas }}</h2>
        <p>Canchas</p>
      </div>

      <div class="card">
        <h2>{{ dashboard.totalReservas }}</h2>
        <p>Reservas</p>
      </div>

      <div class="card">
        <h2>{{ dashboard.totalUsuarios }}</h2>
        <p>Usuarios</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const dashboard = ref({
  totalCanchas: 0,
  totalReservas: 0,
  totalUsuarios: 0
})

const loading = ref(true)

onMounted(async () => {
  try {

    const token =
      localStorage.getItem('token')

    const data = await $fetch(
      'http://localhost:3001/api/dashboard',
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    dashboard.value = data

  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.container {
  padding: 30px;
}

.cards {
  display: flex;
  gap: 20px;
  margin-top: 20px;
}

.card {
  flex: 1;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 25px;
  text-align: center;
}

.card h2 {
  font-size: 40px;
  margin: 0;
}

.card p {
  margin-top: 10px;
  font-size: 18px;
}
</style>