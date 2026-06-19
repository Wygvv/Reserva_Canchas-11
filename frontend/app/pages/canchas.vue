<template>
  <div>
    <Navbar />

    <div class="container">
      <h1>Canchas Disponibles</h1>

      <div class="filtros">

  <input
    v-model="busqueda"
    placeholder="Buscar cancha..."
  />

  <select v-model="filtroTipo">

    <option value="">
      Todos los tipos
    </option>

    <option value="futbol">
      Fútbol
    </option>

    <option value="tenis">
      Tenis
    </option>

    <option value="padel">
      Pádel
    </option>

  </select>

</div>

      <div v-if="loading">
        Cargando...
      </div>

      <div
        v-for="cancha in canchasFiltradas"
        :key="cancha.id"
        class="card"
      >
        <h3>{{ cancha.nombre }}</h3>

        <p>
          Tipo:
          {{ cancha.tipo }}
        </p>

        <p>
          Precio:
          ${{ cancha.precio_hora }}
        </p>

        <p>
          Estado:
          {{ cancha.estado }}
        </p>

        <button @click="seleccionarCancha(cancha)">
          Reservar
        </button>
      </div>
      <div
  v-if="canchaSeleccionada"
  class="reserva-form"
>
  <h2>
    Reservar {{ canchaSeleccionada.nombre }}
  </h2>

  <input
  v-model="reserva.fecha"
  type="date"
  @change="cargarReservasExistentes"
/>

  <select v-model="reserva.hora_inicio">
    <option value="08:00">08:00</option>
    <option value="09:00">09:00</option>
    <option value="10:00">10:00</option>
    <option value="11:00">11:00</option>
    <option value="12:00">12:00</option>
    <option value="13:00">13:00</option>
    <option value="14:00">14:00</option>
    <option value="15:00">15:00</option>
    <option value="16:00">16:00</option>
    <option value="17:00">17:00</option>
    <option value="18:00">18:00</option>
    <option value="19:00">19:00</option>
    <option value="20:00">20:00</option>
  </select>

  <select v-model="reserva.hora_fin">
    <option value="09:00">09:00</option>
    <option value="10:00">10:00</option>
    <option value="11:00">11:00</option>
    <option value="12:00">12:00</option>
    <option value="13:00">13:00</option>
    <option value="14:00">14:00</option>
    <option value="15:00">15:00</option>
    <option value="16:00">16:00</option>
    <option value="17:00">17:00</option>
    <option value="18:00">18:00</option>
    <option value="19:00">19:00</option>
    <option value="20:00">20:00</option>
    <option value="21:00">21:00</option>
  </select>

<div v-if="reservasExistentes.length">

  <h3>Horarios ocupados</h3>

  <ul>
    <li
      v-for="r in reservasExistentes"
      :key="r.id"
    >
      {{ r.hora_inicio }}
      -
      {{ r.hora_fin }}
    </li>
  </ul>

</div>

  <button @click="crearReserva">
    Confirmar Reserva
  </button>
</div>
    </div>
  </div>
</template>

<script setup>
import Navbar from '../components/Navbar.vue'

const canchas = ref([])
const loading = ref(true)
const filtroTipo = ref('')
const busqueda = ref('')
const canchaSeleccionada = ref(null)
const reservasExistentes = ref([])

const reserva = ref({
  fecha: '',
  hora_inicio: '16:00',
  hora_fin: '17:00'
})

onMounted(async () => {
  try {
    const data = await $fetch(
  'http://localhost:3001/api/canchas'
)

    canchas.value = data
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
})

const seleccionarCancha = (cancha) => {
  canchaSeleccionada.value = cancha
  reservasExistentes.value = []
}

const cargarReservasExistentes = async () => {

  if (
    !canchaSeleccionada.value ||
    !reserva.value.fecha
  ) {
    return
  }

  try {

    const token = localStorage.getItem('token')

const data = await $fetch(
  `http://localhost:3001/api/reservas?cancha_id=${canchaSeleccionada.value.id}&fecha=${reserva.value.fecha}`,
  {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
)

    reservasExistentes.value = data

  } catch (error) {
    console.error(error)
  }
}

const canchasFiltradas = computed(() => {

  return canchas.value.filter(cancha => {

    const coincideTipo =
      !filtroTipo.value ||
      cancha.tipo === filtroTipo.value

    const coincideNombre =
      cancha.nombre
        .toLowerCase()
        .includes(
          busqueda.value.toLowerCase()
        )

    return (
      coincideTipo &&
      coincideNombre
    )
  })
})

const crearReserva = async () => {

  if (!reserva.value.fecha) {
  alert('Debes seleccionar una fecha')
  return
}

  try {

    const token =
      localStorage.getItem('token')

    await $fetch(
      'http://localhost:3001/api/reservas',
      {
        method: 'POST',

        headers: {
          Authorization: `Bearer ${token}`
        },

        body: {
          cancha_id: canchaSeleccionada.value.id,
          fecha: reserva.value.fecha,
          hora_inicio: reserva.value.hora_inicio,
          hora_fin: reserva.value.hora_fin
        }
      }
    )

    alert('Reserva creada correctamente')

    canchaSeleccionada.value = null

  } catch (error) {

    alert(
      error?.data?.mensaje ||
      'Error al crear reserva'
    )

    console.error(error)
  }
}
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

.reserva-form{
  margin-top:30px;
  border:1px solid #ddd;
  padding:20px;
  border-radius:10px;

  display:flex;
  flex-direction:column;
  gap:10px;
}

button{
  cursor:pointer;
  padding:10px;
}

.filtros{
  display:flex;
  gap:10px;
  margin-bottom:20px;
}

.filtros input,
.filtros select{
  padding:10px;
}
</style>