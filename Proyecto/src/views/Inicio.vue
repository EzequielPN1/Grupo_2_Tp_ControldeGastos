<script >
import { RouterLink, RouterView } from 'vue-router'



</script>


<template>
  <div class="container" style="position: relative;">
    <div class="text-center" style="position: absolute; top: 20px; right: 20px;">
      <router-link to="/Login">
        <button class="btn btn-primary">Loguearse</button>
      </router-link>
      <router-link to="/Registro">
        <button class="btn btn-secondary">Registrarse</button>
      </router-link>
    </div>
  </div>
</template>




  