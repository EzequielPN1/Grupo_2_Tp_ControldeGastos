import axiosClient from './axiosClient.js';
const apiClient = axiosClient.getApiClient();


export const gastosService = {

  agregarGasto(gasto) {
    return apiClient.post('/gastos/agregar', gasto);
  },

  listar(email) {
    return apiClient.get(`/gastos/listar/${email}`);
  },

  eliminarGasto(gasto) {
    return apiClient.post('/gastos/eliminar',gasto);
  },

  editarGasto(gasto) {
    return apiClient.post('/gastos/editar',gasto);
  },


}