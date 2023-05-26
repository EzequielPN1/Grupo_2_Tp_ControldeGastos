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

    async guardarPerfil(vue) {
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
      <form @submit.prevent="guardarPerfil(vue)">
        <div class="form-group">
          <label for="nombre">Nombre:</label>
          <input type="text" id="nombre" v-model="usuarioModificable.nombre"  class="form-control" >
        </div>
        <div class="form-group">
          <label for="apellido">Apellido:</label>
          <input type="text" id="apellido" v-model="usuarioModificable.apellido"  class="form-control">
        </div>
        <div class="form-group">
          <label for="saldo">Depositar saldo:</label>
          <input type="text" id="saldo" v-model="usuarioModificable.saldo"  class="form-control">
        </div>
        <div  class="d-flex justify-content-between align-items-center">
        <button class="btn btn-primary" type="submit">Confirmar</button>
        <RouterLink to="/MiPerfil"><button class="btn btn-secondary">Volver</button></RouterLink>
      </div>
      </form>
    </div>
    <div class="button-container">
      <div>
        <router-link to="/EliminarCuenta">
          <button class="btn btn-danger">Eliminar cuenta</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

