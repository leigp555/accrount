import { createApp } from 'vue'
import "./index.scss"
import "./icon/icon.js"
import App from './App.vue'
import {router} from "./route/router";
import {store} from "./vueX/vueX";
createApp(App)
    .use(router)
    .use(store)
    .mount('#app')
