<script setup>
  import { RouterLink } from 'vue-router'
</script>


<template>
  <div class="inicio-container">
    <div class="botones-texto">
      <h1>App de control de gastos para ayudarte a administrar y supervisar tus finanzas personales de manera más efectiva.</h1>
      <div class="botones-inicio-registro">
        <router-link to="/Login">
          <button class="btn btn-primary btn-lg">Iniciar Sesión</button>
        </router-link>
        <router-link to="/Registro">
          <button class="btn btn-secondary btn-lg" style="margin-left: .5em;">Registrarse</button>
        </router-link>
      </div>
      <div class="info-wp">
        <img src="../images/logo-whatsapp.png" alt="logo-whatsapp" class="logo-whatsapp">
        <h4>Ahora con WhatsApp integrado!</h4>
      </div>
    </div>
    <div class="imagen-fondo">
      <img src="../images/logo-inicio.jpg" alt="" class="logo">
    </div>
  </div>
</template>

<style>

  .inicio-container {
    background-color: rgb(251, 232, 217);
    width: 100vw;
    height: 100vh;
    display: flex;
  }

  .botones-texto {
    padding: 1em;
    width: 40vw;
    max-width: 31em;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin: auto;
  }

  .botones-texto h1 {
    color: rgb(240,77,36);
    text-align: center;
  }

  .botones-inicio-registro {
    margin: 5em auto;
    width: 100%;
    display: flex;
    justify-content: space-evenly;
  }

  .logo-whatsapp {
    height: 4em;
  }

  .info-wp {
    width: 100%;
    display: flex;
    align-items: center;
    gap: .5em;
    justify-content: center;
  }

  .info-wp h4 {
    color: rgb(81, 81, 81);
  }

  .imagen-fondo {
    width: 60vw;
    max-width: 46em;
    margin: auto;
    text-align: center;
  }

  .logo {
    width: 100%;
  }

  .btn-secondary {
    margin-left: 1em;
  }

</style>