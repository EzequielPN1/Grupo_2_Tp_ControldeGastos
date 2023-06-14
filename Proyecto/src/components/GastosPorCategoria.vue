<template>
  <div class="filtros-grafico-categorias">
    <div>
      <label for="mes">Mes:</label>
      <select id="mes" v-model="mesSeleccionado" @change="actualizarGastos">
        <option v-for="(mes, index) in meses" :key="index" :value="mes">{{ mes }}</option>
      </select>
    </div>
    <div>
      <label for="anio">Año:</label>
      <select id="anio" v-model="anioSeleccionado" @change="actualizarGastos">
        <option v-for="(anio, index) in anios" :key="index" :value="anio">{{ anio }}</option>
      </select>
    </div>
  </div>
  <div>
    <canvas ref="myChart"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js/auto';
import { useUserStore } from "../stores/user";
import { useGastosStore } from "../stores/gastos.js";
import { useCategoriaStore } from "../stores/categorias.js";
import { tokenService } from "../Services/tokenService.js";

export default {
  created() {
    tokenService.validarUsuarioRecarga(this, this.loadData);
  },

  setup() {
    const store = useUserStore();
    const { usuario } = store;

    return {
      usuario,
    };
  },

  data() {
    return {
      meses: [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
      ],
      anios: [2021, 2022, 2023],
      mesSeleccionado: '',
      anioSeleccionado: '',
      chartInstance: null
    };
  },

  watch: {
    mesSeleccionado(value) {
      localStorage.setItem("filtroMesDona", value);
    },
    anioSeleccionado(value) {
      localStorage.setItem("filtroAnioDona", value);
    }
  },

  methods: {
    loadData() {
      this.definirMesAnio();
      this.actualizarGastos();
      this.obtenerCategorias();
    },

    async obtenerCategorias() {
      const store = useCategoriaStore();
      await store.obtenerCategorias(this.usuario.email);
      this.categorias = store.categorias;
    },

    async actualizarGastos() {
      const gastosStore = await useGastosStore();
      await gastosStore.obtenerGastos(this.usuario.email);
      const gastos = gastosStore.gastos;

      const filtroAnio = localStorage.getItem("filtroAnioDona");
      const filtroMes = localStorage.getItem("filtroMesDona");

      const gastosFiltrados = gastos.filter(gasto => {
        let fecha = new Date(gasto.fecha);
        fecha = new Date(fecha.getTime() + fecha.getTimezoneOffset() * 60 * 1000);
        return fecha.getMonth() === this.meses.indexOf(filtroMes) &&
          fecha.getFullYear() === parseInt(filtroAnio);
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
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: false,
              ticks: {
                display: false
              }
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
      const categorias = {};
      gastos.forEach(gasto => {
        const categoria = this.getCategoriaNombre(gasto.idCategoria);
        const monto = gasto.monto;

        if (categorias.hasOwnProperty(categoria)) {
          categorias[categoria] += monto;
        } else {
          categorias[categoria] = monto;
        }
      });

      const labels = Object.keys(categorias);
      const data = Object.values(categorias);

      return { labels, data };
    },

    getCategoriaNombre(idCategoria) {
      const categoria = this.categorias.find((c) => c.id === idCategoria);
      return categoria ? categoria.nombre : "";
    },

    definirMesAnio() {
      const currentDate = new Date();
      const currentMonth = this.meses[currentDate.getMonth()];
      const currentYear = currentDate.getFullYear();

      const filtroAnio = localStorage.getItem("filtroAnioDona");
      const filtroMes = localStorage.getItem("filtroMesDona");

      this.mesSeleccionado = this.mesSeleccionado === '' ? (filtroMes || currentMonth) : this.mesSeleccionado;
      this.anioSeleccionado = this.anioSeleccionado === '' ? (filtroAnio || currentYear) : this.anioSeleccionado;
    }

  }
};
</script>

<style>
.filtros-grafico-categorias {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: .4em auto;
  gap: 1em;
}

.filtros-grafico-categorias select {
  margin-left: .2em;
  height: 2em;
}

.filtros-grafico-categorias label {
  margin-bottom: 0;
}
</style>
