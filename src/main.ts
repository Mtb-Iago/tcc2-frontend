import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import mitt from 'mitt';

const emitter = mitt();

import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {library} from "@fortawesome/fontawesome-svg-core";
import {fas} from "@fortawesome/free-solid-svg-icons";


library.add(fas)
const app = createApp(App)
app.config.globalProperties.emitter = emitter
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(router).mount('#app')


