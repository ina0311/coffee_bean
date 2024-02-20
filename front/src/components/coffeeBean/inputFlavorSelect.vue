<template>
  <Field :name="props.name" :rules="props.rules"  @blur="hideDropDown" v-model="fieldValue" multiple>
    <label :for="props.name" class="label">{{ props.label }}</label>
    <Combobox.Root
      v-model="isShowDropDown"
      multiple
    >
      <Combobox.Anchor>
        <TagsInput.Root
          v-slot="{ modelValue: tags }"
          :model-value="flavorOptions.filter((flavor: any) => props.value.includes(flavor.id)).map((value: any) => value.ja)"
          delimiter=""
          class="is-flex is-flex-wrap-wrap"
        >
          <TagsInput.Item
            v-for="item in tags"
            :key="item"
            :value="item"
          >
            <TagsInput.ItemText class="item-name" :data-flavor="item"/>
            <TagsInput.ItemDelete @click="handleDelete">
              <span class="icon is-small">
                <i class="fas fa-times" aria-hidden="true"></i>
              </span>
            </TagsInput.ItemDelete>
          </TagsInput.Item>
          <Combobox.Input as-child>
            <TagsInput.Input
              placeholder="選択してください"
              @focus="isShowDropDown = true"
              @blur="hideDropDown"
              class="form"
            >
            </TagsInput.Input>
          </Combobox.Input>
        </TagsInput.Root>
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
            <Combobox.Item v-for="option in props.parentFlavorOptions" :key="option.id" :value="option.id" @select.prevent>
              <Combobox.ItemIndicator>
              </Combobox.ItemIndicator>
              <FlavorItem
                :flavor="option"
                :flavorList="props.flavorOptions"
                :handleInput="props.handleInput"
              />
            </Combobox.Item>
          </Combobox.Group>
        </Combobox.Viewport>
      </Combobox.Content>
    </Combobox.Root>
    <ErrorMessage :name="props.name" class="help is-danger" />
  </Field>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue'
import { Field, ErrorMessage } from 'vee-validate'
import { Combobox, TagsInput } from 'radix-vue/namespaced'
import FlavorItem from './FlavorItem.vue'

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
    type: Array as () => any[],
    default: []
  },
  type: {
    type: String,
    default: "text"
  },
  rules: {
    type: String,
    default: ""
  },
  flavorOptions: {
    type: Array as () => any[],
    required: true
  },
  parentFlavorOptions: {
    type: Array as () => any[],
    required: true
  },
  handleInput: {
    type: Function,
    required: true
  }
})

const fieldValue = ref<any[]>([])

const handleDelete = (event: Event) => {
  const deleteButton = (event!.target as Element).closest('button')?.previousElementSibling as HTMLElement
  if (!deleteButton) return

  const deleteFlavorName = deleteButton.dataset.flavor
  if (!deleteFlavorName) return

  const deleteFlavor = props.flavorOptions.find((flavor: any) => flavor.ja === deleteFlavorName)
  if (!deleteFlavor) return

  props.handleInput(deleteFlavor.id)
}

const isShowDropDown = ref<boolean>(false)
const hideDropDown = () => {
  setTimeout(() => {
    isShowDropDown.value = false
  }, 100)
}
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

.form
  border: none

  &:focus
    outline: none

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