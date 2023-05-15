import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Inicio from '../views/Inicio.vue'
import Home from '../views/Home.vue'
import Registro from '../views/Registro.vue'
import EditarPerfil from '../views/EditarPerfil.vue'
import GenerarPass from '../views/GenerarPass.vue'
import CambioDePass from '../views/CambioDePass.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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


  ]
});






export default router
