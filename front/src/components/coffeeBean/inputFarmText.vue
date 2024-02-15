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
        v-if="countries.length > 0"
        v-for="country in countries"
        class="columns menu m-0 form-dropdown-inner"
        @click="handleClick(country, field)"
      >
        <span class="column is-2">
          <img class="image is-32x32" :src="country.flag" :alt="country.alpha3Code" />
        </span>
        <div class="column">
          <p>{{ country.japaneseName }}</p>
          <p>({{ country.englishName }})</p>
        </div>
        <a class="icon column is-1" :href="country.googleMap" target="_blank">
          <i class="fa-solid fa-map"></i>
        </a>
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
import restCountryClient from '../../services/restCountry'

const isShowDropDown = ref<boolean>(false)
const hideDropDown = () => {
  setTimeout(() => {
    isShowDropDown.value = false
  }, 200)
}

type country = {
  japaneseName: string
  englishName: string
  flag: string
  alpha3Code: string
  googleMap: string
}

type responseCountryData = {
  name: { common: string }
  translations: { jpn?: { common?: string } }
  flags: { svg: string }
  cca3: string
  maps: { googleMaps: string }
}

const countries = ref<country[]>([])
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

const handleInput = useDebounceFn(async (event: Event) => {
  const targetElm = event.target as HTMLInputElement
  const countryName = targetElm.value.replace( /[\u3042-\u3093]/g, m => String.fromCharCode(m.charCodeAt(0) + 96))
  const result = await restCountryClient.get(`/translation/${countryName}`).catch(err => {
    countries.value = []
    return err
  })

  if (result.data.status === 404) return
  countries.value = result.data.map((country: responseCountryData) => ({
    japaneseName: country.translations?.jpn?.common || 'N/A',
    englishName: country.name.common,
    flag: country.flags.svg,
    alpha3Code: country.cca3,
    googleMap: country.maps.googleMaps
  }))
}, 1000)


const emit = defineEmits(['change-input'])

const handleClick = (country: country, field: any) => {
  isShowDropDown.value = false
  field.value = `${country.japaneseName}(${country.englishName})`
  emit('change-input', {value: country, formDataKey: props.name})
}
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
