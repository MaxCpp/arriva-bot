<script>
import {defineComponent} from 'vue'
import L from 'leaflet'
import { LMarkerRotate } from 'vue-leaflet-rotate-marker';

export default defineComponent({
    name: "page-map",
    components: {
        LMarkerRotate
    },
    data() {
        return {
            geojson: null,
            interval: null,
            iss: {
                location: null
            },
            path: [],
            // tleLine1: '1 25544U 98067A   19156.50900463  .00003075  00000-0  59442-4 0  9992',
            // tleLine2: '2 25544  51.6433  59.2583 0008217  16.4489 347.6017 15.51174618173442',
            line1: "1 25544U 98067A   24128.06194722  .00013194  00000+0  23083-3 0  9994",
            line2: "2 25544  51.6397 159.2957 0003628 145.8725  64.6623 15.50961316452164",
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
        this.refreshLocations();

        this.interval = setInterval(this.refreshLocations, 30000);
    },
    methods: {
        async refreshLocations() {
            const vehicles = await this.fetchLocations();

            this.geojson = vehicles;
        },
        // getSatelliteCoordinates(startHours, endHours, intervalMinutes) {
        //     console.log('getSatelliteCoordinates', this.iss.line1, this.iss.line2)
        //     const satrec = twoline2satrec(this.line1, this.line2);
        //     let now = new Date();
        //     let positions = [];
        //     let totalMinutes = (endHours - startHours) * 60 / intervalMinutes;
        //
        //     for (let i = 0; i <= totalMinutes; i++) {
        //         let time = new Date(now.getTime() + (startHours * 60 + i * intervalMinutes) * 60000);
        //         let positionAndVelocity = propagate(satrec, time);
        //         let positionGd = eciToGeodetic(positionAndVelocity.position, gstime(time));
        //         let longitude = degreesLong(positionGd.longitude),
        //             latitude = degreesLat(positionGd.latitude);
        //
        //         positions.push([latitude, longitude]);
        //     }
        //
        //     return positions;
        // },
        async fetchLocations() {
            // const response = await $fetch('http://api.open-notify.org/iss-now.json')
            //
            // if (response) {
            //     this.iss.location = [response.iss_position.latitude, response.iss_position.longitude];
            // }
            const response = await $fetch('https://ojpp.si/api/vehicle_locations?active=1&exclude_operators=lpp,marprom')

            if (response) {
                return response;
            }
        },
        createCustomIcon(feature) {
            return L.icon({
                iconUrl: '/images/icon-gps-location.png',
                iconRetinaUrl: '/images/icon-gps-location@2x.png',
                iconSize: [36, 36],
                iconAnchor: [18, 18],
                popupAnchor: [0, -16],
                // opacity: feature.properties.opacity // Применяем прозрачность
            })
        }
    }
})
</script>

<template>
    <main>
        <client-only>
        <LMap
            :zoom="12"
            :center="[45.5149544, 13.63025]"
            :use-global-leaflet="false"
        >
            <LTileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
                layer-type="base"
                name="OpenStreetMap"
            />
            
<!--            <LMarker v-if="iss.location" :lat-lng="iss.location" />-->
<!--            <LPolyline-->
<!--                v-if="path.length"-->
<!--                :lat-lngs="path"-->
<!--                color="green"-->
<!--            />-->
<!--            <LMarker-->
<!--                v-for="(feature, index) in features"-->
<!--                :key="index"-->
<!--                :lat-lng="[feature.geometry.coordinates[1], feature.geometry.coordinates[0]]"-->
<!--                :icon="createCustomIcon(feature)"-->
<!--                :rotation-angle="feature.properties.direction"-->
<!--            />-->
<!--            <l-marker-rotate-->
<!--                :lat-lng="[-3.5, 117]"-->
<!--                rotationAngle="100"-->
<!--            />-->
            <LMarkerRotate
                v-for="(feature, index) in geojson.features"
                :key="index"
                :lat-lng="[feature.geometry.coordinates[1], feature.geometry.coordinates[0]]"
                :icon="createCustomIcon(feature)"
                :rotation-angle="feature.properties.direction"
            >
                <LTooltip :permanent="true" direction="top" offset="[0, -25]">
                    {{ feature.properties.operator_id }}
                </LTooltip>
            </LMarkerRotate>
            
<!--            <LMarkerRotate-->
<!--                :lat-lng="[-4, 120]"-->
<!--                rotationOrigin="bottom center"-->
<!--                :rotationAngle="172"-->
<!--            >-->
<!--                <LTooltip>-->
<!--                    Tooltip-->
<!--                </LTooltip>-->
<!--            </LMarkerRotate>-->
        </LMap>
        </client-only>
    </main>
</template>

<style lang="scss" scoped>
main {
    display: flex;
    height: 100vh;
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