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
      usuarioModificable:
      {
        nombre: '',
        apellido: '',
        saldo: 0.0,
      },

      vue: this,
    };
  },
  methods: {

    async guardarPerfil(usuarioModificable, vue) {
      const usuarioEditado = {
        nombre: this.usuarioModificable.nombre !== '' ? this.usuarioModificable.nombre : this.usuario.nombre,
        apellido: this.usuarioModificable.apellido !== '' ? this.usuarioModificable.apellido : this.usuario.apellido,
        saldo: Number(this.usuarioModificable.saldo) + Number(this.usuario.saldo),
        email: this.usuario.email,
        token: this.usuario.token
      };
      console.log(usuarioEditado);
      try {
        const response = await userService.editarUsuario(usuarioEditado);
        this.usuario = response.data;
        vue.$router.push("/Home");
      } catch (error) {
        alert(error.response.data);
        vue.$router.push("/Login");
      }
    }

  },
};
</script>


<template>
  <div class="edit-profile">
    <div>
      <h2>Editar Perfil</h2>
      <form @submit.prevent="guardarPerfil(usuarioModificable, vue)">
        <div class="form-group">
          <label for="nombre">Nombre:</label>
          <input type="text" id="nombre" v-model="usuarioModificable.nombre">
        </div>
        <div class="form-group">
          <label for="apellido">Apellido:</label>
          <input type="text" id="apellido" v-model="usuarioModificable.apellido">
        </div>
        <div class="form-group">
          <label for="saldo">Depositar saldo:</label>
          <input type="text" id="saldo" v-model="usuarioModificable.saldo">
        </div>
        <button type="submit">Confirmar</button>
      </form>
    </div>
    <div class="button-container">
      <div class="back-button-container">
        <router-link to="/MiPerfil">
          <button class="btn btn-secondary">Volver</button>
        </router-link>
      </div>
      <div>
        <router-link to="/EliminarCuenta">
          <button class="btn btn-danger">Eliminar cuenta</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style>
.edit-profile {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.edit-profile h2 {
  text-align: center;
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
}

.edit-profile form {
  display: flex;
  flex-direction: row;
}

.edit-profile .form-group {
  margin-bottom: 15px;
}

.edit-profile label {
  font-weight: bold;
  color: #555;
}

.edit-profile input[type="text"],
.edit-profile input[type="email"],
.edit-profile input[type="password"],
.edit-profile input[type="file"] {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
  font-size: 14px;
  color: #555;
}

.edit-profile button[type="submit"] {
  padding: 5px 50px;
  margin-top: 30px;
  border: none;
  border-radius: 3px;
  background-color: #007bff;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.edit-profile button[type="submit"]:hover {
  background-color: #0056b3;
}

.button-container {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.back-button-container {
  align-self: flex-start;
}

.button-container>div {
  display: flex;
}
</style>
