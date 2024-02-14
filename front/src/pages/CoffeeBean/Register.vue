<script setup lang="ts">
import {reactive, ref} from 'vue'
import {Form} from 'vee-validate'
import InputText from '@/components/form/InputText.vue'
import InputSelect from '@/components/form/InputSelect.vue'
import InputNumber from '@/components/form/InputNumber.vue'
import InputCountryText from '@/components/coffeeBean/InputCountryText.vue'
import InputStore from '@/components/coffeeBean/InputStore.vue'
import SubmitButton from '@/components/form/SubmitButton.vue'
import ErrorMessage from '@/components/form/ErrorMessage.vue'
import router from '@/routes'
import apiClient from '@/services/apiClient'
import axios from 'axios'
import {ROAST_LEVEL, PROCESS} from '@/utils/constants.ts'
import {typedCoffeeBeanSchema} from '@/validates/coffeeBean'

const coffeeBean = reactive<{
  name: string
  price: string
  country?: {}
  roast?: string
  minAltitude?: string
  maxAltitude?: string
  storePlaceId?: string
}>({
  name: '',
  price: '',
  roast: undefined,
  storePlaceId: '',
  country: undefined,
  minAltitude: undefined,
  maxAltitude: undefined,
})

const formErrors = ref<string[]>([])

const handleInput = (inputData: {value: string, formDataKey: keyof Omit<typeof coffeeBean, 'flavors'>}) => {
  const {value, formDataKey} = inputData

  coffeeBean[formDataKey] = value
}

const onSubmit = async () => {
  try {
    const result = await apiClient.post('/coffeeBeans/register', {
      name: coffeeBean.name,
      price: coffeeBean.price,
      roast: coffeeBean.roast,
      storePlaceId: coffeeBean.storePlaceId,
      country: coffeeBean.country,
      minAltitude: coffeeBean.minAltitude,
      maxAltitude: coffeeBean.maxAltitude,
    })
    formErrors.value = []
    router.push({name: 'CoffeeBeanShow', params: {id: result.data.id}})
  } catch (err) {
    if (err instanceof axios.AxiosError) formErrors.value.push(err.response?.data.message)
    throw err
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
        :handleInput="handleInput"
        :error="errors.name"
      />
      <InputNumber
        label="Price"
        name="price"
        type="text"
        :maxlength="6"
        @change-input="handleInput"
        :error="errors.price"
      />
      <InputSelect
        label="Roast"
        name="roast"
        type="text"
        :options="Object.values(ROAST_LEVEL)"
        @change-input="handleInput"
        :error="errors.roast"
      />
      <InputStore
        label="Store"
        name="storePlaceId"
        type="text"
        @change-input="handleInput"
        :error="errors.storePlaceId"
      />
      <InputSelect
        label="Process"
        name="process"
        type="text"
        :options="Object.values(PROCESS)"
        @change-input="handleInput"
        :error="errors.process"
      />
      <InputCountryText
        label="Country"
        name="country"
        type="text"
        @change-input="handleInput"
        :error="errors.country"
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
      <SubmitButton
        buttonText="登録"
        buttonType="submit"
      />
    </Form>
  </div>
</template>

<style scoped>
/* Add your custom styles here */
</style>
