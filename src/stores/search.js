import { defineStore } from "pinia";
import {data} from "../services/Api.js";
export const useSearchStore = defineStore({
    id: "search",
    state:()=>({
        search:'',
        Products:[]
    }),
    actions:{
        async setSearch(search){
            this.search=search;
            const response=(await data)
            this.Products=response;
            this.Products=this.Products.filter((product)=>{
                return product.title.toLowerCase().includes(this.search.toLowerCase());
            });
           
        }
    },
    getters:{
        Search(){ 
           return this.Products;
        }
    }
});