import { defineStore } from "pinia";
import { userService } from "../Services/userService.js"

export const useUserStore = defineStore("user", {
  state: () => {
    return {
      usuario: {
        email: "",
        nombre: "",
        pass: "",
        token: "",
      },

    };
  },
  actions: {
    async editarUsuario(usuario) {
      try {
        const response = await userService.editarUsuario(usuario);
        this.usuario = response.usuario;
      } catch (error) {
        alert("El usuario no pudo actualizarse. Error: " + error);
      }
    }
  },




});