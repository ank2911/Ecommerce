import { defineStore } from "pinia";
import { ref } from "vue";

export const useWishlistStore = defineStore("wishlist", {
  state: () => ({
    wishlist: ref([]),
  }),
  actions: {
    addWishlist(product) {
      const exists = wishlist.value.find((item) => item.id === product.id);
      if (!exists) {
        wishlist.value.push(product);
      }
    },
    removeWishlist(product) {
      wishlist.value = wishlist.value.filter((item) => item.id !== product.id);
    },
  },
  getters: {
    getWishlist(){
        return wishlist.value;
    }
  },
});
