<script>
import {defineComponent} from 'vue'

export default defineComponent({
    name: "CountdownTimer",
    props: {
        // Передаём начальное время в секундах
        initialTime: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            timeLeft: this.initialTime * 1000, // Переводим в миллисекунды
            timer: null
        }
    },
    computed: {
        formattedTime() {
            // Передаем оставшееся время в миллисекундах в функцию для форматирования
            return this.convertMillisecondsToTimeFormat(this.timeLeft)
        }
    },
    watch: {
        initialTime: {
            immediate: true,
            handler(newVal) {
                // При изменении пропса сбрасываем таймер
                this.timeLeft = newVal * 1000
                this.startTimer()
            }
        }
    },
    methods: {
        startTimer() {
            // Очищаем предыдущий интервал, если есть
            if (this.timer) {
                clearInterval(this.timer)
            }
            
            // Обновляем таймер каждую секунду
            this.timer = setInterval(() => {
                if (this.timeLeft > 0) {
                    this.timeLeft -= 1000
                } else {
                    clearInterval(this.timer)
                }
            }, 1000)
        },
        convertMillisecondsToTimeFormat(milliseconds) {
            const totalSeconds = Math.floor(milliseconds / 1000); // Переводим миллисекунды в секунды
            const minutes = Math.floor(totalSeconds / 60); // Целое количество минут
            const seconds = totalSeconds % 60; // Остаток секунд
            
            // Форматируем строку для минут и секунд
            const formattedMins = minutes < 10 ? `0${minutes}` : minutes; // Добавляем 0 перед минутами, если они меньше 10
            const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds; // Добавляем 0 перед секундами, если они меньше 10
            
            // Возвращаем строку в формате MM:SS
            return `${formattedMins}:${formattedSeconds}`;
        }
    },
    mounted() {
        // Запускаем таймер при монтировании компонента
        this.startTimer()
    },
    beforeDestroy() {
        // Очищаем интервал перед уничтожением компонента
        if (this.timer) {
            clearInterval(this.timer)
        }
    }
})
</script>

<template>
    <span class="countdown-timer">{{ formattedTime }}</span>
</template>

<style scoped lang="scss">
.countdown-timer {
    font-weight: bold;
    font-size: 24px;
}
</style>