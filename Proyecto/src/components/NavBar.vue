<script>
  import { storeToRefs } from "pinia";
  import { useUserStore } from "../stores/user";
  import { RouterLink } from "vue-router";
  import { tokenService } from "../Services/tokenService.js"

  export default {
    created() {
      tokenService.validarUsuario(this, this.$router)
    },
    setup() {
      const store = useUserStore();
      const { usuario } = storeToRefs(store);
      return {
        usuario, store
      }
    },
    data() {
      return {
        verUsuarios: false,
      };
    },
    methods: {
      async salir() {
        this.store.borrarStore()
        localStorage.removeItem('token');
        localStorage.removeItem('filtroMesDona');
        localStorage.removeItem('filtroAnioDona');
        localStorage.removeItem('ordenCategorias');
        localStorage.removeItem('categoriaSeleccionada');
        localStorage.removeItem('filtroAnio');
        localStorage.removeItem('filtroMes');
        localStorage.removeItem('filtroDia');
        localStorage.removeItem('orden');
        localStorage.removeItem('anioSeleccionadoLineal');
        localStorage.removeItem('mesSeleccionadoLineal');
        localStorage.removeItem('categoriaSeleccionadaColumna');
        localStorage.removeItem('anioSeleccionadoColumna');
        this.$router.push('/');
      }
    }
  };
</script>

<template>
  <div class="navbar-container">
    <ul class="navbar">
      <li>
        <RouterLink v-if="usuario.nombre != ''" :to="'/MiPerfil'">
          <h2>{{ usuario.nombre }}</h2>
        </RouterLink>
      </li>
      <li>
        <RouterLink to="/Home">Inicio</RouterLink>
      </li>
      <li>
        <RouterLink to="/AgregarGasto">Agregar Gasto</RouterLink>
      </li>
      <li>
        <RouterLink to="/ListarGastos">Listar gastos</RouterLink>
      </li>
      <li>
        <RouterLink to="/Categoria">Categoria</RouterLink>
      </li>
      <li>
        <RouterLink to="/Superados">Gastos superados</RouterLink>
      </li>
      <button v-if="usuario.nombre !== ''" @click="salir" class="nav-link btn btn-outline-danger">Salir</button>
    </ul>
  </div>
</template>

<style>

  .navbar-container {
    background-color: rgba(191, 191, 191, 0.084);
    box-shadow: 0px 5px 5px rgba(93, 93, 93, 0.345);
    display: flex;
    justify-content: center;
    height: 4em;
    align-items: center;
    margin-bottom: 1em;
  }

  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    list-style-type: none;
    overflow: hidden;
    width: 90%;
    max-width: 90em;
    margin: auto;
  }

  ul.navbar li a {
    display: block;
    color: #333;
    text-align: center;
    text-decoration: none;
  }

  ul.navbar li a:hover {
    font-weight: bold;
  }

  .navbar button {
    margin: 0;
  }
</style>