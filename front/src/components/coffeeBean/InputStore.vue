<template>
  <Field :name="props.name" :rules="props.rules" validateOnInput v-slot="{ field, errors }">
    <label :for="props.name" class="label">{{ props.label }}</label>
    <input
      :type="props.type"
      v-model="field.value"
      @input="handleInput"
      :placeholder="placeholder"
      :class="{ 'is-invalid': errors.length }"
      @focus="isShowDropDown = true"
      @blur="hideDropDown"
    />
    <nav class="form-dropdown" :class="{active: isShowDropDown}">
      <div
        v-if="stores.length > 0"
        v-for="store in stores"
        class="columns menu m-0 form-dropdown-inner"
        @click="handleClick(store, field)"
      >
        <div class="column">
          <p>{{ store.name }}</p>
          <p>({{ store.address }})</p>
        </div>
      </div>
      <div v-else class="columns menu m-0 form-dropdown-inner">
        <span class="column">
          <p>Not Found</p>
        </span>
      </div>
    </nav>
    <ErrorMessage :name="props.name" class="help is-danger" />
  </Field>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref } from 'vue'
import { useDebounceFn } from '@vueuse/core'
import { Field, ErrorMessage } from 'vee-validate'
import apiClient from '@/services/apiClient'
type Store = {
  name: string
  address: string
  placeId: string
}

type ResponseStore = {
  name: string,
  formatted_address: string,
  place_id: string
}

const stores = ref<Store[]>([])
const isShowDropDown = ref<boolean>(false)
const emit = defineEmits(['change-input'])
const hideDropDown = () => {
  setTimeout(() => {
    isShowDropDown.value = false
  }, 200)
}

const handleClick = (store: Store, field: any) => {
  isShowDropDown.value = false
  field.value = `${store.name}`
  emit('change-input', {value: store.placeId, formDataKey: props.name})
}

const handleInput = useDebounceFn(async (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target) {
    const value = target.value
    const result = await apiClient.get(`/store/googleSearch?q=${value}`)
    stores.value = result.data.map((store: ResponseStore) => {
      return {
        name: store.name,
        address: store.formatted_address,
        placeId: store.place_id,
      }
    })
  }
}, 800)

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

</script>

<style scoped lang="stylus">
  .form-dropdown
    position absolute
    display none
    width 50%
    max-height 20rem
    overflow-y scroll
    background-color #fff
    border-radius 8px
    box-shadow 0 2px 4px rgba(0, 0, 0, 0.1)
    z-index 10

    &-inner
      border 1px solid #dbdbdb

    &.active
      display block

    .menu
      cursor pointer
      border 1px solid #dbdbdb
      &:hover
        background-color #f5f5f5
</style>