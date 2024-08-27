import { useRoute } from "vue-router";

export async function fetchProducts() {
    const response = await fetch("https://dummyjson.com/products");
    const data = await response.json();
    return data.products;
}

export async function fetchProductById(){
    const route = useRoute();
    const productId = route.params.id;
    const response = await fetch(
      `https://dummyjson.com/products/${productId}`
    );
    const data = await response.json();
    return  data;
  };