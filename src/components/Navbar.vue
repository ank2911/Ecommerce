<template>
  <div class="nav">
    <v-layout>
      <v-app-bar color="primary">
        <v-app-bar-title class="title">EzShop</v-app-bar-title>
        <v-text-field class="search-area"  append-icon="mdi-magnify" variant="outlined" v-model="search" @keyup.enter="submit"></v-text-field>
    
        <div class="icon">
          
          <router-link to="/" class="home-link">
            <v-btn>
              <v-icon>mdi-home</v-icon>
            </v-btn>
          </router-link>

          

          <router-link to="/cart">
            <v-btn>
              <v-icon>mdi-cart</v-icon>
            </v-btn>
          </router-link>

          <v-btn>
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </div>
      </v-app-bar>
    </v-layout>
  </div>
</template>

<script>
import { useSearchStore } from '../stores/search';



export default {
  name: "Nav",
  data(){
    return{
      search:'',
      searchItem:useSearchStore()
    }
  },
  methods:{
   submit(){
    console.log(this.search)
      this.searchItem.setSearch(this.search)
      this.$router.push('/search')
   }
}};
</script>

<style scoped>
.nav {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 10px;
  margin-left: auto;
}

.home-link {
  margin-right: 15px; /* Adjust spacing as needed */
}

.v-icon{
  color: white;
}
.search-area{

  margin-top: 20px;
  padding-right: 10px;
 }
</style>
