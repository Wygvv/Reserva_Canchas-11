<template>
  <div>
    <Navbar />

    <div class="container">
      <h1>Mis Reservas</h1>

      <div v-if="loading">
        Cargando...
      </div>

      <div
        v-for="reserva in reservas"
        :key="reserva.id"
        class="card"
      >
        <h3>
          Cancha: {{ reserva.cancha?.nombre }}
        </h3>

        <p>
          Fecha:
          {{ reserva.fecha }}
        </p>

        <p>
          Inicio:
          {{ reserva.hora_inicio }}
        </p>

        <p>
          Fin:
          {{ reserva.hora_fin }}
        </p>

        <p>
          Total:
          ${{ reserva.precio_total }}
        </p>

        <button @click="cancelarReserva(reserva.id)">
  Cancelar Reserva
</button>

      </div>
    </div>
  </div>
</template>

<script setup>
import Navbar from '../components/Navbar.vue'

const config = useRuntimeConfig()

const reservas = ref([])
const loading = ref(true)

const cancelarReserva = async (id) => {
  try {

    const token = localStorage.getItem('token')

    await $fetch(
      `http://localhost:3001/api/reservas/${id}`,
      {
        method: 'DELETE',

        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    alert('Reserva cancelada')

    reservas.value = reservas.value.filter(
      reserva => reserva.id !== id
    )

  } catch (error) {
    console.error(error)
  }
}

onMounted(async () => {
  try {

    const token =
      localStorage.getItem('token')

    console.log('TOKEN ENCONTRADO:', token)

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
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.container {
  padding: 30px;
}

.card {
  border: 1px solid #ddd;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 10px;
}
</style>