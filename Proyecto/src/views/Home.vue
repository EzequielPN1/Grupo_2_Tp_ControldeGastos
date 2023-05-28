<template>
  <div>
    <Barra></Barra>

    <div>
      <select v-model="tipoGrafico" @change="mostrarGrafico">
        <option value="barra">Gráfico de barras</option>
        <option value="columna">Gráfico de columnas</option>
        <option value="rosquilla">Gráfico de rosquilla</option>
        <option value="lineal">Gráfico lineal</option>
        <option value="radar">Gráfico radar</option>
      </select>
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
      gastos: [],
      tipoGrafico: 'barra'
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
      const chartInstance = Chart.getChart(ctx); // Obtener la instancia del gráfico existente

      if (chartInstance) {
        chartInstance.destroy(); // Destruir el gráfico existente si existe
      }
      const labels = [];
      const data = [];

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
      fechasOrdenadas.forEach(fecha => {
        labels.push(fecha);
        data.push(acumulados[fecha]);
      });

      let config = null;

      if (this.tipoGrafico === 'barra' || this.tipoGrafico === 'columna') {
        config = {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [{
              label: 'Monto acumulado',
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
        };
      } else if (this.tipoGrafico === 'rosquilla') {
        config = {
          type: 'doughnut',
          data: {
            labels: labels,
            datasets: [{
              label: 'Monto acumulado',
              data: data,
              backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
              ],
              hoverOffset: 4
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        };
      } else if (this.tipoGrafico === 'lineal') {
        const chartData = {
          labels: labels,
          datasets: [{
            label: 'Monto acumulado',
            data: data,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          }]
        };

        config = {
          type: 'line',
          data: chartData,
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        };
      } else if (this.tipoGrafico === 'radar') {
        config = {
          type: 'radar',
          data: {
            labels: labels,
            datasets: [{
              label: 'Gastos por fecha',
              data: data,
              fill: true,
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgb(255, 99, 132)',
              pointBackgroundColor: 'rgb(255, 99, 132)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgb(255, 99, 132)'
            }]
          },
          options: {
            elements: {
              line: {
                borderWidth: 3
              }
            }
          }
        };
      }

      new Chart(ctx, config);


    }
  }
};
</script>
