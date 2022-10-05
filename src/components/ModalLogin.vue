<template>
  <Transition name="ModaLogin">
    <div v-if="show" class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container col-lg-4 col-sm-8">
          <div class="modal-header text-center d-flex col-12 m-auto justify-content-center;">
            <h4 id="title_modal" class="d-flextext-center">{{ login_register }}</h4>
            <button class="btn btn-light" @click="$emit('close')"><i class="fa-regular fa-circle-xmark"></i></button>
          </div>

          <form @submit.prevent="">
            <div class="modal-body">
              <div class="col-12">

                <div class="form-group" v-if="register">
                  <label for="name">Seu Nome</label>
                  <input type="name" class="form-control" id="name" v-model="form.name" aria-describedby="nome"
                    placeholder="Digite seu nome..">
                </div>

                <div class="form-group">
                  <label for="email">Email</label>
                  <input type="email" class="form-control" id="email" v-model="form.email" aria-describedby="Email"
                    placeholder="Digite seu email..">
                  <small id="Email" class="form-text text-muted">Nunca compartilharemos seu e-mail com mais
                    ninguém.</small>
                </div>

                <div class="form-group">
                  <label for="senha">Senha</label>
                  <input type="password" class="form-control" id="senha" v-model="form.password"
                    placeholder="Digite sua senha..">
                </div>

                <div class="form-group text-center" v-if="request.request_error || request.request_success ">
                  <div class="alert alert-danger" role="alert" v-if="request.request_error">
                    {{request.msg_response}}
                  </div>
                  <div class="alert alert-success" role="alert" v-if="request.request_success">
                    {{request.msg_response}}
                  </div>
                </div>

              </div>
            </div>
            <div class="modal-footer">
              <slot name="footer">

                <div class="m-auto text-center" v-if="register">
                  <button v-on:click="login" class="btn btn-success">REGISTRAR
                    <font-awesome-icon icon="fa-solid fa-right-to-bracket" />
                  </button>
                  <br>
                  <button class="link_register_or_login" v-on:click="link_register_or_login">Entrar com Login</button>
                </div>

                <div class="m-auto text-center" v-else>
                  <button v-on:click="login" class="btn btn-success">ENTRAR
                    <font-awesome-icon icon="fa-solid fa-right-to-bracket" />
                  </button>
                  <br>
                  <button class="link_register_or_login" v-on:click="link_register_or_login">Não tenho conta?
                    Cadastra-se</button>
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
  import Cookie from 'js-cookie'
  import { defineComponent } from 'vue'



interface ResponseApi {
    data: {
      token: string
    },
    message: string,
    http_code:number,
    status: boolean
}

export default defineComponent({
  name: "ModaLogin",
  props: {
    show: Boolean,
    showCategory: Boolean
  },
  data() {
    return {
      register: false,
      login_register: 'LOGIN',
      form: {
        email: '',
        name: '',
        password: '',
      },
      request: {
        request_error: false,
        request_success: false,
        msg_response: ''

      }
    }
  },
  computed: {
    
  },
  methods: {
    async login() {
      const data = {
        email: this.form.email,
        name: this.form.name,
        password: this.form.password
      };

      const response = await fetch(
        "http://localhost:8001/api/user/login/",
        {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, *cors, same-origin
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data) // body data type must match "Content-Type" header
        }
      ).then((res) => {
        return res.json()
      }).catch((error) => {
        console.log(error.data.message);
      })
      
      this.send_response(response)
    },
    async link_register_or_login() {
      this.register = !this.register
      if (this.register) {
        this.login_register = 'REGISTRE-SE'
      } else {
        this.login_register = 'LOGIN'
      }
    },
    send_response(response: ResponseApi) {

      if(!response.status) {
        this.request.msg_response = response.message
        this.request.request_error = true
       
      } else {
        this.request.request_error = false
        this.request.request_success = true
        this.request.msg_response = "Login efetuado com sucesso..."
         
      }
      setTimeout(() => {
        this.request.request_error = false
        this.request.request_success = false
        this.request.msg_response = ""
        Cookie.set('_tcc2_token', response.data.token)
        this.$emit('close')
        
      }, 1000);
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