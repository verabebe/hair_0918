import { 
    createRouter, 
    createWebHistory 
} from "vue-router"

import ProductsView from "../views/ProductsView.vue"
import AboutView from "../views/AboutView.vue"
import ProductDetailView from "../views/ProductDetailView.vue"
import CategoryProductView from"../views/CategoryProductView.vue"
import CartView from "../views/CartView.vue"
import ReportsView from "../views/ReportsView.vue"
import ReportsTimelyView from "../views/ReportsTimelyView.vue"
import Testimonial from "../views/Testimonial.vue"

const routes = [
    {
        path: "/",
        name: "home",
        component: () =>import("../views/HomeView.vue")
        // 這種寫法可以到該路由時才import，大專案比較不會進首頁就lag
    },
    {
        path: "/products",
        name: "products",
        component: ProductsView
    },
    {
        path: "/about",
        name: "about",
        component: AboutView
    },
    {
        path: "/products/:id",
        name: "productdetail",
        component: ProductDetailView
    },
    {
        path: "/products/category/:category",
        name: "CategoryProductView",
        component: CategoryProductView
    },

    {
        path: "/testimonial",
        name: "testimonial",
        component: Testimonial
    },

    {
        path: "/cart",
        name: "cart",
        component: CartView
    },

    {
        path: "/reports",
        name: "reports",
        component: ReportsView
    },    
    
    {
        path: "/ReportsTime",
        name: "report-time",
        component: ReportsTimelyView
    },  

    {
        path: "/login",
        name: "login",
        component: () => import('../views/admin/LoginView.vue')
    },  

    {
        path: "/admin",
        component: () => import('../views/admin/AdminView.vue'),
        meta: {
            requiresAuth: true //代表這個路由需要登入
        },
        children: [
            {path: '',
                redirect: '/admin/dashboard'
            },
            {
                path: 'dashboard',
                component: () => import('../views/admin/DashboardView.vue')
            },
            {
                path: 'product',
                component: () => import('../views/admin/ProductManageView.vue')
            }
        ]
    }  
]

const router = createRouter(
    {
        history: createWebHistory(),
        routes
    }
)

router.beforeEach((to) => {
    const token = localStorage.getItem('token')

    if (to.meta.requiresAuth && !token) {
        return '/login'
    }
    if (to.path === 'login' && token) {
        return '/admin'
    }


})


export default router