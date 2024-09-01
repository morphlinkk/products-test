<template>
    <div class="flex justify-center items-center">
        <div class="relative max-w-xl w-full">
            <div>
                <input type="range"
                        :min="min" 
                        :max="max"
                        step="1"
                        @input="minTrigger"
                        v-model="minPrice"
                        class="absolute pointer-events-none appearance-none z-20 h-2 w-full opacity-0 cursor-pointer">
                <input type="range"
                        :min="min"
                        :max="max"
                        step="1"
                        @input="maxTrigger"
                        v-model="maxPrice"
                        class="absolute pointer-events-none appearance-none z-20 h-2 w-full opacity-0 cursor-pointer">
                <div class="relative z-10 h-2">
                <div class="absolute z-10 left-0 right-0 bottom-0 top-0 rounded-md bg-gray-200"></div>
                <div class="absolute z-20 top-0 bottom-0 rounded-md bg-green-300"
                        :style="{ right: maxThumb + '%', left: minThumb + '%' }"></div>
                <div class="absolute z-30 w-6 h-6 top-0 left-0 bg-green-300 rounded-full -mt-2 -ml-1"
                        :style="{ left: minThumb + '%' }"></div>
                <div class="absolute z-30 w-6 h-6 top-0 right-0 bg-green-300 rounded-full -mt-2 -mr-3"
                        :style="{ right: maxThumb + '%' }"></div>
                </div>
            </div>
            <div class="flex justify-between items-center py-5">
                <div>
                <input type="text" maxlength="5" @input="minTrigger" v-model="minPrice"
                        class="px-3 py-2 border border-gray-200 rounded w-24 text-center">
                </div>
                <div>
                <input type="text" maxlength="5" @input="maxTrigger" v-model="maxPrice"
                        class="px-3 py-2 border border-gray-200 rounded w-24 text-center">
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useProductsStore } from '@/stores/products';

const store = useProductsStore();

const minPrice = ref(store.minPrice);
const maxPrice = ref(store.maxPrice);
const min = ref(0);
const max = ref(1000);
const minThumb = ref(0);
const maxThumb = ref(0);

const minTrigger = () => {
    minPrice.value = Math.min(minPrice.value, maxPrice.value);
    minThumb.value = ((minPrice.value - min.value) / (max.value - min.value)) * 100;
    store.setMinPrice(minPrice.value);
};

const maxTrigger = () => {
    maxPrice.value = Math.max(maxPrice.value, minPrice.value);
    maxThumb.value = 100 - (((maxPrice.value - min.value) / (max.value - min.value)) * 100);
    store.setMaxPrice(maxPrice.value);
};

onMounted(() => {
    minTrigger();
    maxTrigger();
});

watch(() => store.minPrice, (newMinPrice) => {
    minPrice.value = newMinPrice;
    minTrigger();
});

watch(() => store.maxPrice, (newMaxPrice) => {
    maxPrice.value = newMaxPrice;
    maxTrigger();
});
</script>

<style scoped>
input[type=range]::-webkit-slider-thumb {
pointer-events: all;
width: 24px;
height: 24px;
-webkit-appearance: none;
}
</style>
