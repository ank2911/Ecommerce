// src/stores/cartStore.js
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCartStore = defineStore('cart', () => {
  const cart = ref([]);

  const addCart = (product) => {
    const exist = cart.value.find((x) => x.id === product.id);
    if (exist) {
      // Increase the Quantity
      cart.value = cart.value.map((x) =>
        x.id === product.id ? { ...x, qty: x.qty + 1 } : x
      );
    } else {
      cart.value = [...cart.value, { ...product, qty: 1 }];
    }
  };

  const delCart = (product) => {
    const exist = cart.value.find((x) => x.id === product.id);
    if (exist.qty === 1) {
      cart.value = cart.value.filter((x) => x.id !== product.id);
    } else {
      cart.value = cart.value.map((x) =>
        x.id === product.id ? { ...x, qty: x.qty - 1 } : x
      );
    }
  };

  return { cart, addCart, delCart };
});
