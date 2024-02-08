<template>
  <div id="map"></div>
</template>

<script setup lang="ts">
import { onMounted, defineProps } from 'vue'

const GOOGLE_MAP_API_KEY = import.meta.env.VITE_GOOGLE_MAP_API_KEY
const props = defineProps({
  lat: {
    type: String,
    default: '35.894877'
  },
  lng: {
    type: String,
    default: '139.6308659'
  }
})

onMounted(async () => {
  const script = document.createElement('script')
  script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_API_KEY}&v=beta&libraries=marker&&callback=initMap&v=weekly`
  script.async = true
	document.head.appendChild(script)
})

let map
const initMap = async () => {
  const position = { lat: +props.lat, lng: +props.lng}
  // @ts-ignore
  const { Map } = await google.maps.importLibrary("maps")
  // @ts-ignore
  const {AdvancedMarkerElement} = await google.maps.importLibrary("marker")

  map = new Map(document.getElementById("map"), {
    center: position,
    zoom: 16,
    mapId: 'YOUR_MAP_ID'
  })

  // @ts-ignore
  const marker = new AdvancedMarkerElement({
    map: map,
    position: position,
  })
}

// @ts-ignore
window.initMap = initMap
</script>

<style lang="stylus">
#map
  height 400px
  width 100%
</style>
