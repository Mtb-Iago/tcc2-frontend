<template>
  <div class="home mt-2">
    <div class="img col-3 d-flex m-auto justify-content-center">
      <img width="400"  height="400" alt="Vue logo" src="../assets/logo.png">
    </div>
    <h1>CATEGORIAS</h1>
    <CategoriesComponent msg="Artrose e qualidade de vida? Claro que é possível!"/>

    
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CategoriesComponent from '@/components/CategoriesComponent.vue';

export default defineComponent({
  name: 'CategoriesView',
  components: {
    CategoriesComponent,
},
  data() {
    return {
    }
  }
  
});
</script>

<style scoped>
.home {
  min-height: 80vh;
}  
h1 {
  margin-top: -100px;
}
</style>
