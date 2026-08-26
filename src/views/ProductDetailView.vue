<script>
import { useReviewStore } from "../stores/review.js"
import { Icon } from '@iconify/vue'

export default {

    components: {
        Icon
    },

    data() {
        return {
            products: [],
            product: null,
            isLoading: false,
            errorMessage: "",
            reviewStore: useReviewStore(),
            // 新增評論表單
            showReviewForm: false,
            reviewForm: {
                username: '',
                age: '',
                avatar: '',
                rating: 5,
                title: '',
                content: ''
            },
            hoverRating: 0
        }
    },

    computed: {
        // 該商品的評論列表
        productReviews() {
            if (!this.product) return []
            return this.reviewStore.getReviewsByProductId(this.product.id)
        },
        // 該商品平均星級
        averageRating() {
            if (!this.product) return 0
            return this.reviewStore.getAverageRating(this.product.id)
        },
        // 該商品評論數量
        reviewCount() {
            if (!this.product) return 0
            return this.reviewStore.getReviewCount(this.product.id)
        }
    },

    methods: {
        async fetchProduct() {          

            this.isLoading = true
            this.errorMessage = ""

            try {

                const response =
                    await fetch("/data/products.json")

                if (!response.ok) {
                    throw new Error(
                        `HTTP ${response.status}`
                    )
                }

                this.products =
                    await response.json()
                
                const productId=Number(this.$route.params.id)

                this.product=this.products.find(
                    product=> product.id===productId)

            } catch (error) {

                console.error(error)

                this.errorMessage =
                    error.message

            } finally {

                this.isLoading = false
            }
        },

        // 開啟評論表單
        toggleReviewForm() {
            this.showReviewForm = !this.showReviewForm
            if (!this.showReviewForm) {
                this.resetReviewForm()
            }
        },

        // 送出評論
        submitReview() {
            if (!this.reviewForm.username.trim()) {
                alert('請填寫使用者名稱！')
                return
            }
            if (!this.reviewForm.age) {
                alert('請填寫年齡！')
                return
            }
            if (!this.reviewForm.title.trim()) {
                alert('請填寫評論標題！')
                return
            }
            if (!this.reviewForm.content.trim()) {
                alert('請填寫評論內容！')
                return
            }

            this.reviewStore.addReview({
                productId: this.product.id,
                username: this.reviewForm.username.trim(),
                age: Number(this.reviewForm.age),
                avatar: this.reviewForm.avatar,
                rating: this.reviewForm.rating,
                title: this.reviewForm.title.trim(),
                content: this.reviewForm.content.trim(),
                verified: true
            })

            alert('評論已送出！感謝您的回饋！')
            this.resetReviewForm()
            this.showReviewForm = false
        },

        // 重置表單
        resetReviewForm() {
            this.reviewForm = {
                username: '',
                age: '',
                avatar: '',
                rating: 5,
                title: '',
                content: ''
            }
            this.hoverRating = 0
            if (this.$refs.avatarInput) {
                this.$refs.avatarInput.value = ''
            }
        },

        // 處理頭像上傳
        handleAvatarUpload(event) {
            const file = event.target.files[0]
            if (!file) return

            if (file.size > 500 * 1024) {
                alert('圖片大小不能超過 500KB！')
                event.target.value = ''
                return
            }

            const reader = new FileReader()
            reader.onload = (e) => {
                this.reviewForm.avatar = e.target.result
            }
            reader.readAsDataURL(file)
        },

        // 設定星級
        setRating(rating) {
            this.reviewForm.rating = rating
        },

        // 取得星級顯示（滿星/半星/空星）
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

        // 刪除評論
        deleteReview(id) {
            if (confirm('確定要刪除此評論嗎？')) {
                this.reviewStore.removeReview(id)
            }
        }
    },

    mounted() {
        this.fetchProduct()
    }

};
</script>


<template>
    <main class="page">
        <!-- 返回上一頁 -->
        <div class="page-header">

            <RouterLink
                to="/products"
                class="back-link"
            >
                ← 返回商品列表
            </RouterLink>

        </div>


        <!-- 載入中 -->
        <section v-if="isLoading" class="status-card">

            <div class="loading-icon">
                ⏳
            </div>

            <h2>商品資料載入中</h2>

            <p>
                正在幫你取得商品資訊...
            </p>

        </section>


        <!-- 發生錯誤 -->
        <section
            v-else-if="errorMessage"
            class="status-card"
        >

            <div class="status-icon">
                ⚠️
            </div>

            <h2>
                商品資料讀取失敗
            </h2>

            <p class="error">
                {{ errorMessage }}
            </p>

        </section>


        <!-- 商品存在 -->
        <section
            v-else-if="product"
            class="product-detail"
        >

            <!-- 左側商品視覺區 -->
            <div class="product-visual">

                <img :src="product.img" alt="example">

            </div>


            <!-- 右側商品資訊 -->
            <div class="product-info">

                <span class="badge">
                    {{ product.category }}
                </span>


                <h1 class="product-title">
                    {{ product.name }}
                </h1>


                <p class="product-id">
                    商品編號：
                    #{{ product.id }}
                </p>


                <div class="divider"></div>


                <p class="product-description">
                    {{ product.description }}
                </p>


                <div class="price-area">

                    <span class="price-label">
                        售價
                    </span>

                    <div class="product-price">

                        <small>
                            NT$
                        </small>

                        {{
                            product.price.toLocaleString()
                        }}

                    </div>

                </div>

                <!-- 評分摘要 -->
                <div class="rating-summary">
                    <div class="stars">
                        <Icon 
                            v-for="(star, index) in getStars(Number(averageRating))" 
                            :key="index"
                            :icon="star === 'full' ? 'material-symbols:star' : (star === 'half' ? 'material-symbols:star-half' : 'material-symbols:star-outline')"
                            :class="'star-icon ' + star"
                        />
                    </div>
                    <span class="rating-text">
                        {{ averageRating }} 分（{{ reviewCount }} 則評論）
                    </span>
                </div>


                <div class="product-actions">

                    <RouterLink
                        to="/products"
                        class="btn"
                    >
                        返回商品列表
                    </RouterLink>

                    <button 
                        class="btn btn-review"
                        @click="toggleReviewForm"
                    >
                        {{ showReviewForm ? '取消評論' : '撰寫評論' }}
                    </button>

                </div>

            </div>

        </section>


        <!-- 評論表單 -->
        <section v-if="product && showReviewForm" class="review-form-section">
            <div class="review-form-card">
                <h3>撰寫評論</h3>
                
                <form @submit.prevent="submitReview" class="review-form">
                    <div class="form-group">
                        <label>使用者名稱：</label>
                        <input 
                            type="text" 
                            v-model="reviewForm.username" 
                            required 
                            placeholder="請輸入您的名稱"
                            class="form-input"
                        />
                    </div>

                    <div class="form-group">
                        <label>年齡：</label>
                        <input 
                            type="number" 
                            v-model="reviewForm.age" 
                            required 
                            min="1" 
                            max="120"
                            placeholder="請輸入您的年齡"
                            class="form-input"
                        />
                    </div>

                    <div class="form-group">
                        <label>頭像照片：</label>
                        <div class="avatar-upload">
                            <div v-if="reviewForm.avatar" class="avatar-preview">
                                <img :src="reviewForm.avatar" alt="頭像預覽" />
                                <button type="button" class="avatar-remove" @click="reviewForm.avatar = ''">
                                    <Icon icon="material-symbols:close" />
                                </button>
                            </div>
                            <label v-else class="avatar-upload-btn">
                                <Icon icon="material-symbols:add-a-photo" />
                                <span>選擇照片</span>
                                <input 
                                    ref="avatarInput"
                                    type="file" 
                                    accept="image/*"
                                    @change="handleAvatarUpload"
                                    class="avatar-file-input"
                                />
                            </label>
                        </div>
                        <span class="form-hint">可選，圖片大小不超過 500KB</span>
                    </div>

                    <div class="form-group">
                        <label>星級評分：</label>
                        <div class="star-rating">
                            <button 
                                type="button"
                                v-for="star in 5" 
                                :key="star"
                                class="star-btn"
                                :class="{ active: star <= (hoverRating || reviewForm.rating) }"
                                @click="setRating(star)"
                                @mouseenter="hoverRating = star"
                                @mouseleave="hoverRating = 0"
                            >
                                <Icon 
                                    :icon="star <= (hoverRating || reviewForm.rating) ? 'material-symbols:star' : 'material-symbols:star-outline'"
                                />
                            </button>
                        </div>
                        <span class="rating-label">{{ reviewForm.rating }} 分</span>
                    </div>

                    <div class="form-group">
                        <label>評論標題：</label>
                        <input 
                            type="text" 
                            v-model="reviewForm.title" 
                            required 
                            placeholder="用一句話總結您的體驗"
                            class="form-input"
                        />
                    </div>

                    <div class="form-group">
                        <label>評論內容：</label>
                        <textarea 
                            v-model="reviewForm.content" 
                            required 
                            placeholder="分享您的詳細體驗..."
                            rows="4"
                            class="form-input"
                        ></textarea>
                    </div>

                    <div class="form-actions">
                        <button 
                            type="button" 
                            class="btn btn-cancel"
                            @click="toggleReviewForm"
                        >
                            取消
                        </button>
                        <button 
                            type="submit" 
                            class="btn btn-submit"
                        >
                            送出評論
                        </button>
                    </div>
                </form>
            </div>
        </section>


        <!-- 評論列表 -->
        <section v-if="product" class="reviews-section">
            <h2 class="section-title">
                客戶評論（{{ reviewCount }}）
            </h2>

            <!-- 無評論 -->
            <div v-if="productReviews.length === 0" class="no-reviews">
                <Icon icon="material-symbols:chat-bubble-outline" class="no-reviews-icon" />
                <p>尚未有任何評論，成為第一個分享體驗的人！</p>
            </div>

            <!-- 評論卡片 -->
            <div v-else class="reviews-grid">
                <div 
                    v-for="review in productReviews" 
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
                                <span v-if="review.verified" class="verified-badge">
                                    <Icon icon="material-symbols:verified" />
                                    已驗證購買
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
                </div>
            </div>
        </section>


        <!-- 找不到商品 -->
        <section
            v-else
            class="status-card"
        >

            <div class="status-icon">
                🔍
            </div>

            <h1>
                找不到商品
            </h1>

            <p>
                找不到商品 ID：
                <strong>
                    {{ $route.params.id }}
                </strong>
            </p>

            <RouterLink
                to="/products"
                class="btn"
            >
                返回商品列表
            </RouterLink>

        </section>

    </main>

</template>


<style scoped>
/* 評分摘要 */
.rating-summary {
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 16px 0;
    padding: 12px 16px;
    background: linear-gradient(135deg, #fef3c7, #fde68a);
    border-radius: 8px;
}

.stars {
    display: flex;
    gap: 2px;
}

.star-icon.full {
    color: #f59e0b;
}

.star-icon.half {
    color: #f59e0b;
}

.star-icon.empty {
    color: #d1d5db;
}

.rating-text {
    font-size: 14px;
    color: #6b7280;
}

/* 產品操作按鈕區 */
.product-actions {
    display: flex;
    gap: 12px;
    margin-top: 24px;
}

.btn-review {
    background: linear-gradient(135deg, #4f46e5, #7c3aed);
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
}

.btn-review:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
}

/* 評論表單區塊 */
.review-form-section {
    margin-top: 40px;
}

.review-form-card {
    background: white;
    border-radius: 16px;
    padding: 24px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.review-form-card h3 {
    margin-top: 0;
    margin-bottom: 20px;
    font-size: 20px;
    color: #212529;
}

.review-form {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.form-group label {
    font-size: 14px;
    font-weight: 600;
    color: #374151;
}

.form-input {
    padding: 10px 14px;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    font-size: 14px;
    transition: border-color 0.2s ease;
}

.form-input:focus {
    outline: none;
    border-color: #4f46e5;
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}

textarea.form-input {
    resize: vertical;
    min-height: 100px;
}

/* 星級選擇器 */
.star-rating {
    display: flex;
    gap: 4px;
}

.star-btn {
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
    transition: transform 0.1s ease;
}

.star-btn:hover {
    transform: scale(1.2);
}

.star-btn .iconify {
    font-size: 28px;
    color: #d1d5db;
    transition: color 0.1s ease;
}

.star-btn.active .iconify {
    color: #f59e0b;
}

.rating-label {
    font-size: 14px;
    color: #6b7280;
    margin-top: 4px;
}

/* 表單按鈕 */
.form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    margin-top: 8px;
}

.btn-cancel {
    background: #e5e7eb;
    color: #374151;
    padding: 10px 20px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.2s ease;
}

.btn-cancel:hover {
    background: #d1d5db;
}

.btn-submit {
    background: linear-gradient(135deg, #10b981, #059669);
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
}

.btn-submit:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
}

/* 評論區塊 */
.reviews-section {
    margin-top: 40px;
    padding-top: 32px;
    border-top: 1px solid #e5e7eb;
}

.section-title {
    font-size: 22px;
    color: #212529;
    margin-bottom: 24px;
}

/* 無評論狀態 */
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

/* 評論卡片網格 */
.reviews-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
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
    overflow: hidden;
    flex-shrink: 0;
}

.reviewer-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

/* 頭像上傳 */
.avatar-upload {
    display: flex;
    align-items: center;
    gap: 12px;
}

.avatar-preview {
    position: relative;
    width: 64px;
    height: 64px;
    border-radius: 50%;
    overflow: hidden;
}

.avatar-preview img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.avatar-remove {
    position: absolute;
    top: 0;
    right: 0;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #ef4444;
    color: white;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
}

.avatar-upload-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 16px;
    border: 2px dashed #d1d5db;
    border-radius: 8px;
    cursor: pointer;
    color: #6b7280;
    transition: all 0.2s ease;
}

.avatar-upload-btn:hover {
    border-color: #4f46e5;
    color: #4f46e5;
}

.avatar-file-input {
    display: none;
}

.form-hint {
    font-size: 12px;
    color: #9ca3af;
    margin-top: 4px;
}

.reviewer-details {
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

.verified-badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 12px;
    color: #10b981;
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
    margin: 0;
}

/* 響應式調整 */
@media (max-width: 768px) {
    .product-actions {
        flex-direction: column;
    }

    .reviews-grid {
        grid-template-columns: 1fr;
    }

    .rating-summary {
        flex-direction: column;
        align-items: flex-start;
    }
}
</style>
