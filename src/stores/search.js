import { defineStore } from "pinia";

export const useSearchStore = defineStore({
    id: "search",
    state:()=>({
        search:'',
    }),
    actions:{
        setSearch(search){
            this.search=search
        }
    },
    getters:{
        Search(){
            return this.search
        }
    }
});