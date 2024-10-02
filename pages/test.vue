<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
    name: "test",
    data() {
        return {
        }
    }
})
</script>

<template>
    <div>
        <h1>Test</h1>
        <NuxtLink to="/">Main</NuxtLink>
        <NuxtLink to="/test/">Test</NuxtLink>
        <NuxtLink to="/about/">About</NuxtLink>
    </div>
</template>

<style lang="scss" scoped>

</style>