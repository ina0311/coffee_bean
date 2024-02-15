<template>
  <Field :name="props.name" :rules="props.rules" validateOnInput v-slot="{ field, errors }">
    <label :for="props.name" class="label">{{ props.label }}</label>
    <input
      :type="props.type"
      v-model="field.value"
      @input="props.handleInput(field.value, props.name)"
      :placeholder="placeholder"
      :class="{ 'is-invalid': errors.length }"
      v-bind="field"
      :maxlength="props.maxlength"
    />
    <ErrorMessage :name="props.name" class="help is-danger" />
  </Field>
</template>

<script setup lang="ts">
import { defineProps} from 'vue'
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
  maxlength: {
    type: Number,
    default: 10
  },
  handleInput: {
    type: Function,
    default: () => {}
  }
})
</script>
