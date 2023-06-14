import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Inicio from '../views/Inicio.vue'
import Home from '../views/Home.vue'
import Registro from '../views/Registro.vue'
import EditarPerfil from '../views/EditarPerfil.vue'
import GenerarPass from '../views/GenerarPass.vue'
import CambioDePass from '../views/CambioDePass.vue'
import MiPerfil from '../views/MiPerfil.vue'
import EliminarCuenta from '../views/EliminarCuenta.vue'
import AgregarGasto from "../components/agregarGasto.vue";
import ListarGastos from "../components/ListarGastos.vue";
import Categoria from "../components/Categoria.vue";
import Superados from "../components/Superados.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    //Usuario:
    {
      path: '/',
      name: 'Inicio',
      component: Inicio
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home
    },

    {
      path: '/Registro',
      name: 'Registro',
      component: Registro
    },

    {
      path: '/EditarPerfil',
      name: 'EditarPerfil',
      component: EditarPerfil,
    },
    {
      path: '/GenerarPass',
      name: 'GenerarPass',
      component: GenerarPass,
    },
    {
      path: '/CambioDePass',
      name: 'CambioDePass',
      component: CambioDePass,
    },
    {
      path: '/MiPerfil',
      name: 'MiPerfil',
      component: MiPerfil,
    },
    {
      path: '/EliminarCuenta',
      name: 'EliminarCuenta',
      component: EliminarCuenta,
    },
    
    //Gasto:

    {
      path: '/AgregarGasto',
      name: 'AgregarGasto',
      component: AgregarGasto,
    },
    {
      path: '/ListarGastos',
      name: 'ListarGastos',
      component: ListarGastos,
    },

    //Categoria:
    {
      path: '/Categoria',
      name: 'Categoria',
      component: Categoria,
    },
    {
      path: '/Superados',
      name: 'Superados',
      component: Superados,
    },
  ]
});

export default router
