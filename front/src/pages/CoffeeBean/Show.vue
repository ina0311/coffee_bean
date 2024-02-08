<template>
  <div>
    <h1>name: {{coffeeBean.name}}</h1>
    <p>Price: {{coffeeBean.price}}</p>
    <p>Roast: {{coffeeBean.roast}}</p>
    <p>Process: {{coffeeBean.process}}</p>
    <p>Min Altitude: {{coffeeBean.minAltitude}}</p>
    <p>Max Altitude: {{coffeeBean.maxAltitude}}</p>
    <p>Flavors: {{coffeeBean.flavors?.join(', ')}}</p>
    <p>Country:</p>
    <p>name: {{ coffeeBean.country?.name }} <img :src="coffeeBean.country?.flagImage">
      <a class="icon column is-1" :href="coffeeBean.country?.googleMapUrl" target="_blank">
        <i class="fa-solid fa-map"></i>
      </a>
    </p>
    <p></p>
    <p>Store: {{coffeeBean.store?.name}}</p>

    <GoogleMap :lat="coffeeBean.store?.latitude" :lng="coffeeBean.store?.longitude"/>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import apiClient from '@/services/apiClient'
import GoogleMap from '@/parts/GoogleMap.vue';
// import { CoffeeBean } from '@/api/models/coffeeBean'

const coffeeBean: any = ref({})

onMounted(async () => {
  const route = useRoute()
  const id = route.params.id
  if (!id) throw new Error('id is required')

  const response = await apiClient.get(`/coffeeBean/${id}`)
  coffeeBean.value = response.data
})
</script>

<style scoped>
/* Add your custom styles here */
</style>
