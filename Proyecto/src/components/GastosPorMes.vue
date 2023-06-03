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
      tipoGrafico: 'barra',
      meses: [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
      ],
      anioSeleccionado: 2023,
      chartInstance: null
    };
  },
  methods: {
    async actualizarGastos() {
      const userStore = useUserStore();
      const { usuario } = userStore;

      const gastosStore = useGastosStore();
      await gastosStore.obtenerGastos(usuario.email);
      const gastos = gastosStore.gastos;
      const gastosSegunAnio = gastos.filter(gasto => parseInt(gasto.fecha.substring(0, gasto.fecha.indexOf('-'))) === this.anioSeleccionado)
      this.gastos = gastosSegunAnio
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

      // Inicializar acumulados con valores en cero para todos los meses
      this.meses.forEach(mes => {
        acumulados[mes] = 0;
      });

      this.gastos.forEach(gasto => {
        const fecha = new Date(gasto.fecha);
        const mes = this.meses[fecha.getMonth()]; // Obtener el nombre del mes

        const monto = gasto.monto;
        acumulados[mes] += monto;
      });

      const labels = Object.keys(acumulados);
      const data = Object.values(acumulados);

      return { labels, data };
    },
    modificarAnio(anio) {
      this.anioSeleccionado = anio
      this.actualizarGastos()
    }
  }
};
</script>

  

  