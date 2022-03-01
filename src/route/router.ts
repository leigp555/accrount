import {createRouter,createWebHashHistory} from 'vue-router'
import Statistic from "../components/Statistic.vue";
import Home from "../components/Home.vue";
import Detail from "../components/Detail.vue";
import NotFound from "../components/NotFound.vue";

const history=createWebHashHistory()
export const router=createRouter({
    history:history,
    routes:[
        {path:"",component:Home},
        {path:"/home",component:Home},
        {path:"/detail",component:Detail},
        {path:"/statistic",component:Statistic},
        { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }
    ]
})