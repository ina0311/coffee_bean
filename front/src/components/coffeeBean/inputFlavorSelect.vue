<template>
  <Field :name="props.name" :rules="props.rules" validateOnInput @blur="hideDropDown" v-model="fieldValue">
    <label :for="props.name" class="label">{{ props.label }}</label>
    <Combobox.Root
      :multiple="true"
    >
      <Combobox.Anchor>
        <Combobox.Input
          :name="props.name"
          :value="props.value"
          :placeholder="props.placeholder"
          :type="props.type"
        >
        </Combobox.Input>
        <Combobox.Trigger>
          <span class="icon is-small is-right">
            <i class="fas fa-angle-down" aria-hidden="true"></i>
          </span>
        </Combobox.Trigger>
      </Combobox.Anchor>

      <Combobox.Content>
        <Combobox.Viewport>
          <Combobox.Empty />
          <Combobox.Group>
            <Combobox.Item v-for="option in parentFlavorOptions" :key="option.id" :value="option.id" @select.prevent>
              <Combobox.ItemIndicator>
              </Combobox.ItemIndicator>
              <FlavorItem
                :flavor="option"
                :flavorList="flavorOptions"
              />
            </Combobox.Item>
          </Combobox.Group>
        </Combobox.Viewport>
      </Combobox.Content>
    </Combobox.Root>
  </Field>
</template>

<script setup lang="ts">
import { defineProps, ref, onMounted } from 'vue'
import { Field } from 'vee-validate'
// import { FLAVOR_LIST, FLAVOR_TYPE } from '@/utils/constants'
import { Combobox } from 'radix-vue/namespaced'
import FlavorItem from './FlavorItem.vue'
import apiClient from '@/services/apiClient'

// const flavorOptions = ref<(FLAVOR_TYPE & { checked: boolean })[]>(FLAVOR_LIST.map(option => ({ ...option, checked: false })))
const flavorOptions = ref<any[]>([])
const parentFlavorOptions = ref<any[]>([])
const fieldValue = ref<string>("")

const isShowDropDown = ref<boolean>(false)
const hideDropDown = () => {
  setTimeout(() => {
    isShowDropDown.value = false
  }, 100)
}

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
    type: Array as () => string[] | number[],
    default: []
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
  },
})

onMounted(async () => {
  const result = await apiClient.get('/flavors')
  flavorOptions.value = result.data.map((option: any) => ({ ...option, checked: false }))
  parentFlavorOptions.value = flavorOptions.value.filter((option: any) => option.parentId === null)
})

</script>
<style scoped lang="stylus">

.overlay
  position: fixed
  top: 0
  left: 0
  right: 0
  bottom: 0
  background-color: rgba(0, 0, 0, 0)
  z-index: 1

.form-dropdown
  position: absolute
  width 50%
  max-height 20rem
  overflow-y scroll
  background-color #fff
  border-radius 8px
  box-shadow 0 2px 4px rgba(0, 0, 0, 0.1)
  z-index 10

  .menu-wrap
    border-bottom 1px solid #ddd

  .menu
    padding 0.5rem 1rem

    &.is-active
      display block

    label
      margin-left 0.5rem
      cursor pointer
      &:hover
        color #3273dc
</style>