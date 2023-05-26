<script>
    export default {
        data() {
            return {
                spent: {
                    title: "",
                    amount: 0,
                    types: ["Comida", "Social", "Vivienda"], // se debe cambiar cuando tengamos tipos guardados por usuario
                    date: "",
                    description: ""
                }
            }
        },
        methods: {
          agregarGasto: () => {
            // agregar gasto con ruta proveniente del back
          }
        }
    }

</script>

<template>
  <form class="form">
    <div class="form-group">
      <label for="title">Titulo</label>
      <input
        v-model="spent.title"
        type="text"
        class="form-control"
        id="title"
      />
    </div>
    <div class="form-group">
      <label for="amount">Monto</label>
      <input
        v-model="spent.amount"
        type="number"
        class="form-control"
        id="amount"
      />
    </div>
    <label for="date">Fecha</label>
    <input id="date" type="date" v-model="spent.date">
    <label for="category">Categoria</label>
    <select id="category" class="form-select" aria-label="Default select example">
        <option v-for="type in spent.types" :key="type">
            {{ type }}
        </option>
    </select>
    <div class="form-group">
      <label for="description">Descripción</label>
      <input
        v-model="spent.description"
        type="text"
        class="form-control"
        id="description"
      />
    </div>

    <button type="submit" class="btn btn-primary" >Guardar Gasto</button>
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