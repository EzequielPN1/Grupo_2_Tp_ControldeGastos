
<script>
import { storeToRefs } from "pinia";
import { userService } from "../Services/userService.js"
import { useUserStore } from "../stores/user";
export default {
  setup() {
    const store = useUserStore();
    const { usuario } = storeToRefs(store);
    return {
      usuario,
    };
  },
  data() {
    return {
      pass: '',
      vue: this,
    };
  },
  methods: {
    async eliminarCuenta(vue) {
      try {
        console.log(this.pass)
        console.log(this.usuario.email)
        const response = await userService.eliminarCuenta(this.pass, this.usuario.token, this.usuario.email);
        alert(response.data)
        vue.$router.push("/");
      } catch (error) {
        alert(error.response.data);
        vue.$router.push("/");
      }
    },
  },
};
</script>




<template>
  <h1>Eliminar Cuenta</h1>
  <form @submit.prevent="eliminarCuenta(vue)">
    <div class="form-group">
      <label for="exampleInputPassword1">Password</label>
      <input v-model="this.pass" type="password" class="form-control" id="exampleInputPassword1" required />
    </div>
    <div class="d-flex justify-content-between align-items-center">
      <button type="submit" class="btn btn-primary">Confirmar</button>
      <RouterLink to="/MiPerfil"><button class="btn btn-secondary">Volver</button></RouterLink>
    </div>
  </form>
</template>
  

  