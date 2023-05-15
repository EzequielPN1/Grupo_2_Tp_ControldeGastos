
<script>
import { userService } from "../Services/userService.js"

export default {
  data() {
    return {
      email: '',
      vue:this
    };
  },
  methods: {
    enviarCorreoNuevaPass(vue) {
      userService.enviarCorreoNuevaPass(this.email)
        .then(() => {
          alert('Se ha enviado un correo para generar nueva contraseña ');
          vue.$router.push("/");  
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
};
</script>


<template>
    <div>
      <form @submit.prevent="enviarCorreoNuevaPass(vue)">
        <label for="email">Ingrese su correo electrónico para reestablecer su Contreaseña:</label>
        <input 
        type="email" 
        v-model="email"     
        class="form-control"
        id="exampleInputPassword1" 
        required />
        <button type="submit" class="btn btn-primary" >Enviar correo</button>
      </form>
    </div>
  </template>

