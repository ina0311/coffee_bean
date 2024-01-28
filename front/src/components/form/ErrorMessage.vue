<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  errorMessages: {
    type: Array,
    default: []
  }
})
</script>

<template>
  <div v-if="props?.errorMessages.length > 0">
    <div v-for="errorMessage in props.errorMessages" class="notification is-danger">
      <button type="button" class="delete"></button>
      <p>{{ errorMessage }}</p>
    </div>
  </div>
</template>

<style scoped>
</style>
