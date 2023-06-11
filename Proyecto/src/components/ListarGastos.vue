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
      anios: Array.from({ length: 5 }, (_, i) => (2019 + i).toString()),
      meses: [
        { value: "01", label: "Enero" },
        { value: "02", label: "Febrero" },
        { value: "03", label: "Marzo" },
        { value: "04", label: "Abril" },
        { value: "05", label: "Mayo" },
        { value: "06", label: "Junio" },
        { value: "07", label: "Julio" },
        { value: "08", label: "Agosto" },
        { value: "09", label: "Septiembre" },
        { value: "10", label: "Octubre" },
        { value: "11", label: "Noviembre" },
        { value: "12", label: "Diciembre" }
      ],
      diasMes: Array.from({ length: 31 }, (_, i) => (i + 1).toString().padStart(2, "0"))

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
      } else if (this.orden === "desc") {
        gastos = gastos.sort((a, b) => b.fechaNumerica - a.fechaNumerica);
      } else if (this.orden === "monto_asc") {
        gastos = gastos.sort((a, b) => a.monto - b.monto);
      } else if (this.orden === "monto_desc") {
        gastos = gastos.sort((a, b) => b.monto - a.monto);
      } else if (this.orden === "alfabetico asc") {
        gastos = gastos.sort((a, b) => a.titulo.localeCompare(b.titulo));
      } else if (this.orden === "alfabetico desc") {
        gastos = gastos.sort((a, b) => b.titulo.localeCompare(a.titulo));
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
    <label for="categoria">Categoría</label>
    <select id="categoria" v-model="categoriaSeleccionada">
      <option value="">Todos</option>
      <option v-for="categoria in categorias" :value="categoria.id">{{ categoria.nombre }}</option>
    </select>

    <label for="anio">Año</label>
    <select id="anio" v-model="filtroAnio">
      <option value="">Todos</option>
      <option v-for="anio in anios" :value="anio">{{ anio }}</option>
    </select>

    <label for="mes">Mes</label>
    <select id="mes" v-model="filtroMes">
      <option value="">Todos</option>
      <option v-for="mes in meses" :value="mes.value">{{ mes.label }}</option>
    </select>

    <label for="dia">día</label>
    <select id="dia" v-model="filtroDia">
      <option value="">Todos</option>
      <option v-for="dia in diasMes" :value="dia">{{ dia }}</option>
    </select>

    <label for="orden">Ordenar :</label>
    <select id="orden" v-model="orden">
      <option value="asc">Fecha ascendente</option>
      <option value="desc">Fecha descendente</option>
      <option value="monto_asc">Monto ascendente</option>
      <option value="monto_desc">Monto descendente</option>
      <option value="alfabetico asc">Alfabéticamente asc</option>
      <option value="alfabetico desc">Alfabéticamente desc</option>
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
