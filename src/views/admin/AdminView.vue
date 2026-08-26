<script>
import { UseAuthStore } from '../../stores/auth'

export default {
    data() {
        return {
            authStore: UseAuthStore()
        }
    },
    methods: {
        logout() {
            this.authStore.logout()

            this.$router.push('/login')
        }
    }
}
</script>

<template>

    <div class="d-flex min-vh-100 bg-light">

        <!-- 左側選單 -->

        <aside class="bg-dark text-white p-3 d-flex flex-column" style="width: 200px;">

            <h4 class="mb-4">
                <i class="bi bi-speedometer2 me-2"></i>
                管理後台
            </h4>

            <nav class="nav-pills flex-column gap-3">

                <RouterLink to="/admin/dashboard" class="nav-link text-white p-3" active-class="active">
                    <i class="bi bi-speedometer2 me-2"></i>
                    儀錶板
                </RouterLink>

                <RouterLink to="/admin/product" class="nav-link text-white p-3" active-class="active">
                    <i class="bi bi-house-door me-2"></i>
                    商品管理
                </RouterLink>


            </nav>

            <div class="mt-auto">

                <hr>

                <button class="btn btn-outline-light w-100" @click="logout">
                    <i class="bi bi-arrow-right me-2"></i>
                    登出
                </button>

            </div>

        </aside>

        <div class=" flex-grow-1">

            <header class=" bg-white border-bottom px-4 py-3 d-flex justify-content-between align-items-center">
                <h5 class="mb-0">後台管理系統</h5>
                <div>
                    <i class="bi bi-person-fill"></i>
                    Admin
                </div>
            </header>
            <main>
                <router-view></router-view>
            </main>

        </div>
    </div>

</template>