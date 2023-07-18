<script setup lang="ts" >
import { reactive, ref } from 'vue';
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker, LPolyline } from "@vue-leaflet/vue-leaflet";

let zoom = ref(6)
let center = ref([38, 139.69])

let nodes: any = ref({ latlngs: [], color: 'green' });

let distance: any = ref(0);
let displayDistance: any = ref(0);

let unit: any = reactive({ name: 'kilometre', shorthand: 'km' });

console.log("nodes: ", nodes);

function addNode(event: any) {
    nodes.value.latlngs = [...nodes.value.latlngs, event.latlng];

    updateDistance();
}

function removeNode(event: any) {
    console.log(event.latlng);
    nodes.value.latlngs = nodes.value.latlngs.filter((m: any) => m.lat !== event.latlng.lat && m.lng !== event.latlng.lng)

    updateDistance();
}

function updateDistance(): void {
    distance.value = 0;
    for (let i = 0; i < nodes.value.latlngs.length; i++) {
        if (i > 0) {
            distance.value += nodes.value.latlngs[i - 1].distanceTo(nodes.value.latlngs[i]);
        }
    }

    updateDisplayDistance();

    console.log("new distance: ", distance.value);
}

function updateDisplayDistance() {
    switch (unit.name) {
        case 'feet':
            displayDistance.value = (distance.value * 3.281).toFixed(0);
            break;
        case 'yard':
            displayDistance.value = (distance.value * 1.094).toFixed(0);
            break;
        case 'mile':
            displayDistance.value = (distance.value / 1609).toFixed(2);
            break;
        case 'metre':
            displayDistance.value = (distance.value).toFixed(0);
            break;
        case 'kilometre':
            displayDistance.value = (distance.value / 1000).toFixed(2);
            break;
        default:
            displayDistance.value = distance.value;
            break;
    }
}

</script>

<template>
    <main>
        <div>{{ displayDistance }} {{ unit.shorthand }}</div>
        <l-map ref="map" v-model:zoom="zoom" v-model:center="center" :useGlobalLeaflet="false" @click="addNode">
            <l-tile-layer url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png" layer-type="base"
                name="Stadia Maps Basemap"></l-tile-layer>
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
    height: 100vh;
    width: 100vw;
}
</style>