<template>
    <!-- <router-view></router-view> -->
    <div class="nav">
      <v-layout>
        <v-app-bar color="primary">
          <v-app-bar-title class="title">Ez-Shop</v-app-bar-title>
          <div class="icon">
            <v-btn>
              <v-icon>mdi-magnify</v-icon>
            </v-btn>
   
            <!-- <router-link to="/cart"> -->
            <v-btn> <v-icon>mdi-cart</v-icon> </v-btn>
            <!-- </router-link> -->
   
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
    name: 'Nav'
  }
  </script>
   
  <style scoped>
  .nav {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 10px;
   
    margin-left: auto;
   
  }
  </style>