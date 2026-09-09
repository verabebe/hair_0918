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
          <span><img src="/images/Barber_logo.png" alt="" style="width: 2em;"></span>
          <span style="color: #D4AF37;">K.KAI HAIR ACADEMIC LONDON</span>
        </strong>
        <nav class="nav-links">
          <RouterLink :to="{ name: 'home' }">
            HOME
          </RouterLink>

          <div class="nav-dropdown">
            <RouterLink :to="{ name: 'products' }" class="dropdown-toggle">
              SERVICES
              <span class="dropdown-arrow">&#9662;</span>
            </RouterLink>
            <div class="dropdown-menu">
              <RouterLink :to="{ name: 'CategoryProductView', params: { category: '服務' } }" class="dropdown-item">
                服務
              </RouterLink>
              <RouterLink :to="{ name: 'CategoryProductView', params: { category: '商品' } }" class="dropdown-item">
                商品
              </RouterLink>
              <RouterLink :to="{ name: 'CategoryProductView', params: { category: '學院課程' } }" class="dropdown-item">
                學院課程
              </RouterLink>
            </div>
          </div>

          <RouterLink :to="{ name: 'about' }">
            ABOUT
          </RouterLink>

          <RouterLink :to="{ name: 'report-time' }">
            SALES REPORT
          
          </RouterLink>

          <RouterLink :to="{ name: 'cart' }">
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

.nav-dropdown {
  position: relative;
}

.dropdown-toggle {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.dropdown-arrow {
  font-size: 10px;
  transition: transform 0.2s ease;
}

.nav-dropdown:hover .dropdown-arrow {
  transform: rotate(180deg);
}

.dropdown-menu {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 160px;
  background-color: #ffffff;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  padding: 8px 0;
  z-index: 1000;
}

.nav-dropdown:hover .dropdown-menu {
  display: block;
}

.dropdown-item {
  display: block;
  padding: 10px 20px;
  color: #495057;
  font-weight: 600;
  text-decoration: none;
  white-space: nowrap;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.dropdown-item:hover {
  background-color: #e7f1ff;
  color: #0d6efd;
}

.dropdown-item.router-link-active {
  color: #0d6efd;
}
</style>