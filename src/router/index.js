import { createRouter, createWebHistory } from 'vue-router'

import Home from "@/views/Home";
import Login from "@/views/Login";
import BoardList from '@/views/board/BoardList.vue'
import BoardDetail from '@/views/board/BoardDetail.vue'
import BoardWrite from '@/views/board/BoardWrite.vue'

import UpBoardList from '@/views/up/UpBoardList.vue'
import UpBoardDetail from '@/views/up/UpBoardDetail.vue'
import UpBoardWrite from '@/views/up/UpBoardWrite.vue'
//import Scroll from "@/views/Scroll"
//import {createRouter, createWebHistory} from "vue-router/dist/vue-router";

const routes = [
    {path: '/', component: Home},
    {path: '/login', component: Login},
    {path: '/board/list',component:BoardList},
    {path: '/board/detail',component:BoardDetail},
    {path: '/board/write', component:BoardWrite},

    {path: '/up/list', component:UpBoardList},
    {path: '/up/detail', component:UpBoardDetail},
    {path: '/up/write', component:UpBoardWrite},
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;