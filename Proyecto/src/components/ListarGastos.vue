
<script>
import { useUserStore } from "../stores/user";
import { useGastosStore } from "../stores/gastos.js";
import Barra from "../views/Barra.vue"
export default {
  async mounted() {
    const userStore = useUserStore();
    const { usuario } = userStore;


    const gastosStore = await useGastosStore();
    await gastosStore.obtenerGastos(usuario.email);
    this.gastos = gastosStore.gastos;
  },
  data() {
    return {
      gastos: [],
      tipos: ["Comida", "Social", "Vivienda","Remedios"],
      categoriaSeleccionada: "",
    };
  },
  computed: {
    gastosFiltrados() {
      if (this.categoriaSeleccionada === "") {
        return this.gastos; // Mostrar todos los gastos si no hay categoría seleccionada
      } else {
        return this.gastos.filter(gasto => gasto.categoria === this.categoriaSeleccionada);
      }
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
    <option v-for="categoria in tipos" :value="categoria">{{ categoria }}</option>
  </select>

  <table class="table">
    <thead>
      <tr>
        <th>Título</th>
        <th>Monto</th>
        <th>Fecha</th>
        <th>Categoría</th>
        <th>Descripción</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(gasto, index) in gastosFiltrados" :key="index">
        <td>{{ gasto.titulo }}</td>
        <td>{{ gasto.monto }}</td>
        <td>{{ gasto.fecha }}</td>
        <td>{{ gasto.categoria }}</td>
        <td>{{ gasto.descripcion }}</td>
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

.table th, .table td {
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