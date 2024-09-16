<template>
  <v-container>
    <v-btn to="/" class="go-back-btn">
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>
    <v-card>
      <v-card-title>
        <h2 class="headline">Wishlist</h2>
      </v-card-title>
      <v-card-text>
        <div v-if="wishlistItems.length === 0" class="empty-wishlist">
          Your wishlist is empty.
        </div>
        <div v-else>
          <v-row v-for="item in wishlistItems" :key="item.id" class="cart-item">
            <v-col cols="12" md="4">
              <v-img
                :src="item.images.edges[0].node.url"
                alt="Product Image"
                class="item-image"
              />
            </v-col>
            <v-col cols="12" md="8">
              <div class="item-details">
                <h2>{{ item.title }}</h2>
                <h4>
                  Price:₹{{
              (
              item.variants.edges[0].node.priceV2.amount
              // item.discountPercentage
            )
          }}
                </h4>
                <p>{{ item.description }}</p>
              </div>
 
              <v-btn
                class="add"
                color="primary"
                outlined
                @click="addToCart(item)"
                >Add to cart</v-btn
              >
 
              <v-btn
                class="remove"
                color="red"
                @click="removeFromWishlist(item)"
                >Remove</v-btn
              >
            </v-col>
          </v-row>
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>
 
<script>
import { useWishlistStore } from "../stores/wishlist";
import { computed } from "vue";
import { useCartStore } from "../stores/cartStore";
import { useCurrencyStore } from "../stores/currencyStore";
export default {
  setup() {
    const cartStore = useCartStore();
    const currencyStore = useCurrencyStore();
    const wishlistStore = useWishlistStore();
    const wishlistItems = computed(() => wishlistStore.getWishlist);

    
 
    const addToCart = (item) => {
      // console.log("Adding to cart:", item);
      cartStore.addCart(item);
    };
 
    const removeFromWishlist = (item) => {
      wishlistStore.removeWishlist(item);
    };
    const convertedPrice = (price, discount) => {
    return currencyStore.convertPrice(price, discount);
  }
  const currencyIcon =computed(() => {
    return currencyStore.currency === 'USD' ? '$' : '₹';
  });
    return {
      wishlistItems,
      removeFromWishlist,
      addToCart,
      convertedPrice,
      currencyIcon,
    };
  },
};
</script>
 
<style scoped>
.cart-item {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding: 10px 0;
}
 
.item-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-right: 15px;
}
 
.item-details {
  flex: 1;
}
 
.item-details h3 {
  margin: 0 0 10px;
}
 
.item-details p {
  margin: 5px 0;
}
 
.quantity-controls {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
}
 
.quantity-controls button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 5px 10px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 3px;
}
 
.quantity-controls button:hover {
  background-color: #0056b3;
}
 
.empty-wishlist {
  text-align: center;
  font-size: 18px;
  color: #666;
}
 
.card-footer {
  background-color: #f8f9fa;
  padding: 15px;
  text-align: right;
}
 
.total-price {
  margin-left: 50px;
  font-size: 18px;
  font-weight: bold;
}
 
.v-btn {
  width: 30px;
  height: 30px;
}
.v-container {
  margin-top: 50px;
  min-height: 77.3vh;
}
.v-card-title {
  text-align: center;
}
 
.go-back-btn {
  background-color: #8c94c4;
  font-size: 15px;
  margin-bottom: 10px;
}
 
.remove {
  width: 80px;
  padding: 5px;
}
 
.add {
  width: 120px;
  padding: 5px;
  margin-right: 10px;
}
 
.empty-cart {
  text-align: center;
  font-size: 18px;
  color: #666;
}
.currency-icon {
  font-size: 18px;
}
</style>