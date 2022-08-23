import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import store from '../store'
const routes: Array<RouteRecordRaw> = [

  {
    path:"/",
    name:"home",
    component: () => import('../views/index.vue')
  },
  {
    path: '/login',
    name: 'login',
   
    component: () => import( '../views/Login.vue')
  },
  {
    path:"/goodsDec",
    name:"goodsDec",
    component: () => import('@/views/goodsDec.vue')
  },
  {
    path:"/goodsList",
    name:"goodsList",
    component: () => import('@/views/goodsList.vue')
  },
  {
    path:"/goodsCar",
    name:"goodsCar",
    component: () => import('@/views/goodsCar.vue')
  },
  {
    path:"/orderList",
    name:"orderList",
    component: () => import('@/views/orderList.vue')
  },
  {
    path:"/my",
    name:"my",
    component: () => import('@/views/my.vue')
  },
  {
    path:"/address",
    name:"address",
    component: () => import('@/views/address.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to,from,next)=>{
  // from 从哪个路由跳转的
  //to 到达的路由
  // 只有执行了next页面才会被渲染 
  // 判断用户是否登录
  /**
    如果用户没有登录则进行跳转到登录页的操作
    否则正常跳转
    */ 
  console.log("store----",store.state.value)
  // 
  if(store.state.value.user&&store.state.value.user.id){
    // 用户已登录  
    next()
  }else{
    // 未登录
    if(to.path=="/login"){
      next()
      return
    }
    next("/login")
  }
})

export default router
