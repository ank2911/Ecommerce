<template>
  <div class="nav">
    <v-layout>
      <v-app-bar color="primary">
        <v-app-bar-title class="title">
          <router-link to="/">
            <v-btn color="white">
              <img
                src="/image/logo.png"
                alt="Logo"
                style="max-height: 80px; max-width: 80px"
              />
            </v-btn>
          </router-link>
          <router-link to="/about">
            <v-btn color="white"> About </v-btn>
          </router-link>
        </v-app-bar-title>

        <div class="search-container">
          <input
            v-if="showSearch"
            class="search-area"
            v-model="search"
            @keyup.enter="submit"
            placeholder="Search..."
            autofocus
          />
          <v-btn @click="toggleSearch">
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
        </div>
        <v-btn to="/wishlist">
          <v-badge color="red" :content="totalWishlist" floating>
            <v-icon>mdi-heart</v-icon>
          </v-badge>
        </v-btn>
        <div class="icon">
          <v-btn to="/cart">
            <v-badge color="red" :content="totalQuantity" floating>
              <v-icon>mdi-cart</v-icon>
            </v-badge>
          </v-btn>
        </div>
        <v-btn icon @click="toggleCurrency">
          <v-icon>{{ currencyIcon }}</v-icon>
        </v-btn>
      </v-app-bar>
    </v-layout>
  </div>
</template>

<script>
import { useSearchStore } from "../stores/search";
import { useCartStore } from "../stores/cartStore";
import { useWishlistStore } from "../stores/wishlist";
import { useCurrencyStore } from "../stores/currencyStore";

export default {
  name: "Nav",
  data() {
    return {
      cartStore: useCartStore(),
      wishlistStore: useWishlistStore(),
      currencyStore: useCurrencyStore(),
      searchItem: useSearchStore(),
      search: "",
      showSearch: false,
    };
  },
  methods: {
    toggleSearch() {
      this.showSearch = !this.showSearch;
    },
    submit() {
      this.searchItem.setSearch(this.search);
      this.$router.push("/search");
    },
    toggleCurrency() {
      this.currencyStore.toggleCurrency();
    },
  },
  computed: {
    totalQuantity() {
      return this.cartStore.cart.reduce((sum, item) => sum + item.qty, 0);
    },
    totalWishlist() {
      return this.wishlistStore.getWishlist.length;
    },
    currencyIcon() {
      return this.currencyStore.currency === "USD"
        ? "mdi-currency-usd"
        : "mdi-currency-inr";
    },
  },
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

.v-icon {
  color: white;
}
.search-container {
  display: flex;
  align-items: center;
}

.search-area {
  width: 300px;
  border: 1px solid #ccc;
  padding-left: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  border-radius: 20px;
  outline: none;
  color: white;
}
::placeholder {
  color: white;
}
input:focus {
  border: 2px solid white;
}
</style>
