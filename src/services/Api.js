import { useRoute } from "vue-router";
import axios from "axios";

export async function fetchProducts() {
  const response = await fetch("https://dummyjson.com/products");
  const data = await response.json();
  return data.products;
}

// export async function fetchProductById() {
//   const route = useRoute();
//   const productId = route.params.id;
//   const response = await fetch(`https://dummyjson.com/products/${productId}`);
//   const data = await response.json();
//   return data;
// }

export async function fetchProductById() {
  const route = useRoute();
  const productId = route.params.id;
  console.log(productId);
  const SHOPIFY_API_URL =
    `https://vue-storefront-api.myshopify.com/api/2024-07/graphql.json/`;
  const SHOPIFY_API_TOKEN = "2361c98e6ec9889df7bab8ba073056f0";

  const shopifyClient = axios.create({
    baseURL: SHOPIFY_API_URL,
    headers: {
      "X-Shopify-Storefront-Access-Token": SHOPIFY_API_TOKEN,
      "Content-Type": "application/json",
    },
  });
  const query = `
      product(id: $productId) {
        id
        title
        description
        images(first: 1) {
          edges {
            node {
              url
            }
          }
        }
        variants(first: 1) {
          edges {
            node {
              priceV2 {
                amount
                currencyCode
              }
            }
          }
        }
      }
  `;
  const response = await shopifyClient.post("", { query:query, variables: {id: `${productId}`} });
  console.log(response.data);
  //return response.data.data.products.edges;
}
