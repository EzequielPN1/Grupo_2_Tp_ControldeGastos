<template>
    <Doughnut :data="data" :options="options" ref="chartCanvas" />
</template>
  
<script lang="ts">
    import {    
            Chart, 
            ArcElement, 
            CategoryScale, 
            LinearScale, 
            Title, 
            Tooltip, 
            Legend 
        } from 'chart.js';
    import { Doughnut } from 'vue-chartjs'
    // import { storeToRefs } from "pinia";
    // import { useUserStore } from "../stores/user";
    // import { gastosService } from "../Services/gastosService.js"
    
    Chart.register(ArcElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

    export default {
        name: 'App',
        components: {
            Doughnut
        },
        data() {
            return {
                data: {
                    labels: [
                        'Farmacia',
                        'Salidas',
                        'Alquiler',
                        'Supermercado'
                    ],
                    datasets: [{
                        label: 'Gasto por categoria',
                        data: [300, 50, 100, 200],
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
                    plugins: {
                        title: {
                            display: true,
                            text: 'Gastos por categoria'
                        }
                    }
                }
            }
        },
        // setup() {
        //     const store = useUserStore();
        //     const { usuario } = storeToRefs(store);

        //     return {
        //         usuario,
        //     }
        // },
        // async mounted(){
            
        // }
    }
</script>

<style></style>