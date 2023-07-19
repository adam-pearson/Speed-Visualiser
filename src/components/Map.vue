<script setup lang="ts" >
import { ref } from 'vue';
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker, LPolyline } from "@vue-leaflet/vue-leaflet";
import { useDistanceStore } from "../stores/distanceStore";

const store = useDistanceStore();

let zoom = ref(6)
let center = ref([54, -2])

let nodes: any = ref({ latlngs: [], color: 'green' });
store.updateDistance(nodes);

const addNode = (event: any) => {
    nodes.value.latlngs = [...nodes.value.latlngs, event.latlng];
    console.log(event.latlng);
    store.updateDistance(nodes);
}

const removeNode = (event: any) => {
    console.log(event.latlng);
    nodes.value.latlngs = nodes.value.latlngs.filter((m: any) => m.lat !== event.latlng.lat && m.lng !== event.latlng.lng)

    store.updateDistance(nodes);
}

</script>

<template>
    <main>
        <l-map ref="map" v-model:zoom="zoom" v-model:center="center" :useGlobalLeaflet="false" @click="addNode">
            <l-tile-layer url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png" layer-type="base"
                name="Stadia Maps Basemap" attribution="© Stadia Maps | © OpenMapTiles | © OpenStreetMap"></l-tile-layer>
            <l-marker v-for="node in nodes.latlngs" :lat-lng="node" @click="removeNode"></l-marker>
            <l-polyline :lat-lngs="nodes.latlngs" :color="nodes.color"></l-polyline>
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