<script>
import { useReviewStore } from "../stores/review.js"
import { useProductStore } from "../stores/product.js"
import { Icon } from '@iconify/vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'

export default {

    components: {
        Icon,
        Swiper,
        SwiperSlide
    },

    data() {
        return {
            reviewStore: useReviewStore(),
            productStore: useProductStore(),
            filterCategory: 'all',
            filterRating: 0,
            // Swiper 設定
            swiperOptions: {
                slidesPerView: 1,
                spaceBetween: 20,
                pagination: {
                    clickable: true
                },
                breakpoints: {
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 20
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 30
                    }
                }
            }
        }
    },

    computed: {
        // 所有評論
        allReviews() {
            return this.reviewStore.allReviews
        },

        // 篩選後的評論
        filteredReviews() {
            let reviews = this.allReviews

            // 依分類篩選
            if (this.filterCategory !== 'all') {
                const productIds = this.productsByCategory
                    .filter(p => p.category === this.filterCategory)
                    .map(p => p.id)
                reviews = reviews.filter(r => productIds.includes(r.productId))
            }

            // 依星級篩選
            if (this.filterRating > 0) {
                reviews = reviews.filter(r => r.rating === this.filterRating)
            }

            return reviews
        },

        // 所有商品（用於關聯評論與商品名稱）
        products() {
            return this.productStore.products
        },

        // 取得商品名稱
        getProductName() {
            return (productId) => {
                const product = this.products.find(p => p.id === productId)
                return product ? product.name : '未知商品'
            }
        },

        // 取得商品分類
        getProductCategory() {
            return (productId) => {
                const product = this.products.find(p => p.id === productId)
                return product ? product.category : ''
            }
        },

        // 所有分類
        categories() {
            const cats = [...new Set(this.products.map(p => p.category))]
            return cats
        },

        // 精選評論（5 星評論）
        featuredReviews() {
            return this.allReviews.filter(r => r.rating === 5).slice(0, 6)
        },

        // 整體統計
        overallStats() {
            return {
                total: this.reviewStore.totalReviewCount,
                average: this.reviewStore.overallAverageRating,
                distribution: this.getRatingDistribution
            }
        },

        // 星級分佈
        getRatingDistribution() {
            const dist = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
            this.allReviews.forEach(r => {
                dist[r.rating] = (dist[r.rating] || 0) + 1
            })
            return dist
        }
    },

    methods: {
        // 取得星級顯示
        getStars(rating) {
            const stars = []
            for (let i = 1; i <= 5; i++) {
                if (i <= rating) {
                    stars.push('full')
                } else if (i - 0.5 <= rating) {
                    stars.push('half')
                } else {
                    stars.push('empty')
                }
            }
            return stars
        },

        // 格式化日期
        formatDate(dateString) {
            const date = new Date(dateString)
            return date.toLocaleDateString('zh-TW', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            })
        },

        // 設定篩選
        setCategory(category) {
            this.filterCategory = category
        },

        setRating(rating) {
            this.filterRating = this.filterRating === rating ? 0 : rating
        },

        // 取得星級百分比（用於進度條）
        getRatingPercentage(rating) {
            const total = this.reviewStore.totalReviewCount
            if (total === 0) return 0
            return (this.getRatingDistribution[rating] / total) * 100
        },

        // 刪除評論
        deleteReview(id) {
            if (confirm('確定要刪除此評論嗎？')) {
                this.reviewStore.removeReview(id)
            }
        }
    },

    mounted() {
        // 確保商品資料已載入
        this.productStore.fetchProducts()
    }
}
</script>


<template>
    <main class="page">
        <!-- 頁面標題 -->
        <section class="page-hero">
            <h1 class="page-title">客戶評價與評論</h1>
            <p class="page-subtitle">
                了解我們的客戶如何看待我們的服務
            </p>
        </section>


        <!-- 統計摘要 -->
        <section class="stats-section">
            <div class="stats-card">
                <div class="stats-main">
                    <div class="stats-number">
                        {{ overallStats.average }}
                    </div>
                    <div class="stats-stars">
                        <Icon 
                            v-for="(star, index) in getStars(Number(overallStats.average))" 
                            :key="index"
                            :icon="star === 'full' ? 'material-symbols:star' : (star === 'half' ? 'material-symbols:star-half' : 'material-symbols:star-outline')"
                            :class="'star-icon ' + star"
                        />
                    </div>
                    <div class="stats-count">
                        共 {{ overallStats.total }} 則評論
                    </div>
                </div>

                <div class="stats-distribution">
                    <div 
                        v-for="rating in [5, 4, 3, 2, 1]" 
                        :key="rating" 
                        class="distribution-row"
                        @click="setRating(rating)"
                    >
                        <span class="distribution-label">{{ rating }} 星</span>
                        <div class="distribution-bar">
                            <div 
                                class="distribution-fill" 
                                :style="{ width: getRatingPercentage(rating) + '%' }"
                            ></div>
                        </div>
                        <span class="distribution-count">
                            {{ getRatingDistribution[rating] || 0 }}
                        </span>
                    </div>
                </div>
            </div>
        </section>


        <!-- 精選評論輪播 -->
        <section v-if="featuredReviews.length > 0" class="featured-section">
            <h2 class="section-title">
                <Icon icon="material-symbols:star" class="title-icon" />
                精選評論
            </h2>

            <Swiper 
                :slides-per-view="1" 
                :space-between="20"
                :breakpoints="{
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 }
                }"
                class="featured-swiper"
            >
                <SwiperSlide 
                    v-for="review in featuredReviews" 
                    :key="review.id"
                >
                    <div class="featured-card">
                        <div class="featured-header">
                            <div class="reviewer-avatar">
                                <img v-if="review.avatar" :src="review.avatar" :alt="review.username" />
                                <span v-else>{{ review.username.charAt(0) }}</span>
                            </div>
                            <div class="reviewer-info">
                                <span class="reviewer-name">
                                    {{ review.username }}
                                </span>
                                <span class="featured-product">
                                    {{ getProductName(review.productId) }}
                                    <span v-if="review.age"> · {{ review.age }} 歲</span>
                                </span>
                            </div>
                        </div>

                        <div class="featured-rating">
                            <Icon 
                                v-for="star in 5" 
                                :key="star"
                                :icon="star <= review.rating ? 'material-symbols:star' : 'material-symbols:star-outline'"
                                :class="star <= review.rating ? 'star-icon full' : 'star-icon empty'"
                            />
                        </div>

                        <h4 class="featured-title">
                            {{ review.title }}
                        </h4>

                        <p class="featured-content">
                            {{ review.content }}
                        </p>

                        <span class="featured-date">
                            {{ formatDate(review.date) }}
                        </span>
                    </div>
                </SwiperSlide>
            </Swiper>
        </section>


        <!-- 篩選列 -->
        <section class="filter-section">
            <h2 class="section-title">
                <Icon icon="material-symbols:chat-bubble-outline" class="title-icon" />
                所有評論
            </h2>

            <div class="filter-controls">
                <!-- 分類篩選 -->
                <div class="filter-group">
                    <label>商品分類：</label>
                    <div class="filter-buttons">
                        <button 
                            class="filter-btn"
                            :class="{ active: filterCategory === 'all' }"
                            @click="setCategory('all')"
                        >
                            全部
                        </button>
                        <button 
                            v-for="category in categories" 
                            :key="category"
                            class="filter-btn"
                            :class="{ active: filterCategory === category }"
                            @click="setCategory(category)"
                        >
                            {{ category }}
                        </button>
                    </div>
                </div>

                <!-- 星級篩選 -->
                <div class="filter-group">
                    <label>星級：</label>
                    <div class="filter-buttons">
                        <button 
                            class="filter-btn"
                            :class="{ active: filterRating === 0 }"
                            @click="setRating(0)"
                        >
                            全部
                        </button>
                        <button 
                            v-for="rating in [5, 4, 3, 2, 1]" 
                            :key="rating"
                            class="filter-btn"
                            :class="{ active: filterRating === rating }"
                            @click="setRating(rating)"
                        >
                            {{ rating }} 星
                        </button>
                    </div>
                </div>
            </div>
        </section>


        <!-- 評論列表 -->
        <section class="reviews-section">
            <!-- 無評論 -->
            <div v-if="filteredReviews.length === 0" class="no-reviews">
                <Icon icon="material-symbols:chat-bubble-outline" class="no-reviews-icon" />
                <p v-if="allReviews.length === 0">
                    目前還沒有任何評論
                </p>
                <p v-else>
                    沒有符合篩選條件的評論
                </p>
            </div>

            <!-- 評論卡片 -->
            <div v-else class="reviews-grid">
                <div 
                    v-for="review in filteredReviews" 
                    :key="review.id" 
                    class="review-card"
                >
                    <div class="review-header">
                        <div class="reviewer-info">
                            <div class="reviewer-avatar">
                                <img v-if="review.avatar" :src="review.avatar" :alt="review.username" />
                                <span v-else>{{ review.username.charAt(0) }}</span>
                            </div>
                            <div class="reviewer-details">
                                <span class="reviewer-name">
                                    {{ review.username }}
                                </span>
                                <span v-if="review.age" class="reviewer-age">
                                    {{ review.age }} 歲
                                </span>
                                <span class="review-product">
                                    <RouterLink :to="`/products/${review.productId}`">
                                        {{ getProductName(review.productId) }}
                                    </RouterLink>
                                </span>
                            </div>
                        </div>
                        <button 
                            class="delete-review-btn"
                            @click="deleteReview(review.id)"
                            title="刪除評論"
                        >
                            <Icon icon="material-symbols:delete-outline" />
                        </button>
                    </div>

                    <div class="review-rating">
                        <Icon 
                            v-for="star in 5" 
                            :key="star"
                            :icon="star <= review.rating ? 'material-symbols:star' : 'material-symbols:star-outline'"
                            :class="star <= review.rating ? 'star-icon full' : 'star-icon empty'"
                        />
                        <span class="review-date">
                            {{ formatDate(review.date) }}
                        </span>
                    </div>

                    <h4 class="review-title">
                        {{ review.title }}
                    </h4>

                    <p class="review-content">
                        {{ review.content }}
                    </p>

                    <div v-if="review.verified" class="verified-badge">
                        <Icon icon="material-symbols:verified" />
                        已驗證購買
                    </div>
                </div>
            </div>
        </section>

    </main>
</template>


<style scoped>
/* 頁面英雄區 */
.page-hero {
    text-align: center;
    padding: 48px 24px;
    background: linear-gradient(135deg, #4f46e5, #7c3aed);
    color: white;
    border-radius: 16px;
    margin-bottom: 32px;
}

.page-title {
    font-size: 32px;
    margin: 0 0 8px 0;
}

.page-subtitle {
    font-size: 16px;
    margin: 0;
    opacity: 0.9;
}

/* 統計區塊 */
.stats-section {
    margin-bottom: 40px;
}

.stats-card {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 32px;
    background: white;
    border-radius: 16px;
    padding: 32px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.stats-main {
    text-align: center;
    padding-right: 32px;
    border-right: 1px solid #e5e7eb;
}

.stats-number {
    font-size: 48px;
    font-weight: 700;
    color: #212529;
    line-height: 1;
}

.stats-stars {
    display: flex;
    justify-content: center;
    gap: 4px;
    margin: 12px 0;
}

.stats-count {
    font-size: 14px;
    color: #6b7280;
}

.stats-distribution {
    display: flex;
    flex-direction: column;
    gap: 8px;
    justify-content: center;
}

.distribution-row {
    display: grid;
    grid-template-columns: 50px 1fr 40px;
    gap: 12px;
    align-items: center;
    cursor: pointer;
    padding: 4px 8px;
    border-radius: 6px;
    transition: background-color 0.2s ease;
}

.distribution-row:hover {
    background: #f3f4f6;
}

.distribution-label {
    font-size: 14px;
    color: #4b5563;
}

.distribution-bar {
    height: 8px;
    background: #e5e7eb;
    border-radius: 4px;
    overflow: hidden;
}

.distribution-fill {
    height: 100%;
    background: linear-gradient(135deg, #f59e0b, #d97706);
    border-radius: 4px;
    transition: width 0.3s ease;
}

.distribution-count {
    font-size: 14px;
    color: #6b7280;
    text-align: right;
}

/* 精選評論區塊 */
.featured-section {
    margin-bottom: 40px;
}

.section-title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 22px;
    color: #212529;
    margin-bottom: 24px;
}

.title-icon {
    font-size: 24px;
    color: #f59e0b;
}

.featured-swiper {
    padding: 16px 0;
}

.featured-card {
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    padding: 20px;
    height: 100%;
    display: flex;
    flex-direction: column;
}

.featured-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 12px;
}

.reviewer-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: linear-gradient(135deg, #4f46e5, #7c3aed);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 16px;
    flex-shrink: 0;
    overflow: hidden;
}

.reviewer-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.reviewer-info {
    display: flex;
    flex-direction: column;
    gap: 2px;
}

.reviewer-name {
    font-weight: 600;
    color: #212529;
}

.reviewer-age {
    font-size: 12px;
    color: #6b7280;
}

.featured-product {
    font-size: 12px;
    color: #6b7280;
}

.featured-rating {
    display: flex;
    gap: 2px;
    margin-bottom: 12px;
}

.featured-title {
    font-size: 16px;
    font-weight: 600;
    color: #212529;
    margin: 0 0 8px 0;
}

.featured-content {
    font-size: 14px;
    color: #4b5563;
    line-height: 1.6;
    margin: 0;
    flex-grow: 1;
}

.featured-date {
    font-size: 12px;
    color: #9ca3af;
    margin-top: 12px;
}

/* 篩選區塊 */
.filter-section {
    margin-bottom: 32px;
}

.filter-controls {
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
}

.filter-group {
    display: flex;
    align-items: center;
    gap: 12px;
}

.filter-group label {
    font-size: 14px;
    font-weight: 600;
    color: #374151;
}

.filter-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.filter-btn {
    padding: 6px 14px;
    border: 1px solid #e5e7eb;
    border-radius: 20px;
    background: white;
    color: #4b5563;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s ease;
}

.filter-btn:hover {
    border-color: #4f46e5;
    color: #4f46e5;
}

.filter-btn.active {
    background: #4f46e5;
    border-color: #4f46e5;
    color: white;
}

/* 評論列表區塊 */
.reviews-section {
    margin-bottom: 48px;
}

.no-reviews {
    text-align: center;
    padding: 48px 24px;
    background: #f9fafb;
    border-radius: 12px;
}

.no-reviews-icon {
    font-size: 48px;
    color: #d1d5db;
    margin-bottom: 12px;
}

.no-reviews p {
    color: #6b7280;
    margin: 0;
}

.reviews-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 20px;
}

.review-card {
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    padding: 20px;
    transition: box-shadow 0.2s ease;
}

.review-card:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.review-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 12px;
}

.reviewer-info {
    display: flex;
    align-items: center;
    gap: 12px;
}

.reviewer-details {
    display: flex;
    flex-direction: column;
    gap: 2px;
}

.reviewer-age {
    font-size: 12px;
    color: #6b7280;
}

.review-product a {
    font-size: 12px;
    color: #4f46e5;
    text-decoration: none;
}

.review-product a:hover {
    text-decoration: underline;
}

.delete-review-btn {
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
    color: #9ca3af;
    transition: color 0.2s ease;
}

.delete-review-btn:hover {
    color: #ef4444;
}

.review-rating {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 12px;
}

.review-date {
    font-size: 12px;
    color: #9ca3af;
    margin-left: auto;
}

.review-title {
    font-size: 16px;
    font-weight: 600;
    color: #212529;
    margin: 0 0 8px 0;
}

.review-content {
    font-size: 14px;
    color: #4b5563;
    line-height: 1.6;
    margin: 0 0 12px 0;
}

.verified-badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 12px;
    color: #10b981;
}

/* 星級圖示 */
.star-icon.full {
    color: #f59e0b;
}

.star-icon.half {
    color: #f59e0b;
}

.star-icon.empty {
    color: #d1d5db;
}

/* 響應式調整 */
@media (max-width: 768px) {
    .stats-card {
        grid-template-columns: 1fr;
    }

    .stats-main {
        border-right: none;
        border-bottom: 1px solid #e5e7eb;
        padding-right: 0;
        padding-bottom: 24px;
    }

    .filter-controls {
        flex-direction: column;
        gap: 16px;
    }

    .filter-group {
        flex-direction: column;
        align-items: flex-start;
    }

    .reviews-grid {
        grid-template-columns: 1fr;
    }
}
</style>
