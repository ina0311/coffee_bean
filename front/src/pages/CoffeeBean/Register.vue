<script setup lang="ts">
import {reactive, ref, provide} from 'vue'
import {Form} from 'vee-validate'
import InputText from '@/components/form/InputText.vue'
import InputSelect from '@/components/form/InputSelect.vue'
import InputNumber from '@/components/form/InputNumber.vue'
import InputCountryText from '@/components/coffeeBean/InputCountryText.vue'
import inputFlavorSelect from '@/components/coffeeBean/inputFlavorSelect.vue'
import InputStore from '@/components/coffeeBean/InputStore.vue'
import SubmitButton from '@/components/form/SubmitButton.vue'
import ErrorMessage from '@/components/form/ErrorMessage.vue'
import router from '@/routes'
import apiClient from '@/services/apiClient'
import axios from 'axios'
import {ROAST_LEVEL} from '@/utils/constants.ts'
import {typedCoffeeBeanSchema} from '@/validates/coffeeBean'

const coffeeBean = reactive<{
  name: string
  price: string
  country: string
  roast: string
  minAltitude: string
  maxAltitude: string
  flavors: string[]
  storePlaceId: string
}>({
  name: '',
  roast: '',
  price: '',
  country: '',
  minAltitude: '',
  maxAltitude: '',
  flavors: [],
  storePlaceId: ''
})

const canNotSubmit = ref<boolean>(true)
const formErrors = ref<string[]>([])
provide('coffeeBean', coffeeBean)

const handleInput = (inputData: {value: string, formDataKey: keyof Omit<typeof coffeeBean, 'flavors'>}) => {
  const {value, formDataKey} = inputData

  coffeeBean[formDataKey] = value
  canNotSubmit.value = Object.keys(coffeeBean).some(key => coffeeBean[key as keyof typeof coffeeBean] === '')
}

const handleSelect = (inputData: {value: string, formDataKey: keyof Pick<typeof coffeeBean, 'flavors'>}) => {
  debugger
  const {value, formDataKey} = inputData
  if (coffeeBean[formDataKey].some(flavor => flavor === value)) {
    coffeeBean[formDataKey] = coffeeBean[formDataKey].filter(flavor => flavor !== value)
  } else {
    coffeeBean[formDataKey].push(value)
  }
  canNotSubmit.value = Object.keys(coffeeBean).some(key => coffeeBean[key as keyof typeof coffeeBean] === '')
}

const onSubmit = async () => {
  try {
    const result = await apiClient.post('/coffeebean/register', {
      name: coffeeBean.name,
      country: coffeeBean.country,
      roast: coffeeBean.roast,
      flavor: coffeeBean.flavors,
      price: coffeeBean.price
    })
    formErrors.value = []
    // @ts-ignore
    router.push({name: 'CoffeeBeanList', params: {status: result.status}})
  } catch (err) {
    if (err instanceof axios.AxiosError) formErrors.value.push(err.response?.data.message)
  }
}
</script>
<template>
  <div>
    <h1>Register Coffee Bean</h1>
    <Form class="field" :validation-schema="typedCoffeeBeanSchema" @submit="onSubmit" v-slot="{errors}">
      <ErrorMessage :errorMessages="formErrors"/>
      <InputText
        label="Name"
        name="name"
        type="text"
        @change-input="handleInput"
        :error="errors.name"
      />
      <InputStore
        label="Store"
        name="storePlaceId"
        type="text"
        @change-input="handleInput"
        :error="errors.storePlaceId"
       />
       <InputSelect
         label="Roast"
         name="roast"
         type="text"
         :options="Object.values(ROAST_LEVEL)"
         @change-input="handleInput"
         :error="errors.roast"
       />
      <InputCountryText
        label="Country"
        name="country"
        type="text"
        @change-input="handleInput"
        :error="errors.country"
      />
      <inputFlavorSelect
        label="Flavor"
        name="flavors"
        type="text"
        :value="coffeeBean.flavors"
        @change-input="handleSelect"
        :error="errors.flavors"
      />
      <div class="is-flex-direction-row">
        <label class="label">Altitude</label>
        <div class="is-flex">
          <InputNumber
            name="maxAltitude"
            type="text"
            label="max"
            :maxlength="4"
            @change-input="handleInput"
            :error="errors.maxAltitude"
          />
          <span class="mx-3">〜</span>
          <InputNumber
            name="minAltitude"
            type="text"
            label="min"
            :maxlength="4"
            @change-input="handleInput"
            :error="errors.minAltitude"
          />
        </div>
      </div>
      <InputNumber
        label="Price"
        name="price"
        type="text"
        :maxlength="6"
        @change-input="handleInput"
        :error="errors.price"
      />
      <SubmitButton :disabled="canNotSubmit" />

    </Form>
  </div>
</template>

<style scoped>
/* Add your custom styles here */
</style>
