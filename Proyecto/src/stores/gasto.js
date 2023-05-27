import { defineStore } from "pinia";
import { userService } from "../Services/gastosService.js"

export const useUserStore = defineStore("gasto", {
  state: () => {
    return {
      gasto: {
        email: "",
        titulo: "",
        monto: 0,
        fecha: "",
        categoria: "", // se debe cambiar cuando tengamos tipos guardados por usuario
        descripcion: "",
        tipos: ["Comida", "Social", "Vivienda","Remedios"],
      },

    };
  },
  actions: {
    /*
    async editarUsuario(usuario) {
      try {
        const response = await userService.editarUsuario(usuario);
        this.usuario = response.usuario;
      } catch (error) {
        alert("El usuario no pudo actualizarse. Error: " + error);
      }
    }
    */
  },




});