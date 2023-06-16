<script>
  import { storeToRefs } from "pinia";
  import { userService } from "../Services/userService.js"
  import { useUserStore } from "../stores/user";
  import Barra from "../components/NavBar.vue"

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
          celular:'',
        },

        vue: this,
      };
    },
    methods: {

      async guardarPerfil(vue) {
        const usuarioEditado = {
          nombre: this.usuarioModificable.nombre !== '' ? this.usuarioModificable.nombre : this.usuario.nombre,
          apellido: this.usuarioModificable.apellido !== '' ? this.usuarioModificable.apellido : this.usuario.apellido,
          celular: this.usuarioModificable.celular !== '' ? this.usuarioModificable.celular : this.usuario.celular,
          email: this.usuario.email,
          token: this.usuario.token
        };
        console.log(usuarioEditado);
        try {
          const response = await userService.editarUsuario(usuarioEditado);
          this.usuario = response.data;
          vue.$router.push("/Home");
        } catch (error) {
          alert("Error al edital Perfil: " + error.response.data);
        }
      }

    },
    components: {
      Barra,
    },
  };
</script>

<template>
  <Barra></Barra>
  <div class="edit-profile">
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
        <label for="apellido">Celular:</label>
        <input type="text" id="apellido" v-model="usuarioModificable.celular"  class="form-control">
      </div>
      <div class="button-container">
        <router-link to="/MiPerfil">
          <button class="btn btn-secondary">Volver a perfil</button>
        </router-link>
        <button class="btn btn-success" type="submit">Confirmar</button>
        <router-link to="/EliminarCuenta">
          <button class="btn btn-danger">Eliminar cuenta</button>
        </router-link>
      </div>
    </form>
  </div>
</template>

<style>

  .button-container {
    display: flex;
    justify-content: space-between;
  }

  .btn-secondary {
    margin-left: 0;
  }

</style>