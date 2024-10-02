<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
    name: "index",
    data() {
        return {
            timeframe: 1,
            numberMinutesFullDay: 60 * 24,
            spheres: [
                {
                    name: 'Health',
                    color: '#c8e6ff',
                    // color: '#d2e7f4',
                    content: [
                        {
                            name: 'Sleep',
                            color: '#959bee',
                            value: 480
                        },
                        {
                            name: 'Hiking',
                            value: 60
                        },
                        {
                            name: 'Gymnastics',
                            value: 30
                        }
                    ]
                },
                {
                    name: 'Work',
                    color: '#ffc894',
                    content: [
                        {
                            name: '1ATH',
                            value: 480
                        },
                        {
                            name: 'Totaling',
                            value: 30
                        }
                    ]
                },
                // {
                //     name: 'Family ',
                //     color: '#fbeb1f',
                //     content: [
                //         {
                //             name: 'Children',
                //             value: 100
                //         },
                //         {
                //             name: 'Cooking',
                //             value: 20
                //         }
                //     ]
                // },
                // {
                //     name: 'Music',
                //     color: '#b2eba7',
                //     // color: '#c0e7c1',
                //     content: [
                //         {
                //             name: 'Theory',
                //             value: 10
                //         },
                //         {
                //             name: 'Practice',
                //             value: 15
                //         }
                //     ]
                // },
                // {
                //     name: 'Languages',
                //     color: '#ff7070',
                //     content: [
                //         {
                //             name: 'English',
                //             value: 15
                //         },
                //         {
                //             name: 'Slovenian',
                //             value: 15
                //         }
                //     ]
                // },
            ]
        }
    },
    computed: {
        transformSpheres() {
            const maxSquares = Math.ceil(this.numberMinutesFullDay / this.timeframe)
            const arrSquares = new Array()

            for (const sphere of this.spheres) {
                for (const theme of sphere.content) {

                    const countSquaresTheme = Math.ceil(theme.value / this.timeframe)

                    for (let i = 0; i < countSquaresTheme; i++) {
                        arrSquares.push({
                            name: theme.name,
                            color: theme.color || sphere.color,
                            min: theme.value
                        })
                    }
                }
            }
            console.log('maxSquares', maxSquares)
            const diff = (maxSquares - arrSquares.length) * this.timeframe;

            while (arrSquares.length < maxSquares) {
                arrSquares.push({
                    name: 'Empty time ',
                    min: diff
                });
            }
            
            return arrSquares;
        }
    },
    methods: {
        // onChangeTimeframe(val) {
        //     console.log('val', val)
        //     this.timeframe = val;
        // }
    }
})
</script>

<template>
    <div class="grid">
        <div>
            <div class="header">
                <h1 class="title_size_32">One day</h1>
                
                <select v-model="timeframe">
                    <option :value="1">One square is 1 min</option>
                    <option :value="5">One square is 5 min</option>
                    <option :value="10">One square is 10 min</option>
                    <option :value="15">One square is 15 min</option>
                </select>
            </div>
            
            <!--            <div v-for="sphere in spheres" class="sphere" :style="{'background-color': sphere.color}">-->
            <!--                <div class="sphere__title">{{sphere.name}}</div>-->
            
            <!--                <ul class="sphere__content">-->
            <!--                    <li v-if="sphere?.content"-->
            <!--                        v-for="sub in sphere.content"-->
            <!--                        class="sphere__theme">-->
            <!--                            <div>{{sub.name}}</div>-->
            <!--                            <div>{{sub.value}}</div>-->
            <!--                    </li>-->
            <!--                </ul>-->
            <!--            </div>-->

            <div class="theme__content" style="padding: 0 20px 10px">
                <div v-for="(item, index) in transformSpheres"
                     :key="'day' + index"
                     :style="{'background-color': item.color}"
                     :class="{'square_1min': timeframe === 1}"
                     :title="`${item.name} - ${item.min} min (${(item.min / 60).toFixed(1)} h)`"
                     class="square"></div>
            </div>
            
            <div v-for="sphere in spheres" class="sphere">
                <div class="sphere__title">{{sphere.name}}</div>
                
                <ul class="sphere__content">
                    <li v-if="sphere?.content"
                        v-for="theme in sphere.content"
                        class="sphere__theme">
                        <div>{{theme.name}}</div>
                        <div>{{theme.value}}</div>
                        <div class="theme__content">
                            <div v-for="index in Math.ceil(theme.value / timeframe)"
                                 :key="theme.name+index"
                                 :style="{'background-color': theme.color || sphere.color}"
                                 :class="{'square_1min': timeframe === 1}"
                                 class="square"></div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div>
            <h1>Main</h1>
            <NuxtLink to="/">Main</NuxtLink>
            <NuxtLink to="/children/">Children</NuxtLink>
        </div>
    </div>
</template>

<style lang="scss" scoped>
//.grid {
//    display: grid;
//    grid-template-columns: 1fr 1fr;
//}
.header {
    display: flex;
    justify-content: space-between;
    padding: 20px;
}

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