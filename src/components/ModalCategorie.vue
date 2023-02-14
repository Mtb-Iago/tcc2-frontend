<template>
  <Transition name="ModalCategory">
    <div :showTeste="teste" @modalCategoria="teste = true " v-if="showCategoryModalOpen" class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container col-lg-4 col-sm-8">
          <div class="modal-header text-center d-flex col-12 m-auto justify-content-center;">
            <h4 id="title_modal" class="d-flextext-center" >Inserir Categoria</h4>
            <button class="btn btn-light" @click="$emit('close')"><i class="fa-regular fa-circle-xmark"></i></button>
          </div>

          <form @submit.prevent="">
            <div class="modal-body">
              <div class="col-12">

                <div class="form-group">
                  <label for="auhtor">Autor da Descrição</label>
                  <input type="text" class="form-control" id="auhtor" disabled :value="data.author" aria-describedby="auhtor"
                    placeholder="Digite seu nome..">
                  <small id="auhtor" class="form-text text-muted">Nunca compartilharemos seu e-mail com mais
                    ninguém.</small>
                </div>

                <div class="form-group">
                  <label for="name_category">Título da Categoria</label>
                  <input type="text" class="form-control" id="name_category" v-model="data.name_category"
                    placeholder="Digite um Título..">
                </div>

                <div class="form-group">
                  <label for="description">Descrição</label>
                  <textarea class="form-control" id="description" v-model="data.description"
                    placeholder="Digite uma Descrição.."></textarea>
                </div>

                <div class="form-group text-center">
                  <div class="alert alert-danger" role="alert" v-if="request.message && !request.status_register">
                    {{request.message}}
                  </div>
                  <div class="alert alert-success" role="alert" v-if="request.message && request.status_register">
                    {{request.message}}
                  </div>
                </div>

              </div>
            </div>
            <div class="modal-footer">
              <slot name="footer">

                <div class="m-auto text-center">
                  <button v-on:click="insert_category" class="btn btn-success">Gravar Categoria
                    <font-awesome-icon icon="fa-solid fa-right-to-bracket" />
                  </button>
                  <br>
                </div>
              </slot>
            </div>
          </form>
        </div>
      </div>
    </div>
  </Transition>
</template>
<script lang="ts">
import { ResponseApi } from '@/interfaces/CategoriesInterface';
import categories from '@/services/categories';
import Cookie from 'js-cookie'
import jwt_decode from 'jwt-decode';
import { defineComponent } from 'vue';


export default defineComponent({
  name: "ModalCategory",
  props: {
    showCategoryModalOpen: Boolean
  },
  data() {
    return {
      token_login: Cookie.get('_tcc2_token'),
      disabled: false,
      teste: false,
      data: {
        author: '',
        name_category: '',
        description: '',
      },
      request: {
        status_register: false,
        message: '',
        data_return: []
      },
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      const pay = this.token_login
      var payload: any
      if (pay) {
        payload = jwt_decode(pay)
        this.data.author = payload.name.toUpperCase()
        return payload
      }
    },
    async insert_category() {
      const token = Cookie.get('_tcc2_token')
      const data = {
        author: this.data.author,
        name_category: this.data.name_category,
        description: this.data.description,
      };

      const response = await fetch(
        "http://localhost:8001/api/category/insert-category/",
        {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, *cors, same-origin
          headers: {
            "Authorization": `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data) // body data type must match "Content-Type" header
        }
      ).then((res) => {
        return res.json()
      }).catch((error) => {
        console.log(error.data.message);
      })

      this.request.status_register = response.status
      this.request.data_return = response.data
      this.request.message = response.message

      this.emitter.emit('insertCategoryEvent', () => {
        categories.listCategories().then((response: ResponseApi) => {
            return response
          }).catch(error => {
            console.log(error);
          });
        
      });

    },
  }
})
</script>
    
<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  /* width: 300px; */
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-header h3,
#title_modal {
  /* margin-top: 0; */
  text-align: center !important;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.modal-footer {
  flex-direction: column;
}

.link_register_or_login {
  background: none;
  border: none;
  font-size: 10pt;
  color: #42b983;
  margin-top: 16px;
}

.link_register_or_login:hover {
  transition: .4s;
  color: #00703d;
  text-decoration: underline;
}
</style>