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
  <div>
    <Barra></Barra>
    <div class="component-container">
      <GastosPorCategoria></GastosPorCategoria>
      <GastosPorMes></GastosPorMes>
      <GastosPorFecha></GastosPorFecha>
    </div>
  </div>
</template>

<style>
.component-container {
  display: flex;
  flex-direction: column;
}
</style>








