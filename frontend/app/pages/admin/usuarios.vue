<template>
<NuxtLink to="/admin">
  ← Volver al Panel
</NuxtLink>
  <div class="container">
    <h1>Usuarios Registrados</h1>

    <button @click="cargarUsuarios">
      Actualizar
    </button>

    <table>
      <thead>
  <tr>
    <th>ID</th>
    <th>Nombre</th>
    <th>Email</th>
    <th>Rol</th>
    <th>Acción</th>
  </tr>
</thead>

<tbody>
  <tr
    v-for="usuario in usuarios"
    :key="usuario.id"
  >
    <td>{{ usuario.id }}</td>
    <td>{{ usuario.nombre }}</td>
    <td>{{ usuario.email }}</td>

    <td>
      <select v-model="usuario.rol">
        <option value="cliente">
          Cliente
        </option>

        <option value="admin">
          Admin
        </option>
      </select>
    </td>

    <td>
      <button
        @click="actualizarRol(usuario)"
      >
        Guardar
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

const usuarios = ref([])

const cargarUsuarios = async () => {
  try {

    const token =
      localStorage.getItem('token')

    const data = await $fetch(
      'http://localhost:3001/api/usuarios',
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    usuarios.value = data

  } catch (error) {
    console.error(error)
  }
}

const actualizarRol = async (usuario) => {
  try {

    const token = localStorage.getItem('token')

    await $fetch(
      `http://localhost:3001/api/usuarios/${usuario.id}/rol`,
      {
        method: 'PUT',

        headers: {
          Authorization: `Bearer ${token}`
        },

        body: {
          rol: usuario.rol
        }
      }
    )

    alert('Rol actualizado')

  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  cargarUsuarios()
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