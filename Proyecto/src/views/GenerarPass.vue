
<script>
import { userService } from "../Services/userService.js"

export default {
  data() {
    return {
      email: '',
      vue: this
    };
  },
  methods: {
    async enviarCorreoNuevaPass(vue) {
      try {
        await userService.enviarCorreoNuevaPass(this.email);
        alert('Se ha enviado un correo para generar una nueva contraseña');
        vue.$router.push("/");
      } catch (error) {
        alert(error.response.data);
      }
    }

  }
};
</script>


<template>
  <div>
    <form @submit.prevent="enviarCorreoNuevaPass(vue)">
      <label for="email">Ingrese su correo electrónico para reestablecer su Contraseña:</label>
      <input type="email" v-model="email" class="form-control" id="exampleInputPassword1" required />
      <div class="d-flex justify-content-between align-items-center">
      <button type="submit" class="btn btn-primary">Enviar correo</button>
      <RouterLink to="/"><button class="btn btn-secondary">Volver</button></RouterLink>
    </div>
    </form>
  </div>
</template>

