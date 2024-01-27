<script setup lang="ts">
import { ref, onMounted } from 'vue'
import apiClient from '../../services/apiClient'
const users = ref(null)

const fetchUsers = async () => {
  const { data } = await apiClient.get('/users')
  debugger
  users.value = data
}

onMounted(() => {
  fetchUsers()
})
</script>

<template>
  <div>
    {{ users }}
  </div>
</template>

<style scoped>
</style>
