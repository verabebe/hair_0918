<script>

// 1. 匯入  ProductCard 元件
import ProductCard from "../components/ProductsCard.vue"
import Cart from "../components/Cart.vue"
import {useProductStore} from"../stores/product.js"

export default {

    // 2. 註冊元件
    components: {
        ProductCard,
        Cart
    },

    data() {
        return {
            productStore: useProductStore(),
            // cartStore: useCartStore()
        }
    },
    computed: {
        product(){
            console.log(this.productStore.getProductByCategory(this.$route.params.category))
            return this.productStore.getProductByCategory(this.$route.params.category)
        }

    },

    methods: {
       
    
        addToCart(product) {

            const exItem = this.cart.find(
                item => item.id === product.id
            )

            if (exItem) {

                exItem.quantity++

            } else {

                this.cart.push({
                    ...product,
                    quantity: 1
                })

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

        <!-- ================= 首頁 ============== -->
        <!-- <section class="hero">
            
        </section>  -->

        <!-- ================= Banner ============== -->


        <!-- ================= 載入中 ============== -->
        <section v-if="isLoding">
            <p>
                商品資料載入中...
            </p>
        </section>

        <!-- =========== 商品列表 =========== -->
        <section v-else class="product-grid">

            <ProductCard v-for="product in product" :key="product.id" :product="product"
                @add="addToCart" />

        </section>


        <!-- ================= 錯誤訊息 ============== -->

    </main>


</template>