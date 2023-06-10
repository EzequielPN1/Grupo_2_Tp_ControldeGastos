<script >
  import { RouterLink } from 'vue-router'
</script>


<template>
  <div class="imagen-fondo">
    <img src="../images/logo.png" alt="" class="logo">
  </div>
  <router-link to="/Login">
    <button class="btn btn-primary">Loguearse</button>
  </router-link>
  <router-link to="/Registro">
    <button class="btn btn-secondary">Registrarse</button>
  </router-link>
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




  