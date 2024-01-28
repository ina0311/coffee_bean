<script setup lang="ts">
import { defineProps } from 'vue'

defineProps({
  buttonText: {
    type: String,
    default: 'Submit'
  },
  buttonType: {
    type: String,
    default: 'submit'
  }
})
</script>

<template>
  <button :type="buttonType as unknown as 'button' | 'reset' | 'submit' | undefined" class="button">{{ buttonText }}</button>
</template>

<style scoped>
.submit-button {
  /* Add your button styles here */
}
</style>
