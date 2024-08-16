<template>
  <Carousel />
  <div class="container">
    <v-row align="center">
      <v-col class="d-flex" cols="12" sm="4">
        <v-select
          v-model="selectedCategory"
          :items="categories"
          label="Filter by Category"
          @change="fetchProducts"
          outlined
        ></v-select>
      </v-col>
    </v-row>

    <v-row>
      <v-col
        v-for="product in paginatedProducts"
        :key="product.id"
        cols="12"
        sm="6"
        md="3"
      >
        <v-card max-width="400" class="card">
          <v-img
            class="product-image"
            :src="product.thumbnail"
            height="150px"
            alt="Product Image"
            contain
          ></v-img>
          <v-card-title>{{ product.title }}</v-card-title>
          <v-card-subtitle>{{ product.description }}</v-card-subtitle>
          <v-card-text>
            <div>
              <span class="price">${{ product.price }}</span>
              <span class="discount"
                >{{ product.discountPercentage }}% off</span
              >
            </div>
            <p class="actual-price">
              ${{ discountedPrice(product.price, product.discountPercentage) }}
            </p>
          </v-card-text>
          <v-card-actions>
            <div v-if="getProductQuantity(product) > 0">
              <v-btn icon @click="delFromCart(product)">
                <v-icon>mdi-minus</v-icon>
              </v-btn>
              <span>&nbsp;{{ getProductQuantity(product) }}</span>
              <v-btn icon @click="addToCart(product)">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </div>
            <v-btn v-else color="primary" outlined @click="addToCart(product)">
              Add to Cart
            </v-btn>
            <v-btn color="secondary" :to="`/product/${product.id}`">
              View Details
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Pagination -->
    <v-pagination
      v-model="page"
      :length="pageCount"
      rounded
      color="primary"
    ></v-pagination>
  </div>
</template>

<script>
import Carousel from "../components/Carousel.vue";
import { useCartStore } from "../stores/cartStore";

export default {
  data() {
    return {
      cartStore: useCartStore(),
      products: [],
      categories: [],
      selectedCategory: "",
      page: 1,
      itemsPerPage: 8,
    };
  },
  components: {
    Carousel,
  },
  computed: {
    filteredProducts() {
      if (this.selectedCategory && this.selectedCategory !== "All") {
        return this.products.filter(
          (product) => product.category === this.selectedCategory
        );
      }
      return this.products;
    },
    paginatedProducts() {
      const start = (this.page - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredProducts.slice(start, end);
    },
    pageCount() {
      return Math.ceil(this.filteredProducts.length / this.itemsPerPage);
    },
  },
  methods: {
    async fetchProducts() {
      const response = await fetch("https://dummyjson.com/products");
      const data = await response.json();
      this.products = data.products;
      console.log(this.products);
      // Fetch categories dynamically
      this.categories = [
        "All",
        ...new Set(this.products.map((product) => product.category)),
      ];
    },
    discountedPrice(price, discount) {
      return (price - (price * discount) / 100).toFixed(2);
    },
    addToCart(product) {
      const cartStore = useCartStore(); // Access the cart store
      cartStore.addCart(product); // Call the addCart method
    },
    delFromCart(product) {
      const cartStore = useCartStore();
      cartStore.delCart(product);
    },
    getProductQuantity(product) {
      const item = this.cartStore.cart.find((item) => item.id === product.id);
      return item ? item.qty : 0;
    },
  },
  created() {
    this.fetchProducts();
  },
  watch: {
    selectedCategory() {
      this.page = 1; // Reset to the first page when changing category
    },
  },
};
</script>

<style scoped>
.container {
  padding: 20px;
  margin: 30px;
}
.price {
  text-decoration: line-through;
  margin-right: 10px;
  font-size: 16px;
}
.actual-price {
  font-size: 16px; 
  margin-top: 8px
}
.discount {
  font-size: 12px;
  color: rgb(218, 115, 116);
}
.product-image {
  background-color: rgb(206, 206, 210);
}
.card {
  margin-bottom: 20px;
  transition: transform 0.2s;
}
.card:hover {
  transform: scale(1.05);
}
.v-card-actions {
  margin-top: -15px;
}
</style>
