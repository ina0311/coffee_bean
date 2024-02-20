<template>
  <Field :name="props.name" :rules="props.rules" validateOnInput v-slot="{ field, errors }">
    <label :for="props.name" class="label">{{ props.label }}</label>
    <select
      v-model="field.value"
      @input="handleInput"
      :placeholder="props.placeholder"
      :class="{ 'is-invalid': errors.length }"
      v-bind="field"
    >
      <option v-for="option in props.options" :value="option.data">{{ option.display }}</option>
    </select>
    <ErrorMessage :name="props.name" class="help is-danger" />
  </Field>
</template>
<script setup lang="ts">
import { defineProps, PropType } from 'vue'
import { Field, ErrorMessage } from 'vee-validate'

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
    type: String,
    default: ""
  },
  placeholder: {
    type: String,
    default: ""
  },
  type: {
    type: String,
    default: "text"
  },
  rules: {
    type: String,
    default: ""
  },
  options: {
    type: Array as PropType<{display: string, data: string | number}[]>,
    default: []
  },
  handleInput: {
    type: Function,
    required: true
  }
})

const handleInput = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (!target) return
  const value = target.value

  props.handleInput(value, props.name)
}
</script>
<style scoped>
</style>