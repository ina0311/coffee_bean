<script setup lang="ts">
import { reactive, ref } from 'vue'
import Header from '@/components/common/Header.vue'
import Footer from '@/components/common/Footer.vue'
import SubmitButton from '@/components/form/SubmitButton.vue'
import InputText from '@/components/form/InputText.vue'
import ErrorMessage from '@/components/form/ErrorMessage.vue'
import apiClient from '@/services/apiClient'
import { typedSignInSchema } from '@/validates/auth'
import { Form } from 'vee-validate'
import { encryptString } from '@/utils/crypto'
import axios from 'axios'
import router from '@/routes'

const formData = reactive({
  email: '',
  password: ''
})

const canNotSubmit = ref<boolean>(true)
const formErrors = ref<string[]>([])

const handleInput = (inputData: {value: string, formDataKey: keyof typeof formData}) => {
  formData[inputData.formDataKey] = inputData.value
  canNotSubmit.value = Object.keys(formData).some(key => formData[key as keyof typeof formData] === '')
}

const onSubmit = async () => {
  try {
    const result = await apiClient.post('/auth/signin', {
      email: formData.email,
      password: encryptString(formData.password)
    })
    console.log(result);
    formErrors.value = []
    router.push({name: 'Profile'})
  } catch (err) {
    if (err instanceof axios.AxiosError) formErrors.value.push(err.response?.data.message)
  }
}
</script>

<template>
  <div>
    <Header />
    <h1 class="is-size-1">サインイン</h1>
    <Form class="field" :validation-schema="typedSignInSchema" @submit="onSubmit" v-slot="{errors}">
      <ErrorMessage :errorMessages="formErrors" />
      <InputText
        label="メールアドレス"
        name="email"
        type="email"
        placeholder='example@email.com'
        v-model="formData.email"
        @change-input="handleInput"
        :error="errors.email"
      />

      <InputText
        label="パスワード"
        name="password"
        type="password"
        v-model="formData.password"
        @change-input="handleInput"
        :error="errors.password"
      />

      <SubmitButton
        type="submit"
        buttonText="サインイン"
        :disabled="canNotSubmit || Object.keys(errors).length > 0"
      />
    </Form>
    <Footer />
  </div>
</template>

<style scoped>
</style>
