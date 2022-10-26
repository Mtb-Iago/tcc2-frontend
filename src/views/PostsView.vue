<template>
  <div class="posts">
    <div class="img col-3 d-flex m-auto justify-content-center">
      <img width="400" height="400" alt="Vue logo" src="../assets/logo.png">
    </div>
    <h1><i class="fa-solid fa-blog"></i> {{title_posts_view}}</h1>
    <input class="form-control col-4 text-center d-flex justify-content-center m-auto searchButton" type="text"
      v-model="search" placeholder="Buscar Posts..." />
    <div class="hello d-flex col-12 mt-5 flex-column">
      <div class="col-12 d-flex flex-wrap m-auto justify-content-center align-items-center" style="gap: 25px;">
        <div class="row d-flex justify-content-center mb-5" v-for="(posts, index) in filteredItemsPost" :key="index">
          <div :class=" 'col-md-10 col-sm-6 item ' " v-if="posts['accept_post'] == 1 || role_permision == 'admin' ">
            <div class="card item-card card-block">
              <div class="d-flex justify-content-between">
                <h2 :class="
                                   role_permision == 'admin' 
                ? posts['accept_post'] == 1 ? 'text-success text-left' : 
                'text-danger text-left '
                                       : ' text-black' + 
                ' text-left text-bolder'">{{posts['title_post']}}</h2>
                <div class="d-flex mb-auto mt-auto" v-if="role_permision == 'admin'">
                  <button class="btn btn-sm btn-success mr-2" type="button"
                    v-on:click="updateStatusPost('accept', posts['id_post'])"><i
                      class="fa-solid fa-lock-open"></i></button>
                  <button class="btn btn-sm btn-danger " type="button"
                    v-on:click="updateStatusPost('not_accept', posts['id_post'])"><i
                      class="fa-solid fa-lock"></i></button>
                </div>
              </div>
              <article class="mb-3 card-text line-clamp line-clamp--four">{{limitedCharInPost(posts['post'])}} <a class="text-right" v-on:click="showModalfinPost(posts)"> Leia mais...</a></article>

              <div class="d-flex justify-content-center m-auto" id="imagesUrl" v-if="posts['url_archives']">
                <img width="300" :src="posts['url_archives'][0]['url_photos']" />
              </div>
              <div class="d-flex justify-content-center m-auto" id="imagesUrl" v-else>
                <img width="300" src="https://mrconfeccoes.com.br/wp-content/uploads/2018/03/default.jpg" />
              </div>
              <hr>
              <div id="footerCard">
                <div class="d-flex justify-content-between align-items-center">
                  <h5 class="item-card-title mt-3 mb-3"><i class="fa-solid fa-user"></i> {{posts['name_user']}}</h5>
                  <small class="text-muted"><i class="fa-solid fa-calendar"></i>
                    {{dateTime(posts['created_at'])}}</small>
                </div>
                <div class="text-right">
                  <small class="text-center text-muted tags" v-if="renderTags(posts['tags_post'])"><i class="fa-solid fa-tags"></i> {{renderTags(posts['tags_post'])}}</small>
                  <!-- <small class="text-center text-muted">TAGS: [{{ posts['tags_post'][posts['tags_post']['length']] ? posts['tags_post'][posts['tags_post']['length'] - 1]['tag'] : '' }}]</small> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="alert alert-danger col-4 m-auto" role="alert" v-if="!posts.data.length">
        Não há Posts cadastradas...
      </div>
    </div>

    <div class="btn-float">
      <button id="btn-insert-post" type="button" class="float" v-on:click="showModalPost">
        <i class="far fa-plus"></i>
      </button>
      <Teleport to="body">
        <ModalPost :showPostModalOpen="showPosts" @close="showPosts = false " />
      </Teleport>
    </div>
    <Teleport to="body">
      <ModalViewFindPost :ModalViewFindPost="showViewFindPost" @close="showViewFindPost = false " />
    </Teleport>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Cookie from 'js-cookie'
import moment from 'moment';
import 'moment/locale/pt-br'
import Posts from '@/services/posts'
import { FilterDataPosts, ResponseApi } from '@/interfaces/PostsInterface';
import ModalPost from '@/components/ModalPost.vue';
import ModalViewFindPost from '@/components/ModalViewFindPost.vue';
import jwt_decode from 'jwt-decode';

export default defineComponent({
  name: 'PostsView',
  components: {
    ModalPost,
    ModalViewFindPost
  },
  el: '.carousel',
  data() {

    return {
      showPosts: false,
      showViewFindPost: false,
      disabled: false,
      token_login: Cookie.get('_tcc2_token'),
      id_category: this.$route.query.categoria,
      id_user: '',
      role_permision: '',
      update_status: false,
      message_update: '',
      title_posts_view: 'Posts',
      posts: {
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
      images: [],
      nextNum: 10
    }
  },

  computed: {
    filteredItemsPost(): never[] {
      return this.posts.data.filter((val: FilterDataPosts) => {
        return val.title_post.toLowerCase().includes(this.search.toLowerCase());
      });
    },
  },
  created() {

    Posts.listPosts(this.id_category).then((response: ResponseApi) => {

      this.posts.status = response.status;
      this.posts.data = response.data;

      this.title_posts_view = 'Posts Sobre ' + this.posts.data[0]['name_category']
      setTimeout(() => {
        this.posts.message = response.message;

      }, 3000);

    }).catch(error => {
      console.log(error);
    });
  },
  mounted() {
    const payload = this.init()
    this.role_permision = payload.role_permission
    this.emitter.on('insertPostEvent', (e: string | undefined) => {
      if (e) {
        Posts.listPosts(this.id_category).then((response: ResponseApi) => {

          this.posts.status = response.status;
          this.posts.data = response.data;
          this.posts.message = response.message;

        }).catch(error => {
          console.log(error);
        });

      }
    });
  },
  methods: {
    dateTime(value: string) {
      moment.locale('pt-br')
      return moment(value).format("LL");
    },
    showModalPost() {
      this.showPosts = !this.showPosts
    },
    showModalfinPost(posts: any) {
      this.showViewFindPost = !this.showViewFindPost
      this.viewTextPostComplete(posts)
    },
    init() {
      const pay = this.token_login
      var payload: any
      if (pay) {
        payload = jwt_decode(pay)
        this.data.author = payload.name.toUpperCase()
        this.id_user = payload.id_user
        this.role_permision = payload.role_permision
        return payload
      }
    },
    updateStatusPost(e: any, id_post: number) {
      var new_status_post = false

      if (e == 'accept') {
        new_status_post = true
      }
      if (e == 'not_accept') {
        new_status_post = false
      }

      this.update_status = true

      Posts.insertPosts(id_post, new_status_post).then((response: ResponseApi) => {

        this.posts.status = response.status;
        this.posts.data = response.data;
        this.posts.message = response.message;
        this.message_update = response.message


        this.emitter.emit('insertPostEvent', (e: any) => {
          Posts.listPosts().then((response: ResponseApi) => {
            return response
          }).catch(error => {
            console.log(error);
          });

        });
      }).catch(error => {
        console.log(error);
      });
      setTimeout(() => {
        this.update_status = false
      }, 5000);
    },
    limitedCharInPost(post: string){
      return post.substring(0,207)
    },
    viewTextPostComplete(posts: any){
        this.emitter.emit('finPostView', posts)
        return posts.id_post
    },
    renderTags(tags: any){
      if (tags) return tags[tags.length -1]['tag']
      
      return ''
      
    }
  }
});
</script>

<style scoped>
.posts {
  min-height: 98vh;
  background-color: rgb(245, 245, 245);
}

h1 {
  color: black;
  margin-top: -100px;
}

.content {
  min-height: 80vh;
}

.img {
  margin-top: -75px !important;
}

.searchButton {
  cursor: auto;
}

.searchButton:hover {
  transition: .4s;
  opacity: 0.8;
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
  text-align: justify;
  min-height: 600px;
  max-height: 600px;
  max-width: 480px;
  min-width: 480px;
  padding: 15px;
  overflow: hidden;
  /* display: flex;
  flex-wrap: wrap; */
}

.card:hover {
  transform: scale(1.05);
  box-shadow: 10px 10px 15px rgba(0, 0, 0, 0.3);
}

.card-text {
  /* min-width: 480px; */
  min-height: 100px;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
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

.float {
  position: fixed;
  width: 60px;
  height: 60px;
  bottom: 40px;
  right: 40px;
  background-color: #17a2b8;
  color: #FFF;
  border-radius: 50px;
  text-align: center;
  font-size: 30px;
  box-shadow: 2px 2px 3px #999;
  z-index: 100;
}

#btn-insert-post {
  border: none;
}

#btn-insert-post:hover {
  transition: .4s;
  opacity: 0.5;
}

#imagesUrl {
  width: 300px;
  max-width: 300px;
  min-width: 300px;
}

#footerCard {
  margin-top: auto;
  height: 100px;
  max-height: 100px;
}

.line-clamp {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  text-overflow: ellipsis;

}

.line-clamp--four {
  -webkit-line-clamp: 4;
}
.tags {
  font-size: 08pt;
}
</style>