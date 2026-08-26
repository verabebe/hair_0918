<script>
// 1. 匯入 ProductCard 與 Pinia Stores
import ProductCard from "../components/ProductsCard.vue"
import { useProductStore } from "../stores/product.js"
import { useCartStore } from "../stores/cart.js"
import { Icon } from '@iconify/vue'

export default {
    // 2. 註冊元件
    components: {
        ProductCard,
        Icon
    },

    data() {
        return {
            productStore: useProductStore(),
            cartStore: useCartStore(),
            // 預約彈窗與表單狀態
            showBookingModal: false,
            bookingForm: {
                name: '',
                phone: '',
                date: '',
                time: ''
            }
        }
    },

    methods: {
        addToCart(product) {
            this.cartStore.addToCart(product)
        },
        // 開啟預約彈窗
        openBookingModal() {
            this.showBookingModal = true
        },
        // 關閉預約彈窗
        closeBookingModal() {
            this.showBookingModal = false
            this.resetBookingForm()
        },
        // 送出預約
        submitBooking() {
            if (!this.bookingForm.name || !this.bookingForm.phone || !this.bookingForm.date) {
                alert('請填寫完整的預約資訊！')
                return
            }

            // TODO: 在此呼叫 API 或 Pinia Action 送出預約資料
            console.log('送出預約資料：', this.bookingForm)
            alert('預約成功！')

            this.closeBookingModal()
        },
        // 重置表單
        resetBookingForm() {
            this.bookingForm = {
                name: '',
                phone: '',
                date: '',
                time: ''
            }
        }
    },
    
    mounted() {
        this.productStore.fetchProducts()
    }
}
</script>

<template>
    <main class="page">

        <!-- =========== 載入中 =========== -->
        <section v-if="productStore.isLoading">
            <p>商品資料載入中...</p>
        </section>

        <!-- =========== 錯誤訊息 =========== -->
        <section v-else-if="productStore.errorMessages">
            <p>{{ productStore.errorMessages }}</p>
        </section>

        <!-- =========== 商品列表 =========== -->
        <section v-else class="product-grid">
            <ProductCard 
                v-for="product in productStore.products" 
                :key="product.id" 
                :product="product" 
                @add="addToCart" 
            />
        </section>
        
        <!-- =========== 預約按鈕 =========== -->
        <div class="book-now">
            <button class="btn-booking" @click="openBookingModal">
                <Icon icon="material-symbols:book" />
                預約服務
            </button>
        </div>

        <!-- =========== 預約表單彈窗 (Modal) =========== -->
        <div v-if="showBookingModal" class="modal-overlay" @click.self="closeBookingModal">
            <div class="modal-content">
                <h3>線上預約</h3>
                <form @submit.prevent="submitBooking" class="booking-form">
                    <div class="form-group">
                        <label>姓名：</label>
                        <input type="text" v-model="bookingForm.name" required placeholder="請輸入姓名" />
                    </div>
                    
                    <div class="form-group">
                        <label>電話：</label>
                        <input type="tel" v-model="bookingForm.phone" required placeholder="請輸入聯絡電話" />
                    </div>

                    <div class="form-group">
                        <label>預約日期：</label>
                        <input type="date" v-model="bookingForm.date" required />
                    </div>

                    <div class="form-group">
                        <label>預約時段：</label>
                        <select v-model="bookingForm.time" required>
                            <option value="" disabled>請選擇時段</option>
                            <option value="10:00">10:00</option>
                            <option value="14:00">14:00</option>
                            <option value="18:00">18:00</option>
                        </select>
                    </div>

                    <div class="modal-actions">
                        <button type="button" class="btn-cancel" @click="closeBookingModal">取消</button>
                        <button type="submit" class="btn-submit">確認預約</button>
                    </div>
                </form>
            </div>
        </div>

    </main>
</template>

<style scoped>
/* 頁面整體樣式 */
.book-now {
    display: flex;
    justify-content: flex-end;
    margin-top: 35px;
}

.btn-booking {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 20px;
    background-color: #4f46e5;
    color: #ffffff;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.2s ease;
}

.btn-booking:hover {
    background-color: #4338ca;
}

/* 預約彈窗 (Modal) 樣式 */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-content {
    background: #ffffff;
    padding: 24px;
    border-radius: 12px;
    width: 90%;
    max-width: 400px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
}

.modal-content h3 {
    margin-top: 0;
    margin-bottom: 20px;
    font-size: 20px;
    color: #333333;
}

.booking-form .form-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 16px;
}

.booking-form label {
    font-size: 14px;
    color: #555555;
    margin-bottom: 6px;
}

.booking-form input,
.booking-form select {
    padding: 8px 12px;
    border: 1px solid #cccccc;
    border-radius: 6px;
    font-size: 14px;
}

.modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    margin-top: 20px;
}

.btn-cancel {
    padding: 8px 16px;
    background-color: #e5e7eb;
    color: #374151;
    border: none;
    border-radius: 6px;
    cursor: pointer;
}

.btn-submit {
    padding: 8px 16px;
    background-color: #4f46e5;
    color: #ffffff;
    border: none;
    border-radius: 6px;
    cursor: pointer;
}
</style>