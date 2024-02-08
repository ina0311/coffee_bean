<script setup lang="ts">
import { ref, onMounted } from 'vue'
import apiClient from '@/services/apiClient'
import CoffeeCard from '@/components/coffeeBean/CoffeeCard.vue';

const coffeeBeans = ref<any[]>([])

onMounted(async () => {
  const response = await apiClient.get('/coffeeBeans')
  coffeeBeans.value = response.data
})
</script>

<template>
  <div>
    <CoffeeCard v-for="coffeeBean of coffeeBeans" :coffee-bean="coffeeBean"/>
  </div>
</template>

<style scoped lang="stylus">

</style>
