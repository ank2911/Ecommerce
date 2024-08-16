<template>
  <v-container class="search-page" v-for="items in searchItem.Search">
    <v-card>
      <v-img :src="items.thumbnail" height="300px" alt="Product Image"></v-img>
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
export default {
  name: "search",
  data() {
    return {
      searchItem: useSearchStore(),
      cartStore: useCartStore(),
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
  },
};
</script>
<style>
.product-image {
  background-color: rgb(206, 206, 210);
}
.search-page {
  margin-top: 40px;
  margin-bottom: 40px;
}
</style>
