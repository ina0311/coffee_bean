<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import apiClient from '@/services/apiClient'
const router = useRouter()

const reviews = ref<any[]>([])
const coffeeBean = ref<any>({})
onMounted(async () => {
  const coffeeBeanId = router.currentRoute.value.params.id
  const result = await apiClient.get(`coffeeBeans/${coffeeBeanId}/reviews`)
  reviews.value = result.data.reviews
  coffeeBean.value = result.data.coffeeBean
})
</script>

<template>
  <div>
    <h1>レビュー一覧</h1>
    <div>
      <h2>{{ coffeeBean.name }}</h2>
      <p>{{ coffeeBean.description }}</p>
    </div>
    <div v-for="review in reviews" :key="review.id" class="card">
      <h3>{{ review.coffeeStyle }}</h3>
      <p>{{ review.total }}</p>
      <p>{{ review.acidity }}</p>
      <p>{{ review.bitterness }}</p>
      <p>{{ review.body }}</p>
      <p>{{ review.afterTaste }}</p>
      <p>{{ review.describe }}</p>
      <button type="button" class="button is-primary" @click="router.push(`/coffeeBeans/${coffeeBean.id}/reviews/${review.id}`)">詳細</button>
    </div>
  </div>
</template>

<style scoped lang="stylus">
</style>
