<script >
import { storeToRefs } from "pinia";
import { useUserStore } from "../stores/user";
import { userService } from "../Services/userService.js"


export default {
  setup() {
    const store = useUserStore();
    const { usuario } = storeToRefs(store);
    return {
      usuario,
    };
  },
  data() {
    return {
      user: {
        email: "",
        pass: "",
      },
      vue: this,

    };
  },
  methods: {
    async loguear(user, vue) {
      try {
        const response = await userService.login(user);
        vue.usuario = response.data;
        vue.$router.push("/Home");
      } catch (error) {
        console.log(error);
        alert(error.response.data);
      }
    }
  },
};
</script>

<template>
  <h1>Login</h1>
  <form @submit.prevent="loguear(user, vue)">
    <div class="form-group">
      <label for="exampleInputEmail1">Email address</label>
      <input v-model="user.email" type="email" class="form-control" id="exampleInputEmail1"
        aria-describedby="emailHelp" />
    </div>
    <div class="form-group">
      <label for="exampleInputPassword1">Password</label>
      <input v-model="user.pass" type="password" class="form-control" id="exampleInputPassword1" required />
    </div>
    <div class="d-flex justify-content-between align-items-center">
      <button type="submit" class="btn btn-primary">Entrar</button>
      <RouterLink to="/GenerarPass"><button class="btn btn-secondary">olvido su pass</button></RouterLink>
      <RouterLink to="/"><button class="btn btn-secondary">Volver</button></RouterLink>
    </div>
  </form>
</template>

<style></style>