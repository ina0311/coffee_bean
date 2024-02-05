<template>
  <Field :name="props.name" :rules="props.rules" validateOnInput v-slot="{ field, errors }">
    <label :for="props.name" class="label">{{ props.label }}</label>
    <select
      v-model="field.value"
      @input="handleSelect"
      :placeholder="placeholder"
      :class="{ 'is-invalid': errors.length }"
      v-bind="field"
    >
      <option v-for="option in options" :value="option.data">{{ option.display }}</option>
    </select>
  </Field>
</template>
<script setup lang="ts">
import { defineProps, defineEmits, PropType } from 'vue'
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
  }
})

const emit = defineEmits(['change-input'])

const handleSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target) {
    emit('change-input', {value: target.value, formDataKey: props.name})
  }
}

</script>
<style scoped>
</style>