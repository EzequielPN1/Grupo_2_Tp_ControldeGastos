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
  emits: ['modificarMes', 'modificarAnio'],
  data() {
    return {
      meses: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
      anioSeleccionado: 2023,
      mesSeleccionado: 'Enero'
    };
  },
  methods: {
    modificarMes() {
      const numeroMes = this.meses.indexOf(this.mesSeleccionado) + 1
      this.$refs.modificarAnioMesCat.modificarAnioMes(this.anioSeleccionado, numeroMes)
    },
    modificarAnio() {
      this.$refs.modificarAnioMesCat.modificarAnioMes(this.anioSeleccionado, this.mesSeleccionado)
    }
  }
};
</script>

<template>
  <div>
    <Barra></Barra>
    <div class="component-container">
      <div class="select-anio-mes">
        <select name="meses" @change="modificarMes" v-model="mesSeleccionado">
          <option v-for="mes in meses" :key="mes">
            {{ mes }}
          </option>
        </select>
        <input type="number" min="1900" max="2023" placeholder="Año" @change="modificarAnio" v-model="anioSeleccionado">
      </div>
      <GastosPorCategoria ref="modificarAnioMesCat"></GastosPorCategoria>
      <GastosPorMes></GastosPorMes>
      <GastosPorFecha></GastosPorFecha>
    </div>
  </div>
</template>

<style>
  .component-container {
    display: flex;
    flex-direction: column;
    gap: .5em;
  }

  .select-anio-mes {
    margin: 1em auto 0 auto;
    display: flex;
    gap: 1em;
  }
</style>