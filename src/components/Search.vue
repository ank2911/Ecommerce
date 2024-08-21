<template>
   
  <v-container class="search-page" >
    <v-btn to="/" class="go-back-btn">
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>
    <v-card v-for="items in searchItem.Search">
      <v-img :src="items.thumbnail" height="300px" alt="Product Image"></v-img>
      <v-icon
            class="heart"
            :class="{ wishlist: true, 'wishlist-active': items.inWishlist}"
            @click="addToWishlist(items)">
            mdi-heart
          </v-icon>
      <v-card-title>{{ items.title }}</v-card-title>
      <v-card-subtitle>{{ items.description }}</v-card-subtitle>
      <v-card-text>
        <p><strong>Original Price:</strong> ${{ items.price }}</p>
        <p>
          <strong>Discounted Price:</strong> ${{
            discountedPrice(items.price, items.discountPercentage)
          }}
        </p>
        <p><strong>Category:</strong> {{ items.category }}</p>
        <p><strong>Rating:</strong> {{ items.rating }}</p>
      </v-card-text>
      <v-card-actions>
        <div v-if="getProductQuantity(items) > 0">
              <v-btn icon @click="cartStore.delCart(items)">
                <v-icon>mdi-minus</v-icon>
              </v-btn>
              <span>&nbsp;{{ getProductQuantity(items) }}</span>
              <v-btn icon @click="cartStore.addCart(items)">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </div>
        <v-btn v-else color="primary" @click="cartStore.addCart(items)">Add to Cart</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script>
import { useSearchStore } from "../stores/search";
import { useCartStore } from '../stores/cartStore';
import { useWishlistStore } from "../stores/wishlist";


export default {
  name: "search",
  data() {
    return {
      searchItem: useSearchStore(),
      cartStore: useCartStore(),
      wishlistStore: useWishlistStore(),
      
    };
  },
  methods: {
    discountedPrice(price, discount) {
      return (price - (price * discount) / 100).toFixed(2);
    },
    getProductQuantity(product) {
      const item = this.cartStore.cart.find((item) => item.id === product.id);
      return item ? item.qty : 0;
    },
    addToWishlist(product) {
      
      this.wishlistStore.addWishlist(product);
      // console.log(product);
      product.inWishlist = !product.inWishlist;
    },
  },
};
</script>
<style>
.v-card{
  margin-bottom: 20px;
}
.product-image {
  background-color: rgb(206, 206, 210);
}
.search-page {
  margin-top: 40px;
  margin-bottom: 40px;
}
.go-back-btn {
  background-color: #8c94c4;
  font-size: 15px;
  margin-bottom: 10px;
}

.heart {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}

.wishlist-active {
  color: red;
}

.wishlist:hover {
  color: red;
}

</style>
