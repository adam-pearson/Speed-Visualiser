<script setup lang="ts" >
import Map from './components/Map.vue';
import SidePanel from './components/SidePanel.vue';

function updateDistance(value: any) {
  console.log(value);
}

</script>

<template>
  <div class="w-full h-full">
    <SidePanel />
    <div class="col-span-1 w-full h-full">
      <Map @distance="updateDistance" />
    </div>
  </div>
</template>

<style>
body {
  width: 100%;
  height: 100vh;
}
</style>