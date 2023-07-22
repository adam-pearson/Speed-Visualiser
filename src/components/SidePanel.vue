<script setup lang="ts">
import { ref } from 'vue';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import SidePanelDistanceDisplay from './SidePanelDistanceDisplay.vue';
import SidePanelFooter from './SidePanelFooter.vue';

import speedData from '../assets/speedData.json';
import { useDistanceStore } from "../stores/distanceStore";

const store = useDistanceStore();

let isHidden: any = ref(false);
let selectedItems: any = ref([]);

let items: any = ref(speedData);

const toggleSidePanel = () => {
    console.log("toggled");
    isHidden.value = !isHidden.value;
    console.log("state of isHidden: ", isHidden.value);
}

const addItem = () => {
    if (items.value.length > 0) {
        const random = items.value[Math.floor(Math.random() * items.value.length)];
        selectedItems.value = [...selectedItems.value, random];
        console.log("adding item: ", random);
    }
}

const removeItem = (item: any) => {
    selectedItems.value = selectedItems.value.filter((x: { name: string }) => x.name !== item.name);
    items.value = [...items.value, item];
}

</script>

<template>
    <div :class="{ '-start-80': isHidden }" class="h-full absolute side-panel">
        <div class="w-80 h-full block bg-gray-200 relative">

            <div class="p-4 flex flex-col justify-center h-full">

                <div class="logo w-full h-16 bg-green-700 mb-4">

                </div>

                <div class="mb-4">
                    <SidePanelDistanceDisplay />
                </div>

                <div class="mb-4 overflow-y-auto">
                    <div v-for="item of selectedItems" class="logo w-full h-16 bg-green-700 mb-4">
                        <button class="w-full h-full" @click="removeItem(item)">
                            {{ item.name }} - {{ store.getDisplayTime(item) }}
                        </button>
                    </div>

                    <button v-if="items.length > 0" class="w-full h-16 bg-blue-50" @click="addItem">
                        <span class="icon px-4">
                            <font-awesome-icon :icon="['fas', 'plus']" />
                        </span>
                        <span class="text px-4">Add</span>
                    </button>
                </div>

                <div class="sidebar-footer mt-auto">
                    <SidePanelFooter />
                </div>
            </div>
            <!-- side panel button, refactor into own component later? -->
            <div class="h-full w-4 absolute -right-4 top-0 bg-transparent flex flex-col justify-center">
                <div class="h-16 w-4 bg-gray-300">
                    <button class="w-full h-full" @click="toggleSidePanel"></button>
                </div>
            </div>

        </div>

    </div>
</template>

<style>
.side-panel {
    z-index: 2000;
}

.off-screen {
    left: -100%;
}
</style>