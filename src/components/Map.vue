<script setup lang="ts" >
import { ref } from 'vue';
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker, LPolyline } from "@vue-leaflet/vue-leaflet";
import { useDistanceStore } from "../stores/distanceStore";

const store = useDistanceStore();

let zoom = ref(6)
let center = ref([54, -2])

let nodes: any = ref({ latlngs: [], color: 'green' });

store.updateDistance();

</script>

<template>
    <main>
        <l-map ref="map" v-model:zoom="zoom" v-model:center="center" :useGlobalLeaflet="false" @click="store.addNode">
            <l-tile-layer url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png" layer-type="base"
                name="Stadia Maps Basemap" attribution="© Stadia Maps | © OpenMapTiles | © OpenStreetMap"></l-tile-layer>
            <l-marker v-for="node in store.nodes.latlngs" :lat-lng="node" @click="store.removeNode"></l-marker>
            <l-polyline :lat-lngs="store.nodes.latlngs" :color="nodes.color"></l-polyline>
        </l-map>
    </main>
</template>

<style>
html,
body {
    margin: 0;
    padding: 0;
}

main {
    height: 100%;
    width: 100%;
}
</style>