<template>
    <div class="primer-fila">
        <GastosPorCategoria />
        <GastosPorMes />
    </div>
</template>
  
<script>

    import GastosPorMes from '../components/gastosPorMes.vue'
    import GastosPorCategoria from '../components/GastosPorCategoria.vue'
    export default {
        components: {
            GastosPorMes,
            GastosPorCategoria
        }
    }

</script>

<style>
    .primer-fila{
        display: flex;
        justify-content: center;
        align-items: center;
        max-width: 90vw;
        height: 25em;
        gap: 5em;
    }


</style>