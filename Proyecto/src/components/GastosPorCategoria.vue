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
    methods: {
      async actualizarGastos() {
        const userStore = useUserStore();
        const { usuario } = userStore;
  
        const gastosStore = await useGastosStore();
        await gastosStore.obtenerGastos(usuario.email);
        const gastos = gastosStore.gastos;
  
        this.mostrarGrafico(gastos);
      },
  
      mostrarGrafico(gastos) {
        const ctx = this.$refs.myChart.getContext('2d');
        const chartInstance = this.$data._chart; // Obtener la instancia del gráfico existente
  
        if (chartInstance) {
          // Actualizar los datos del gráfico existente
          const { labels, data } = this.procesarDatosGastos(gastos);
          chartInstance.data.labels = labels;
          chartInstance.data.datasets[0].data = data;
          chartInstance.update();
        } else {
          // Crear un nuevo gráfico si no existe
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
  
          new Chart(ctx, config);
        }
      },
  
      procesarDatosGastos(gastos) {
        const categorias = {};
        gastos.forEach(gasto => {
          const categoria = gasto.categoria;
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
      }
    }
  };
  </script>
  