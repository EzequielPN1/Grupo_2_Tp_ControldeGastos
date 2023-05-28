<script>
import { storeToRefs } from "pinia";
import { useUserStore } from "../stores/user";
import { RouterLink } from "vue-router";

export default {
  setup() {

    const store = useUserStore();
    const { usuario } = storeToRefs(store);

    return {
      usuario,
    }
  }
}

</script>

<template>
  <div>
    <h1>Perfil</h1>
    <div class="profile-container">
      <ul>
        <li>
          <span class="profile-label">Nombre:</span> {{ usuario.nombre }}
        </li>
        <li>
          <span class="profile-label">Apellido:</span> {{ usuario.apellido }}
        </li>
        <li>
          <span class="profile-label">DNI:</span> {{ usuario.dni }}
        </li>
        <li>
          <span class="profile-label">Email:</span> {{ usuario.email }}
        </li>
        <li>
          <span class="profile-label">Fecha de Nacimiento:</span> {{ usuario.fechaNac }}
        </li>
        <li>
          <span class="profile-label">Saldo Disponible:</span> $ {{ usuario.saldo }} pesos
        </li>
      </ul>
    </div>
    <div class="button-container">
      <RouterLink to="/EditarPerfil">
        <button class="btn btn-primary">Editar Perfil</button>
      </RouterLink>
    </div>
    <div class="button-container">
      <RouterLink to="/Home">
        <button class="btn btn-secondary">Volver</button>
      </RouterLink>
    </div>
  </div>
</template>

<style>
.profile-container {
  margin-bottom: 20px;
}

.profile-label {
  font-weight: bold;
  margin-right: 5px;
}

.button-container {
  margin-top: 10px;
}
</style>
