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
      usuarioModificable :
      {
        nombre: '',
        apellido:'',
        saldo:0.0,
      },

      vue: this,
    };
  },
  methods: {

    async guardarPerfil(usuarioModificable,vue) {
      const usuarioEditado = {
        nombre : this.usuarioModificable.nombre !== '' ? this.usuarioModificable.nombre : this.usuario.nombre,
        apellido :this.usuarioModificable.apellido !== '' ? this.usuarioModificable.apellido : this.usuario.apellido,
        saldo:this.usuarioModificable.saldo !== 0 ? this.usuarioModificable.saldo : this.usuario.saldo,
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
        <div>
          <label>Nombre:</label>
          <input type="text" v-model="usuarioModificable.nombre" >
        </div>
        <div>
          <label>Apellido:</label>
          <input type="text" v-model="usuarioModificable.apellido" >
        </div>
        <div>
          <label>Saldo:</label>
          <input type="text" v-model="usuarioModificable.saldo" >
        </div>
        <button type="submit">Guardar</button>
      </form>
    </div>
  </div>
  <div class="back-button-container">
    <RouterLink to="/Home"><button class="btn btn-secondary">Volver</button></RouterLink>
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
  flex-direction: column;
}

.edit-profile label {
  font-weight: bold;
  color: #555;
  margin-bottom: 5px;
}

.edit-profile input[type="text"],
.edit-profile input[type="email"],
.edit-profile input[type="password"],
.edit-profile input[type="file"] {
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 3px;
  font-size: 14px;
  color: #555;
}

.edit-profile button[type="submit"] {
  padding: 10px 20px;
  margin-top: 10px;
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

.edit-profile img {
  max-width: 100%;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.back-button-container {
  display: flex;
  justify-content: flex-end;
}
</style>