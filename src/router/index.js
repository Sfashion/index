import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/main'
import Index from '@/components/index/index'
import List from '@/components/list/list'
import Listofid from '@/components/list/listofid'
import Detail from '@/components/detail/detail'
import Car from '@/components/car/car'
import Complete from '@/components/complete/complete'
import Confirm from '@/components/confirm/confirm'
import Personal from '@/components/personal/personal'
import Singleorder from '@/components/personal/singleorder'
import Geren from '@/components/personal/geren'


Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'main',
            component: Main,
            redirect:'/index',
            children:[
                {
                    path: 'index',
                    name: 'index',
                    component: Index
                },
                {
                    path: 'list',
                    name: 'list',
                    component: List
                },
                {
                    path: 'listofid',
                    name: 'listofid',
                    component: Listofid
                },
                {
                    path: 'detail',
                    name: 'detail',
                    component: Detail
                },
                {
                    path: 'car',
                    name: 'car',
                    component: Car
                },
                {
                    path: 'complete',
                    name: 'complete',
                    component: Complete
                },
                {
                    path: 'confirm',
                    name: 'confirm',
                    component: Confirm
                },
                {
                    path: 'personal',
                    name: 'personal',
                    component: Personal,
                    redirect:'/personal/singleorder',
                    children:[
                        {
                            path: 'singleorder',
                            name: 'singleorder',
                            component: Singleorder,
                        },
                        {
                            path: 'geren',
                            name: 'geren',
                            component: Geren,
                        }
                    ]
                }
            ]
        }
    ]
})
