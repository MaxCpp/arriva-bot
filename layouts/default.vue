<script>
import {defineComponent} from 'vue'

export default defineComponent({
    name: "default"
})
</script>

<template>
    <div class="app">
        <nav class="navigation">
            <NuxtLink to="/">Main</NuxtLink>
<!--            <NuxtLink to="/work">Work</NuxtLink>-->
<!--            <NuxtLink to="/children">Children</NuxtLink>-->
            <NuxtLink to="/map">Map</NuxtLink>
        </nav>
    
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