<script>
import { useCartStore } from './stores/cart'

export default {
  data() {
    return {
      cartStore: useCartStore()
    }
  }
}

</script>

<template>
  <div>
    <header class="navbar" style="background-color: black;">
      <div class="navbar-inner">
        <strong class="nav-brand">
          <span><img src="/public//images/Barber_logo.png" alt="" style="width: 2em;"></span>
          <span style="color: #D4AF37;">K.KAI HAIR ACADEMIC LONDON</span>
        </strong>
        <nav class="nav-links">
          <RouterLink :to="{ name: 'home' }">
            HOME
          </RouterLink>

          <RouterLink :to="{ name: 'products' }">
            SERVICES
          </RouterLink>

          <RouterLink :to="{ name: 'about' }">
            ABOUT
          </RouterLink>

          <RouterLink :to="{ name: 'report-time' }">
            SALES REPORT
          
          </RouterLink>

          <RouterLink :to="{}">
            SHOPPING CART
            <span v-if="cartStore.totalQuantity">
              ({{ cartStore.totalQuantity }})
            </span>

          </RouterLink>

        </nav>

      </div>

    </header>
    <router-view></router-view>



  </div>
</template>

<style scoped>
.nav-brand {
  display: flex;
  align-items: center;
  gap: 0.5em;
}

.nav-brand img {
  width: 2em;
  display: block;
}
</style>