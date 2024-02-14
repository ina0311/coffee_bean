<script setup lang="ts">
import {useRouter} from 'vue-router';
import { defineProps } from 'vue'
const router = useRouter()

const props = defineProps({
  coffeeBean: {
    type: Object,
    required: true
  }
})

const navigateCoffeeBeanShow = () => router.push({name: 'CoffeeBeanShow', params: {id: props.coffeeBean.id}})
const navigateReview = () => router.push({name: 'ReviewCreate', params: {id: props.coffeeBean.id}})

</script>

<template>
  <div class="card">
    <div class="card-content">
      <div class="media">
        <div class="media-content">
            <p class="title is-4">{{props.coffeeBean.name}}</p>
          <p class="subtitle is-6">{{props.coffeeBean.store?.name}}</p>
        </div>
      </div>
      <div class="content">
        <p>{{ props.coffeeBean.country.name }}</p>
        <img :src="props.coffeeBean.country.flagImage" alt="flag" width="50" height="50">
        <button class="button is-primary" @click="navigateCoffeeBeanShow">Show</button>
        <button class="button is-info" @click="navigateReview">Review</button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="stylus">
</style>
