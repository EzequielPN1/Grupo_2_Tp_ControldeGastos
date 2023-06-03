import axiosClient from './axiosClient.js';
const apiClient = axiosClient.getApiClient();


export const categoriaService = {

  agregarCategoria(categoria) {
    return apiClient.post('/categorias/agregar', categoria);
  },

  listarCategorias(email) {
    return apiClient.get(`/categorias/listar/${email}`);
  },

  eliminarCategoria(categoria) {
    return apiClient.post('/categorias/eliminar',categoria);
  },

  editarCategoria(categoria) {
    return apiClient.post('/categorias/editar',categoria);
  },


}