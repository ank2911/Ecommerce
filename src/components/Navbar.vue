<template>
  <div class="nav">
    <v-layout>
      <v-app-bar color="primary">
        <v-app-bar-title class="title">EzShop</v-app-bar-title>
        <div class="icon">
          <router-link to="/" class="home-link">
            <v-btn>
              <v-icon>mdi-home</v-icon>
            </v-btn>
          </router-link>

          <v-btn>
            <v-icon>mdi-magnify</v-icon>
          </v-btn>

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
export default {
  name: "Nav",
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
</style>
