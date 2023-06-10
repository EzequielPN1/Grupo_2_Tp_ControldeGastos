import { userService } from './userService.js';

export const tokenService = {
  async validarToken(usuario, router) {
    const token = localStorage.getItem('token');
    try {
      const response = await userService.validarToken(token);
      if (response.data) {
        usuario.token = response.data;
        localStorage.setItem('token', usuario.token);
      }
    } catch (error) {
      router.push('/');
      throw error;
    }
  },


  async validarUsuario(context, router) {
    const token = localStorage.getItem('token');
    try {
      const response = await userService.devolverUsuarioValidado(token);
      if (response.data) {
        context.usuario = response.data;
        localStorage.setItem('token', context.usuario.token);
      }
    } catch (error) {
      router.push('/');
      alert(error.response.data);
    }
  },

  async validarUsuarioRecarga(context, loadData) {
    const token = localStorage.getItem('token');
    const response = await userService.devolverUsuarioValidado(token);
    if (response.data) {
      context.usuario = response.data;
      loadData();
    }
  }






}
