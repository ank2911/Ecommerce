<template>
  <Carousel />
  <div class="container">
    <!-- <v-row align="center">
      <v-col class="d-flex" cols="12" sm="4">
        <v-select
          v-model="selectedCategory"
          :items="categories"
          label="Filter by Category"
          @change="fetchProducts"
          outlined
        ></v-select>
      </v-col>
    </v-row> -->

    <v-row>
      <v-col
        v-for="product in paginatedProducts"
        :key="product.node.id"
        cols="12"
        sm="6"
        md="3"
      >
        <v-card max-width="400" class="card">
          <v-img
            class="product-image"
            :src="product.node.images.edges[0].node.url"
            height="150px"
            alt="Product Image"
            contain
          ></v-img>
          <v-icon
            class="heart"
            :class="{ wishlist: true, 'wishlist-active': product.node.inWishlist }"
            @click="addToWishlist(product.node)"
          >
            mdi-heart
          </v-icon>

          <v-card-title>{{ product.node.title }}</v-card-title>
          <v-card-subtitle>{{ product.node.description }}</v-card-subtitle>
          <v-card-text>
            <!-- <div v-if="product.node.variants.edges[0].node.compareAtPriceV2" >
              <p class="price" >
                {{currencyIcon}} {{product.node.variants.edges[0].node.compareAtPriceV2.amount }}   
              </p>
              
              <p class="actual-price"  >
              {{currencyIcon}} {{product.node.variants.edges[0].node.priceV2.amount }}
            </p>
            </div> -->
            <div > 
            <p class="actual-price"  >
              {{currencyIcon}} {{product.node.variants.edges[0].node.priceV2.amount }}
            </p>
          </div>
          </v-card-text> 

          <v-card-actions>
            <div v-if="getProductQuantity(product.node) > 0">
              <v-btn icon @click="delFromCart(product.node)">
                <v-icon>mdi-minus</v-icon>
              </v-btn>
              <span>&nbsp;{{ getProductQuantity(product.node) }}</span>
              <v-btn icon @click="addToCart(product.node)">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </div>
            <v-btn v-else color="primary" outlined @click="addToCart(product.node)">
              Add to Cart
            </v-btn>
            <v-btn color="secondary" @click="Details(product)">
              View Details
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <!-- Pagination -->
     <v-row justify="center">
      <v-col cols="5">
    <v-pagination
      v-model="page"
      :length="pageCount"
      rounded
      color="primary"
    ></v-pagination>
  </v-col>
  </v-row>
  </div>
</template>

<script>
import axios from "axios";
import Carousel from "../components/Carousel.vue";
import { useCartStore } from "../stores/cartStore";
import { useWishlistStore } from "../stores/wishlist";
import { useCurrencyStore } from "../stores/currencyStore";
import { fetchProducts2}  from "../services/Api";
import router from '../router/router'
export default {
  data() {
    return {
      cartStore: useCartStore(),
      wishlistStore: useWishlistStore(),
     currencyStore: useCurrencyStore(),
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
    //  filteredProducts() {
    //    if (this.selectedCategory && this.selectedCategory !== "All") {
    //      return this.products.filter(
    //       (product) => product.category === this.selectedCategory
    //      );
    //    }
    //    return this.products;
    //  },
    paginatedProducts() {
      const start = (this.page - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.products.slice(start, end);
    },
    pageCount() {
      return Math.ceil(this.products.length / this.itemsPerPage);
    },
    currencyIcon() {
    return this.currencyStore.currency === 'USD' ? '$' : '₹';
  },
  },
   methods: {
    Details(product){
      router.push({ name: "ProductDisplay",params: { id: product.node.id } });
    },
    // async fetchProducts() {
    //   const response=(await fetchProducts());
    //   this.products = response;
    //   console.log(this.products);
    //   // Fetch categories dynamically
    //   this.categories = [
    //     "All",
    //     ...new Set(this.products.map((product) => product.category)),
    //   ];
    // },
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
    addToWishlist(product) {
      this.wishlistStore.addWishlist(product);

      // console.log(wishlistStore)
      // console.log(this.wishlistStore.getWishlist)

      this.wishlistStore.getWishlist.find((item) => item.id === product.id)
        ? (product.inWishlist = true)
        : (product.inWishlist = false);

      // product.inWishlist = !product.inWishlist;
    },
    getData(){
      fetchProducts2().then((response) => {
        this.products=response
      });
    }
  },
  created() {
 //   this.fetchProducts();
    this.getData();
   
  },
  // watch: {
  //   selectedCategory() {
  //     this.page = 1; // Reset to the first page when changing category
  //   },
  // },
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
  margin-top: 8px;
}
.discount {
  font-size: 12px;
  color: rgb(218, 115, 116);
}
.product-image {
  position: relative;
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

.wishlist-active {
  color: red;
}

.wishlist:hover {
  color: red;
}
.heart {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}
.currency-icon {
  font-size: 18px;
}
</style>
