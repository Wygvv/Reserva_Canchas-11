<template>
<NuxtLink to="/admin">
  ← Volver al Panel
</NuxtLink>
  <div class="container">
    <h1>Administración de Reservas</h1>

    <button @click="cargarReservas">
      Actualizar
    </button>

    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Cancha</th>
          <th>Fecha</th>
          <th>Inicio</th>
          <th>Fin</th>
          <th>Total</th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="reserva in reservas"
          :key="reserva.id"
        >
          <td>{{ reserva.id }}</td>
          <td>{{ reserva.cancha_id }}</td>
          <td>{{ reserva.fecha }}</td>
          <td>{{ reserva.hora_inicio }}</td>
          <td>{{ reserva.hora_fin }}</td>
          <td>{{ reserva.precio_total }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>

definePageMeta({
  middleware: ['admin']
})

const reservas = ref([])

const cargarReservas = async () => {
  try {

    const token =
      localStorage.getItem('token')

    const data = await $fetch(
      'http://localhost:3001/api/reservas',
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    reservas.value = data

  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  cargarReservas()
})
</script>

<style scoped>
.container {
  padding: 30px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ddd;
  padding: 10px;
}
</style>