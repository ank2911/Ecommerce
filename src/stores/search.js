import { defineStore } from "pinia";
import { fetchProducts } from "../services/Api";
export const useSearchStore = defineStore({
    id: "search",
    state:()=>({
    
        Products:[]
    }),
    actions:{
        async setSearch(search){
            const response=(await fetchProducts());
            this.Products=response;
            this.Products=this.Products.filter((product)=>{
                return product.title.toLowerCase().includes(search.toLowerCase());
            });
           
        }
    },
    getters:{
        Search(){ 
           return this.Products;
        }
    }
});