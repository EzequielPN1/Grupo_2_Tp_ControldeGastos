<script>
import { useUserStore } from "../stores/user";
import { useGastosStore } from "../stores/gastos.js";
import { useCategoriaStore } from "../stores/categorias.js";
import { gastosService } from "../Services/gastosService.js";
import Barra from "../components/NavBar.vue";
import { tokenService } from "../Services/tokenService.js"

export default {
  
  created() {
    tokenService.validarUsuarioRecarga(this, this.loadData)
  },

  setup() {
    const { usuario } = useUserStore();
    const storeCategoria = useCategoriaStore();
    const gastosStore = useGastosStore();
    return {
      usuario, storeCategoria, gastosStore
    };
  },

  data() {
    return {
      gastos: [],
      categorias: [],
      categoriaSeleccionada: "",
    
    };
  },
  computed: {
    gastosFiltrados() {
      if (this.categoriaSeleccionada === "") {
        return this.gastos;
      } else {
        return this.gastos.filter(
          (gasto) => gasto.idCategoria === this.categoriaSeleccionada
        );
      }
    },
  },
  methods: {

    async loadData() {
      await this.actualizarGastos();
      await this.obtenerCategorias();
    },
    async obtenerCategorias() {
      await this.storeCategoria.obtenerCategorias(this.usuario.email);
      this.categorias = this.storeCategoria.categorias;
    },

    async actualizarGastos() {
      await this.gastosStore.obtenerGastos(this.usuario.email);
      this.gastos = this.gastosStore.gastos;

      this.gastos.forEach((gasto) => {
        const categoria = this.categorias.find(
          (c) => c.id === gasto.idCategoria
        );
        gasto.nombreCategoria = categoria ? categoria.nombre : "";
      });
    },

    editarGasto(gasto) {
      gasto.editando = true;
    },


    async guardarGasto(gasto) {
    
    try {
      await tokenService.validarToken(this.usuario, this.$router)

      const categoria = this.categorias.find(categoria => categoria.id === gasto.idCategoria);
      const presupuesto = categoria.presupuesto

      const mes = gasto.fecha.slice(5, 7);

      const gastosMismaCategoria = this.gastos.filter(gasto => gasto.idCategoria === categoria.id && gasto.fecha.slice(5, 7) === mes);

      let sumaGastos = 0;
      gastosMismaCategoria.forEach(gasto => {
        sumaGastos += gasto.monto;
      });
     

      console.log("la suma con el gasto nuevo incluido: " + sumaGastos);
      console.log("el presupuesto de la categoria base: " +presupuesto);
      

      await gastosService.editarGasto(gasto);
      console.log("Gasto editado correctamente.");
      await this.actualizarGastos();

      if (sumaGastos>presupuesto) {
        alert("El gasto  supera el presupuesto");
      } 

    } catch (error) {
      alert("Error al editar el gasto." + error.response.data);
    }
    gasto.editando = false;

  },









    async eliminarGasto(gasto) {
      try {
        await tokenService.validarToken(this.usuario, this.$router)
        await gastosService.eliminarGasto(gasto);
        await this.actualizarGastos();
        alert("Gasto eliminado correctamente.");
      } catch (error) {
        console.log(error);
        alert("Error al eliminar el gasto." + error.response.data);
      }
    },

    getCategoriaNombre(idCategoria) {
      const categoria = this.categorias.find((c) => c.id === idCategoria);
      return categoria ? categoria.nombre : "";
    },

  },
  components: {
    Barra,
  },


};
</script>

<template>
  <Barra></Barra>
  <div>
    <label for="categoria">Filtrar por categoría:</label>
    <select id="categoria" v-model="categoriaSeleccionada">
      <option value="">Todos</option>
      <option v-for="categoria in categorias" :value="categoria.id">{{ categoria.nombre }}</option>
    </select>

    <table class="table">
      <thead>
        <tr>
          <th>Título</th>
          <th>Monto</th>
          <th>Fecha</th>
          <th>Categoría</th>
          <th>Descripción</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(gasto, index) in gastosFiltrados" :key="index">
          <td>
            <template v-if="!gasto.editando">
              {{ gasto.titulo }}
            </template>
            <template v-else>
              <input v-model="gasto.titulo" type="text">
            </template>
          </td>
          <td>
            <template v-if="!gasto.editando">
              {{ gasto.monto }}
            </template>
            <template v-else>
              <input v-model="gasto.monto" type="number">
            </template>
          </td>
          <td>
            <template v-if="!gasto.editando">
              {{ gasto.fecha }}
            </template>
            <template v-else>
              <input v-model="gasto.fecha" type="text">
            </template>
          </td>
          <td>
            <template v-if="!gasto.editando">
              {{ getCategoriaNombre(gasto.idCategoria) }}
            </template>
            <template v-else>
              <select v-model="gasto.idCategoria">
                <option v-for="categoria in categorias" :value="categoria.id">{{ categoria.nombre }}</option>
              </select>
            </template>
          </td>
          <td>
            <template v-if="!gasto.editando">
              {{ gasto.descripcion }}
            </template>
            <template v-else>
              <input v-model="gasto.descripcion" type="text">
            </template>
          </td>
          <td>
            <template v-if="!gasto.editando">
              <button @click="editarGasto(gasto)" class="btn btn-primary">Editar</button>
            </template>
            <template v-else>
              <button @click="guardarGasto(gasto)" class="btn btn-success">Guardar</button>
            </template>
            <button @click="eliminarGasto(gasto)" class="btn btn-danger">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
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
</style>
