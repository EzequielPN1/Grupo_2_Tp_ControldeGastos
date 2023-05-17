<script>
import { userService } from "../Services/userService.js"

export default {

  data() {
    return {
      usuario:
      {
        email: "",
        nombre: "",
        pass: "",
      },
      vue: this,
    };
  },
  methods: {

    async registerUser(vue) {
      try {
        const response = await userService.register(this.usuario);
        alert(response.data);
        vue.$router.push("/");
      } catch (error) {
        console.log(error);
        alert(`Error: El correo ${this.usuario.email} ya ha sido registrado`);
      }
    }



  }
};

</script>



<template>
  <h1>Registrarse</h1>

  <form @submit.prevent="registerUser(vue)">
    <div class="form-group">
      <label>Nombre</label>
      <input v-model="usuario.nombre" class="form-control" id="exampleInputPassword1" required />
    </div>
    <div class="form-group">
      <label for="exampleInputEmail1">Email address</label>
      <input v-model="usuario.email" type="email" class="form-control" id="exampleInputEmail1"
        aria-describedby="emailHelp" required />
    </div>
    <div class="form-group">
      <label for="exampleInputPassword1">Password</label>
      <input v-model="usuario.pass" type="password" class="form-control" id="exampleInputPassword1" required />
    </div>
    <div class="d-flex justify-content-between align-items-center">
      <button type="submit" class="btn btn-primary">Registrarse</button>
      <RouterLink to="/"><button class="btn btn-secondary">Volver</button></RouterLink>
    </div>
  </form>
</template>
  


