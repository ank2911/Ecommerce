<template>
  <v-container v-if="product">
    <v-btn to="/" class="go-back-btn">
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>
    <v-card>
      <v-img :src="product[0].node.images.edges[0].node.url"></v-img>
      <v-card-title>{{ product[0].node.title }}</v-card-title>
      <v-card-subtitle>{{ product[0].node.description }}</v-card-subtitle>
      <!-- <v-card-text>
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
      </v-card-text> -->
        <v-card-text>
              <div v-if="product[0].node.variants.edges[0].node.compareAtPriceV2">
                <p class="price">
                  {{currencyIcon}} {{product[0].node.variants.edges[0].node.compareAtPriceV2.amount }}   
                </p>
                <p class="actual-price"  >
                {{currencyIcon}} {{product[0].node.variants.edges[0].node.priceV2.amount }}
              </p>
              </div>
              <div v-else> 
              <p class="actual-price"  >
                {{currencyIcon}} {{product[0].node.variants.edges[0].node.priceV2.amount }}
              </p>
            </div>
            </v-card-text> 
      <v-card-actions>
        <div v-if="getProductQuantity(product[0].node) > 0">
          <v-btn icon @click="delFromCart(product[0].node)">
            <v-icon>mdi-minus</v-icon>
          </v-btn>
          <span>&nbsp;{{ getProductQuantity(product[0].node) }}</span>
          <v-btn icon @click="addToCart(product[0].node)">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </div>

        <div v-else>
            <v-btn color="primary" outlined @click="addToCart(product.node)">
              Add to Cart
            </v-btn>
        </div>
      </v-card-actions>
      <v-btn @click="addToCompare(product)">Compare</v-btn>
    </v-card>
    <ComparisonTable :comparisonTable="comparisonTable" />
    <!-- Reviews and Comments
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
    </v-row>-->
  </v-container> 
</template>

<script>
import { ref, onMounted } from "vue";
import { fetchProductById2 } from "../services/Api";
import { useCartStore } from "../stores/cartStore"; // Import the cart store
import { useCurrencyStore } from "../stores/currencyStore";
import { computed } from "vue";
import ComparisonTable from "../components/ComparisonTable.vue";
export default {
  components: {
      ComparisonTable
    },
  setup() {
    const product = ref(null);
    const cartStore = useCartStore(); // Access the cart store
    const currencyStore = useCurrencyStore();
    const comparisonTable = ref([]);
    const fetchProductDetails = async () => {
      const response = await fetchProductById2();
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
  function addToCompare(product) {
    comparisonTable.value =product;
    };
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
      addToCompare,
      comparisonTable,
    };
  },
};
</script>

<style scoped>
.v-container {
  margin-top: 50px;
}
.price {
  text-decoration: line-through;
  margin-right: 10px;
  font-size: 16px;
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
