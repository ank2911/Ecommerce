<script>
import ProductList from './pages/ProductList.vue';
import Carousel from './components/Carousel.vue';
import Navbar from './components/Navbar.vue';

export default {
  name: 'App',
  components: {
    ProductList,
    Carousel,
    Navbar
  }
}
</script>

<template>
  <div>
    <Navbar />
    <Carousel />
    <ProductList />
    <Footer />
  </div>
</template>

<style scoped>
  template{
  background-color: #d5bbb1;
}

</style>
