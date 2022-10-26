<template>
  <Transition name="ModalViewFindPost">
    <div v-if="ModalViewFindPost" class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container col-lg-4 col-sm-8">
          <div class="modal-header text-center d-flex col-12 m-auto justify-content-center;">
            <h1 id="title_modal" class="d-flextext-center">{{posts['title_post']}}</h1>
            <button class="btn btn-light" @click="$emit('close')"><i class="fa-regular fa-circle-xmark"></i></button>
          </div>

          <div class="card item-card card-block">
            <div class="d-flex justify-content-between">
            </div>
            <article class="mb-3 card-text line-clamp line-clamp--four">{{posts['post']}} </article>

            <div class="d-flex justify-content-center m-auto" id="imagesUrl" v-if="posts['url_photo']">
              <img width="300" :src="render_photo(posts['url_photo'][0])" />
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>
<script lang="ts">
import moment from 'moment';
import { defineComponent } from 'vue';

export default defineComponent({
  name: "ModalViewFindPost",
  props: {
    ModalViewFindPost: Boolean
  },
  data() {
    return {
      posts: {
        title_post: 'Post',
        post: '',
        name_user: '',
        url_photo: '',
        created_at: '',
        tags_post: ''
      },
      data: {
        author: '',
        name_category: '',
        description: '',
      }
    }
  },
  computed: {

  },
  methods: {
    dateTime(value: string) {
      moment.locale('pt-br')
      return moment(value).format("LL");
    },
    render_photo(photo: any){
      return photo.url_photos
    },
    renderTags(tags: any){
      if (tags) return tags[tags.length -1]['tag']
      return ''
    }
  },
  mounted() {
    this.emitter.on('finPostView', (e: any) => {
        this.posts.title_post = e.title_post
        this.posts.post = e.post
        this.posts.name_user = e.name_user
        this.posts.url_photo = e.url_archives
        this.posts.created_at = e.created_at
        this.posts.tags_post = e.tags_post
    });
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
.item-card {
  border: none;
  margin-top: 20px;
  text-align: center;
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
.tags {
  font-size: 08pt;
}
</style>