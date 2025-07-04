import Home from "../view/Home.vue"
import Movie from "../view/Movie.vue"
import Repository from '../view/Repository.vue';
import Login from '../components/login.vue';
import Register from '../components/register.vue';
import Profil from '../view/Profil.vue'
import Cart from '../view/Cart.vue'
import { createRouter, createWebHistory } from "vue-router"

const routes = [
  { path: "/",
    component: Home },
  { path: "/movies/:id", 
    name:'Movie' ,
    component: Movie },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/profil',
    name: 'Profil',
    component: Profil,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/repository',
    name: 'Repository',
    component: Repository,
  }, 
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
  }
  ,{
  path: '/search',
  name: 'search',
  component: () => import('../view/searchResults.vue'),
},


  {
    path: '/',
    redirect: '/login',
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})