import axiosClient from './axiosClient.js';
const apiClient = axiosClient.getApiClient();


export const userService = {
  login(user) {
    return apiClient.post('/login', user);
  },
  register(user) {
    return apiClient.post('/register', user);
  },
  editarUsuario(user) {
    return apiClient.post('/editarUsuario', user);
  },
  enviarCorreoNuevaPass(email) {
    return apiClient.post('/enviarCorreoNuevaPass', { email: email });
  },
  cambiarContrasenia(email, token, newPassword) {
    return apiClient.post('/cambiarContrasenia', { email: email, token: token, newPassword: newPassword });
  },
  eliminarCuenta(pass, token, email) {
    return apiClient.delete('/eliminarCuenta', { data: { pass, token, email } });
  },

  devolverUsuarioValidado(token) {
    return apiClient.post('/devolverUsuarioValidado', { token: token });
  },

  validarToken(token) {
    return apiClient.post('/validarToken', { token: token });
  },

}