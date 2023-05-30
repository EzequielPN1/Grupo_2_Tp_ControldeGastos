<script>
import { gastosService } from "../Services/gastosService.js"
import { storeToRefs } from "pinia";
import { useUserStore } from "../stores/user";
import Barra from "../components/NavBar.vue";

export default {
  setup() {

    const store = useUserStore();
    const { usuario } = storeToRefs(store);

    return {
      usuario,
    }
  },
  data() {
    return {
      gasto: {
        email: "",
        titulo: "",
        monto: 0,
        fecha: "",
        categoria: "", // se debe cambiar cuando tengamos tipos guardados por usuario
        descripcion: "",
        tipos: ["Comida", "Social", "Vivienda", "Remedios"],
      },

    }
  },
  methods: {
    async agregarGasto() {
      this.gasto.email = this.usuario.email
      try {
        const response = await gastosService.agregarGasto(this.gasto)
        alert(response.data);
      } catch (error) {
        console.log(error.response.data);
        alert(error.response.data);
      }
      this.$refs.formulario.reset();
    }
  },
  components: {
    Barra,
  },
}


</script>


<template>
  <Barra></Barra>
  <form ref="formulario" class="form" @submit.prevent="agregarGasto()">
    <div class="form-group">
      <label for="title">Titulo</label>
      <input v-model="gasto.titulo" type="text" class="form-control" id="title" required />
    </div>
    <div class="form-group">
      <label for="amount">Monto</label>
      <input v-model="gasto.monto" type="number" class="form-control" id="amount" required />
    </div>
    <label for="date">Fecha</label>
    <input id="date" type="date" v-model="gasto.fecha">
    <label for="category">Categoria</label>
    <select id="category" class="form-select" aria-label="Default select example" v-model="gasto.categoria" required>
      <option v-for="tipo in gasto.tipos" :key="tipo">
        {{ tipo }}
      </option>
    </select>
    <div class="form-group">
      <label for="description">Descripción</label>
      <input v-model="gasto.descripcion" type="text" class="form-control" id="description" />
    </div>
    <button type="submit" class="btn btn-primary">Guardar Gasto</button>
  </form>
</template>

<style>
.form {
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: .5em;
}

.btn {
  margin-top: .8em;
}
</style>