<template>
  <Navbar />
  <div class="container">
    <div class="card">
      <div class="card-header">
        <h2 class="headline">Shopping Cart</h2>
      </div>
      <div class="card-body">
        <div v-if="cart.length > 0">
          <div v-for="item in cart" :key="item.id" class="cart-item">
            <img :src="item.thumbnail" alt="Product Image" class="item-image" />
            <div class="item-details">
              <h3>{{ item.title }}</h3>
              <p>Price: ${{ item.price.toFixed(2) }}</p>
              <div class="quantity-controls">
                <button @click="decreaseQty(item)">-</button>
                <span>{{ item.qty }}</span>
                <button @click="increaseQty(item)">+</button>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="empty-cart">
          Your cart is empty!
        </div>
      </div>
      <div class="card-footer">
        <div class="checkout-info">
          <button class="checkout-button">Checkout</button>
          <span class="total-price">Total: ${{ totalPrice.toFixed(2) }}</span>
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script setup>
import Navbar from './Navbar.vue'
import Footer from './Footer.vue'
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
  return cart.value.reduce((total, item) => total + (item.price * item.qty), 0);
});
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.card {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.card-header {
  margin-top: 20px;
  background-color: #f8f9fa;
  padding: 15px;
}

.card-header .headline {
  margin: 0;
  font-size: 24px;
  font-weight: bold;
}

.card-body {
  padding: 15px;
}

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

.checkout-button {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  margin-right: 20px;
}

.checkout-button:disabled {
  background-color: #d6d6d6;
  cursor: not-allowed;
}

.total-price {
  font-size: 18px;
  font-weight: bold;
}
</style>
