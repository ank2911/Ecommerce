import { createRouter, createWebHistory } from "vue-router";
import ProductList from "../pages/ProductList.vue";
import ProductDisplay from "../pages/ProductDisplay.vue";

const routes = [
    {path:'/' , name:'ProductList', component: ProductList},
    {path:'/product/:id' , name:'ProductDisplay', component: ProductDisplay},
];

const router = createRouter({   
    history: createWebHistory(),
    routes
});

export default router;