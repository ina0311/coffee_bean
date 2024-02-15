<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import apiClient from '@/services/apiClient'
const router = useRouter()
const coffeeBean = ref<any>({})
const review = ref<any>({})

onMounted(async () => {
  const coffeeBeanId = router.currentRoute.value.params.id
  const reviewId = router.currentRoute.value.params.reviewId
  const result = await apiClient.get(`coffeeBeans/${coffeeBeanId}/reviews/${reviewId}`)
  coffeeBean.value = result.data.coffeeBean
  review.value = result.data.review
})
</script>

<template>
<div>
  <h1>レビュー詳細</h1>
  <div>
    <h2>{{ coffeeBean.name }}</h2>
    <p>{{ coffeeBean.description }}</p>
  </div>
  <div class="card">
    <h3>{{ review.coffeeStyle }}</h3>
    <p>{{ review.total }}</p>
    <p>{{ review.acidity }}</p>
    <p>{{ review.bitterness }}</p>
    <p>{{ review.body }}</p>
    <p>{{ review.afterTaste }}</p>
    <p>{{ review.describe }}</p>
  </div>
  <button type="button" class="button is-primary" @click="router.push(`/coffeeBeans/${coffeeBean.id}/reviews`)">一覧に戻る</button>
</div>
</template>

<style scoped lang="stylus">
</style>
