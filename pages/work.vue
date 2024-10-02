<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
    name: "test",
    data() {
        return {
            hours: 136,
            rate: 20,
            // totalAmount: 0,
            maxAmount: 3500,
            deals: [
                {
                    name: 'Питание',
                    amount: 1200
                },
                {
                    name: 'Кварплата',
                    amount: 700
                },
                {
                    name: 'Коммунальные',
                    amount: 200
                },
                {
                    name: 'Массажи',
                    amount: 500
                },
                {
                    name: 'Крипта',
                    amount: 200
                },
            ]
        }
    },
    computed: {
        totalAmount() {
            return this.hours * this.rate;
        },
        overAmount() {
            return this.hours * this.rate - this.deals.reduce((previousValue, currentValue, currentIndex, array) => {
                return previousValue + currentValue.amount;
            }, 0);
        }
    }
})
</script>

<template>
    <div class="stat">
        <div>{{ hours }}h</div>
        <div><span class="green">{{ totalAmount }}€</span>/{{maxAmount}}€</div>
        <div :class="overAmount > 0 ? 'green' : 'red'">{{overAmount > 0 ? '+' : ''}}{{ overAmount }}€</div>
    </div>
    
    <div class="progress">
        <div class="progress__points">
            <div v-for="deal in deals" class="progress__point" :style="{width: `${deal.amount * 100 / maxAmount}%`}">
                {{deal.name}}
                <div class="progress__point-amount">{{deal.amount}}</div>
            </div>
        </div>
<!--        <div v-for="deal in deals" class="progress__point" :style="{width: `${totalAmount * 100 / maxAmount}%`}">{{deal.name}}</div>-->
        <div class="progress__value" :style="{width: `${totalAmount * 100 / maxAmount}%`}"></div>
    </div>
</template>

<style lang="scss" scoped>
.stat {
    display: flex;
    gap: 20px;
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 30px;
}

.progress {
    position: relative;
    max-width: 1000px;
    padding: 2px;
    border: 1px solid #ddd;
    
    &__value {
        height: 30px;
        background: #64d464;
    }

    &__points {
        display: flex;
    }

    &__point {
        position: relative;
        height: 30px;
        padding-inline: 10px;
        //margin: 2px;
        background: #e5e5e5;
        line-height: 30px;
        font-size: 14px;
        
        &:before {
            content: '';
            position: absolute;
            left: 0;
            display: block;
            top: 0;
            bottom: -30px;
            border-left: 1px solid #fff;
        }
    }
    
    &__point-amount {
        color: #000000;
    }
}
.red {
    color: #d92323;
}
.green {
    color:#25b025
}
</style>