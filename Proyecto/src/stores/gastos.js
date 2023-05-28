import { defineStore } from "pinia";
import { gastosService } from "../Services/gastosService.js"

export const useGastosStore = defineStore("gastos", {
  state: () => {
    return {
      gastos: []
    };
  },
  actions: {
    async listar(email) {
      try {
        const response = await gastosService.listar(email);
        response.map((gasto) => {
            this.gastos.push(gasto)
        })
      } catch (error) {
        alert("Los gastos no pudieron actualizarse. Error: " + error);
      }
    }
  }
});