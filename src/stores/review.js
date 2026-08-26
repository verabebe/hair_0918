import { defineStore } from "pinia";
import { seedReviews } from "@/data/seedReviews";

export const useReviewStore = defineStore("review", {

    state: () => {
        const saved = localStorage.getItem("reviews")
        if (!saved) {
            localStorage.setItem("reviews", JSON.stringify(seedReviews))
        }
        return {
            reviews: JSON.parse(localStorage.getItem("reviews")) || seedReviews
        }
    },

    getters: {

        // 取得特定商品的評論
        getReviewsByProductId(state) {
            return (productId) => {
                return state.reviews
                    .filter(review => review.productId === productId)
                    .sort((a, b) => new Date(b.date) - new Date(a.date))
            }
        },

        // 取得特定商品的平均星級
        getAverageRating(state) {
            return (productId) => {
                const productReviews = state.reviews.filter(
                    review => review.productId === productId
                )
                if (productReviews.length === 0) return 0
                const total = productReviews.reduce(
                    (sum, review) => sum + review.rating, 0
                )
                return (total / productReviews.length).toFixed(1)
            }
        },

        // 取得特定商品的評論數量
        getReviewCount(state) {
            return (productId) => {
                return state.reviews.filter(
                    review => review.productId === productId
                ).length
            }
        },

        // 取得所有評論（按日期排序）
        allReviews(state) {
            return state.reviews
                .slice()
                .sort((a, b) => new Date(b.date) - new Date(a.date))
        },

        // 整體平均星級
        overallAverageRating(state) {
            if (state.reviews.length === 0) return 0
            const total = state.reviews.reduce(
                (sum, review) => sum + review.rating, 0
            )
            return (total / state.reviews.length).toFixed(1)
        },

        // 總評論數量
        totalReviewCount(state) {
            return state.reviews.length
        }
    },

    actions: {

        // 新增評論
        addReview(review) {
            const newReview = {
                ...review,
                id: Date.now(),
                date: new Date().toISOString()
            }
            this.reviews.push(newReview)
            this.saveReviews()
        },

        // 刪除評論
        removeReview(id) {
            this.reviews = this.reviews.filter(
                review => review.id !== id
            )
            this.saveReviews()
        },

        // 存入 localStorage
        saveReviews() {
            localStorage.setItem("reviews", JSON.stringify(this.reviews))
        }
    }
})
