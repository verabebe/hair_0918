<script>
import Myswiper from '../components/MySwiper.vue'


export default {
    components: {
        Myswiper
    }
}
</script>

<template>
    <main>
        <!-- 倫波器 -->
        <div>
            <Myswiper />
        </div>

        <!-- Hero section -->
        <section class="hero-section">
            <div class="section-content">
                <div class="hero-details">
                    <h2 class="title">Hair Salon</h2>
                    <h3 class="subtitle">Make your day great with our special hair treatment!</h3>
                    <p class="description">Welcome to K.Kai Hair Academic London, where a fresh haircut gives you a big
                        boots of confidence and makes your daily routine feel bright and fun. A clean new look puts a
                        smile on your face and helps you shine.</p>

                    <div class="buttons">
                        <a href="#" class="button book-now">Book Now</a>
                        <a href="#" class="button contact-us">Contact Us</a>
                    </div>
                </div>
                <div class="hero-image-wrapper">
                    <!-- <img src="images/hair-hero-section.png" alt="Hero" class="hero-image"> -->
                </div>
            </div>
        </section>

        <!-- About section -->
        |<section class="about-section">
            <div class="section-content">
                <div class="about-image-wrapper">
                    <!-- <img src="images/about-image.jpg" alt="About" class="about-image"> -->
                </div>
                <div class="about-details">
                    <h2 class="section-title">About Us</h2>
                    <p class="text">Step into K.Kai Hair Academic London in Taichung, where sophisticated hairdressing
                        meets exceptional service. Our skilled team specializes in creating bespoke hairstyles that
                        perfectly align with your unique style and preferences. From elegant cuts to stunning color
                        transformations, we provide a tailored experience that ensures you leave looking and feeling
                        your best. Located in Central Taiwan, our salon offers a chic and welcoming enviroment, making
                        each visit a truly indulgent experience. Discover the art of refined haircare at K.Kai Hair
                        Academic London.
                    </p>
                    <div class="social-link-list">
                        <a href="#" class="social-link"><i class="fa-brands fa-facebook"></i></a>
                        <a href="#" class="social-link"><i class="fa-brands fa-instagram"></i></a>
                        <a href="#" class="social-link"><i class="fa-brands fa-x-twitter"></i></a>
                    </div>
                </div>
            </div>
        </section>
        <!-- Menu section -->
        <section class="menu-section">
            <div class="section-content">
                <ul class="menu-list">
                    <li class="menu-item">
                        <!-- <img src="images/hair-salon-interior-design.png" alt="Hair Salons" class="menu-image"> -->

                    </li>
                </ul>
            </div>

        </section>
    </main>
</template>
