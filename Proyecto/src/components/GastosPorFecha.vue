<script>
import { useUserStore } from "../stores/user";
import { useGastosStore } from "../stores/gastos.js";
import Chart from 'chart.js/auto';
import { tokenService } from "../Services/tokenService.js";

export default {
  mounted() {
    tokenService.validarUsuarioRecarga(this, this.loadData);
  },
  data() {
    return {
      gastos: [],
      anios: [2021, 2022, 2023],
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
      this.definirMesAnio();
      this.actualizarGastos();
    },
    async actualizarGastos() {
      const gastosStore = await useGastosStore();
      await gastosStore.obtenerGastos(this.usuario.email);
      this.gastos = gastosStore.gastos;
      const gastosFiltrados = this.gastos.filter(gasto => {
        const fecha = new Date(gasto.fecha);
        const mes = Number(gasto.fecha.split('-')[1]);
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

      gastos.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

      const gastosAgrupados = gastos.reduce((acc, gasto) => {
        let fecha = new Date(gasto.fecha);
        fecha = new Date(fecha.getTime() + fecha.getTimezoneOffset() * 60 * 1000);

        const dia = fecha.getDate();
        const monto = gasto.monto;

        if (acc[String(dia)]) {
          acc[String(dia)] += monto;
        } else {
          acc[String(dia)] = monto;
        }

        return acc;
      }, {});

      for (const [dia, monto] of Object.entries(gastosAgrupados)) {
        labels.push(dia);
        data.push(monto);
      }

      return { labels, data };
    },

    definirMesAnio() {

      const currentDate = new Date();
      const anioSeleccionado = localStorage.getItem('anioSeleccionadoLineal');
      const mesSeleccionado = localStorage.getItem('mesSeleccionadoLineal');

      if (anioSeleccionado && mesSeleccionado) {
        this.anioSeleccionado = parseInt(anioSeleccionado);
        this.mesSeleccionado = parseInt(mesSeleccionado);
      } else {
        this.anioSeleccionado = currentDate.getFullYear();
        this.mesSeleccionado = currentDate.getMonth()+1;
      }



    },

    async actualizarGastos() {
      const gastosStore = await useGastosStore();
      await gastosStore.obtenerGastos(this.usuario.email);
      this.gastos = gastosStore.gastos;
      const gastosFiltrados = this.gastos.filter(gasto => {
        const fecha = new Date(gasto.fecha);
        const mes = Number(gasto.fecha.split('-')[1]);
        return fecha.getFullYear() === this.anioSeleccionado && mes === this.mesSeleccionado;
      });
      this.mostrarGrafico(gastosFiltrados);
      localStorage.setItem('anioSeleccionadoLineal', this.anioSeleccionado.toString());
      localStorage.setItem('mesSeleccionadoLineal', this.mesSeleccionado.toString());
    },
  },
};
</script>

<template>
  <div class="filtros-grafico-fechas">
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
  </div>
  <div>
    <canvas ref="myChart"></canvas>
  </div>
</template>

<style>
.filtros-grafico-fechas {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: .4em auto;
  gap: 1em;
}

.filtros-grafico-fechas select {
  margin-left: .2em;
  height: 2em;
}

.filtros-grafico-fechas label {
  margin-bottom: 0;
}
</style>
