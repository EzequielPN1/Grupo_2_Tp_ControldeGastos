<script>
  import Barra from "../components/NavBar.vue"
  import GastosPorCategoria from "../components/GastosPorCategoria.vue"
  import GastosPorMes from "../components/GastosPorMes.vue";
  import GastosPorFecha from "../components/GastosPorFecha.vue"

  export default {
    components: {
      Barra,
      GastosPorCategoria,
      GastosPorMes,
      GastosPorFecha,
    },
  };
</script>

<template>
  <Barra></Barra>
  <div class="component-container">
    <GastosPorCategoria></GastosPorCategoria>
    <div class="grafico-por-mes">      
      <GastosPorMes></GastosPorMes>
    </div>
    <GastosPorFecha></GastosPorFecha>
  </div>
</template>

<style>

  .component-container {
    display: flex;
    flex-direction: column;
  }

  .grafico-por-mes {
    border-top: .2em solid rgba(161, 161, 161, 0.155);
    border-bottom: .2em solid rgba(161, 161, 161, 0.155);
    padding: .8em 0;
    margin: 1em 0;
  }

</style>
