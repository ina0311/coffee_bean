<script setup lang="ts">
import { reactive, ref } from 'vue'
import Header from '@/components/common/Header.vue'
import Footer from '@/components/common/Footer.vue'
import SubmitButton from '@/components/form/SubmitButton.vue'
import InputText from '@/components/form/InputText.vue'
import apiClient from '@/services/apiClient'
import typedAuthSchema from '@/validates/auth'
import { useForm, Form } from 'vee-validate'
import { encryptString } from '@/utils/crypto'

const formData = reactive({
  username: '',
  email: '',
  password: ''
})

const canNotSubmit = ref<boolean>(true)

const handleInput = (inputData: {value: string, formDataKey: string}) => {
  formData[inputData.formDataKey] = inputData.value
  canNotSubmit.value = Object.keys(formData).some(key => formData[key] === '')
}

const onSubmit = async () => {
  const result = await apiClient.post('/auth/signup', {
    username: formData.username,
    email: formData.email,
    password: encryptString(formData.password)
  })
}
</script>

<template>
  <div>
    <Header />
    <h1 class="is-size-1">ユーザー登録</h1>
    <Form class="field" :validation-schema="typedAuthSchema" @submit="onSubmit" v-slot="{errors}">
      <InputText
        label="名前"
        name="username"
        type="text"
        v-model="formData.username"
        @change-input="handleInput"
        :error="errors.username"
      />

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
        buttonText="登録する"
        :disabled="canNotSubmit || Object.keys(errors).length > 0"
      />
    </Form>
    <Footer />
  </div>
</template>

<style scoped lang="stylus"></style>
