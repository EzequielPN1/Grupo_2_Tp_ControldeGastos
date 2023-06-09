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
      this.$router.push('/');
    },

  },
};

</script>

<template>
  <head>


  </head>

  <body>
    <ul class="navbar">
      <div>
        <li>
          <RouterLink v-if="usuario.nombre != ''" :to="'/MiPerfil'">
            <h2>{{ usuario.nombre }}</h2>
          </RouterLink>
        </li>
      </div>
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
      <button v-if="usuario.nombre !== ''" @click="salir" class="nav-link btn btn-outline-danger">Salir</button>
    </ul>


  </body>
</template>

<style>
ul.navbar {
  list-style-type: none;
  margin: 0;
  padding: 0;
  background-color: #f1f1f1;
  overflow: hidden;
}

ul.navbar li {
  float: left;
}

ul.navbar li a {
  display: block;
  color: #333;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

ul.navbar li a:hover {
  background-color: #ddd;
}
</style>