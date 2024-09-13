import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
export const useProductStore = defineStore("product", () => {
    const products = ref([]);
    const fetchProducts = async () => {
        const SHOPIFY_API_URL ="https://vue-storefront-api.myshopify.com/api/2024-07/graphql.json";
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
          products(first: 12) {
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
                    }
                  }
                }    
              }
            }
          }
        }
      `;
        const response = await shopifyClient.post("", { query });
        products.value = response.data.data.products.edges;
        console.log(products.value);
        return products.value;
      };
      
    return { products, fetchProducts };
    }
  
);