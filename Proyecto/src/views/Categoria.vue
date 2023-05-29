<script>
import Barra from "../components/NavBar.vue";
import { categoriaService } from "../Services/categoriaServicie.js"
import { storeToRefs } from "pinia";
import { useUserStore } from "../stores/user";

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
            categoria: {
                email: '',
                nombre: '',
                presupuesto: 0
            }
        };
    },
    methods: {
        async agregarCategoria() {
            this.categoria.email = this.usuario.email
             console.log(this.categoria)
            
            try {
                const response = await categoriaService.agregarCategoria(this.categoria)
                alert(response.data);
            } catch (error) {
                console.log(error);
                alert(error.response);
            }
            

            this.categoria.nombre = '';
            this.categoria.presupuesto = 0;
            
        }
    },


    components: {
        Barra,
    },
}

</script>


<template>
    <Barra></Barra>
    <div>
        <form @submit.prevent="agregarCategoria()">
            <div>
                <label for="nombre">Nombre:</label>
                <input type="text" id="nombre" v-model="categoria.nombre" required>
            </div>
            <div>
                <label for="presupuesto">Presupuesto:</label>
                <input type="number" id="presupuesto" v-model="categoria.presupuesto" required>
            </div>
            <button type="submit" class="btn btn-primary">Agregar</button>
        </form>
    </div>
</template>