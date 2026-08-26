<script>
import { Icon } from '@iconify/vue'
import { useReviewStore } from '../stores/review.js'

export default {
    // 註冊元件
    components: {
        Icon
    },

    props: {
        product: {
            type: Object,
            required: true
        }
    },
    emits: ["add"],

    data() {
        return {
            reviewStore: useReviewStore()
        }
    },

    computed: {
        // 該商品的評論
        productReviews() {
            return this.reviewStore.getReviewsByProductId(this.product.id)
        },
        // 平均星級
        averageRating() {
            return this.reviewStore.getAverageRating(this.product.id)
        },
        // 評論數量
        reviewCount() {
            return this.reviewStore.getReviewCount(this.product.id)
        },
        // 最新評論者
        latestReviewer() {
            if (this.productReviews.length === 0) return null
            return this.productReviews[0]
        }
    },

    methods: {
        goDetail() {
            this.$router.push(`/products/${this.product.id}`)
        },
        goCategory() {
            this.$router.push(`/products/category/${this.product.category}`)
        }
    }

}
</script>
<template>
    <article @click="goDetail">
        <span class="category" :class="{
            red: product.price > 40000,
            orange: product.price > 3000 && product.price <= 1000
        }" @click.stop="goCategory">
            {{ product.category }}
        </span>

        <h3>
            {{ product.name }}
        </h3>

        <img class="card-img" :src="product.img" alt="example">

        <p>
            {{ product.description }}
        </p>

        <strong>
            {{ product.price }}
        </strong>

        <!-- 評論摘要 -->
        <div v-if="reviewCount > 0" class="card-review-summary">
            <div class="card-stars">
                <Icon 
                    v-for="star in 5" 
                    :key="star"
                    :icon="star <= Math.round(Number(averageRating)) ? 'material-symbols:star' : 'material-symbols:star-outline'"
                    :class="star <= Math.round(Number(averageRating)) ? 'star-icon full' : 'star-icon empty'"
                />
            </div>
            <span class="card-review-count">{{ averageRating }} 分（{{ reviewCount }} 則）</span>
        </div>

        <!-- 最新評論者 -->
        <div v-if="latestReviewer" class="card-reviewer">
            <div class="card-reviewer-avatar">
                <img v-if="latestReviewer.avatar" :src="latestReviewer.avatar" :alt="latestReviewer.username" />
                <span v-else>{{ latestReviewer.username.charAt(0) }}</span>
            </div>
            <div class="card-reviewer-info">
                <span class="card-reviewer-name">{{ latestReviewer.username }}</span>
                <span v-if="latestReviewer.age" class="card-reviewer-age">{{ latestReviewer.age }} 歲</span>
            </div>
        </div>

        <button type="button" @click.stop="$emit('add', product)">
            <Icon icon="typcn:shopping-cart" class="me-5" width="24" height="24" color="red" />
            <span class="m-0">加入購物車</span>

        </button>

    </article>

</template>

<style scoped>
.category {
    display: inline;
    cursor: pointer;
}

.category:hover {
    color: white;
    background-color: blue;
    transform: translateY(-5px);
}

.category.orange {
    color: black;
    background-color: orange;
}

.category.red {
    color: black;
    background-color: red;
}

/* 評論摘要 */
.card-review-summary {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 8px;
}

.card-stars {
    display: flex;
    gap: 2px;
}

.star-icon.full {
    color: #f59e0b;
}

.star-icon.empty {
    color: #d1d5db;
}

.card-review-count {
    font-size: 12px;
    color: #6b7280;
}

/* 最新評論者 */
.card-reviewer {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 8px;
    padding-top: 8px;
    border-top: 1px solid #e5e7eb;
}

.card-reviewer-avatar {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: linear-gradient(135deg, #4f46e5, #7c3aed);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 11px;
    overflow: hidden;
    flex-shrink: 0;
}

.card-reviewer-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.card-reviewer-info {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 12px;
}

.card-reviewer-name {
    font-weight: 600;
    color: #374151;
}

.card-reviewer-age {
    color: #6b7280;
}
</style>
