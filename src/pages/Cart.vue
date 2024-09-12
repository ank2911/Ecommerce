<template>
  <v-container>
    <v-card class="mx-auto my-5" max-width="800" outlined>
      <v-card-title>
        <h2 class="headline">Shopping Cart</h2>
      </v-card-title>
      <v-card-text>
        <div v-if="cart.length > 0">
          <v-row v-for="item in cart" :key="item.id" class="cart-item">
            <v-col cols="12" md="4">
              <v-img :src="item.images.edges[0].node.url" alt="Product Image" class="item-image" />
            </v-col>
            <v-col cols="12" md="8">
              <div class="item-details">
                <h3>{{ item.title }}</h3>
                
                 <div v-if="item.variants.edges[0].node.compareAtPriceV2">
              <p class="price">
                {{currencyIcon}} {{item.variants.edges[0].node.compareAtPriceV2.amount }}   
              </p>
              <p class="actual-price"  >
              {{currencyIcon}} {{item.variants.edges[0].node.priceV2.amount }}
            </p>
            </div>
            <div v-else> 
            <p class="actual-price"  >
              {{currencyIcon}} {{item.variants.edges[0].node.priceV2.amount }}
            </p>
          </div>
  
                <div class="quantity-controls">
                  <v-btn icon @click="decreaseQty(item)">
                    <v-icon>mdi-minus</v-icon>
                  </v-btn>
                  <span>{{ item.qty }}</span>
                  <v-btn icon @click="increaseQty(item)">
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </div>
              </div>
            </v-col>
          </v-row>
        </div>
        <div v-else class="empty-cart">
          Your cart is empty!
        </div>
      </v-card-text>
      <v-card-actions class="footer">
        <v-spacer></v-spacer>
        <v-btn color="primary">Checkout</v-btn>
        <span class="total-price">Total:{{currencyIcon}}{{ totalPrice.toFixed(2) }}</span>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup>
import { useCartStore } from '../stores/cartStore';
import { useCurrencyStore } from '../stores/currencyStore';
import { computed } from 'vue';

// Use the cart store
const cartStore = useCartStore();
const currencyStore = useCurrencyStore();
// Computed property for cart items
const cart = computed(() => cartStore.cart);

// Methods for manipulating cart items
const increaseQty = (item) => {
  cartStore.addCart(item);
};

const decreaseQty = (item) => {
  cartStore.delCart(item);
};
const convertedPrice = (price, discount) => {
    return currencyStore.convertPrice(price, discount);
  }
  const currencyIcon =computed(() => {
    return currencyStore.currency === 'USD' ? '$' : '₹';
  });
// Computed property for total price
const totalPrice = computed(() => {
  return cart.value.reduce((total, item) => {
    const itemPrice = currencyStore.convertPrice(item.price, item.discountPercentage);
    return total + itemPrice * item.qty;
  }, 0);
});
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
.price {
  text-decoration: line-through;
  margin-right: 10px;
  font-size: 16px;
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
  font-size: 12px;
  cursor: pointer;
  border-radius: 3px;
}

.quantity-controls button:hover {
  background-color: #0056b3;
}

.empty-cart {
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
  width: 25px;
  height: 25px;
}
.v-container {
  margin-top: 50px;
  min-height: 77.3vh;
}
.v-card-title{
  text-align: center;
}
</style>
