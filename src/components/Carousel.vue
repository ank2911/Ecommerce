<template>
    <v-carousel
      class="custom-carousel"
      show-arrows="hover"
       height="fit-content"
    >
      <v-carousel-item
        v-for="(item, index) in carouselSlide"
        :key="index">
        <div class="custom-container">
       <img :src="item" alt="carousel image" class="custom-image"/>
      </div>
      </v-carousel-item>
    </v-carousel>
  </template>
  <script >

  export default { 
    data () {
      return {
      carouselSlide:["https://fastly.picsum.photos/id/48/5000/3333.jpg?hmac=y3_1VDNbhii0vM_FN6wxMlvK27vFefflbUSH06z98so",
      "https://fastly.picsum.photos/id/201/5000/3333.jpg?hmac=NE8fOMa8u9PBfkq4AVwEoJdRqoPTNwUsyKvKWuXyNCk",
      "https://fastly.picsum.photos/id/292/3852/2556.jpg?hmac=cPYEh0I48Xpek2DPFLxTBhlZnKVhQCJsbprR-Awl9lo",
     
      "https://fastly.picsum.photos/id/370/4928/3264.jpg?hmac=UGe0txSnG4hhV-fAoi7e3mTnvQFhYYNcPJJbYFePh5Q",
      "https://fastly.picsum.photos/id/30/1280/901.jpg?hmac=A_hpFyEavMBB7Dsmmp53kPXKmatwM05MUDatlWSgATE"
      ],
      
      }
    },
  }
    
  
</script>
<style>

.custom-container{
   height: 580px;
    
}
.custom-image{
  padding-top: 40px;
    width: 100%;
    height: inherit;
    object-fit: cover;
}
 
</style>