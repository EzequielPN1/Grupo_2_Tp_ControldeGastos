import axiosClient from './axiosClient.js';
const apiClient = axiosClient.getApiClient();


  export const userService = {
    login(user) {
      return apiClient.post('/login', user);
    },
    register(user) {
      return apiClient.post('/register', user);
    },
    editarUsuario(user){
      return apiClient.post('/editarUsuario',user);
    },
    enviarCorreoNuevaPass(email){
      return apiClient.post('/enviarCorreoNuevaPass',{ email: email });
    },
    cambiarContrasenia(email,newPassword){
      return apiClient.post('/cambiarContrasenia',{ email: email, newPassword: newPassword });
    },
  }