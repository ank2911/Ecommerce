import { useRoute } from "vue-router";
import axios from "axios";

export async function fetchProducts() {
  const response = await fetch("https://dummyjson.com/products?limit=1000");
  const data = await response.json();

  return data.products;
}

export async function fetchProductById() {
  const route = useRoute();
  const productId = route.params.id;
  const response = await fetch(`https://dummyjson.com/products/${productId}`);
  const data = await response.json();
  return data;
}
export async function fetchProductById2() {
  const route = useRoute();
  const productId = route.params.id;
  let data;
  const SHOPIFY_API_URL =
    "https://vue-storefront-api.myshopify.com/api/2024-07/graphql.json";
  const SHOPIFY_API_TOKEN = "2361c98e6ec9889df7bab8ba073056f0";
  const shopifyClient = axios.create({
    baseURL: SHOPIFY_API_URL,
    headers: {
      "X-Shopify-Storefront-Access-Token": SHOPIFY_API_TOKEN,
      "Content-Type": "application/json",
    },
  });
  const query = `
      {
        products(first: 25) {
          edges {
            node {
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
              variants(first:1) {
                edges {
                  node {
                    priceV2 {
                      amount
                      currencyCode
                    }
                    compareAtPriceV2 {
                       amount
                       currencyCode
                    }
                  }
                }
              }    
            }
          }
        }
      }
    `;
  const response = await shopifyClient.post("", { query });
  data = response.data.data.products.edges.filter(
    (product) => product.node.id == productId
  );
  return data;
}

export async function fetchProducts2() {
  const SHOPIFY_API_URL =
    "https://vue-storefront-api.myshopify.com/api/2024-07/graphql.json";
  const SHOPIFY_API_TOKEN = "2361c98e6ec9889df7bab8ba073056f0";
  const shopifyClient = axios.create({
    baseURL: SHOPIFY_API_URL,
    headers: {
      "X-Shopify-Storefront-Access-Token": SHOPIFY_API_TOKEN,
      "Content-Type": "application/json",
    },
  });
  const query = `
      {
        products(first: 25) {
          edges {
            node {
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
              variants(first:1) {
                edges {
                  node {
                    priceV2 {
                      amount
                      currencyCode
                    }
                    compareAtPriceV2 {
                       amount
                       currencyCode
                    }
                  }
                }
              }    
            }
          }
        }
      }
    `;
  const response = await shopifyClient.post("", { query });
  return response.data.data.products.edges;
}
