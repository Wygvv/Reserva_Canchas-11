export const useAuth = () => {

  const getToken = () => {
    return localStorage.getItem('token')
  }

  const getUsuario = () => {
    const usuario = localStorage.getItem('usuario')

    return usuario
      ? JSON.parse(usuario)
      : null
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('usuario')
  }

  return {
    getToken,
    getUsuario,
    logout
  }
}