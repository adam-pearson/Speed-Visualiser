<script setup lang="ts">
import { ref } from 'vue';
import { useDistanceStore } from "../stores/distanceStore";

const store = useDistanceStore();

let isHidden: any = ref(false);

function toggleSidePanel() {
    console.log("toggled");
    isHidden.value = !isHidden.value;
    console.log("state of isHidden: ", isHidden.value);
}

</script>

<template>
    <div :class="{ '-start-80': isHidden }" class="h-full absolute side-panel">
        <div class="w-80 h-full block bg-gray-500 relative">

            <h3>{{ store.distance }}</h3>
            <h3>{{ store.displayDistance }}</h3>
            <!-- side panel button, refactor into own component later? -->
            <div class="h-full w-4 absolute -right-4 bg-transparent flex flex-col justify-center">
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