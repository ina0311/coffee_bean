<script setup lang="ts">
import apiClient from '@/services/apiClient'
import router from '@/routes'
import { onMounted, ref } from 'vue'
const user = ref({
  username: '',
  email: ''
})

const fetchProfile = async () => {
  try {
    const result = await apiClient.get('/profile')
    user.value = result.data
  } catch (err) {
    console.log(err);
  }
}

const signOut = async () => {
  try {
    await apiClient.post('/auth/signout')
    router.push({name: 'SignIn'})
  } catch (err) {
    console.log(err);
  }
}

onMounted(() => fetchProfile())
</script>

<template>
  <div>
    <h1>Profile</h1>
    <div>
      <h2>{{ user.username }}</h2>
    </div>
    <div>
      <button @click="signOut" type="button" class="button is-danger">サインアウト</button>
    </div>
  </div>
</template>

<style scoped>
h1 {
  color: #333;
}

h2 {
  font-size: 24px;
  margin-bottom: 10px;
}

p {
  font-size: 16px;
  color: #666;
}
</style>
