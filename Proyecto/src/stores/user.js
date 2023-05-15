import { defineStore } from "pinia";
import { userService } from "../Services/userService.js"

export const useUserStore = defineStore("user", {
  state: () => {
    return {
      usuario: {
        email:"",
        nombre: "",
        pass:"",
        token: "",
      },
  
    };
  },
  actions: {
     editarUsuario(usuario){
      userService.editarUsuario(usuario)
       .then(response => this.usuario = response.usuario)
       .catch(err => alert("El usuario no pudo actualizarse: error ->"+err))
     },
  },


 

});