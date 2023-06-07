
<script>
import Chart from 'chart.js/auto';
import { useUserStore } from "../stores/user";
import { useGastosStore } from "../stores/gastos.js";
import { useCategoriaStore } from "../stores/categorias.js";
import { userService } from "../Services/userService.js"

export default {

  created() {
  if (this.usuario.nombre === '') {
    const token = localStorage.getItem('token');
    if (token) {
      userService.devolverUsuarioValidado(token)
        .then(response => {
          if (response.data) {
            this.usuario = response.data;
            this.loadData()
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }else{
    this.loadData()
  }
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
      anios: [2020, 2021, 2022, 2023], // Actualiza los años según tus necesidades
      mesSeleccionado: '',
      anioSeleccionado: '',
      chartInstance: null
    };
  },

  methods: {
    loadData() {
      this.setDefaultMonthAndYear();
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

      const gastosFiltrados = gastos.filter(gasto => {
        const fecha = new Date(gasto.fecha);
        return fecha.getMonth() === this.meses.indexOf(this.mesSeleccionado) &&
          fecha.getFullYear() === this.anioSeleccionado;
      });

      this.mostrarGrafico(gastosFiltrados);
    },

    mostrarGrafico(gastos) {
      const ctx = this.$refs.myChart.getContext('2d');

      // Eliminar el gráfico existente si lo hay
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

      // Crear un nuevo gráfico con el canvas ajustado al tamaño de los datos
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

    setDefaultMonthAndYear() {
      const currentDate = new Date();
      const currentMonth = this.meses[currentDate.getMonth()];
      const currentYear = currentDate.getFullYear();

      this.mesSeleccionado = currentMonth;
      this.anioSeleccionado = currentYear;
    },


  }
};
</script>


<template>
  <div>
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
    <div>
      <canvas ref="myChart"></canvas>
    </div>
  </div>
</template>
