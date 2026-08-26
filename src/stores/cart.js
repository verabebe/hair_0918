import {defineStore } from "pinia";

export const useCartStore =
    defineStore("cart", {

        state: () => ({
            cart: 
            JSON.parse(
                localStorage.getItem("cart")
            ) || []
        }),

        getters: {

            // 購物車商品總數量
            totalQuantity(state) {

                return state.cart.reduce(
                    (total, item) => 
                        total + item.quantity, 
                    0
                )
            },

            // 購物車總金額
            totalPrice(state) {

                return state.cart.reduce((total, item) => total + item.quantity * item.price, 0)
            },

            // 購物車有幾種商品
            totoalItems(state) {

                return state.cart.length
            },

            // 判斷購物車是否為空
            isEmpty(state) {

                return state.cart.length === 0
            }

        },

        actions: {

            // ======================
            // 加入購物車
            // ======================
            addToCart(product) {

                const exItem = 
                    this.cart.find(item => item.id === product.id)

                if (exItem) {
                    exItem.quantity++

                } else {

                    this.cart.push({
                        ...product,
                        quantity: 1
                    })
                }

                console.log(this.cart)
                this.saveCart()
            },

            // ============================
            // 商品數量 +1
            // ============================
            increaseQuantity(id) {

                const item =
                    this.cart.find(item => item.id === id)
            
                if (item) {
                    item.quantity++
                    this.saveCart()
                }    
            },

            // ========================
            //商品數量 -1
            // ========================
            decreaseQuantity(id) {

                const item =
                    this.cart.find(
                        item =>
                            item.id === id
                    )

                if (!item) {
                    return
                }

                if (item.quantity > 1) {

                    item.quantity--

                } else {

                    // 數量剩 1 再減
                    // 就直接移除商品
                    this.removeFromCart(id)

                    return
                }

                this.saveCart()
            },

            // =======================
            // 移除商品
            // =======================
            removeFromCart(id) {

                this.cart =
                    this.cart.filter(
                        item =>
                           item.id !== id 
                    )

                this.saveCart()
            },

            // ======================
            // 清空購物車
            // ======================
            clearCart() {

                this.cart = []

                this.saveCart()
            },

            // =======================
            // 儲存購物車
            // =======================
            saveCart() {

                localStorage.setItem(
                    "cart", JSON.stringify(this.cart)
                )
            }
            
        }
    })