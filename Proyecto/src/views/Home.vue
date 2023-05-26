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
  },
  data() {

    return {
      verUsuarios: false,
    };
  },
  methods: {
    salir() {
      this.usuario.nombre = '';
      this.usuario.apellido='';
      this.usuario.email = '';
      this.usuario.dni='';
      this.usuario.fechaNacimiento='';
      this.usuario.saldo=0;
      this.usuario.pass = '';
      this.usuario.token = '';
      this.$router.push('/');
    }


  },
  created() {
    if (this.usuario.nombre === '') {
      this.salir(),
      this.$router.push('/');
    }
  },

};

</script>

<template>
  <head>


  </head>

  <body>
    <ul class="navbar">
      <li>
        <h2 v-if="usuario.nombre != ''" class="pr-4">{{ usuario.nombre }}</h2>
      </li>
      <li>
        <RouterLink to="/MiPerfil">Mi Perfil</RouterLink>
      </li>
      <li>
        <RouterLink to="/AgregarGasto">Agregar Gasto</RouterLink>
      </li>
      <li><a href="#">Opción 2</a></li>
      <li><a href="#">Opción 3</a></li>
      <button v-if="usuario.nombre !== ''" @click="salir" class="nav-link btn btn-outline-danger">Salir</button>
    </ul>


  </body>
</template>

<style>
/* Estilos para el navbar */
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