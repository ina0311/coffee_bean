<template>
  <Field :name="props.name" :rules="props.rules" validateOnInput v-slot="{ field, errors }">
    <label :for="props.name" class="label">{{ props.label }}</label>
    <input
      type="number"
      v-model="field.value"
      :maxlength="props.maxlength"
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
  import { Field, ErrorMessage } from 'vee-validate'

  const props = defineProps({
    label: {
      type: String,
      default: ""
    },
    name: {
      type: String,
      required: true
    },
    maxlength: {
      type: Number,
      default: 4
    },
    placeholder: {
      type: String,
      default: ""
    },
    rules: {
      type: String,
      default: ""
    },
  })

  const emit = defineEmits(['change-input'])

  const handleInput = (event: Event) => {
    const numericTarget = event.target as HTMLInputElement
    let numericStr = numericTarget.value.replace(/[^0-9]/g, '')
    if (numericStr.length > props.maxlength) {
      numericStr = numericStr.substring(0, props.maxlength)
    }
    emit('change-input', { value: numericStr, formDataKey: props.name })
  }
</script>
