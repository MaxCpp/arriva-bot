<script>
import "leaflet/dist/leaflet.css";
import {defineComponent} from 'vue'
import L from 'leaflet'
import { LMap, LTileLayer, LTooltip, LPolyline, LMarker } from "@vue-leaflet/vue-leaflet";
import { LMarkerRotate } from 'vue-leaflet-rotate-marker';

export default defineComponent({
    name: "page-map",
    components: {
        LMap,
        LTileLayer,
        LMarker,
        LTooltip,
        LPolyline,
        LMarkerRotate
    },
    data() {
        return {
            isLoading: false,
            interval: null,
            geojson: null,
            selectedVehicle: null,
            tripGeometry: null,
            trip: null,
            timeToStop: null,
            averageSpeedKmH: 45, // Средняя скорость автобуса, км/ч
        }
    },
    computed: {
        getPathTripCoordinates() {
            // Меняем порядок координат для Leaflet (нужно [lat, lng], а не [lng, lat])
            return this.tripGeometry.coordinates.map(coord => [coord[1], coord[0]])
        }
    },
    // watch: {
    //     selectedVehicle(vehicle) {
    //         this.selectedVehicle = vehicle;
    //     }
    // },
    mounted() {
        
        // https://www.youtube.com/watch?v=P9C25Un7xaM
        this.refreshLocations();

        this.interval = setInterval(this.refreshLocations, 30000);
    },
    methods: {
        // Функция для расчета расстояния между двумя точками (Haversine formula)
        getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
            const R = 6371; // Радиус Земли в км
            const dLat = this.deg2rad(lat2 - lat1);
            const dLon = this.deg2rad(lon2 - lon1);
            const a =
                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            const distance = R * c; // Расстояние в км
            return distance;
        },
        deg2rad(deg) {
            return deg * (Math.PI / 180);
        },
        // Функция для нахождения ближайшей точки на маршруте
        findClosestPointIndex(currentPosition, route) {
            let closestIndex = 0;
            let minDistance = Infinity;
            
            route.forEach((point, index) => {
                const distance = this.getDistanceFromLatLonInKm(currentPosition.lat, currentPosition.lon, point[1], point[0]);
                if (distance < minDistance) {
                    minDistance = distance;
                    closestIndex = index;
                }
            });
            
            return closestIndex;
        },
        // Функция для расчета времени
        calculateTimeToStop(currentPosition, stopPosition, route, averageSpeedKmH) {
            // Находим ближайшую точку маршрута к текущей позиции и остановке
            const startIdx = this.findClosestPointIndex(currentPosition, route);
            const stopIdx = this.findClosestPointIndex(stopPosition, route);
            
            // Просуммируем расстояния между точками маршрута от текущей позиции до остановки
            let totalDistance = 0;
            for (let i = startIdx; i < stopIdx; i++) {
                totalDistance += this.getDistanceFromLatLonInKm(route[i][1], route[i][0], route[i + 1][1], route[i + 1][0]);
            }
            
            // Рассчитываем время в часах
            const timeToArrivalHours = totalDistance / averageSpeedKmH;
            
            // Преобразуем в минуты
            const timeToArrivalMinutes = timeToArrivalHours * 60;
            
            return timeToArrivalMinutes;
        },
        convertMinutesToTimeFormat(minutes) {
            const hours = Math.floor(minutes / 60); // Целое количество часов
            const mins = Math.floor(minutes % 60); // Остаток минут
            const seconds = Math.floor((minutes * 60) % 60); // Остаток секунд
            
            // Форматируем строку для минут, часов и секунд
            const formattedMins = mins < 10 ? `0${mins}` : mins; // Добавляем 0 перед минутами, если они меньше 10
            const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds; // Добавляем 0 перед секундами, если они меньше 10
            
            // return `${hours}:${formattedMins}:${formattedSeconds}`;
            return `${formattedMins}:${formattedSeconds}`;
        },

        async refreshLocations() {
            const vehicles = await this.fetchLocations();
            
            vehicles.features = vehicles.features.filter(item => item.properties.operator_id === 14)
            this.geojson = vehicles;
            
            ///TODO: найти selectedVehicle
            if (this.selectedVehicle) {
                const foundVehicle = vehicles.features.find(item => item.properties.vehicle_id === this.selectedVehicle.properties.vehicle_id);
                
                if (foundVehicle) {
                    this.selectedVehicle.geometry = foundVehicle.geometry
                    this.refreshCalculateTimeToStop()
                }
            }
            
        },
        async fetchLocations() {
            const response = await $fetch('https://ojpp.si/api/vehicle_locations?active=1&exclude_operators=lpp,marprom')

            if (response) {
                return response;
            }
        },
        async fetchTrip(vehicleId) {
            const response = await $fetch(`https://ojpp.si/api/trips/${vehicleId}/details/`)

            if (response) {
                return response;
            }
        },
        async fetchTripGeometry(vehicleId) {
            const response = await $fetch(`https://ojpp.si/api/trips/${vehicleId}/geometry/`)

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
        },
        // onMarkerReady(feature, marker) {
        //     // Добавляем постоянный тултип с operator_id
        //     marker.bindTooltip(`${feature.properties.operator_id}`, {
        //         permanent: true,
        //         direction: 'top',
        //         offset: [0, -25], // Сдвиг тултипа над маркером
        //         className: 'custom-tooltip' // Можно добавить свой класс для стилизации
        //     }).openTooltip();
        // },
        refreshCalculateTimeToStop() {
            // const route = [
            //     [13.738259162403, 45.5382482771854], // Маршрут (пример)
            //     // остальные точки...
            // ];
            
            // Текущая позиция автобуса
            const currentPosition = {
                // lat: 45.5179435,
                // lon: 13.6037707
                lat: this.selectedVehicle.geometry.coordinates[1],
                lon: this.selectedVehicle.geometry.coordinates[0]
            };
            
            // Позиция остановки
            const stopPosition = {
                lat: 45.5307653,
                lon: 13.6510936
            };
            
            this.timeToStop = this.convertMinutesToTimeFormat(this.calculateTimeToStop(currentPosition, stopPosition, this.tripGeometry.coordinates, this.averageSpeedKmH));
            
        },
        async onClickVehicle(vehicle) {
            console.log(vehicle.properties)
            this.clearSelectedVehicle();

            try {
                this.isLoading = true;
                
                this.selectedVehicle = vehicle;
                
                if (!vehicle.properties?.route_id || !vehicle.properties?.route_name) {
                    const trip = await this.fetchTrip(vehicle.properties.trip_id);

                    this.trip = trip;
                    this.selectedVehicle.properties.route_id = trip.route;
                    this.selectedVehicle.properties.route_name = trip.name;
                }

                const tripGeometry = await this.fetchTripGeometry(vehicle.properties.trip_id);
                
                this.tripGeometry = tripGeometry;
                
                // Рассчитываем время до прибытия
                if (vehicle.properties?.route_id === 1367620) {
                    this.refreshCalculateTimeToStop()
                }
                
                
            } finally {
                this.isLoading = false;
            }
        },
        onClickMap() {
            this.clearSelectedVehicle();
        },
        clearSelectedVehicle() {
            console.log('clearSelectedVehicle()');
            this.trip = null;
            this.tripGeometry = null;
            this.selectedVehicle = null;
            this.timeToStop = null;
            this.isLoading = false;
        }
    }
})
</script>

<template>
    <main>
        <div v-if="selectedVehicle || isLoading" class="info-panel">
            <div>
                <Loader v-if="isLoading"/>
    
                <template v-else-if="selectedVehicle">
                    <h2 class="info-panel__title">{{selectedVehicle.properties.route_name}} ({{selectedVehicle.properties.route_id}})</h2>
        
                    <div>Время до прибытия: <span class="info-panel__time">{{timeToStop}}</span></div>
                </template>
            </div>
        </div>

        <client-only>
            <LMap
                :zoom="13"
                :center="[45.5149544, 13.63025]"
                :use-global-leaflet="false"
                @click="onClickMap"
            >
                <LTileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
                    layer-type="base"
                    name="OpenStreetMap"
                />
                
                <LPolyline
                    v-if="tripGeometry"
                    :lat-lngs="getPathTripCoordinates"
                    color="#228abb"
                    :weight="5"
                />
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
                    v-if="geojson"
                    v-for="(feature, index) in geojson.features"
                    :key="index"
                    :lat-lng="[feature.geometry.coordinates[1], feature.geometry.coordinates[0]]"
                    :icon="createCustomIcon(feature)"
                    :rotation-angle="feature.properties.direction"
                    @click="onClickVehicle(feature)"
                >
                </LMarkerRotate>
                
        <!--            <LMarkerRotate-->
        <!--                :lat-lng="[45, 10]"-->
        <!--                rotationOrigin="bottom center"-->
        <!--                :rotationAngle="172"-->
        <!--            >-->
        <!--                <LTooltip>-->
        <!--                    Tooltip-->
        <!--                </LTooltip>-->
        <!--            </LMarkerRotate>-->
        <!--            <LMarker-->
        <!--                :lat-lng="[45, 0]"-->
        <!--                rotationOrigin="bottom center"-->
        <!--                :rotationAngle="172"-->
        <!--            >-->
        <!--                <LTooltip>-->
        <!--                    Tooltip-->
        <!--                </LTooltip>-->
        <!--            </LMarker>-->
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

.info-panel {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 200px;
    min-height: 110px;
    padding: 20px;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0,0,0,.3);

    &__title {
        margin-bottom: 20px;
        font-size: 20px;
        font-weight: bold;
    }

    &__time {
        font-weight: bold;
        font-size: 24px;
    }
}

</style>