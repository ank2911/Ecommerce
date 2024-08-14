<script>
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
export default {
  name: "App",
  components: {
    Navbar,
    Footer,
  },
};
</script>

<template>
  <div>
    <Navbar />
    <router-view />
    <Footer />
  </div>
</template>

<style scoped>
template {
  background-color: #d5bbb1;
}
</style>
