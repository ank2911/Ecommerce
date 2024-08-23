import { createRouter, createWebHistory } from "vue-router";
import ProductList from "../pages/ProductList.vue";
import ProductDisplay from "../pages/ProductDisplay.vue";
import Cart from "../pages/Cart.vue";
import Search from "../pages/Search.vue";
import Wishlist from "../pages/WishList.vue";
import About from "../pages/About.vue";

const routes = [
    {path:'/' , name:'ProductList', component: ProductList},
    {path:'/product/:id' , name:'ProductDisplay', component: ProductDisplay},
    {path:'/cart', name:'Cart', component:Cart},
    {path:"/search", component: Search},
    {path:"/wishlist", name: 'Wishlist', component: Wishlist},
    {path:"/about", name:'About', component: About},
 ];
 
const router = createRouter({  
    history: createWebHistory(),
    routes
});
 
export default router;