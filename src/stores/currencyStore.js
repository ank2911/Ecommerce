import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCurrencyStore = defineStore('currency', () => {
  const currency = ref('USD');
 
  const toggleCurrency = () => {
    return currency.value = currency.value === 'USD' ? 'INR' : 'USD';
  }
  const actualPrice = (price) => {
    if(currency.value === 'INR'){
      return (price*83.92).toFixed(2);
    }
    return price;
  }
  const convertPrice = (price,discount) => {
   let finalPrice = price-(price*discount/100);
    if(currency.value === 'INR'){
      finalPrice = (finalPrice*83.92);
    }
    return finalPrice.toFixed(2);
  }
  return {  currency,convertPrice, toggleCurrency,actualPrice };
});