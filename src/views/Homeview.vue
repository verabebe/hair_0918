<script>
import Myswiper from '../components/MySwiper.vue'
import { useProductStore } from '../stores/product.js'
import { useReviewStore } from '../stores/review.js'
import { Icon } from '@iconify/vue'

export default {
    components: {
        Myswiper,
        Icon
    },

    data() {
        return {
            productStore: useProductStore(),
            reviewStore: useReviewStore(),
            services: [
                {
                    icon: 'material-symbols:content-cut',
                    title: '專業剪髮',
                    desc: '由資深設計師量身打造，打造最適合您的造型風格'
                },
                {
                    icon: 'material-symbols:palette',
                    title: '時尚染髮',
                    desc: '採用頂級染劑，為您創造獨特且亮眼的髮色'
                },
                {
                    icon: 'mdi:hair-dryer-outline',
                    title: '質感燙髮',
                    desc: '日韓最新燙髮技術，呈現自然蓬鬆的完美捲度'
                },
                {
                    icon: 'material-symbols:spa',
                    title: '頭皮養護',
                    desc: '深層清潔與護理，找回健康強韌的秀髮'
                }
            ]
        }
    },

    computed: {
        featuredProducts() {
            return this.productStore.products.filter(
                p => p.category === '服務'
            ).slice(0, 4)
        },

        latestReviews() {
            return this.reviewStore.allReviews.slice(0, 4)
        },

        getProductName() {
            return (productId) => {
                const product = this.productStore.products.find(p => p.id === productId)
                return product ? product.name : '未知商品'
            }
        },

        getStars() {
            return (rating) => {
                const stars = []
                for (let i = 1; i <= 5; i++) {
                    if (i <= rating) {
                        stars.push('full')
                    } else {
                        stars.push('empty')
                    }
                }
                return stars
            }
        }
    },

    mounted() {
        this.productStore.fetchProducts()
    }
}
</script>

<template>
    <main>
        <!-- 輪播器 -->
        <div>
            <Myswiper />
        </div>

        <!-- Hero section -->
        <section class="hero-section">
            <div class="section-content">
                <div class="hero-details">
                    <h2 class="title">Hair Salon</h2>
                    <h3 class="subtitle">Make your day great with our special hair treatment!</h3>
                    <p class="description">
                        Welcome to K.Kai Hair Academic London, where a fresh haircut gives you a big
                        boost of confidence and makes your daily routine feel bright and fun. A clean new
                        look puts a smile on your face and helps you shine.
                    </p>
                    <div class="buttons">
                        <router-link :to="{ name: 'products' }" class="button book-now">
                            <Icon icon="material-symbols:calendar-month" width="20" />
                            Book Now
                        </router-link>
                        <router-link :to="{ name: 'about' }" class="button contact-us">
                            <Icon icon="material-symbols:info-outline" width="20" />
                            Contact Us
                        </router-link>
                    </div>
                </div>
                <div class="hero-image-wrapper">
                    <img src="/images/11d59c6adf7c65bc42369b80bef60118.jpg" alt="Hair Salon" class="hero-image">
                </div>
            </div>
        </section>

        <!-- About Us section -->
        <section class="about-section">
            <div class="section-content">
                <div class="about-image-wrapper">
                    <img src="/images/687c6ddb46d2e820ad685da92c377931.jpg" alt="About Us" class="about-image">
                </div>
                <div class="about-details">
                    <h2 class="section-title">About Us</h2>
                    <p class="text">
                        Step into K.Kai Hair Academic London in Taichung, where sophisticated hairdressing
                        meets exceptional service. Our skilled team specializes in creating bespoke hairstyles
                        that perfectly align with your unique style and preferences. From elegant cuts to
                        stunning color transformations, we provide a tailored experience that ensures you
                        leave looking and feeling your best.
                    </p>
                    <p class="text">
                        Located in Central Taiwan, our salon offers a chic and welcoming environment, making
                        each visit a truly indulgent experience. Discover the art of refined haircare at K.Kai
                        Hair Academic London.
                    </p>
                    <div class="social-link-list">
                        <a href="#" class="social-link" aria-label="Facebook">
                            <Icon icon="mdi:facebook" />
                        </a>
                        <a href="#" class="social-link" aria-label="Instagram">
                            <Icon icon="mdi:instagram" />
                        </a>
                        <a href="#" class="social-link" aria-label="Twitter">
                            <Icon icon="mdi:twitter" />
                        </a>
                    </div>
                </div>
            </div>
        </section>

        <!-- Services section -->
        <section class="services-section">
            <h2 class="section-title">Our Services</h2>
            <div class="section-content">
                <div class="services-grid">
                    <div class="service-card" v-for="service in services" :key="service.title">
                        <div class="service-icon">
                            <Icon :icon="service.icon" width="48" height="48" />
                        </div>
                        <h3 class="service-title">{{ service.title }}</h3>
                        <p class="service-desc">{{ service.desc }}</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Featured Products section -->
        <section class="featured-section" v-if="featuredProducts.length > 0">
            <h2 class="section-title">Featured Services</h2>
            <div class="section-content">
                <div class="featured-grid">
                    <div class="featured-card" v-for="product in featuredProducts" :key="product.id">
                        <div class="featured-img-wrapper">
                            <img :src="product.img" :alt="product.name" class="featured-img">
                        </div>
                        <div class="featured-info">
                            <span class="featured-category">{{ product.category }}</span>
                            <h3 class="featured-name">{{ product.name }}</h3>
                            <p class="featured-desc">{{ product.description }}</p>
                            <div class="featured-bottom">
                                <span class="featured-price">${{ product.price }}</span>
                                <router-link :to="`/products/${product.id}`" class="featured-link">
                                    查看更多
                                    <Icon icon="material-symbols:arrow-forward" width="18" />
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Testimonials section -->
        <section class="testimonials-section" v-if="latestReviews.length > 0">
            <h2 class="section-title">What Our Clients Say</h2>
            <div class="section-content">
                <div class="testimonials-grid">
                    <div class="testimonial-card" v-for="review in latestReviews" :key="review.id">
                        <div class="testimonial-stars">
                            <Icon
                                v-for="(star, index) in getStars(review.rating)"
                                :key="index"
                                :icon="star === 'full' ? 'material-symbols:star' : 'material-symbols:star-outline'"
                                :class="star === 'full' ? 'star full' : 'star empty'"
                            />
                        </div>
                        <p class="testimonial-content">"{{ review.content }}"</p>
                        <div class="testimonial-author">
                            <div class="author-avatar">
                                <span>{{ review.username.charAt(0) }}</span>
                            </div>
                            <div class="author-info">
                                <span class="author-name">{{ review.username }}</span>
                                <span class="author-service">{{ getProductName(review.productId) }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Footer -->
        <footer class="site-footer">
            <div class="section-content">
                <div class="footer-grid">
                    <div class="footer-brand">
                        <h3 class="footer-logo">
                            <img src="/images/Barber_logo.png" alt="K.Kai Logo" class="footer-logo-img">
                            <span>K.KAI HAIR ACADEMIC</span>
                        </h3>
                        <p class="footer-slogan">
                            Professional hair styling services in Taichung. Your beauty is our passion.
                        </p>
                        <div class="footer-social">
                            <a href="#" class="social-link" aria-label="Facebook">
                                <Icon icon="mdi:facebook" />
                            </a>
                            <a href="#" class="social-link" aria-label="Instagram">
                                <Icon icon="mdi:instagram" />
                            </a>
                            <a href="#" class="social-link" aria-label="Twitter">
                                <Icon icon="mdi:twitter" />
                            </a>
                        </div>
                    </div>

                    <div class="footer-links">
                        <h4>Quick Links</h4>
                        <ul>
                            <li><router-link :to="{ name: 'home' }">Home</router-link></li>
                            <li><router-link :to="{ name: 'about' }">About Us</router-link></li>
                            <li><router-link :to="{ name: 'products' }">Services</router-link></li>
                            <li><router-link :to="{ name: 'testimonial' }">Testimonials</router-link></li>
                        </ul>
                    </div>

                    <div class="footer-contact">
                        <h4>Contact Us</h4>
                        <ul>
                            <li>
                                <Icon icon="material-symbols:location-on" />
                                <span>Taichung, Taiwan</span>
                            </li>
                            <li>
                                <Icon icon="material-symbols:call" />
                                <span>+886 4-1234-5678</span>
                            </li>
                            <li>
                                <Icon icon="material-symbols:mail" />
                                <span>info@k-kai-hair.com</span>
                            </li>
                            <li>
                                <Icon icon="material-symbols:schedule" />
                                <span>Tue - Sun: 10:00 - 20:00</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="footer-bottom">
                    <p>&copy; 2026 K.Kai Hair Academic London. All rights reserved.</p>
                </div>
            </div>
        </footer>
    </main>
</template>
