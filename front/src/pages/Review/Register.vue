<script setup lang="ts">
import {reactive, ref, onMounted} from 'vue'
import {useRouter} from 'vue-router'
import {Form} from 'vee-validate'
import axios from 'axios'
import { toTypedSchema } from '@vee-validate/zod'
import InputFlavorSelect from '@/components/coffeeBean/inputFlavorSelect.vue'
import InputStarRating from '@/components/coffeeBean/inputStarLating.vue'
import InputText from '@/components/form/InputText.vue'
import InputSelect from '@/components/form/InputSelect.vue'
import SubmitButton from '@/components/form/SubmitButton.vue'
import ErrorMessage from '@/components/form/ErrorMessage.vue'
import apiClient from '@/services/apiClient'
import {COFFEE_STYLES} from '@/utils/constants'
import { reviewSchema } from '@/validates/review'

const router = useRouter()
const formErrors = ref<string[]>([])
const coffeeBean = ref<any>()
const flavorOptions = ref<any[]>([])

const typedReviewSchema = toTypedSchema(reviewSchema)

const review = reactive<{
  coffeeStyle: string,
  coffeeBeanId?: number,
  flavorIds: number[],
  total: number,
  acidity: number,
  bitterness: number,
  body: number,
  afterTaste: number,
  describe?: string
}>({
  coffeeStyle: '',
  coffeeBeanId: undefined,
  flavorIds: [],
  total: 0,
  acidity: 0,
  bitterness: 0,
  body: 0,
  afterTaste: 0,
  describe: undefined
})

const handleNumberInput = (value: number, reviewKey: 'total' | 'acidity' | 'bitterness' | 'body' | 'afterTaste') => {
  review[reviewKey] = value
}

const handleInput = (value: string, formDataKey: 'describe' | 'coffeeStyle') => {
  debugger
  review[formDataKey] = value
}

const handleToggleFlavorCheck = (flavorId: number) => {
  flavorOptions.value = flavorOptions.value.map((value: any) => {
    if (value.id !== flavorId) return value
    value.checked = !value.checked
    return value
  })

  if (review.flavorIds.find(flavor => flavor === flavorId)) {
    review.flavorIds.splice(review.flavorIds.indexOf(flavorId), 1)
  } else {
    review.flavorIds.push(flavorId)
  }
}

const onSubmit = async () => {
  try {
    await apiClient.post(`/coffeeBeans/${coffeeBean.value.id}/reviews`, {
      coffeeStyle: review.coffeeStyle,
      flavorIds: review.flavorIds,
      total: review.total,
      acidity: review.acidity,
      bitterness: review.bitterness,
      body: review.body,
      afterTaste: review.afterTaste,
      describe: review.describe
    })
    formErrors.value = []
    router.push({name: 'Reviews'})
  } catch (err) {
    if (err instanceof axios.AxiosError) formErrors.value.push(err.response?.data.message)
    throw err
  }
}

onMounted(async () => {
  const coffeeBeanId = router.currentRoute.value.params.id
  const response = await apiClient.get(`/coffeeBeans/${+coffeeBeanId}`)
  coffeeBean.value = response.data

  const result = await apiClient.get('/flavors')
  flavorOptions.value = result.data.map((option: any) => ({ ...option, checked: false }))
})
</script>

<template>
  <div>
    <h1>レビュー投稿</h1>
    <h2>{{ coffeeBean.name }}</h2>
    <h3>{{ coffeeBean.store.name }}</h3>
    <h3>{{ coffeeBean.country.name }}</h3>
    <h3>{{ coffeeBean.roast }}</h3>
    <h3>{{ coffeeBean.price }}</h3>
    <h3>{{ coffeeBean.minAltitude }} ~ {{ coffeeBean.maxAltitude }}</h3>

    <Form class="field" @submit="onSubmit" :validation-schema="typedReviewSchema" v-slot={errors}>
      <ErrorMessage :errorMessages="formErrors" />
      <InputSelect
        label="コーヒースタイル"
        name="coffeeStyle"
        type="text"
        :options="Object.values(COFFEE_STYLES)"
        :handleInput="handleInput"
        :error="errors.coffeeStyle"
      />
      <InputStarRating :increment="0.5" :value="review.total" name="total" label="お気に入り度" :handleInput="handleNumberInput"/>
      <InputStarRating :increment="0.5" :value="review.acidity" name="acidity" label="酸味" :handleInput="handleNumberInput"/>
      <InputStarRating :increment="0.5" :value="review.bitterness" name="bitterness" label="苦味" :handleInput="handleNumberInput"/>
      <InputStarRating :increment="0.5" :value="review.body" name="body" label="ボディ" :handleInput="handleNumberInput"/>
      <InputStarRating :increment="0.5" :value="review.afterTaste" name="afterTaste" label="後味" :handleInput="handleNumberInput"/>
      <InputFlavorSelect
        label="Flavor"
        name="flavorIds"
        type="text"
        :handleInput="handleToggleFlavorCheck"
        :value="review.flavorIds"
        :flavorOptions="flavorOptions"
        :parentFlavorOptions="flavorOptions.filter(f => f.parentId === null)"
        :error="errors.flavorIds"
      />
      <InputText
        label="メモ"
        name="describe"
        type="text"
        :handleInput="handleInput"
        :error="errors.describe"
        :maxlength="140"
      />
      <SubmitButton
        type="submit"
        buttonText="レビューを投稿"
        :disabled="Object.keys(errors).length > 0"
      />
    </Form>
  </div>
</template>

<style scoped lang="stylus">
</style>