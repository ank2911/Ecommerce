// src/stores/cartStore.js
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCartStore = defineStore('cart', () => {
  const cart = ref([]);

  const addCart = (product) => {
    const exist = cart.value.find((item) => item.id === product.id);
    if (exist) {
      // Increase the Quantity
      cart.value = cart.value.map((item) =>
        item.id === product.id ? { ...item, qty: item.qty + 1 } : item
      );
      return;
    } 
      cart.value = [...cart.value, { ...product, qty: 1 }];
  };

  const delCart = (product) => {
    const exist = cart.value.find((item) => item.id === product.id);
    if (exist.qty === 1) {
      cart.value = cart.value.filter((item) => item.id !== product.id);
    } else {
      cart.value = cart.value.map((item) =>
        item.id === product.id ? { ...item, qty: item.qty - 1 } : item
      );
    }
  };

  return { cart, addCart, delCart };
});
