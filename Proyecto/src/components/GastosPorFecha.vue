<template>
  <div>
    <canvas ref="myChart" width="400" height="300"></canvas>
  </div>
</template>

<script>
import { useUserStore } from "../stores/user";
import { useGastosStore } from "../stores/gastos.js";
import Chart from 'chart.js/auto';

export default {
  mounted() {
    this.actualizarGastos();
  },
  data() {
    return {
      gastos: [],
    };
  },
  methods: {
    async actualizarGastos() {
      const userStore = useUserStore();
      const { usuario } = userStore;

      const gastosStore = await useGastosStore();
      await gastosStore.obtenerGastos(usuario.email);
      this.gastos = gastosStore.gastos;

      this.mostrarGrafico();
    },

    mostrarGrafico() {
      const ctx = this.$refs.myChart.getContext('2d');
      const chartInstance = this.$data._chart; // Obtener la instancia del gráfico existente

      if (chartInstance) {
        // Actualizar los datos del gráfico existente
        const { labels, data } = this.procesarDatosGastos();
        chartInstance.data.labels = labels;
        chartInstance.data.datasets[0].data = data;
        chartInstance.update();
      } else {
        // Crear un nuevo gráfico si no existe
        const { labels, data } = this.procesarDatosGastos();
        const config = {
          type: 'line',
          data: {
            labels: labels,
            datasets: [{
              label: 'Monto acumulado',
              data: data,
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true
              }
            },
            plugins: {
              legend: {
                position: 'bottom'
              }
            },
            layout: {
              padding: {
                top: 10,
                bottom: 10,
                left: 10,
                right: 10
              }
            }
          }
        };
        new Chart(ctx, config);
      }
    },

    procesarDatosGastos() {
      const acumulados = {};
      this.gastos.forEach(gasto => {
        const fecha = gasto.fecha;
        const monto = gasto.monto;

        if (acumulados.hasOwnProperty(fecha)) {
          acumulados[fecha] += monto;
        } else {
          acumulados[fecha] = monto;
        }
      });

      const fechasOrdenadas = Object.keys(acumulados).sort();
      const labels = fechasOrdenadas;
      const data = fechasOrdenadas.map(fecha => acumulados[fecha]);

      return { labels, data };
    }
  }
};
</script>

  
