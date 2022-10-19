<template>
  <Transition name="ModalPost">
    <div v-if="showPostModalOpen" class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container col-lg-4 col-sm-8">
          <div class="modal-header text-center d-flex col-12 m-auto justify-content-center;">
            <h4 id="title_modal" class="d-flextext-center">Inserir Post</h4>
            <button class="btn btn-light" @click="$emit('close')"><i class="fa-regular fa-circle-xmark"></i></button>
          </div>

          <form @submit.prevent="">
            <div class="modal-body">
              <div class="col-12">

                <div class="form-group">
                  <label for="title_post">Título do Post</label>
                  <input type="text" class="form-control" id="title_post" v-model="data.title_post"
                    placeholder="Digite um Título..">
                </div>

                <div class="form-group">
                  <label for="description">Post</label>
                  <textarea class="form-control" id="description" v-model="data.post"
                    placeholder="Digite seu post..."></textarea>
                </div>

                <div class="form-group">
                  <input @change="handleImage" accept="image/*" name="file" type="file" id="fileField">
                </div>

                <div class="form-group">
                  <label for="tags">Tags:</label>
                  <input type="text" class="form-control" id="tags" v-model="data.tags"
                    placeholder="Tag1, Tag2, Tag3, ...">
                </div>



                <div class="form-group">
                  <label for="author">Autor do Post:</label>
                  <input type="text" disabled class="form-control" id="author" :value="data.author"
                    aria-describedby="author">
                  <small id="author" class="form-text text-muted">Nunca compartilharemos seus dados com mais
                    ninguém.</small>
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
                  <button class="btn btn-success" v-on:click="insert_post">Gravar Post
                    <font-awesome-icon icon="fa-solid fa-check" />
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
import { ResponseApi } from '@/interfaces/PostsInterface';
import posts from '@/services/posts';
import Cookie from 'js-cookie'
import jwt_decode from 'jwt-decode';
import { defineComponent } from 'vue';

export default defineComponent({
  name: "ModalPost",
  props: {
    showPostModalOpen: Boolean
  },
  data() {
    return {
      token_login: Cookie.get('_tcc2_token'),
      data: {
        id_category: this.$route.query.categoria,
        id_user: '',
        author: '',
        title_post: '',
        post: '',
        tags: '',
        img: ''
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
        this.data.id_user = payload.id_user
        return payload
      }
    },
    async insert_post() {

      const data = {
        id_category: this.$route.query.categoria,
        id_user: this.data.id_user,
        author: this.data.author,
        post: this.data.post,
        title_post: this.data.title_post,
        tag: this.data.tags,
        files: [
          {
            file: this.data.img ? this.data.img : ''
          }
        ]
      };

      const response = await fetch(
        "http://localhost:8001/api/posts/insert-posts/",
        {
          method: 'POST',
          mode: 'cors',
          headers: {
            "Authorization": `Bearer ${this.token_login}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        }
      ).then((res) => {
        return res.json()
      }).catch((error) => {
        console.log(error.data.message);
      })

      this.emitter.emit('insertPostEvent', (e: any) => {
        posts.listPosts().then((response: ResponseApi) => {
            return response
          }).catch(error => {
            console.log(error);
          });
        
      });

      this.request.status_register = response.status
      this.request.data_return = response.data
      this.request.message = response.message

      setTimeout(() => {
        this.request.message = ''
        this.data.img ? '' : ''
      }, 3000);
    },

    handleImage(e: any) {
      const selectdImage = e.target.files[0]
      this.createBase64Image(selectdImage)
    },
    createBase64Image(fileObject: any) {
      const reader = new FileReader()
      reader.onload = (e: any) => {
        var rawImg = e.target.result
        this.data.img = rawImg
      }
      reader.readAsDataURL(fileObject)
    }
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