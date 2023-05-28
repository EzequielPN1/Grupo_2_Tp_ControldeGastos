<template>
  <div>
    <Barra></Barra>

    <div>
      <canvas id="myChart"></canvas>
    </div>
  </div>
</template>

<script>

import Barra from "../views/Barra.vue";
import { useUserStore } from "../stores/user";
import { useGastosStore } from "../stores/gastos.js";
import Chart from 'chart.js/auto';

export default {
  components: {
    Barra
  },
  async mounted() {
    await this.actualizarGastos();
    this.mostrarGrafico();

  },
  data() {
    return {
      gastos: []
    }
  },
  methods: {
    async actualizarGastos() {
      const userStore = useUserStore();
      const { usuario } = userStore;

      const gastosStore = await useGastosStore();
      await gastosStore.obtenerGastos(usuario.email);
      this.gastos = gastosStore.gastos;
    },
    mostrarGrafico() {
  const ctx = document.getElementById('myChart');

  // Obtener las fechas y montos de this.gastos
  const labels = this.gastos.map(gasto => gasto.fecha);
  const data = this.gastos.map(gasto => gasto.monto);

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: '# of Votes',
        data: data,
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}


  }
};
</script>
