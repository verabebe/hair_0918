<script>
export default {

    props:{
        cart: {
            type: Array,
            required: true
        }
    }
}

</script>

<template>
    <section class="card">
        <h2>購物車</h2>
        <p>商品數量:{{ cart.length }}</p>
        <div v-if="cart.length">
            <ul>
                <li v-for="item in cart" :key="item.id">
                    {{ item.name }} x {{ item.quantity }}
                    _
                    {{ item.price*item.quantity }}
                </li>
            </ul>
        </div>

        <p v-else>購物車是空的</p>


    </section>
    
</template>