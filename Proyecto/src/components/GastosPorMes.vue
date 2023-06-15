<script>
import { useUserStore } from "../stores/user";
import { useGastosStore } from "../stores/gastos.js";
import Chart from 'chart.js/auto';
import { tokenService } from "../Services/tokenService.js"
import { useCategoriaStore } from "../stores/categorias.js";

export default {

  created() {
    tokenService.validarUsuarioRecarga(this, this.loadData)
  },

  data() {
    return {
      gastos: [],
      anios: [2021, 2022, 2023],
      anioSeleccionado: '',
      categoriasSelect: [],
      categoriaSeleccionada: '',
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
      this.definirAnio();
      this.actualizarGastos();
      this.obtenerCategorias();
    },
    async obtenerCategorias() {
      const store = useCategoriaStore();
      if (this.usuario.email !== '') {
        await store.obtenerCategorias(this.usuario.email);
        this.categorias = store.categorias;
        if (this.categorias && this.categorias.length > 0) {
          this.categorias.map(cat => this.categoriasSelect.push(cat.nombre));
          const categoriaGuardada = localStorage.getItem('categoriaSeleccionadaColumna');
          if (categoriaGuardada) {
            this.categoriaSeleccionada = categoriaGuardada;
          } else {
            this.categoriaSeleccionada = this.categorias[0].nombre;
          }
        }
      }

      return store.categorias;
    },
    async obtenerNombreCategoria(id) {
      const store = useCategoriaStore();
      await store.obtenerCategorias(this.usuario.email);
      this.categorias = store.categorias;
      return store.categorias.find(e => e.id == id).nombre
    },
    async actualizarGastos() {

      const gastosStore = useGastosStore();
      await gastosStore.obtenerGastos(this.usuario.email);
      const gastos = gastosStore.gastos;
      const store = useCategoriaStore();
      await store.obtenerCategorias(this.usuario.email);
      const categorias = store.categorias;



      const gastosFiltrados = gastos.filter(gasto => {
        const anio = Number(gasto.fecha.split('-')[0]);
        const nombreCat = categorias.find(e => e.id == gasto.idCategoria).nombre
        return anio === this.anioSeleccionado && nombreCat == this.categoriaSeleccionada;
      });

      this.mostrarGrafico(gastosFiltrados);

      localStorage.setItem('anioSeleccionadoColumna', this.anioSeleccionado.toString());
      localStorage.setItem('categoriaSeleccionadaColumna', this.categoriaSeleccionada);

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
            borderWidth: 1,
            backgroundColor: context => {
              let valor = context.dataset.data[context.dataIndex];
              let presupuesto;

              if (valor !== undefined) {
                const categoriaSeleccionada = this.categorias.find(cat => cat.nombre === this.categoriaSeleccionada);
                if (categoriaSeleccionada && categoriaSeleccionada.presupuesto !== undefined) {
                  presupuesto = categoriaSeleccionada.presupuesto;
                }
              }


              if (valor > presupuesto) {
                return 'rgba(255, 99, 132, 0.2)';
              } else {
                return 'rgba(54, 162, 235, 0.2)';
              }
            },
            borderColor: context => {
              let valor = context.dataset.data[context.dataIndex];
              let presupuesto;

              if (valor !== undefined) {
                const categoriaEncontrada = this.categorias.find(cat => cat.nombre === this.categoriaSeleccionada);
                if (categoriaEncontrada && categoriaEncontrada.presupuesto !== undefined) {
                  presupuesto = categoriaEncontrada.presupuesto;
                } else {
                  presupuesto = null;
                }
              }

              if (valor > presupuesto) {
                return 'rgb(255, 99, 132)';
              } else {
                return 'rgb(54, 162, 235)';
              }
            }
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
        let fecha = new Date(gasto.fecha);
        fecha = new Date(fecha.getTime() + fecha.getTimezoneOffset() * 60 * 1000);
        const mes = this.meses[fecha.getMonth()];

        const monto = gasto.monto;
        acumulados[mes] += monto;
      });

      const labels = Object.keys(acumulados);
      const data = Object.values(acumulados);

      return { labels, data };
    },



    definirAnio() {
      const anioGuardado = localStorage.getItem('anioSeleccionadoColumna');

      if (anioGuardado) {
        this.anioSeleccionado = parseInt(anioGuardado);
      } else {
        const anioActual = new Date();
        this.anioSeleccionado = anioActual.getFullYear();
      }
    }
  }
};
</script>

<template>
  <div class="filtros-grafico-meses">
    <div>
      <label for="categoria">Categoria:</label>
      <select id="categoria" v-model="categoriaSeleccionada" @change="actualizarGastos">
        <option v-for="categoria in categoriasSelect" :key="categoria" :value="categoria">{{ categoria }}</option>
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

<style>
.filtros-grafico-meses {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: .4em auto;
  gap: 1em;
}

.filtros-grafico-meses select {
  margin-left: .2em;
  height: 2em;
}

.filtros-grafico-meses label {
  margin-bottom: 0;
}
</style>