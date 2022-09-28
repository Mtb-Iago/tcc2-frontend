<template>
  <div class="posts">
    <h1>Login</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PostsView',
  components: {
  },
});
</script>

<style scoped>
  .posts {
    min-height: 98vh;
    background-color: aquamarine;
  }
  h1{
    color: black;
  }
</style>