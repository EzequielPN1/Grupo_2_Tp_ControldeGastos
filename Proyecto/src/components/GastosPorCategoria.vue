<template>
  <div>
    <canvas ref="myChart" width="400" height="300"></canvas>
  </div>
</template>
  
<script>
  import { useUserStore } from "../stores/user";
  import { useGastosStore } from "../stores/gastos.js";
  import { useCategoriaStore } from "../stores/categorias.js";
  import Chart from 'chart.js/auto';
  
  export default {
    data() {
      return {
        gastos: [],
        anioSeleccionado: 2023,
        mesSeleccionado: 1,
        chartInstance: null
      }
    },
    mounted() {
      this.actualizarGastos();
      this.obtenerCategorias();
    },
    methods: {
      async obtenerCategorias() {
        const userStore = useUserStore();
        const { usuario } = userStore;
        const store = useCategoriaStore();
        await store.obtenerCategorias(usuario.email);
        this.categorias = store.categorias;
      },
      async actualizarGastos() {
        const userStore = useUserStore();
        const { usuario } = userStore;
  
        const gastosStore = useGastosStore();
        await gastosStore.obtenerGastos(usuario.email);
        const gastos = gastosStore.gastos;
        const gastosSegunAnio = gastos.filter(gasto => parseInt(gasto.fecha.substring(0, gasto.fecha.indexOf('-'))) === this.anioSeleccionado)
        const gastonsSegunMes = gastosSegunAnio.filter(gasto => parseInt(gasto.fecha.split('-')[1]) == this.mesSeleccionado)  
        this.gastos = gastonsSegunMes
        this.mostrarGrafico();
      },
  
      mostrarGrafico() {
        const ctx = this.$refs.myChart.getContext('2d');
        
        if (this.chartInstance) {
          // Destruir el gráfico existente antes de reutilizar el lienzo
          this.chartInstance.destroy();
        }

          const { labels, data } = this.procesarDatosGastos(this.gastos);
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
      modificarAnioMes(anio, mes) {
        this.mesSeleccionado = mes
        this.anioSeleccionado = anio
        this.actualizarGastos()
      },
      getCategoriaNombre(idCategoria) {
        const categoria = this.categorias.find((c) => c.id === idCategoria);
        return categoria ? categoria.nombre : "";
      }
    }
  };
  </script>
  