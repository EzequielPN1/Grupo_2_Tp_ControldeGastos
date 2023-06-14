<template>
  <div class="container">
    <Barra></Barra>
    <select v-model="orden" class="orden-select" @change="verificarCategoriasExcedidas">
      <option value="asc">A-Z</option>
      <option value="desc">Z-A</option>
    </select>
    <div v-for="categoriaExcedida in categoriasExcedidas" :key="categoriaExcedida.id" class="categoria">
      <div class="nombre" @click="categoriasDesplegadas[categoriaExcedida.id] = !categoriasDesplegadas[categoriaExcedida.id]">
        {{ categoriaExcedida.nombre }}
      </div>
      <div class="presupuesto">Presupuesto: {{ categoriaExcedida.presupuesto }}</div>
      <div v-if="categoriasDesplegadas[categoriaExcedida.id]">
        <div v-for="(mes, index) in categoriaExcedida.mesesExcedidos" :key="index" class="mes">
          <div class="mes-info">
            <div class="anio">Año {{ mes.anio }}</div>
            <div class="nombre-mes">{{ mes.nombreMes }}</div>
          </div>
          <div class="gasto-info">
            <div class="gasto-total">Gasto Total: {{ mes.gastoTotal }}</div>
            <div class="diferencia">Diferencia: {{ mes.diferencia }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useUserStore } from "../stores/user";
import { useGastosStore } from "../stores/gastos.js";
import { useCategoriaStore } from "../stores/categorias.js";
import Barra from "./NavBar.vue";
import { tokenService } from "../Services/tokenService.js";

export default {
  created() {
    tokenService.validarUsuarioRecarga(this, this.loadData);
  },

  setup() {
    const { usuario } = useUserStore();
    const storeCategoria = useCategoriaStore();
    const gastosStore = useGastosStore();
    return {
      usuario,
      storeCategoria,
      gastosStore
    };
  },

  data() {
    return {
      gastos: [],
      categorias: [],
      categoriasExcedidas: [],
      categoriasDesplegadas: {},
      orden: "asc",
    };
  },

  methods: {
    async loadData() {
      await this.actualizarGastos();
      await this.obtenerCategorias();
      this.verificarCategoriasExcedidas();
    },

    async obtenerCategorias() {
      await this.storeCategoria.obtenerCategorias(this.usuario.email);
      this.categorias = this.storeCategoria.categorias;
    },

    async actualizarGastos() {
      await this.gastosStore.obtenerGastos(this.usuario.email);
      this.gastos = this.gastosStore.gastos;

      this.gastos.forEach((gasto) => {
        const categoria = this.categorias.find((c) => c.id === gasto.idCategoria);
        gasto.fechaNumerica = new Date(gasto.fecha).getTime();
        gasto.editando = false;
        gasto.categoria = categoria;
      });
    },

    obtenerCategoria(idCategoria) {
      return this.categorias.find((categoria) => categoria.id === idCategoria);
    },

    obtenerGastosMismaCategoria(categoria, fecha) {
      const mes = fecha.slice(5, 7);
      const anio = fecha.slice(0, 4);

      return this.gastos.filter(
        (gasto) =>
          gasto.idCategoria === categoria.id &&
          gasto.fecha.slice(5, 7) === mes &&
          gasto.fecha.slice(0, 4) === anio
      );
    },

    verificarCategoriasExcedidas() {
      const ANIO_INICIAL = 2021;
      this.categoriasExcedidas = [];
      this.categoriasDesplegadas = {};

      let categoriasOrdenadas = [...this.categorias];
      if (this.orden === "asc") {
        categoriasOrdenadas.sort((a, b) => a.nombre.localeCompare(b.nombre));
      } else if (this.orden === "desc") {
        categoriasOrdenadas.sort((a, b) => b.nombre.localeCompare(a.nombre));
      }

      categoriasOrdenadas.forEach((categoria) => {
        const mesesExcedidos = [];
        const fechaActual = new Date();

        for (let anio = fechaActual.getFullYear(); anio >= ANIO_INICIAL; anio--) {
          for (let mes = 1; mes <= 12; mes++) {
            const fecha = new Date(anio, mes - 1, 1);

            const gastosCategoria = this.obtenerGastosMismaCategoria(
              categoria,
              fecha.toISOString()
            );
            const totalGastosCategoria = gastosCategoria.reduce(
              (total, gasto) => total + gasto.monto,
              0
            );
            const presupuestoExcedido = totalGastosCategoria - categoria.presupuesto;

            if (presupuestoExcedido > 0) {
              const nombreMes = this.obtenerNombreMes(mes);

              mesesExcedidos.push({
                nombreMes: nombreMes,
                diferencia: presupuestoExcedido,
                anio: anio,
                gastoTotal: totalGastosCategoria
              });
            }
          }
        }

        if (mesesExcedidos.length > 0) {
          this.categoriasExcedidas.push({
            ...categoria,
            mesesExcedidos: mesesExcedidos
          });
          this.categoriasDesplegadas[categoria.id] = false;
        }
      });
    },

    obtenerNombreMes(numeroMes) {
      const meses = [
        'Enero',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
        'Julio',
        'Agosto',
        'Septiembre',
        'Octubre',
        'Noviembre',
        'Diciembre'
      ];

      return meses[numeroMes - 1];
    }
  },

  components: {
    Barra
  }
};
</script>

<style>
.container {
  background-color: #f5f5f5;
  padding: 20px;
}

.categoria {
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 10px;
}

.nombre {
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
}

.presupuesto {
  margin-top: 5px;
}

.mes {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid #e0e0e0;
}

.mes-info {
  flex: 1;
}

.anio {
  font-weight: bold;
}

.nombre-mes {
  margin-top: 5px;
}

.gasto-info {
  flex: 1;
  text-align: right;
}

.gasto-total {
  font-weight: bold;
}

.diferencia {
  margin-top: 5px;
}

.orden-select {
  margin-bottom: 10px;
}
</style>
