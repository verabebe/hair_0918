<script>
import { UseAuthStore } from '../../stores/auth';

export default {
    data() {
        return {
            account: '',
            password: '',
            errorMessage: '',
            authStore: UseAuthStore()
        }
    },
    methods: {
        async login() {
            this.errorMessage = ''
            const response = await fetch('/api/login',
                {
                    method:'POST',
                    headers: {
                        'content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        account: this.account,
                        password: this.password
                    })

                }
            )
            if (!response.ok) {
                this.errorMessage = '帳號或密碼錯誤'
                return
            }

            const data = await response.json()
                        console.log(data)
            this.authStore.login(data.token)

            this.$router.push('/admin')
        }

    }
}

</script>

<template>
    <div class=" container py-5">
        <div class="row justify-content-center">

            <div class="col-md-5">
                <h2 class="mb-4">後台登入</h2>
                <div class="mb-3">
                    <label class=" form-label">帳號</label>
                    <input type="text" v-model="account" class=" form-control">

                </div>
                <div class="mb-3">
                    <label class=" form-label">密碼</label>
                    <input type="text" v-model="password" class=" form-control">

                </div>
                
                <button class="btn btn-primary w-100" @click="login">登入</button>

                <div v-if="errorMessage" class=" alert alert-danger mt-3">{{ errorMessage }}</div>
            </div>
        </div>


    </div>
    
</template>