
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
  
<style>
.delete-account {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.delete-account h2 {
  text-align: center;
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
}

.delete-account form {
  display: flex;
  flex-direction: column;
}

.delete-account .form-group {
  margin-bottom: 15px;
}

.delete-account label {
  font-weight: bold;
  color: #555;
}

.delete-account input[type="password"] {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
  font-size: 14px;
  color: #555;
}

.delete-account button[type="submit"] {
  padding: 10px 20px;
  margin-top: 10px;
  border: none;
  border-radius: 3px;
  background-color: #dc3545;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.delete-account button[type="submit"]:hover {
  background-color: #c82333;
}
</style>
  