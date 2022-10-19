<template>
  <div class="footer">
    <footer>
      <div class="mt-5">
        <article>Sistema desenvolvido como atividade de tcc pelo discente <b>Iago Oliveira</b> com a orientação do professor <b>Alexandro Silva</b> para a graduação no curso de bacharelado em sistemas de informação pelo Instituto Federal da Bahia.
          <br><small>Outubro/2022</small>
        </article>
      </div>
      <div class="linksFooter">
        <a href="github.com/mtb-iago" target="_blank">GITHUB</a> |
        <a href="https://github.com/Mtb-Iago/tcc2-frontend" target="_blank">DOCUMENTAÇÃO FRONT-END</a> |
        <a href="https://github.com/Mtb-Iago/TCC" target="_blank">DOCUMENTAÇÃO BACK-END</a>
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'FooterPage',

});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.footer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: auto;
  align-items: center;
  background-color: #17a3b842;
  min-height: 100px;
  max-height: 130px;
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

a {
  color: #42b983;
}
.linksFooter {
  margin-top: 10px;
}
</style>
