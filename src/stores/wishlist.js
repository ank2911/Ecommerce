import {defineStore} from "pinia";
import {reactive} from "vue";

export const useWishlistStore = defineStore('wishlist', {
    state: () => ({
        wishlist: reactive([]),
    }),
    actions: {
        addWishlist(product) {
            
            const exists = this.wishlist.find(item => item.id === product.id);
            if (!exists) {
                this.wishlist.push(product);
            }
        },
        removeWishlist(product) {

            this.wishlist = this.wishlist.filter((p) => p.id !== product.id);
            
           

            // const index = this.wishlist.findIndex((p) => p.id === product.id);
            // if (index !== -1) {
            //     this.wishlist.splice(index, 1);
            // }
        
            
        },
       
    },
    getters: {
        getWishlist: (state) => 
            state.wishlist,
        
    },  

})