<script>
import Barra from "../components/NavBar.vue";
import { categoriaService } from "../Services/categoriaServicie.js"
import { useUserStore } from "../stores/user";
import { useCategoriaStore } from "../stores/categorias.js"
import { userService } from "../Services/userService.js"

export default {

  created() {
    this.validarUsuario();
  },
  components: {
    Barra,
  },

  setup() {
    const store = useUserStore();
    const { usuario } = store;

    return {
      usuario,

    }
  },
  data() {
    return {
      categoria: {
        id: '',
        email: '',
        nombre: '',
        presupuesto: 0
      },
      categorias: []

    };
  },
  methods: {
    async loadData() {
      await this.obtenerCategorias();
    },
    async obtenerCategorias() {
      const store = useCategoriaStore();
      await store.obtenerCategorias(this.usuario.email);
      this.categorias = store.categorias;
    },


    async agregarCategoria() {

      this.categoria.email = this.usuario.email;
      try {
        await this.validarToken();
        const response = await categoriaService.agregarCategoria(this.categoria);
        alert(response.data);
      } catch (error) {
        alert("Error al guardar la categoría." + error.response.data);
        console.log(error);
      }

      this.categoria.nombre = '';
      this.categoria.presupuesto = 0;
      this.obtenerCategorias()
    },
    editarCategoria(categoria) {
      categoria.editando = true;
    },
    async guardarCategoria(categoria) {
      try {
        await this.validarToken();
        await categoriaService.editarCategoria(categoria);
        await this.obtenerCategorias();
        console.log("Categoría editada correctamente.");
      } catch (error) {
        alert("Error al editar la categoría." + error.response.data);
        console.log(error);
      }

      categoria.editando = false;
    },

    async eliminarCategoria(categoria) {

      try {
        await this.validarToken();
        await categoriaService.eliminarCategoria(categoria);
        await this.obtenerCategorias();
        alert("Categoría eliminada correctamente.");
      } catch (error) {
        alert("Error al eliminar la categoría." + error.response.data);
        console.log(error);
      }
    },

    async validarToken() {
      const token = localStorage.getItem('token');
      try {
        const response = await userService.validarToken(token);
        if (response.data) {
          this.usuario.token = response.data;
          localStorage.setItem('token', this.usuario.token);
        }
      } catch (error) {
        this.$router.push('/');
        throw error;
      }
    },


    async validarUsuario() {
      const token = localStorage.getItem('token');
        try {
          const response = await userService.devolverUsuarioValidado(token);
          if (response.data) {
            this.usuario = response.data;
            this.loadData();
          }
        } catch (error) {

      }
    },


  }
}
</script>

<template>
  <Barra></Barra>
  <div>
    <form @submit.prevent="agregarCategoria()" class="formulario-agregar">
      <div class="form-group">
        <label for="nombre">Nombre:</label>
        <input type="text" id="nombre" v-model="categoria.nombre" required class="form-control">
      </div>
      <div class="form-group">
        <label for="presupuesto">Presupuesto:</label>
        <input type="number" id="presupuesto" v-model="categoria.presupuesto" required class="form-control">
      </div>
      <button type="submit" class="btn btn-primary">Agregar</button>
    </form>

    <div>
      <table class="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Presupuesto</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="categoria in categorias" :key="categoria.id">
            <td>
              <template v-if="!categoria.editando">
                {{ categoria.nombre }}
              </template>
              <template v-else>
                <input type="text" v-model="categoria.nombre" required class="form-control">
              </template>
            </td>
            <td>
              <template v-if="!categoria.editando">
                {{ categoria.presupuesto }}
              </template>
              <template v-else>
                <input type="number" v-model="categoria.presupuesto" required class="form-control">
              </template>
            </td>
            <td>
              <template v-if="!categoria.editando">
                <button @click="editarCategoria(categoria)" class="btn btn-primary">Editar</button>
              </template>
              <template v-else>
                <button @click="guardarCategoria(categoria)" class="btn btn-success">Guardar</button>
              </template>
              <button @click="eliminarCategoria(categoria)" class="btn btn-danger">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style>
.table {
  width: 100%;
  border-collapse: collapse;
}

.table th,
.table td {
  border: 1px solid #ccc;
  padding: 8px;
}

.table th {
  background-color: #f2f2f2;
}

.table tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

/* Estilos para el formulario */
.formulario-agregar {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.form-group {
  margin-bottom: 15px;
}

.form-control {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.btn {
  margin-top: 10px;
}
</style>
