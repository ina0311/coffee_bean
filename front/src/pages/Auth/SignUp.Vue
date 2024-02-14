<script setup lang="ts">
import { reactive, ref } from 'vue'
import Header from '@/components/common/Header.vue'
import Footer from '@/components/common/Footer.vue'
import SubmitButton from '@/components/form/SubmitButton.vue'
import InputText from '@/components/form/InputText.vue'
import ErrorMessage from '@/components/form/ErrorMessage.vue'
import apiClient from '@/services/apiClient'
import { typedAuthSchema } from '@/validates/auth'
import { Form } from 'vee-validate'
import { encryptString } from '@/utils/crypto'
import router from '@/routes'
import axios from 'axios'

const formData = reactive({
  username: '',
  email: '',
  password: ''
})

const canNotSubmit = ref<boolean>(true)
const formErrors = ref<string[]>([])

const handleInput = (value: string, formDataKey: keyof typeof formData) => {
  formData[formDataKey] = value
  canNotSubmit.value = Object.keys(formData).some(key => formData[key as keyof typeof formData] === '')
}

const onSubmit = async () => {
  try {
    const result = await apiClient.post('/auth/signup', {
      username: formData.username,
      email: formData.email,
      password: encryptString(formData.password)
    })
    formErrors.value = []
    // @ts-ignore
    router.push({name: 'SignIn', params: {status: result.status}})
  } catch (err) {
    if (err instanceof axios.AxiosError) formErrors.value.push(err.response?.data.message)
  }
}
</script>

<template>
  <div>
    <Header />
    <h1 class="is-size-1">ユーザー登録</h1>
    <Form class="field" :validation-schema="typedAuthSchema" @submit="onSubmit" v-slot="{errors}">
      <ErrorMessage :errorMessages="formErrors" />
      <InputText
        label="名前"
        name="username"
        type="text"
        v-model="formData.username"
        :handleInput="handleInput"
        :error="errors.username"
      />

      <InputText
        label="メールアドレス"
        name="email"
        type="email"
        placeholder='example@email.com'
        v-model="formData.email"
        :handleInput="handleInput"
        :error="errors.email"
      />

      <InputText
        label="パスワード"
        name="password"
        type="password"
        v-model="formData.password"
        :handleInput="handleInput"
        :error="errors.password"
      />

      <SubmitButton
        type="submit"
        buttonText="登録する"
        :disabled="canNotSubmit || Object.keys(errors).length > 0"
      />
    </Form>
    <Footer />
  </div>
</template>

<style scoped lang="stylus"></style>
