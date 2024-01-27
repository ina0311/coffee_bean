<script setup lang="ts">
import { reactive, ref } from 'vue'
import Header from '@/components/common/Header.vue'
import Footer from '@/components/common/Footer.vue'
import SubmitButton from '@/components/form/SubmitButton.vue'
import InputText from '@/components/form/InputText.vue'
import apiClient from '@/services/apiClient'
import typedAuthSchema from '@/validates/auth'
import { useForm, Form, SubmissionHandler, GenericObject } from 'vee-validate'
import { encryptString } from '@/utils/crypto'

const formData = reactive({
  username: '',
  email: '',
  password: ''
})

const hasError = ref<{[key: string]: boolean}>({
  username: true,
  email: true,
  password: true
})

const canNotSubmit = ref<boolean>(true)

const handleInput = (inputData: {value: string, formDataKey: string}) => {
  if (inputData.formDataKey === 'password') {
    formData.password = encryptString(inputData.value)
    console.log(formData.password);
    return
  }

  formData[inputData.formDataKey] = inputData.value
  console.log(formData[inputData.formDataKey])
}

const handleError = (inputErrorData: {hasError: boolean, formDataKey: string}) => {
  hasError.value[inputErrorData.formDataKey] = inputErrorData.hasError
  debugger
  canNotSubmit.value = Object.values(hasError.value).some((value) => value)
}

const {handleSubmit} = useForm({
  validationSchema: typedAuthSchema
})

const onSubmit: SubmissionHandler<GenericObject, GenericObject, unknown> = async () => {
  const result = await apiClient.post('/auth/register', {
    username: formData.username,
    email: formData.email,
    password: formData.password
  })
}
</script>

<template>
  <div>
    <Header />
    <h1>Sign Up</h1>
    <Form class="field" @submit="onSubmit">
      <InputText label="名前" name="username" v-model="formData.username" @change-input="handleInput" @has-error="handleError"/>

      <InputText label="メールアドレス" name="email" placeholder='example@email.com' v-model="formData.email" @change-input="handleInput"  @has-error="handleError"/>

      <InputText label="パスワード" name="password" type="password" v-model="formData.password" @change-input="handleInput"  @has-error="handleError"/>

      <SubmitButton type="submit" buttonText="登録する" :disabled="canNotSubmit"/>
    </Form>
    <Footer />
  </div>
</template>

<style scoped lang="stylus"></style>
