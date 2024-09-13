<template>
  <v-container v-if="product">
    <v-btn to="/" class="go-back-btn">
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>
    <v-card>
      <v-img
        :src="product.thumbnail"
        height="300px"
        alt="Product Image"
      ></v-img>
      <v-card-title>{{ product.title }}</v-card-title>
      <v-card-subtitle>{{ product.description }}</v-card-subtitle>
      <v-card-text>
        <p><strong>Original Price:</strong> {{currencyIcon}}{{ actualPrice(product.price) }}</p>
        <p>
          <strong>Discounted Price:</strong> {{currencyIcon}} {{
              convertedPrice(
              product.price,
              product.discountPercentage
            )
          }}
        </p>
        <p>
          <strong>({{ product.warrantyInformation }})</strong>
        </p>
        <p><strong>Category:</strong> {{ product.category }}</p>
        <p><strong>Rating:</strong> {{ product.rating }}</p>
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

        <div v-else>
            <v-btn color="primary" outlined @click="addToCart(product)">
              Add to Cart
            </v-btn>
        </div>
      </v-card-actions>
    </v-card>

    <!-- Reviews and Comments -->
    <v-card class="mt-5">
      <v-card-title>User Reviews</v-card-title>
      <v-divider></v-divider>
      <v-list>
        <v-list-item
          v-for="review in product.reviews"
          :key="review.reviewerEmail"
        >
            <v-list-item-title style="margin-left: 8px">{{
              review.reviewerName
            }}</v-list-item-title>
            <v-list-item-subtitle style="margin-left: 8px">{{
              review.comment
            }}</v-list-item-subtitle>
          <v-list-item-action>
            <v-rating
              color="warning"
              v-model="review.rating"
              readonly
              dense
              size="30"
            ></v-rating>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-card>
  </v-container>
  <v-container v-else>
    <v-row>
      <v-col cols="12" md="6">
        <v-skeleton-loader
          class="mx-auto border"
          width="900"
          height="400"
          type="card-avatar, actions"
        ></v-skeleton-loader>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ref, onMounted } from "vue";
import { fetchProductById } from "../services/Api";
import { useCartStore } from "../stores/cartStore"; // Import the cart store
import { useCurrencyStore } from "../stores/currencyStore";
import { computed } from "vue";
export default {
  setup() {
    const product = ref(null);
    const cartStore = useCartStore(); // Access the cart store
    const currencyStore = useCurrencyStore();

    const fetchProductDetails = async () => {
      const response = await fetchProductById();
      product.value = response;
    };

    const addToCart = (product) => {
      cartStore.addCart(product); 
    };

    function delFromCart(product) {
      const cartStore = useCartStore();
      cartStore.delCart(product);
    }

    function getProductQuantity(product) {
      const item = cartStore.cart.find((item) => item.id === product.id);
      return item ? item.qty : 0;
    }
  function convertedPrice(price, discount) {
    return currencyStore.convertPrice(price, discount);
  }
  function actualPrice(price){
    return currencyStore.actualPrice(price);
  }
  const currencyIcon =computed(() => {
    return currencyStore.currency === 'USD' ? '$' : '₹';
  });
    onMounted(fetchProductDetails);

    return {
      product,
      addToCart, 
      delFromCart,
      getProductQuantity,
      convertedPrice,
      actualPrice,
      currencyIcon,
      cartStore,
    };
  },
};
</script>

<style scoped>
.v-container {
  margin-top: 50px;
}
.go-back-btn {
  background-color: #8c94c4;
  font-size: 15px;
  margin-bottom: 10px;
}
.v-card-subtitle {
  white-space: normal;
}
.currency-icon {
  font-size: 18px;
}
</style>
