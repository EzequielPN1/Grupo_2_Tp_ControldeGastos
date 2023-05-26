import axiosClient from './axiosClient.js';
const apiClient = axiosClient.getApiClient();


export const gastosService = {

  agregarGasto(spent) {
    return apiClient.post('/gastos/agregar',spent);
  },

}