<template>
  <Carousel />
  <div class="container">
    <!-- Category Filter -->
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

    <!-- Products Grid -->
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
              <span
                style="text-decoration: line-through; margin-right: 10px; font-size: 16px;"
              >
                ${{ product.price }}
              </span>
              <span style="font-size: 12px;">{{ product.discountPercentage }}% off</span>
            </div>
            <p style="font-size: 16px; margin-top: 8px;">
              ${{ discountedPrice(product.price, product.discountPercentage) }}
            </p>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" outlined @click="addToCart(product)">
              Add to Cart
            </v-btn>
            <v-btn
              color="secondary"
              :to="{ name: 'ProductDisplay', params: { id: product.id } }"
            >
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
  <Footer />
</template>

<script>
import Navbar from '../components/Navbar.vue';
import Footer from '../components/Footer.vue';
import Carousel from '../components/Carousel.vue';
import { useCartStore } from '../stores/cartStore';

export default {
  data() {
    return {
      products: [],
      categories: [],
      selectedCategory: '',
      page: 1,
      itemsPerPage: 8,
    };
  },
  components: {
    Navbar,
    Footer,
    Carousel,
  },
  computed: {
    filteredProducts() {
      if (this.selectedCategory && this.selectedCategory !== 'All') {
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
      const response = await fetch('https://dummyjson.com/products');
      const data = await response.json();
      this.products = data.products;

      // Fetch categories dynamically
      this.categories = [
        'All',
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
</style>
