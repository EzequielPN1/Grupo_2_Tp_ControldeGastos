<template>
  <Barra></Barra>
  <div>
    <form @submit.prevent="agregarCategoria()">
      <div>
        <label for="nombre">Nombre:</label>
        <input type="text" id="nombre" v-model="categoria.nombre" required>
      </div>
      <div>
        <label for="presupuesto">Presupuesto:</label>
        <input type="number" id="presupuesto" v-model="categoria.presupuesto" required>
      </div>
      <button type="submit" class="btn btn-primary">Agregar</button>
    </form>

    <div>
      <h2>Categorías ingresadas:</h2>
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
                <input type="text" v-model="categoria.nombre" required>
              </template>
            </td>
            <td>
              <template v-if="!categoria.editando">
                {{ categoria.presupuesto }}
              </template>
              <template v-else>
                <input type="number" v-model="categoria.presupuesto" required>
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

<script>
import Barra from "../components/NavBar.vue";
import { categoriaService } from "../Services/categoriaServicie.js"
import { useUserStore } from "../stores/user";
import { useCategoriaStore } from "../stores/categorias.js"

export default {
  components: {
    Barra,
  },
  async mounted() {
    await this.obtenerCategorias();
  },
  setup() {
    const store = useUserStore();
    const { usuario } = store;
    const categoriaStore = useCategoriaStore();

    return {
      usuario,
      categorias: categoriaStore.categorias,
    }
  },
  data() {
    return {
      categoria: {
        email: '',
        nombre: '',
        presupuesto: 0
      }
    };
  },
  methods: {
    async obtenerCategorias() {
      const store = useCategoriaStore();
      console.log(this.usuario.email);
      await store.obtenerCategorias(this.usuario.email);
    },

    async agregarCategoria() {
      this.categoria.email = this.usuario.email;

      try {
        const response = await categoriaService.agregarCategoria(this.categoria);
        alert(response.data);
      } catch (error) {
        console.log(error.response.data);
        alert(error.response.data);
      }

      this.categoria.nombre = '';
      this.categoria.presupuesto = 0;
    },
    editarCategoria(categoria) {
      categoria.editando = true;
    },
    async guardarCategoria(categoria) {
      try {
        console.log(categoria);
        await categoriaService.editarCategoria(categoria);
        await this.obtenerCategorias();
        console.log("Categoría editada correctamente.");
      } catch (error) {
        console.log(error);
        alert("Error al editar la categoría.");
      }
      categoria.editando = false;
    },
    async eliminarCategoria(categoria) {
      try {
        console.log(categoria);
        await categoriaService.eliminarCategoria(categoria);
        await this.obtenerCategorias(); 
        alert("Categoría eliminada correctamente.");
      } catch (error) {
        console.log(error);
        alert("Error al eliminar la categoría.");
      }
    },
  },
}
</script>

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
</style>
