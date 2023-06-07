import { defineStore } from "pinia";
import { gastosService } from "../Services/gastosService.js"

export const useGastosStore = defineStore("gastos", {
  state: () => {
    return {
      gastos: [],
    };
  },
  actions: {
    async obtenerGastos(email) {
      try {
        const response = await gastosService.listar(email); 
        this.gastos = response.data; 
      } catch (error) {
        console.error("Error al obtener los gastos:", error);
      }
    },
  },
});