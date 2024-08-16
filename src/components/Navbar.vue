<template>
  <div class="nav">
    <v-layout>
      <v-app-bar color="primary">
        <v-app-bar-title class="title">
          <v-btn :to="`/`"> EzShop</v-btn>
      </v-app-bar-title>
        <div class="search-container">
          <v-text-field
            v-if="showSearch"
            class="search-area"
            variant="outlined"
            v-model="search"
            @keyup.enter="submit"
          ></v-text-field>
          <v-btn icon @click="toggleSearch">
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
        </div>
        <div class="icon">
              <v-btn :to="`/cart`">
                <v-badge color="red" :content="totalQuantity" floating>
                <v-icon>mdi-cart</v-icon>
              </v-badge>
              </v-btn>
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
import { useCartStore } from '../stores/cartStore';


export default {
  name: "Nav",
  data(){
    return{
      cartStore: useCartStore(),
      search:'',
      showSearch: false,
      searchItem:useSearchStore()
    }
  },
  methods:{
    toggleSearch() {
      this.showSearch = !this.showSearch;
    },
   submit(){
      this.searchItem.setSearch(this.search)
      this.$router.push("/search")
   },
  },
  computed: {
    totalQuantity() {
      return this.cartStore.cart.reduce((sum, item) => sum + item.qty, 0);
    }
  }
};
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
.search-container {
  display: flex;
  align-items: center;
}

.search-area{
  width: 300px;
  margin-top: 20px;
  padding-right: 10px;
 }
</style>
