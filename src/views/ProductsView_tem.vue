<script>
import ProductsCard from "../components/ProductsCard.vue";
import cart from "../components/Cart.vue";

export default {

  components: {
    ProductsCard,
    cart

  },
  data() {
    return {
      products: [],
      isLoading: false,
      errorMessages: "",
      cart: []
    }
  },
  methods: {
    // Read:讀取商品
    async fetchProducts() {
      this.isLoading = true
      this.errorMessage = ""

      try {

        const response = await fetch("/data/products.json")

        if (!response.ok) {
          throw new Error(`HTTP${response.status}`)
        }

        const data = await response.json()

        console.log('data:', data);
        

        const category=this.$route.params.category

        console.log("網址"+ category);
        
        if(!category){        
          this.products = data
        } else {

          
          this.products = data.filter(product => {

             return product.category == category
            }
          )
        }

        
        

      } catch (error) {
        console.error(error)
      } finally {
        this.isLoading = false
      }
    },
    addToCart(product) {
      const exItem = this.cart.find(item => item.id === product.id)

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
    this.productStore.getProducts()
  },
  computed: {
    filteredProducts() {
      const category = this.$route.params.category;

      if (category) {
        this.productStore.getProductByCategory(category)
      }

      return this.productStore.products;
      },
  },
  components: {
    ProductsCard
  }
}

</script>

<template>
  <main class="page">
    <section class="hero">


      <div>
        <!-- cspell:ignore Vite -->
        <p class="eyebrow">Vite資料夾路徑</p>
      </div>

    </section>

    <section>
      <img src="/images/course-banner.svg">
    </section>

    <section v-if="isLoading">
      <p>商品載入中</p>
    </section>

    <section v-else-if="errorMessages">
      <p>{{ errorMessages }}</p>
    </section>

    <section v-else>
      <ProductsCard v-for="product in filteredProducts" :key="product.id" :product="product" @add="addToCart" />

    </section>

    <section class="card">
      <h2>購物車</h2>
      <p>商品數量:{{ cart.length }}</p>
      <ul>
        <li v-for="item in cart" :key="item.id">
          {{ item.name }} x {{ item.quantity }}
        </li>
      </ul>
    </section>

  </main>

</template>
