import { defineStore } from "pinia";
import { userService } from "../Services/userService.js"

export const useUserStore = defineStore("user", {
  state: () => {
    return {
      usuario: {
        nombre: "",
        apellido: "",
        email: "",
        celular: "",
        fechaNac: "",
        dni: 0,
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
    },

    borrarStore() {
      this.usuario.nombre = "";
      this.usuario.apellido = "";
      this.usuario.email = "";
      this.usuario.dni = 0;
      this.usuario.fechaNac = "";
      this.usuario.celular = "";
      this.usuario.token = "";
    }
  }
});