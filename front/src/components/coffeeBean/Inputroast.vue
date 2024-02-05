<template>
  <Field :name="props.name" :rules="props.rules" validateOnInput v-slot="{ field, errors }">
    <label :for="props.name" class="label">{{ props.label }}</label>
    <input
      :type="props.type"
      v-model="field.value"
      @input="handleInput"
      :placeholder="placeholder"
      :class="{ 'is-invalid': errors.length }"
      v-bind="field"
    />
    <ErrorMessage :name="props.name" class="help is-danger" />
  </Field>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import { useDebounceFn } from '@vueuse/core'
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
  }
})

const emit = defineEmits(['change-input'])

const handleInput = useDebounceFn((event: Event) => {
  const target = event.target as HTMLInputElement
  if (target) {
    emit('change-input', {value: target.value, formDataKey: props.name})
  }
}, 800)
</script>
