<script>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, Autoplay, EffectCube } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-cube';


export default {
    components: {
        Swiper,
        SwiperSlide
    },

    data() {
        return {

            banners: [
                {
                    id: 1,
                    image: '/images/banner1.png'
                },
                {
                    id: 2,
                    image: '/images/banner2.png'
                },
                {
                    id: 3,
                    image: '/images/banner3.png'
                }
            ],

            modules: [Autoplay, Pagination, Navigation, EffectCube],
        }
    }

}

</script>

<template>
    <div class=" container-fluid px=0">
        <swiper :modules="modules" :spaceBetween="30" :centeredSlides="true" :autoplay="{
            delay: 5000,
            disableOnInteraction: false,
        }" :pagination="{
            clickable: true,
        }" :navigation="true" loop speed="3000" :effect="'cube'" :grabCursor="true" :cubeEffect="{
            shadow: true,
            slideShadows: true,
            shadowOffset: 20,
            shadowScale: 0.94,
        }" style="background-color: #997A4D;">
            <SwiperSlide v-for="banner in banners" :key="banner.id">
                <img :src="banner.image" class="w-100 d-block">
            </SwiperSlide>
        </Swiper>
    </div>
</template>