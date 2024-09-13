import { defineStore } from "pinia";
import { reactive } from "vue";

export const useWishlistStore = defineStore("wishlist", {
  state: () => ({
    wishlist: reactive([]),
  }),
  actions: {
    addWishlist(product) {
      const exists = this.wishlist.find((item) => item.id === product.id);
      if (!exists) {
        this.wishlist.push(product);
      }
    },
    removeWishlist(product) {
      this.wishlist = this.wishlist.filter((item) => item.id !== product.id);
    },
  },
  getters: {
    getWishlist: (state) => state.wishlist,
  },
});
