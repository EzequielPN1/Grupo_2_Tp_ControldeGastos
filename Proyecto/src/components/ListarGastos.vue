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
      filtroAnio: "",
      filtroMes: "",
      filtroDia: "",
      orden: "desc",
    };
  },
  computed: {
    gastosFiltrados() {
      let gastos = this.gastos;

      if (this.categoriaSeleccionada !== "") {
        gastos = gastos.filter(
          (gasto) => gasto.idCategoria === this.categoriaSeleccionada
        );
      }

      if (this.filtroAnio !== "") {
        gastos = gastos.filter(
          (gasto) => gasto.fecha.slice(0, 4) === this.filtroAnio
        );
      }

      if (this.filtroMes !== "") {
        gastos = gastos.filter(
          (gasto) => gasto.fecha.slice(5, 7) === this.filtroMes
        );
      }

      if (this.filtroDia !== "") {
        gastos = gastos.filter(
          (gasto) => gasto.fecha.slice(8, 10) === this.filtroDia
        );
      }

      if (this.orden === "asc") {
        gastos = gastos.sort((a, b) => a.fechaNumerica - b.fechaNumerica);
      }
      if (this.orden === "desc") {
        gastos = gastos.sort((a, b) => b.fechaNumerica - a.fechaNumerica);
      }

      return gastos;
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
        const categoria = this.categorias.find((c) => c.id === gasto.idCategoria);
        gasto.fechaNumerica = new Date(gasto.fecha).getTime();
        gasto.editando = false;
        gasto.categoria = categoria;
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

        console.log("el presupuesto de la categoria base: " + presupuesto);
        console.log("la suma con el gasto nuevo incluido: " + sumaGastos);

        await gastosService.editarGasto(gasto);
        console.log
        await this.actualizarGastos();

        if (sumaGastos > presupuesto) {
          alert("Gasto editado correctamente, se supero el presupuesto mensual de la categoria");
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

    <label for="anio">Filtrar por año:</label>
    <select id="anio" v-model="filtroAnio">
      <option value="">Todos</option>
      <option value="2020">2020</option>
      <option value="2021">2021</option>
      <option value="2022">2022</option>
      <option value="2023">2023</option>
    </select>

    <label for="mes">Filtrar por mes:</label>
    <select id="mes" v-model="filtroMes">
      <option value="">Todos</option>
      <option value="01">Enero</option>
      <option value="02">Febrero</option>
      <option value="03">Marzo</option>
      <option value="04">Abril</option>
      <option value="05">Mayo</option>
      <option value="06">Junio</option>
      <option value="07">Julio</option>
      <option value="08">Agosto</option>
      <option value="09">Septiembre</option>
      <option value="10">Octubre</option>
      <option value="11">Noviembre</option>
      <option value="12">Diciembre</option>
    </select>

    <label for="dia">Filtrar por día:</label>
    <select id="dia" v-model="filtroDia">
      <option value="">Todos</option>
      <option value="01">1</option>
      <option value="02">2</option>
      <option value="03">3</option>
      <option value="04">4</option>
      <option value="05">5</option>
      <option value="06">6</option>
      <option value="07">7</option>
      <option value="08">8</option>
      <option value="09">9</option>
      <option value="10">10</option>
      <option value="11">11</option>
      <option value="12">12</option>
      <option value="13">13</option>
      <option value="14">14</option>
      <option value="15">15</option>
      <option value="16">16</option>
      <option value="17">17</option>
      <option value="18">18</option>
      <option value="19">19</option>
      <option value="20">20</option>
      <option value="21">21</option>
      <option value="22">22</option>
      <option value="23">23</option>
      <option value="24">24</option>
      <option value="25">25</option>
      <option value="26">26</option>
      <option value="27">27</option>
      <option value="28">28</option>
      <option value="29">29</option>
      <option value="30">30</option>
      <option value="31">31</option>
    </select>

    <label for="orden">Ordenar por fecha:</label>
    <select id="orden" v-model="orden">
      <option value="asc">Menor a mayor</option>
      <option value="desc">Mayor a menor</option>
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
