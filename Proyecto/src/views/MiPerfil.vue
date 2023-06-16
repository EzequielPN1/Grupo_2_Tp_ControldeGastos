<script>
  import { storeToRefs } from "pinia";
  import { useUserStore } from "../stores/user";
  import { RouterLink } from "vue-router";
  import Barra from "../components/NavBar.vue"

  export default {
    setup() {

      const store = useUserStore();
      const { usuario } = storeToRefs(store);

      return {
        usuario,
      }
    },
    components: {
      Barra,
    }
  }
</script>

<template>
  <Barra></Barra>
  <div>
    <div class="profile-container">
      <h4>Nombre</h4>
      <span>{{ usuario.nombre }}</span>
      <h4>Apellido</h4>
      <span>{{ usuario.apellido }}</span>
      <h4>DNI</h4>
      <span>{{ usuario.dni }}</span>
      <h4>Email</h4>
      <span>{{ usuario.email }}</span>
      <h4>Fecha de nacimiento</h4>
      <span>{{ usuario.fechaNac }}</span>
      <h4>Telefono</h4>
      <span>{{ usuario.celular }}</span>
    </div>
    <div class="button-container-perfil">
      <RouterLink to="/EditarPerfil">
        <button class="btn btn-primary">Editar Perfil</button>
      </RouterLink>
    </div>
  </div>
</template>

<style>
  .profile-container {
    text-align: center;
    padding: 1em;
  }

  .profile-container h4 {
    margin-top: .5em;
  }

  .profile-label {
    font-weight: bold;
    margin-right: 5px;
  }

  .button-container-perfil {
    display: flex;
    justify-content: center;
  }
</style>
