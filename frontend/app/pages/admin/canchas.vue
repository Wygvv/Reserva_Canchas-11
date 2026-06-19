<template>
<NuxtLink to="/admin">
  ← Volver al Panel
</NuxtLink>
  <div class="container">
    <h1>Administración de Canchas</h1>

    <h2>Nueva Cancha</h2>

    <form @submit.prevent="crearCancha">
      <input v-model="form.nombre" placeholder="Nombre" />

      <select v-model="form.tipo">
        <option value="futbol">Fútbol</option>
        <option value="tenis">Tenis</option>
        <option value="padel">Pádel</option>
      </select>

      <input
        v-model="form.precio_hora"
        type="number"
        placeholder="Precio por hora"
      />

      <button type="submit">
        Crear Cancha
      </button>
      <button
      type="button"
      @click="actualizarCancha">
      Actualizar Cancha
      </button>
    </form>

    <hr />

    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Tipo</th>
          <th>Precio</th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="cancha in canchas"
          :key="cancha.id"
        >
          <td>{{ cancha.id }}</td>
          <td>{{ cancha.nombre }}</td>
          <td>{{ cancha.tipo }}</td>
          <td>{{ cancha.precio_hora }}</td>

          <td>
            <button @click="editarCancha(cancha)">
              Editar
            </button>

            <button
              @click="eliminarCancha(cancha.id)">
              Eliminar
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>

definePageMeta({
  middleware: ['admin']
})

const canchas = ref([])

const form = ref({
  nombre: '',
  tipo: 'futbol',
  precio_hora: 10000
})

const canchaEditando = ref(null)

const editarCancha = (cancha) => {

  canchaEditando.value = cancha.id

  form.value = {
    nombre: cancha.nombre,
    tipo: cancha.tipo,
    precio_hora: cancha.precio_hora
  }
}

const cargarCanchas = async () => {
  const data = await $fetch(
    'http://localhost:3001/api/canchas'
  )

  canchas.value = data
}

const crearCancha = async () => {
  try {

    const token = localStorage.getItem('token')

    if (canchaEditando.value) {

      await $fetch(
        `http://localhost:3001/api/canchas/${canchaEditando.value}`,
        {
          method: 'PUT',

          headers: {
            Authorization: `Bearer ${token}`
          },

          body: form.value
        }
      )

      alert('Cancha actualizada')

      canchaEditando.value = null

    } else {

      await $fetch(
        'http://localhost:3001/api/canchas',
        {
          method: 'POST',

          headers: {
            Authorization: `Bearer ${token}`
          },

          body: form.value
        }
      )

      alert('Cancha creada')
    }

    form.value = {
      nombre: '',
      tipo: 'futbol',
      precio_hora: 10000
    }

    cargarCanchas()

  } catch (error) {
    console.error(error)
  }
}

const actualizarCancha = async () => {
  try {

    if (!canchaEditando.value) {
      alert('Primero selecciona una cancha para editar')
      return
    }

    const token = localStorage.getItem('token')

    await $fetch(
      `http://localhost:3001/api/canchas/${canchaEditando.value}`,
      {
        method: 'PUT',

        headers: {
          Authorization: `Bearer ${token}`
        },

        body: form.value
      }
    )

    alert('Cancha actualizada')

    canchaEditando.value = null

    form.value = {
      nombre: '',
      tipo: 'futbol',
      precio_hora: 10000
    }

    cargarCanchas()

  } catch (error) {
    console.error(error)
  }
}

const eliminarCancha = async (id) => {
  try {

    const token = localStorage.getItem('token')

    await $fetch(
      `http://localhost:3001/api/canchas/${id}`,
      {
        method: 'DELETE',

        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    cargarCanchas()

  } catch (error) {
    console.error(error)
  }
}

onMounted(cargarCanchas)
</script>