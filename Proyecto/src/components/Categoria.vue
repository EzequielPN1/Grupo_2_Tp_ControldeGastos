<script>
import Barra from "../components/NavBar.vue";
import { categoriaService } from "../Services/categoriaServicie.js";
import { useUserStore } from "../stores/user";
import { useCategoriaStore } from "../stores/categorias.js";
import { tokenService } from "../Services/tokenService.js";

export default {
  created() {
    tokenService.validarUsuarioRecarga(this, this.loadData);
    const ordenGuardado = localStorage.getItem('ordenCategorias');
    if (ordenGuardado) {
      this.orden = ordenGuardado;
    }
  },
  components: {
    Barra,
  },

  setup() {
    const store = useUserStore();
    const { usuario } = store;

    return {
      usuario,
    };
  },

  data() {
    return {
      categoria: {
        id: '',
        email: '',
        nombre: '',
        presupuesto: 0
      },
      categorias: [],
      orden: 'asc'
    };
  },

  methods: {
    async loadData() {
      await this.obtenerCategorias();
    },

    async obtenerCategorias() {
      const store = useCategoriaStore();
      await store.obtenerCategorias(this.usuario.email);

      this.categorias = store.categorias.sort((a, b) => {
        if (this.orden === 'asc') {
          return a.presupuesto - b.presupuesto;
        } else if (this.orden === 'desc') {
          return b.presupuesto - a.presupuesto;
        } else if (this.orden === 'asc_alpha') {
          return a.nombre.localeCompare(b.nombre);
        } else if (this.orden === 'desc_alpha') {
          return b.nombre.localeCompare(a.nombre);
        }
      });

      localStorage.setItem('ordenCategorias', this.orden);
    },

    async agregarCategoria() {
      this.categoria.email = this.usuario.email;
      try {
        await tokenService.validarToken(this.usuario, this.$router);
        const response = await categoriaService.agregarCategoria(this.categoria);
        alert(response.data);
      } catch (error) {
        alert("Error al guardar la categoría." + error.response.data);
        console.log(error);
      }

      this.categoria.nombre = '';
      this.categoria.presupuesto = 0;
      this.obtenerCategorias();
    },

    editarCategoria(categoria) {
      this.categorias.forEach((c) => (c.editando = false));
      categoria.editando = true;
    },

    async guardarCategoria(categoria) {
      try {
        await tokenService.validarToken(this.usuario, this.$router);
        await categoriaService.editarCategoria(categoria);
        await this.obtenerCategorias();
        console.log("Categoría editada correctamente.");
      } catch (error) {
        alert("Error al editar la categoría." + error.response.data);
        console.log(error);
        this.loadData();
      }

      categoria.editando = false;
    },

    async eliminarCategoria(categoria) {
      try {
        await tokenService.validarToken(this.usuario, this.$router);
        await categoriaService.eliminarCategoria(categoria);
        await this.obtenerCategorias();
        alert("Categoría eliminada correctamente.");
      } catch (error) {
        alert("Error al eliminar la categoría." + error.response.data);
        console.log(error);
      }
    },
  }
}
</script>

<template>
  <Barra></Barra>
  <form @submit.prevent="agregarCategoria()" class="formulario-agregar">
    <div class="form-group">
      <label for="nombre">Nombre:</label>
      <input type="text" id="nombre" v-model="categoria.nombre" required class="form-control">
    </div>
    <div class="form-group">
      <label for="presupuesto">Presupuesto:</label>
      <input type="number" id="presupuesto" v-model="categoria.presupuesto" required class="form-control" placeholder="$">
    </div>
    <button type="submit" class="btn btn-primary">Agregar</button>
  </form>
  <div class="filtros-container">
    <label for="orden">Ordenar por presupuesto:</label>
    <select v-model="orden" @change="obtenerCategorias()" id="orden">
      <option value="asc">Menor a Mayor</option>
      <option value="desc">Mayor a Menor</option>
      <option value="asc_alpha">A-Z</option>
      <option value="desc_alpha">Z-A</option>
    </select>
  </div>
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
            ${{ categoria.presupuesto }}
          </template>
          <template v-else>
            <input type="number" v-model="categoria.presupuesto" required class="form-control">
          </template>
        </td>
        <td class="botones-edicion-categorias">
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

.formulario-agregar {
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.form-group {
  margin-bottom: 15px;
}

.filtros-container {
  margin: 1em auto;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: .2em;
  flex-direction: column;
}

.filtros-container label {
  margin: 0;
}

.filtros-container select {
  height: 2em;
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

.botones-edicion-categorias {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: .8em;
}
</style>
