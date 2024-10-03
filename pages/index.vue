<script>
import {defineComponent} from 'vue'

export default defineComponent({
    name: "page-index",
    data() {
        return {
            tg: null,
        }
    },
    mounted() {
        // if (process.client && process.env.APP_ENV === 'development') {
        //     this.tg = window.Telegram.WebApp;
        //
        //     // Уведомляем Telegram, что Web App готово
        //     this.tg.ready();
        //
        //     // Разворачиваем на полный экран
        //     this.tg.expand();
        //
        //     // Например, можно установить цвет темы Web App
        //     this.tg.setBackgroundColor("#f5f5f5");
        //
        //     // Дополнительная логика или методы взаимодействия с Telegram WebApp API
        // }
        // https://www.youtube.com/watch?v=P9C25Un7xaM
        // this.init();
        // this.interval = setInterval(this.fetchLocations, 5000);
    },
    methods: {
        async init() {
            // await this.fetchLocations();

            // if (this.iss.line1) {
            //     this.path = this.getSatelliteCoordinates(-0.3, 1.5, 0.5);
            // }
        },
        sendData() {
            // Пример отправки данных в Telegram
            this.tg.sendData(JSON.stringify({ message: "Hello from Nuxt 3 Web App!" }));
        }
    }
})
</script>

<template>
    <main>
        <client-only>
<!--            <LMap-->
<!--                :zoom="2"-->
<!--                :center="[47.21322, -1.559482]"-->
<!--                :use-global-leaflet="false"-->
<!--            >-->
<!--                <LTileLayer-->
<!--                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"-->
<!--                    attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"-->
<!--                    layer-type="base"-->
<!--                    name="OpenStreetMap"-->
<!--                />-->
<!--                -->
<!--    &lt;!&ndash;            <LMarker v-if="iss.location" :lat-lng="iss.location" />&ndash;&gt;-->
<!--    &lt;!&ndash;            &ndash;&gt;-->
<!--    &lt;!&ndash;            <LPolyline&ndash;&gt;-->
<!--    &lt;!&ndash;                v-if="path.length"&ndash;&gt;-->
<!--    &lt;!&ndash;                :lat-lngs="path"&ndash;&gt;-->
<!--    &lt;!&ndash;                color="green"&ndash;&gt;-->
<!--    &lt;!&ndash;            />&ndash;&gt;-->
<!--    &lt;!&ndash;            <LGeoJson :geojson="geojsonData" />&ndash;&gt;-->
<!--            </LMap>-->
        </client-only>
    </main>
</template>

<style lang="scss" scoped>
main {
    display: flex;
    //height: 100vh;
}
//.grid {
//    display: grid;
//    grid-template-columns: 1fr 1fr;
//}

.sphere {
    padding: 10px 0;
    border-bottom: 1px solid #e6e6e6;

    &__title {
        padding: 0 20px 5px;
        font-weight: bold;
    }

    &__content {
        padding-left: 30px;
    }

    &__theme {
        display: grid;
        grid-template-columns: 100px 50px 1fr;
        //justify-content: space-between;
        gap: 10px;
        padding: 0px 20px;
    }
}

.theme {
    &__content {
        display: flex;
        flex-wrap: wrap;
        gap: 3px;
    }
}

.square {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 14px;
    border-radius: 3px;
    background-color: #dfdfdf;
    aspect-ratio: 1 / 1;
    font-size: 10px;
    color: #fff;
    
    //&:nth-child(6n) {
    //    border: 1px solid rgba(0,0,0,.25);
    //}
    &:nth-child(6n):after {
        content: '';
        width: 100%;
        height: 100%;
        border-radius: 3px;
        //background: rgba(255,255,255,.3);
        background: rgba(0,0,0,.1);
    }
    //&:nth-child(6n):before {
    //    content: '';
    //    position: absolute;
    //    top: -2px;
    //    bottom: -2px;
    //    right: -15px;
    //    z-index: -1;
    //    border-left: 1px solid #717171;
    //    border-radius: 5px;
    //    width: 14px;
    //}
    //&:nth-child(6n):after {
    //    content: '';
    //    position: absolute;
    //    top: -2px;
    //    bottom: -2px;
    //    right: -2px;
    //    z-index: -1;
    //    border-right: 1px solid #747474;
    //    border-radius: 5px;
    //    width: 14px;
    //    //background: #e7e7e7;
    //    //top: -2px;
    //    //bottom: -2px;
    //    //right: -24px;
    //    //z-index: -1;
    //    //width: 80px;
    //    //background: linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,0.1) 49%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.1) calc(50% + 1px), rgba(0,0,0,0));
    //}

    &_1min {
        height: 10px;
        border-radius: 0;
    }
}
</style>