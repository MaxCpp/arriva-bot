<script>
import {defineComponent} from 'vue'
import { gstime, twoline2satrec, propagate, eciToGeodetic, degreesLong, degreesLat } from 'satellite.js';

export default defineComponent({
    name: "page-map",
    data() {
        return {
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
        // https://www.youtube.com/watch?v=P9C25Un7xaM
        // this.init();
        // this.interval = setInterval(this.fetchLocations, 5000);
    },
    methods: {
        async init() {
            await this.fetchTLE();

            if (this.iss.line1) {
                this.path = this.getSatelliteCoordinates(-0.3, 1.5, 0.5);
            }
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
        async fetchTLE() {
            const response = await $fetch('https://api.wheretheiss.at/v1/satellites/25544/tles')
            
            if (response) {
                this.iss.line1 = response?.line1;
                this.iss.line2 = response?.line1;
            }
        },
        async fetchLocations() {
            // const response = await $fetch('http://api.open-notify.org/iss-now.json')
            //
            // if (response) {
            //     this.iss.location = [response.iss_position.latitude, response.iss_position.longitude];
            // }
            const response = await $fetch('https://api.wheretheiss.at/v1/satellites/25544')
            
            if (response) {
                this.iss.location = [response.latitude, response.longitude];
            }
        }
    }
})
</script>

<template>
    <main>
        <LMap
            :zoom="2"
            :center="[47.21322, -1.559482]"
        >
            <LTileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
                layer-type="base"
                name="OpenStreetMap"
            />
            
<!--            <LMarker v-if="iss.location" :lat-lng="iss.location" />-->
<!--            -->
<!--            <LPolyline-->
<!--                v-if="path.length"-->
<!--                :lat-lngs="path"-->
<!--                color="green"-->
<!--            />-->
        </LMap>
    </main>
</template>

<style lang="scss" scoped>
main {
    display: flex;
    height: calc(100vh - 60px);
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