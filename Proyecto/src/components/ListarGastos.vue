<script>
import { useUserStore } from "../stores/user";
import { useGastosStore } from "../stores/gastos.js";
import { useCategoriaStore } from "../stores/categorias.js";
import { gastosService } from "../Services/gastosService.js";
import Barra from "../components/NavBar.vue";
import { tokenService } from "../Services/tokenService.js"

export default {

  mounted() {
    tokenService.validarUsuarioRecarga(this, this.loadData);
  },

  watch: {
    categoriaSeleccionada(value) {
      localStorage.setItem("categoriaSeleccionada", value);
    },
    filtroAnio(value) {
      localStorage.setItem("filtroAnio", value);
    },
    filtroMes(value) {
      localStorage.setItem("filtroMes", value);
    },
    filtroDia(value) {
      localStorage.setItem("filtroDia", value);
    },
    orden(value) {
      localStorage.setItem("orden", value);
    }
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
      anios: ["2021", "2022", "2023"],
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
     
      const categoriaSeleccionada = localStorage.getItem("categoriaSeleccionada");
      const filtroAnio = localStorage.getItem("filtroAnio");
      const filtroMes = localStorage.getItem("filtroMes");
      const filtroDia = localStorage.getItem("filtroDia");
      const orden = localStorage.getItem("orden");

     
      this.categoriaSeleccionada = categoriaSeleccionada || "";
      this.filtroAnio = filtroAnio || "";
      this.filtroMes = filtroMes || "";
      this.filtroDia = filtroDia || "";
      this.orden = orden || "desc";

      if (this.categoriaSeleccionada !== "") {
        gastos = gastos.filter(
          (gasto) => gasto.idCategoria == this.categoriaSeleccionada
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
        await tokenService.validarToken(this.usuario, this.$router);

        const categoria = this.obtenerCategoria(gasto.idCategoria);
        const gastosMismaCategoria = this.obtenerGastosMismaCategoria(categoria, gasto.fecha);
        const sumaGastos = this.calcularSumaGastos(gastosMismaCategoria);

        console.log("el presupuesto de la categoría base: " + categoria.presupuesto);
        console.log("la suma con el gasto nuevo incluido: " + sumaGastos);

        await gastosService.editarGasto(gasto);
        await this.actualizarGastos();

        if (sumaGastos > categoria.presupuesto) {
          alert("Gasto editado correctamente, se superó el presupuesto mensual de la categoría");
        }
      } catch (error) {
        alert(error.response.data);
        this.loadData();
      }
      gasto.editando = false;
    },

    obtenerCategoria(idCategoria) {
      return this.categorias.find(categoria => categoria.id === idCategoria);
    },

    obtenerGastosMismaCategoria(categoria, fecha) {
      const mes = fecha.slice(5, 7);
      const anio = fecha.slice(0, 4);

      return this.gastos.filter(gasto =>
        gasto.idCategoria === categoria.id &&
        gasto.fecha.slice(5, 7) === mes &&
        gasto.fecha.slice(0, 4) === anio
      );
    },

    calcularSumaGastos(gastos) {
      let sumaGastos = 0;
      gastos.forEach(gasto => {
        sumaGastos += gasto.monto;
      });
      return sumaGastos;
    },


    async eliminarGasto(gasto) {
      try {
        await tokenService.validarToken(this.usuario, this.$router)
        await gastosService.eliminarGasto(gasto);
        await this.actualizarGastos();
        alert("Gasto eliminado correctamente.");
      } catch (error) {
        console.log(error);
        alert("Error al eliminar el gasto." + error);
      }
    },

    getCategoriaNombre(idCategoria) {
      const categoria = this.categorias.find((c) => c.id === idCategoria);
      return categoria ? categoria.nombre : "";
    }
  },
  components: {
    Barra,
  }
};
</script>

<template>
  <Barra></Barra>
  <div class="filtros-gastos-container">
    <div class="filtro-gasto">
      <label for="categoria">Categoría:</label>
      <select id="categoria" v-model="categoriaSeleccionada">
        <option value="">Todos</option>
        <option v-for="categoria in categorias" :value="categoria.id">{{ categoria.nombre }}</option>
      </select>
    </div>

    <div class="filtro-gasto">
      <label for="anio">Año:</label>
      <select id="anio" v-model="filtroAnio">
        <option value="">Todos</option>
        <option v-for="anio in anios" :value="anio">{{ anio }}</option>
      </select>
    </div>

    <div class="filtro-gasto">
      <label for="mes">Mes:</label>
      <select id="mes" v-model="filtroMes">
        <option value="">Todos</option>
        <option v-for="mes in meses" :value="mes.value">{{ mes.label }}</option>
      </select>
    </div>

    <div class="filtro-gasto">
      <label for="dia">Día:</label>
      <select id="dia" v-model="filtroDia">
        <option value="">Todos</option>
        <option v-for="dia in diasMes" :value="dia">{{ dia }}</option>
      </select>
    </div>

    <div class="filtro-gasto">
      <label for="orden">Ordenar:</label>
      <select id="orden" v-model="orden">
        <option value="asc">Fecha asc</option>
        <option value="desc">Fecha des</option>
        <option value="monto_asc">Monto asc</option>
        <option value="monto_desc">Monto des</option>
        <option value="alfabetico asc">A-Z</option>
        <option value="alfabetico desc">Z-A</option>
      </select>
    </div>
  </div>

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
            ${{ gasto.monto }}
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
        <td class="botones-edicion-gastos">
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
</template>

<style>
.filtros-gastos-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: .4em auto;
  padding: .3em 0;
}

.filtro-gasto select {
  margin-left: .2em;
  height: 2em;
}

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

.botones-edicion-gastos {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: .8em;
}
</style>
