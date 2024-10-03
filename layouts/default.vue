<script>
import {defineComponent} from 'vue'

export default defineComponent({
    name: "default",
    mounted() {
        if (process.client && process.env.APP_ENV === 'production') {
            this.tg = window.Telegram.WebApp;

            // Уведомляем Telegram, что Web App готово
            this.tg.ready();

            // Разворачиваем на полный экран
            this.tg.expand();

            // Например, можно установить цвет темы Web App
            this.tg.setBackgroundColor("#f5f5f5");

            // Дополнительная логика или методы взаимодействия с Telegram WebApp API
        }
    }
})
</script>

<template>
    <div class="app">
<!--        <nav class="navigation">-->
<!--            <NuxtLink to="/">Main</NuxtLink>-->
<!--&lt;!&ndash;            <NuxtLink to="/work">Work</NuxtLink>&ndash;&gt;-->
<!--&lt;!&ndash;            <NuxtLink to="/children">Children</NuxtLink>&ndash;&gt;-->
<!--            <NuxtLink to="/map">Map</NuxtLink>-->
<!--        </nav>-->
    
        <NuxtPage/>
    </div>
</template>

<style lang="scss" scoped>
.app {
    height: 100vh;
}

.navigation {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 9000;
    display: flex;
    gap: 20px;
    height: 60px;
    padding: 20px;
    background-color: #fff;
}
</style>