<script setup lang="ts">

import { useDistanceStore } from "../stores/distanceStore";

const store = useDistanceStore();

</script>


<template>
    <div class="flex flex-row w-full justify-between">
        <div class="flex flex-col">
            <label for="unitSelector">Units</label>
            <select class="form-control" name="unit_selector" id="unit_selector" v-model="store.unit"
                @change="store.updateDisplayDistance">
                <option v-for="unit in store.unitOptions" :value="unit" :selected="unit.value === store.unit.value">
                    {{ unit.displayName }}</option>
            </select>
        </div>


        <!-- <select id="unitSelector">
            <option v-for="unit in store.unitOptions" :value="unit.value"
                :selected="unit.value === store.unit">
                {{ unit.displayName }}</option>
        </select> -->
    </div>
</template>

<style></style>