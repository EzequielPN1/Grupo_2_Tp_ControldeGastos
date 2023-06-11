<script>
  import { RouterLink } from 'vue-router'
</script>


<template>
  <div class="imagen-fondo" style="text-align: center; margin-top: 2em;">
    <img src="../images/logo.png" alt="" class="logo">
  </div>
  <div style="text-align: center;">
    <router-link to="/Login">
      <button class="btn btn-primary">Iniciar Sesión</button>
    </router-link>
    <router-link to="/Registro">
      <button class="btn btn-secondary" style="margin-left: .5em;">Registrarse</button>
    </router-link>
  </div>
</template>

<style>

  .imagen-fondo {
    width: 100%;
  }

  .logo {
    width: 15em;
    height: auto;
  }

  .btn-secondary {
    margin-left: 1em;
  }

</style>