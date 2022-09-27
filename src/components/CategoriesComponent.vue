<template>
  <h6 class="mb-5">{{ msg }}</h6>
  <div class="hello d-flex col-12">
    <div class="col-12 d-flex flex-wrap m-auto justify-content-center align-items-center">
      <div class="row d-flex justify-content-center mb-5"
         v-for="(categorie, index) in categories.data"
         :key="index"
         >
        <div class="col-md-10 col-sm-6 item">
          <div class="card item-card card-block">
            <h4 class="card-title text-right">
              <i class="fa-solid fa-arrow-right"></i>
            </h4>
            <span>{{categorie['name_category']}}</span>
            <h5 class="item-card-title mt-3 mb-3">Sierra Web Development • Owner</h5>
            <p class="card-text">This is a company that builds websites, web apps and e-commerce solutions.</p>
            <small class="text-muted">{{dateTime(categorie['created_at'])}}</small>
          </div>
        </div>
      </div>

    </div>
  </div>

</template>

<script lang="ts">
import { defineComponent } from 'vue';
import moment from 'moment';


import Guard from '@/services/auth-header' 
import Categories from '@/services/categories'

export default defineComponent({
  name: 'CategoriesComponent',
  props: {
    msg: String,
  },
  data() {
    return {
      data: {
        token_login: Guard.get_token
      },
      categories: {
        status: null,
        data: {},
        message: ""
      }
    }
  },
  mounted() {
   Categories.listCategories().then(response => {

      this.categories.status = response.status
      this.categories.data = response.data
      this.categories.message = response.message

      console.log(this.categories.data);
      
      // return response.data
    }).catch(error => {
      console.log(error);
    })
  },

  methods: {
    async listCategories() {
      const response = await fetch(
        "http://localhost:8001/api/category/list-category/",
        {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, *cors, same-origin
          headers: {
            'Authorization': `Bearer ${this.data.token_login}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.data) // body data type must match "Content-Type" header
        }
      ).then((res) => {
        console.log(res.json());
        
        return res.json()
      }).catch((error) => {
        console.log(error.data.message);
      })

      // this.categories = response

      // console.log(this.categories);
      
      return response
    },
    dateTime(value: string) {
      return moment(value).format('DD-MM-YYYY H:m:s');
    },
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  h6 {}
.item {
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
  padding: 15px;
}

.card:hover {
  transform: scale(1.05);
  box-shadow: 10px 10px 15px rgba(0, 0, 0, 0.3);
}

.card-text {
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
