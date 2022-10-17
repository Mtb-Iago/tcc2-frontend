<template>
  <h6 class="mb-5 text-muted">{{ msg }}</h6>
  <div class="content mb-5 col-12">
    <div class="d-flex justify-content-end col-10 m-auto align-items-center" id="button_new_category">
      <button class="btn-new-category btn btn-info btn-lg" v-on:click="showModalCategory" :disabled='isDisabled'>Nova Categoria</button>
      <Teleport to="body">
        <ModalCategorie :showCategoryModalOpen="showCategory" @close="showCategory = false " />
      </Teleport>
      <input class="form-control col-2 ml-sm-2" type="text" v-model="search" placeholder="Buscar Categoria..." />
    </div>

    <div class="hello d-flex col-12 mt-5">
      <div class="col-12 d-flex flex-wrap m-auto justify-content-center align-items-center">
        <div class="row d-flex justify-content-center mb-5" v-for="(categorie, index) in filteredItems" :key="index">
          <div class="col-md-10 col-sm-6 item">
            <div class="card item-card card-block">
              <h4 class="card-title text-right" >
                <router-link :to="{ name: 'posts', query:{categoria: categorie['id_category']}}"><i class="fa-solid fa-arrow-right"></i></router-link>
              </h4>
              <h2 class="text-bolder">{{categorie['name_category']}}</h2>
              <h5 class="item-card-title mt-3 mb-3">{{categorie['author']}} • Owner</h5>
              <p class="card-text">{{categorie['description']}}</p>
              <small class="text-muted">{{dateTime(categorie['created_at'])}}</small>
            </div>
          </div>
        </div>

      </div>
    </div>
    <div class="alert alert-danger col-4 m-auto" role="alert" v-if="!categories.status">
      Não há categorias cadastradas...
    </div>
  </div>

</template>

<script lang="ts">
import { defineComponent } from 'vue';
import moment from 'moment';

import { FilterData, ResponseApi } from '../interfaces/CategoriesInterface'

import Cookie from 'js-cookie'
import Categories from '@/services/categories'
import ModalCategorie from './ModalCategorie.vue';

export default defineComponent({
  name: "CategoriesComponent",
  props: {
    msg: String,
  },
  components: { ModalCategorie },
  data() {
    return {
      showCategory: false,
      disabled: false,
      token_login: Cookie.get('_tcc2_token'),
      categories: {
        status: null,
        data: [],
        message: ""
      },
      search: "",
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
    };
  },
  computed: {
    filteredItems() {
      return this.categories.data.filter((val: FilterData) => {
        return val.name_category.toLowerCase().includes(this.search.toLowerCase());
      });
    },
    isDisabled(){
      return !this.token_login ? true : false 
    }
    
  },
  created() {
    Categories.listCategories().then((response: ResponseApi) => {
      this.categories.status = response.status;
      this.categories.data = response.data;
      this.categories.message = response.message;
    }).catch(error => {
      console.log(error);
    });
  },
  mounted() {
    this.emitter.on('insertCategoryEvent', (e: string | undefined) => {
      if (e) {
        Categories.listCategories().then((response: ResponseApi) => {
          this.categories.status = response.status;
          this.categories.data = response.data;
          this.categories.message = response.message;
        }).catch(error => {
          console.log(error);
        });

      }
    });
    console.log(this.emitter.on('isLogged', (e: string) => {
      if (e) {
        console.log(e);
        this.token_login = e
      }
    }));
  },
  methods: {
    async listCategories() {
      const response = await fetch("http://localhost:8001/api/category/list-category/", {
        method: "POST",
        mode: "cors",
        headers: {
          "Authorization": `Bearer ${this.token_login}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.data) // body data type must match "Content-Type" header
      }).then((res) => {
        console.log(res.json());
        return res.json();
      }).catch((error) => {
        console.log(error.data.message);
      });
      // this.categories = response
      // console.log(this.categories);
      return response;
    },
    dateTime(value: string) {
      return moment(value).format("DD-MM-YYYY H:m:s");
    },
    showModalCategory() {
      this.showCategory = !this.showCategory
    }
  },
  
  async insert_category() {
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
            "Authorization": `Bearer ${this.token_login}`,
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
    },

});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.content {
  min-height: 80vh;
}

.item {
  margin: 0 20px;
  padding-left: 5px;
  padding-right: 5px;
}

.item-card {
  transition: 0.5s;
  cursor: pointer;
}

.item-card-title {
  font-size: 15px;
  transition: 1s;
  cursor: pointer;
}

.card-title i {
  color: #42b983 !important;
}

.card-title i:hover {
  transform: scale(1.25) rotate(100deg);
  color: #083b24;

}

.card {
  min-width: 480px;
  padding: 15px;
}

.card:hover {
  transform: scale(1.05);
  box-shadow: 10px 10px 15px rgba(0, 0, 0, 0.3);
}

.card-text {
  min-width: 480px;
  height: 80px;
}

.card::before,
.card::after {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transform: scale3d(0, 0, 1);
  transition: transform .3s ease-out 0s;
  background: rgba(255, 255, 255, 0.1);
  content: '';
  pointer-events: none;
}

.card::before {
  transform-origin: left top;
}

.card::after {
  transform-origin: right bottom;
}

.card:hover::before,
.card:hover::after,
.card:focus::before,
.card:focus::after {
  transform: scale3d(1, 1, 1);
}
</style>
