<script>
import { useUserStore } from "../stores/user";
import { useGastosStore } from "../stores/gastos.js";
import Chart from 'chart.js/auto';
import { tokenService } from "../Services/tokenService.js"

export default {
  created() {
    tokenService.validarUsuarioRecarga(this, this.loadData)
  },
  data() {
    return {
      gastos: [],
      anios: [2020, 2021, 2022, 2023], // Actualiza los años según tus necesidades
      anioSeleccionado: '',
      meses: [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
      ],
      mesSeleccionado: new Date().getMonth() + 1,
      chartInstance: null,
      timerId: null
    };
  },
  setup() {
    const store = useUserStore();
    const { usuario } = store;
    return {
      usuario,
    };
  },
  methods: {
    loadData() {
      this.setDefaultYear();
      this.actualizarGastos();
    },
    async actualizarGastos() {
      const gastosStore = await useGastosStore();
      await gastosStore.obtenerGastos(this.usuario.email);
      this.gastos = gastosStore.gastos;
      const gastosFiltrados = this.gastos.filter(gasto => {
        const fecha = new Date(gasto.fecha);
        const mes = fecha.getMonth() + 1;
        return fecha.getFullYear() === this.anioSeleccionado && mes === this.mesSeleccionado;
      });
      this.mostrarGrafico(gastosFiltrados);
    },
    mostrarGrafico(gastos) {
      const ctx = this.$refs.myChart.getContext('2d');
      if (this.chartInstance) {
        this.chartInstance.destroy();
      }

      const { labels, data } = this.procesarDatosGastos(gastos);

      const config = {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: 'Gastos por fecha',
            data: data,
            borderWidth: 1,
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

    procesarDatosGastos(gastos) {
      const labels = [];
      const data = [];

      gastos.forEach(gasto => {
        const fecha = new Date(gasto.fecha);
        const mes = fecha.getMonth() + 1;
        const anio = fecha.getFullYear();
        const fechaLabel = `${mes}/${anio}`;
        const monto = gasto.monto;

        labels.push(fechaLabel);
        data.push(monto);
      });

      return { labels, data };
    },
    setDefaultYear() {
      const currentDate = new Date();
      this.anioSeleccionado = currentDate.getFullYear();
    },


  }
};
</script>


<template>
  <div>
    <div>
      <label for="anio">Año:</label>
      <select id="anio" v-model="anioSeleccionado" @change="actualizarGastos">
        <option v-for="(anio, index) in anios" :key="index" :value="anio">{{ anio }}</option>
      </select>
    </div>
    <div>
      <label for="mes">Mes:</label>
      <select id="mes" v-model="mesSeleccionado" @change="actualizarGastos">
        <option v-for="(mes, index) in meses" :key="index" :value="index + 1">{{ mes }}</option>
      </select>
    </div>
    <div>
      <canvas ref="myChart"></canvas>
    </div>
  </div>
</template>
