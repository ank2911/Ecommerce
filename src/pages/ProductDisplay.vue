<template>
  <v-container v-if="product">
    <v-btn :to="{ name: 'ProductList' }">
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
        <p><strong>Original Price:</strong> ${{ product.price }}</p>
        <p>
          <strong>Discounted Price:</strong> ${{
            discountedPrice(product.price, product.discountPercentage)
          }}
        </p>
        <p><strong>Category:</strong> {{ product.category }}</p>
        <p><strong>Rating:</strong> {{ product.rating }}</p>
      </v-card-text>
    </v-card>

    <!-- Reviews and Comments -->
    <v-card class="mt-5">
      <v-card-title>User Reviews</v-card-title>
      <v-divider></v-divider>
      <v-list>
        <v-list-item
          v-for="review in product.reviews"
          :key="review.reviewerName"
        >
          <v-list-item-content>
            <v-list-item-title style="margin-left: 8px">{{
              review.reviewerName
            }}</v-list-item-title>
            <v-list-item-subtitle style="margin-left: 8px">{{
              review.comment
            }}</v-list-item-subtitle>
          </v-list-item-content>
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
</template>

<script>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
export default {
  setup() {
    const route = useRoute();
    const product = ref(null);

    const fetchProductDetails = async () => {
      const productId = route.params.id;
      const response = await fetch(
        `https://dummyjson.com/products/${productId}`
      );
      const data = await response.json();
      product.value = data;
    };

    const discountedPrice = (price, discount) => {
      return (price - (price * discount) / 100).toFixed(2);
    };

    onMounted(fetchProductDetails);

    return {
      product,
      discountedPrice,
    };
  },
};
</script>

<style scoped>
.v-container {
  margin-top: 50px;
}
.v-btn {
  background-color: #ced4f4;
  font-size: 20px;
  margin-bottom: 10px;
}
.v-card-subtitle {
  white-space: normal;
}
</style>
