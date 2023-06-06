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
      anioSeleccionado: 2023,
      mesSeleccionado: 1,
      chartInstance: null
    };
  },
  methods: {
    async actualizarGastos() {
      const userStore = useUserStore();
      const { usuario } = userStore;

      const gastosStore = await useGastosStore();
      await gastosStore.obtenerGastos(usuario.email);
      const gastos = gastosStore.gastos;
      const gastosSegunAnio = gastos.filter(gasto => parseInt(gasto.fecha.substring(0, gasto.fecha.indexOf('-'))) === this.anioSeleccionado)
      const gastonsSegunMes = gastosSegunAnio.filter(gasto => parseInt(gasto.fecha.split('-')[1]) == this.mesSeleccionado)
      this.gastos = gastonsSegunMes
      this.mostrarGrafico();
    },

    mostrarGrafico() {
      const ctx = this.$refs.myChart?.getContext('2d');
      
      if (this.chartInstance) {
        // Destruir el gráfico existente antes de reutilizar el lienzo
        this.chartInstance.destroy();
      }

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
      this.chartInstance = new Chart(ctx, config);
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
    },
    modificarAnioMes(anio, mes) {
      this.mesSeleccionado = mes
      this.anioSeleccionado = anio
      this.actualizarGastos()
    }
  }
};
</script>

  
