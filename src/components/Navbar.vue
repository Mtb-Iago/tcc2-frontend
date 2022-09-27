<template>
  <div class="nav col-12 d-flex bg-#000">
    <nav class="col-12 m-auto d-flex">
      <router-link to="/">Categorias</router-link>
      <router-link to="/posts">Posts</router-link>
      <a id="login" @click="showModal = true">Login</a>
    </nav>
    <Teleport to="body">
    <!-- use the modal component, pass in the prop -->
    <ModalLogin :show="showModal" @close="showModal = false " />
  </Teleport>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ModalLogin from './ModalLogin.vue';

export default defineComponent({
  name: "NavBar",
  components: { ModalLogin },
  data() {
    return {
      showModal: false
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.nav {
  background-color: rgb(194, 194, 194);
  justify-content: end;
}

nav a,
#login {
  padding: 0px 10px;
  font-size: 15pt;
  color: #42b983;
  cursor: pointer;
}

nav a:hover,
nav #login:hover {
  transition: .4s;
  color: #1b6a47;
  text-decoration: none;

}

h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}
</style>
