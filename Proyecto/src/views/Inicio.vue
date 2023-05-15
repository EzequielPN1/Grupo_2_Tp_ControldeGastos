<script >
import { RouterLink, RouterView } from 'vue-router'



</script>

<template>
<div class="container d-flex justify-content-center align-items-center vh-100">
<div class="text-center">
<h1>Inicio</h1>
<RouterLink to="/Login"><button class="btn btn-primary">Loguearse</button><RouterLink to="/Registro"><button class="btn btn-secondary" >Registrarse</button>
</RouterLink></RouterLink>
</div>
</div>
</template>



