<template>
  <Field :name="name" :rules="rules">
    <template #default="{ errors }">
      <label :for="name" class="label">{{ label }}</label>
      <input
        :type="type"
        v-model="value"
        @input="handleInput"
        :placeholder="placeholder"
        :class="{ 'is-invalid': errors.length }"
      />
      <span v-if="errors.length" class="error-message">{{ errors[0] }}</span>
    </template>
  </Field>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, watch, computed } from 'vue'
import { useDebounceFn } from '@vueuse/core'
import { useField, Field } from 'vee-validate'

const props = defineProps({
  label: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: "text"
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
  }
})

const { value, errorMessage } = useField(() => props.name)

const emit = defineEmits(['change-input', 'has-error'])

const handleInput = useDebounceFn((event: Event) => {
  const target = event.target as HTMLInputElement
  if (target) {
    value.value = target.value
    emit('change-input', {value: target.value, formDataKey: props.name})
  }
}, 800)

watch(errorMessage, () => {
  emit('has-error', {hasError: errorMessage.value !== undefined, formDataKey: props.name})
})

const rules = computed(() => {
  return errorMessage.value ? 'required' : ''
})
</script>
