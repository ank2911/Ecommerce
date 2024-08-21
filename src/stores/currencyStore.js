import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCurrencyStore = defineStore('currency', () => {
  const selectedCurrency = ref('USD');
  const conversionRate = ref({
    USD: 1,
    INR: 74.85,
    GBP: 0.75,
  });

  const setCurrency = (currency) => {
    selectedCurrency.value = currency;
  }
  const convertPrice = (price) => {
    return (price * conversionRate.value[selectedCurrency.value]).toFixed(2);

  }
  return { setCurrency, convertPrice, conversionRate, selectedCurrency };
});