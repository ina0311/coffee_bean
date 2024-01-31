<script setup lang="ts">
import {reactive, ref} from 'vue'
import {Form} from 'vee-validate'
import InputText from '@/components/form/InputText.vue'
import InputCountryText from '@/components/coffeeBean/InputCountryText.vue'
import inputFarmText from '@/components/coffeeBean/inputFarmText.vue'
import SubmitButton from '@/components/form/SubmitButton.vue'
import ErrorMessage from '@/components/form/ErrorMessage.vue'
import router from '@/routes'
import apiClient from '@/services/apiClient'
import axios from 'axios'

const coffeeBean = reactive({
  name: '',
  country: '',
  farm: '',
  roast: '',
  flavor: '',
  price: ''
})

const canNotSubmit = ref<boolean>(true)
const formErrors = ref<string[]>([])
const handleInput = (inputData: {value: string, formDataKey: keyof typeof coffeeBean}) => {
  coffeeBean[inputData.formDataKey] = inputData.value
  canNotSubmit.value = Object.keys(coffeeBean).some(key => coffeeBean[key as keyof typeof coffeeBean] === '')
}

const onSubmit = async () => {
  try {
    const result = await apiClient.post('/coffeebean/register', {
      name: coffeeBean.name,
      country: coffeeBean.country,
      roast: coffeeBean.roast,
      flavor: coffeeBean.flavor,
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
    <Form class="field" @submit="onSubmit" v-slot="{errors}">
      <ErrorMessage :errorMessages="formErrors"/>
      <InputText
        label="Name"
        name="name"
        type="text"
        v-model="coffeeBean.name"
        @change-input="handleInput"
        :error="errors.name"
      />
      <InputCountryText
        label="Country"
        name="country"
        type="text"
        v-model="coffeeBean.country"
        @change-input="handleInput"
        :error="errors.country"
      />
      <inputFarmText
        label="Farm"
        name="farm"
        type="text"
        v-model="coffeeBean.farm"
        @change-input="handleInput"
        :error="errors.farm"
      />
      <InputText
        label="Roast"
        name="roast"
        type="text"
        v-model="coffeeBean.roast"
        @change-input="handleInput"
        :error="errors.roast"
      />
      <InputText
        label="Flavor"
        name="flavor"
        type="text"
        v-model="coffeeBean.flavor"
        @change-input="handleInput"
        :error="errors.flavor"
      />
      <InputText
        label="Price"
        name="price"
        type="text"
        v-model="coffeeBean.price"
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
