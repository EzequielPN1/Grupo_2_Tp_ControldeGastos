<script>
import { gastosService } from "../Services/gastosService.js"
import { storeToRefs } from "pinia";
import { useUserStore } from "../stores/user";
import { useCategoriaStore } from "../stores/categorias.js"
import Barra from "../components/NavBar.vue";

export default {
  async mounted() {
    await this.obtenerCategorias();
  },
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
        categoria: "", 
        descripcion: "",
      },
      categorias:[]

    }
  },
  methods: {
    async obtenerCategorias() {
      const store = useCategoriaStore();
      await store.obtenerCategorias(this.usuario.email);
      this.categorias = store.categorias
    },



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
      <option v-for="tipo in this.categorias" :key="tipo">
        {{ tipo.nombre }}
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