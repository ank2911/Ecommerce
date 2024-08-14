<template>
    <v-container class="search-page"  v-for="items in products">
    
            <v-card >
                <v-img   :src="items.thumbnail"  height="300px"
                alt="Product Image"></v-img>
                <v-card-title>{{items.title}}</v-card-title>
                <v-card-subtitle>{{ items.description }}</v-card-subtitle>
                <v-card-text>
                    <p><strong>Original Price:</strong> ${{ items.price }}</p>
        <p>
          <strong>Discounted Price:</strong> ${{
            discountedPrice(items.price, items.discountPercentage)
          }}
        </p>
        <p><strong>Category:</strong> {{ items.category }}</p>
        <p><strong>Rating:</strong> {{ items.rating }}</p>
           </v-card-text>
                <v-card-actions>
                    <v-btn @click="addProductToCart(items)">Add to Cart</v-btn>
                    <v-btn @click="viewProductDetails(items)">View Details</v-btn>
                </v-card-actions>
            </v-card>
</v-container>
</template>
<script>
    
    import { useSearchStore } from '../stores/search';
import { data } from './services/Api';
    export default{
        name:'search',
        data(){
            return{
                searchItem:useSearchStore(),
                products:[]
            }
        },
        async created(){
         this.products=await data;
         console.log(this.products)
         if(this.searchItem.Search===''){
             this.$router.push('/')
         }
         else{
         this.products=this.products.filter((product)=>product.title.includes(this.searchItem.Search))
         }
        },
        methods:{
            discountedPrice(price, discount) {
       return (price - (price * discount) / 100).toFixed(2);
     },
        }
    
    }
</script>
<style>
.product-image{
   background-color: rgb(206, 206, 210);
 }
 .search-page{
    margin-top: 40px;
    margin-bottom: 40px
 }</style>
