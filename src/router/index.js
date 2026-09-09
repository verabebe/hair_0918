import { 
    createRouter, 
    createWebHistory 
} from "vue-router"


const routes = [
    {
        path: "/",
        name: "home",
        component: () =>import("@/views/Homeview.vue")
        // 這種寫法可以到該路由時才import，大專案比較不會進首頁就lag
    },
    {
        path: "/products",
        name: "products",
        component: () => import("@/views/ProductsView.vue")
    },
    {
        path: "/about",
        name: "about",
        component: () => import("@/views/AboutView.vue")
    },
    {
        path: "/products/:id",
        name: "productdetail",
        component: () => import("@/views/ProductDetailView.vue")
    },
    {
        path: "/products/category/:category",
        name: "CategoryProductView",
        component: () => import("@/views/CategoryProductView.vue")
    },

    {
        path: "/testimonial",
        name: "testimonial",
        component: () => import("@/views/Testimonial.vue")
    },

    {
        path: "/cart",
        name: "cart",
        component: () => import("@/views/CartView.vue")
    },

    {
        path: "/reports",
        name: "reports",
        component: () => import("@/views/ReportsView.vue")
    },    
    
    {
        path: "/ReportsTime",
        name: "report-time",
        component: () => import("@/views/ReportsTimelyView.vue")
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