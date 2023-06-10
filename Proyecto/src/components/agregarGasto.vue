<script>

import { storeToRefs } from "pinia";
import { useUserStore } from "../stores/user";
import { useGastosStore } from "../stores/gastos.js";
import { useCategoriaStore } from "../stores/categorias.js";
import { gastosService } from "../Services/gastosService.js";
import Barra from "../components/NavBar.vue";
import { tokenService } from "../Services/tokenService.js"

export default {
  async mounted() {
    tokenService.validarUsuarioRecarga(this, this.loadData)
  },
  setup() {
    const store = useUserStore();
    const { usuario } = storeToRefs(store);
    const gastosStore = useGastosStore();
    const storeCategoria = useCategoriaStore();
    return {
      usuario, storeCategoria, gastosStore
    }
  },
  data() {
    return {
      gasto: {
        email: "",
        titulo: "",
        monto: 0,
        fecha: "",
        idCategoria: "",
        descripcion: "",
      },
      gastos: [],
      categorias: [],

    }
  },
  methods: {
    async loadData() {
      await this.actualizarGastos();
      await this.obtenerCategorias();
    },
    async obtenerCategorias() {
      await this.storeCategoria.obtenerCategorias(this.usuario.email);
      this.categorias = this.storeCategoria.categorias;
    },

    async actualizarGastos() {
      await this.gastosStore.obtenerGastos(this.usuario.email);
      this.gastos = this.gastosStore.gastos;
    },





    async agregarGasto() {

      try {
        await tokenService.validarToken(this.usuario, this.$router)

        const categoria = this.categorias.find(categoria => categoria.id === this.gasto.idCategoria);
        const presupuesto = categoria.presupuesto

        const fechaIngreso = this.gasto.fecha

        var mes = fechaIngreso.slice(5, 7);
          
        const gastosMismaCategoria = this.gastos.filter(gasto => gasto.idCategoria === categoria.id && gasto.fecha.slice(5, 7) === mes);
        
  
        let sumaGastos = 0;

        gastosMismaCategoria.forEach(gasto => { sumaGastos += gasto.monto;});

        const sumaTotal = sumaGastos + this.gasto.monto;

        console.log("la suma con el gasto nuevo incluido: " + sumaTotal);
        console.log("el presupuesto de la categoria base: " + presupuesto);

        this.gasto.email = this.usuario.email

        const response = await gastosService.agregarGasto(this.gasto)
        console.log(this.gasto);
        alert(response.data);
        this.$refs.formulario.reset();

        if (sumaTotal>presupuesto) {
          alert("El gasto  supera el presupuesto");
        } 

      } catch (error) {
        alert("Error al agregar el gasto." + error.response.data);
      }

     

    },

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
    <select id="category" class="form-select" aria-label="Default select example" v-model="gasto.idCategoria" required>
      <option v-for="tipo in this.categorias" :key="tipo.id" :value="tipo.id">
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