<template>
    <v-footer class="bg-black text-center d-flex flex-column pa-5">
      <div>
        <p>Copyright <v-icon>mdi-copyright</v-icon>{{ new Date().getFullYear() }} Tech Mahindra</p>
      </div>
    </v-footer>
  </template>
   
  <script>
    export default {
        name: 'Footer'
    }
  </script>
