<template>
    <div class="abt">
        <h1>About Page</h1>
        <p>Welcome to our About page!</p>
        <section>
            <h2>Our Mission</h2>
            <p>Our mission is to provide the best products and services to our customers. We strive to exceed expectations and deliver exceptional value.</p>
        </section>
        <section>
            <h2>Our Team</h2>
            <p>We have a dedicated team of professionals who are passionate about what they do. Our team works tirelessly to ensure customer satisfaction and continuous improvement.</p>
        </section>
        <section>
            <h2>Our History</h2>
            <p>Founded in 2020, our company has grown from a small startup to a leading player in the industry. We are proud of our journey and excited about the future.</p>
        </section>
        <section>
            <h2>Contact Us</h2>
            <p>If you have any questions or need further information, please feel free to <a href="/contact">contact us</a>.</p>
        </section>
    </div>
</template>

<script>
export default {
    name: 'About',
}
</script>

<style scoped>
.abt {
    padding: 20px;
    padding-top: 40px; /* Added padding from the top */
    font-family: Arial, sans-serif;
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
</style>