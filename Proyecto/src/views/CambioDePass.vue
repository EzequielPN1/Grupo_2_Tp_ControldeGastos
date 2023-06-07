<script>
import { userService } from "../Services/userService.js"
export default {
  data() {
    return {
      nuevaContrasenia: '',
      email: '',
      token: '',
      vue: this,
    };
  },
  created() {
    this.email = this.getEmailFromUrl();
    this.token = this.getTokenFromUrl();
  },
  methods: {

    getEmailFromUrl() {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get('email') || '';
    },
    getTokenFromUrl() {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get('token') || '';
    },

    async cambiarContrasenia() {
      try {
        const response = await userService.cambiarContrasenia(this.email, this.token, this.nuevaContrasenia);
        console.log(response);
        alert(response.data);
        window.close();
      } catch (error) {
        console.log(error.response.data);
        alert(error.response.data);
        window.close();
      }
    }


  }
};
</script>



<template>
  <div>
    <form @submit.prevent="cambiarContrasenia()">
      <label>Nueva contraseña:</label>
      <input type="password" v-model="nuevaContrasenia" class="form-control" id="exampleInputPassword1" required>
      <button type="submit" class="btn btn-primary">Cambiar contraseña</button>
    </form>
  </div>
</template>