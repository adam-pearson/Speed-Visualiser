<script setup lang="ts">
import { useDistanceStore } from "../stores/distanceStore";

const store = useDistanceStore();
</script>

<template>
    <div class="prose text-center">
        <h1 class="mb-0">Current Distance</h1>
        <h3 class="mt-4">{{ store.displayDistance }} {{ store.unit.short }}</h3>
    </div>
</template>

<style></style>