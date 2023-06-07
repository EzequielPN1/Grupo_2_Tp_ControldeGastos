import { defineStore } from "pinia";
import { categoriaService } from "../Services/categoriaServicie.js"

export const useCategoriaStore = defineStore("categorias", {
  state: () => {
    return {
      categorias: [],
    };
  },
  actions: {
    async obtenerCategorias(email) {
      try {
        const response = await categoriaService.listarCategorias(email); 
        this.categorias = response.data; 
      } catch (error) {
        console.error("Error al obtener las categorias:", error);
      }
    },
  },
});