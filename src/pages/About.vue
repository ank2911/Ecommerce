<template>
    <div class="about-container">
    <div class="abt">
        <h1 class="heading">Know about us</h1>
        
        <section>
            <h2>Our Story</h2>
            <p>Welcome to EzShop! Founded in 1992, we embarked on a mission to deliver high-quality products designed to make a difference in our customers’ lives. What started with a passion for selling oroducts has grown into a trusted name in ecommerce industry, serving customers around the world.</p>
        </section>
        <section>
            <h2>Our Values</h2>
            <p>At EzShop, we are driven by our core values of integrity, quality, customer satisfaction, etc. We are committed to customer satisfaction, ensuring that every product we offer meets the highest standards of excellence.</p>
        </section>
        <section>
            <h2>Meet the Team</h2>
            <p>Our team is composed of experienced professionals who are dedicated to ecommerce. We work together to bring you the best products and unparalleled customer service.</p>
        </section>
        <section>
            <h2>Why Choose Us?</h2>
            <p>What sets us apart is our dedication to top notch product quality, custmer satisfaction, customer support 24X7. Our customers appreciate our customer-satisfaction-first approach, making us a preferred choice for onestop ecommerce platform.</p>
        </section>
        <section>
            <h1>
                Get In Touch...
            </h1>
        </section>
    </div>
</div>
</template>

<script>
export default {
    name: 'About',
}
</script>

<style scoped>

.about-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Full viewport height */
}

.abt {
    padding: 20px;
    padding-top: 40px; /* Added padding from the top */
    font-family: Arial, sans-serif;
    text-align: center;
    
}

h1 {
    color: #333;
}

h2 {
    color: #555;
    margin-top: 20px;
}

p {
    color: #666;
    line-height: 1.6;
}

a {
    color: #007BFF;
    text-decoration: none;
}

a:hover {
    text-decoration: underline;
}

.heading{
    text-decoration: underline;

}
</style>