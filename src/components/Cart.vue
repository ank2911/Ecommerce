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
              <v-img :src="item.thumbnail" alt="Product Image" class="item-image" />
            </v-col>
            <v-col cols="12" md="8">
              <div class="item-details">
                <h3>{{ item.title }}</h3>
                <p>Price: ${{ (item.price - (item.price * item.discountPercentage) / 100).toFixed(2) }}</p>
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
        <v-btn color="primary" @click="checkout">Checkout</v-btn>
        <span class="total-price">Total: ${{ totalPrice.toFixed(2) }}</span>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup>
import { useCartStore } from '../stores/cartStore';
import { computed } from 'vue';

// Use the cart store
const cartStore = useCartStore();

// Computed property for cart items
const cart = computed(() => cartStore.cart);

// Methods for manipulating cart items
const increaseQty = (item) => {
  cartStore.addCart(item);
};

const decreaseQty = (item) => {
  cartStore.delCart(item);
};

// Computed property for total price
const totalPrice = computed(() => {
  return cart.value.reduce((total, item) => total + (((item.price -(item.price * item.discountPercentage)/100)) * item.qty), 0);
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
  width: 30px;
  height: 30px;
}
.v-container {
  margin-top: 50px;
  min-height: 77.3vh;
}
.v-card-title{
  text-align: center;
}
</style>
