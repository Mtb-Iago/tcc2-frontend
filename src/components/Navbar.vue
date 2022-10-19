<template>
  <div class="nav col-12 d-flex bg-#000">
    <nav class="navbar navbar-expand-lg col-12 m-auto d-flex p-3">
      <router-link to="/">Categorias</router-link>
      <!-- <router-link to="/posts">Posts</router-link> -->
      <a v-if="!token_login" id="login" @click="showModal = true" ref="teste">Login</a>
      <a v-if="token_login" id="login" @click="logout">Sair</a>
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
import Cookie from 'js-cookie'
import router from '@/router';

export default defineComponent({
  name: "NavBar",
  components: { ModalLogin },
  data() {
    return {

      showModal: false,
      token_login: Cookie.get('_tcc2_token'),
    }
  },
  mounted() {
    this.emitter.on('isLogged', (e: never) => {
      this.token_login = e
    });
  },
  methods: {
    logout() {
      Cookie.remove('_tcc2_token')
      this.token_login = ""
      this.emitter.emit('isLogged', false);
      router.push('/')
    }
  }

});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.nav {
  background-color: #17a2b8;
  justify-content: end;
}

nav a,
#login {
  padding: 0px 10px;
  font-size: 15pt;
  color: #ffffff !important;
  cursor: pointer;
}

nav a:hover,
nav #login:hover {
  transition: .4s;
  color: #337b00 !important;
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
