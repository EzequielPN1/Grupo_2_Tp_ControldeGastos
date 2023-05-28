<template>
    <Bar :data="data" :options="options" ref="chartCanvas" />
</template>
  
<script lang="ts">
    import {
            Chart as ChartJS,
            Title,
            Tooltip,
            Legend,
            BarElement,
            CategoryScale,
            LinearScale
        } from "chart.js"
    import { Bar } from 'vue-chartjs'
    import { storeToRefs } from "pinia";
    import { useUserStore } from "../stores/user";
    import { gastosService } from "../Services/gastosService.js"
    
    ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)
    
    export default {
        name: 'App',
        components: {
            Bar
        },
        data() {
            return {
                data: {
                    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                    datasets: [{ 
                        data: [0,0,0,0,0,0,0,0,0,0,0,0],
                        label: 'Gasto mensual',
                        backgroundColor: [
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(54, 162, 235, 0.2)']
                    }],
                },
                options: {
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Gastos por mes',
                            fontSize: 30
                        }
                    }
                }
            }
        },
        setup() {
            const store = useUserStore();
            const { usuario } = storeToRefs(store);

            return {
                usuario,
            }
        },
        async mounted(){
            try {
                const response = await gastosService.listar("ezequiel@hotmail.com")
                console.log(this.usuario);
                
                const newData = response.data.map((gasto) => gasto)
                newData.map(gasto => {
                    const id = gasto.fecha.split('/').shift()
                    this.data.datasets[0].data[id-1] += gasto.monto
                })
                this.$refs.chartCanvas.chart.update()     
            } catch (error) {
                console.log(error)
                alert(error.response.data)
            }
        }
    }
</script>

<style>
</style>