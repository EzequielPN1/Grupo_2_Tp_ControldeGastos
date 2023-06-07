<script>
import { storeToRefs } from "pinia";
import { useUserStore } from "../stores/user";
import { RouterLink } from "vue-router";
import { userService } from "../Services/userService.js"



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
    async salir() {
    
      this.usuario.nombre = '';
      this.usuario.apellido = '';
      this.usuario.email = '';
      this.usuario.dni = '';
      this.usuario.fechaNacimiento = '';
      this.usuario.saldo = 0;
      this.usuario.pass = '';
      this.usuario.token = '';

      this.$router.push('/');
    },




  },
  created() {
    const token = localStorage.getItem('token');
  if (this.usuario.nombre === '') {
      userService.devolverUsuarioValidado(token)
        .then(response => {
          if (response.data) {
            this.usuario = response.data;
            localStorage.setItem('token', this.usuario .token);
          }
        })
        .catch(error => {
          console.log(error);
          alert(error.response.data);
          this.$router.push('/');
        });
    
  }else{
        userService.validarToken(token)
        .then(response => {
          if (response.data) {
            this.usuario.token = response.data;
            localStorage.setItem('token', this.usuario .token);
          }
        })
        .catch(error => {
          console.log(error);
          alert(error.response.data);
          this.$router.push('/');
        });
  }
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