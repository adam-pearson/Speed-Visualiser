<script setup lang="ts">
import { ref } from 'vue';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import SidePanelDistanceDisplay from './SidePanelDistanceDisplay.vue';
import SidePanelFooter from './SidePanelFooter.vue';

let isHidden: any = ref(false);
let listOfItems: any = ref([]);

let testItems: any = ref([{ name: "Walking" }, { name: "Running" }, { name: "Lamborghini Aventador" }, { name: "Bicycle" }, { name: "Motorbike" }]);

const toggleSidePanel = () => {
    console.log("toggled");
    isHidden.value = !isHidden.value;
    console.log("state of isHidden: ", isHidden.value);
}

const addItem = () => {
    if (testItems.value.length > 0) {
        listOfItems.value = [...listOfItems.value, testItems.value.pop()];
        console.log("adding item");
    }
}

const removeItem = (item: any) => {
    listOfItems.value = listOfItems.value.filter((x: { name: string }) => x.name !== item.name);
    testItems.value = [...testItems.value, item];
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

                <div class="mb-4">
                    <div v-for="item of listOfItems" class="logo w-full h-16 bg-green-700 mb-4">
                        <button class="w-full h-full" @click="removeItem(item)">{{ item.name }}</button>
                    </div>

                    <button v-if="testItems.length > 0" class="w-full h-16 bg-blue-50" @click="addItem">
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