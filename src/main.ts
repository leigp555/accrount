import { createApp } from 'vue'
import "./index.scss"
import "./icon/icon.js"
import App from './App.vue'

import {router} from "./route/router";


createApp(App)
    .use(router)
    .mount('#app')
