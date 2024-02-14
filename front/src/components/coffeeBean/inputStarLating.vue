<script setup lang="ts">
// @ts-ignore
import StarRating from 'vue-star-rating'
import { defineProps } from 'vue'
import { Field } from 'vee-validate'

const props = defineProps({
  label: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    required: true
  },
  rules: {
    type: String,
    default: ""
  },
  increment: {
    type: Number,
    default: 1
  },
  handleInput: {
    type: Function,
    default: () => {}
  }
})

const handleSelectedStar = (rating: number) => {
  const inner = (event?.target as Element)?.closest('div.vue-star-rating') as HTMLInputElement
  const input = inner?.parentElement as HTMLInputElement
  const name = input?.getAttribute('name') as string
  props.handleInput(rating, name)
}
</script>

<template>
  <Field :name="props.name" :rules="props.rules" :value="props.value">
    <label class="label" :for="props.name">{{ props.label }}</label>
    <StarRating :name="props.name" :props.increment="0.5" :value="props.value" @update:rating="handleSelectedStar"/>
  </Field>
</template>

<style scoped lang="stylus">
</style>
