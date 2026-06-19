export default defineNuxtRouteMiddleware(() => {

  if (process.server) {
    return
  }

  const usuario =
    localStorage.getItem('usuario')

  if (!usuario) {
    return navigateTo('/login')
  }

  const datos = JSON.parse(usuario)

  if (datos.rol !== 'admin') {
    return navigateTo('/')
  }

})