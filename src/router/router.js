import { createRouter, createWebHistory } from "vue-router";
import ProductList from "../pages/ProductList.vue";
import ProductDisplay from "../pages/ProductDisplay.vue";
import Cart from "../components/Cart.vue";
import Search from "../components/Search.vue";

const routes = [
    {path:'/' , name:'ProductList', component: ProductList},
    {path:'/product/:id' , name:'ProductDisplay', component: ProductDisplay},
    {path:'/cart', name:'Cart', component:Cart},
    {path:"/search", component: Search}

];

const router = createRouter({   
    history: createWebHistory(),
    routes
});

export default router;