

<script>
import { useUserStore } from "../stores/user";
import { useGastosStore } from "../stores/gastos.js";
import Chart from 'chart.js/auto';
import { userService } from "../Services/userService.js"

export default {

  created() {
    this.validarUsuario();
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
        return fecha.getFullYear() === this.anioSeleccionado;
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

    procesarDatosGastos(gastos) {
      const acumulados = {};


      this.meses.forEach(mes => {
        acumulados[mes] = 0;
      });

      gastos.forEach(gasto => {
        const fecha = new Date(gasto.fecha);
        const mes = this.meses[fecha.getMonth()];

        const monto = gasto.monto;
        acumulados[mes] += monto;
      });

      const labels = Object.keys(acumulados);
      const data = Object.values(acumulados);

      return { labels, data };
    },

    setDefaultYear() {
      const currentDate = new Date();
      this.anioSeleccionado = currentDate.getFullYear();
    },


    async validarUsuario() {
      const token = localStorage.getItem('token');
      try {
        const response = await userService.devolverUsuarioValidado(token);
        if (response.data) {
          this.usuario = response.data;
          this.loadData();
        }
      } catch (error) {
        
      }
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
      <canvas ref="myChart"></canvas>
    </div>
  </div>
</template>
