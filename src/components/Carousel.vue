<template>
    <div class="best-seller">Best seller</div>
    <v-carousel
      height="500"
      show-arrows="hover"
      cycle
      delimeter-background-color="#6bb77b"

    >
      <v-carousel-item
        v-for="(item, index) in carouselSlide"
        :key="index"
      >
        <v-sheet
          height="100%" 
        > 
        <div class="carousel-slides">
          <v-img :src="this.products[item].thumbnail" class="carousel-image"></v-img>
          <v-card-title>{{ this.products[item].title }}</v-card-title>
        </div>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
  </template>
  <script >
  import {data} from "./services/Api.js"
  export default { 
    data () {
      return {
      carouselSlide:[],
      products:[]
      }
    },
   
   async created(){
     this.products = await data;
    let slides=this.products.map((item)=>item.rating)
    slides.sort((a,b)=>b-a)
    slides=(slides.slice(0,5))
    this.carouselSlide=slides.map((itemOfSlide)=>(this.products.findIndex((item)=>item.rating===itemOfSlide)))
    console.log(this.carouselSlide)
    console.log()
   } 
  
  }
    
  
</script>
<style>
.best-seller{
  text-align: center;
  margin-top: 45px;
  padding-bottom: 10px;
  font-size: 30px;
  background-color: #6bb77b;
}
.carousel-slides{
  height: 75%;
  padding-top: 30px;
  text-align: center
}
.v-carousel__controls{
  background-color: #6bb77b;
}
</style>