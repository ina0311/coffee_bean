<template>
  <div>
    <Collapsible.Root v-model:open="open" >
      <div>
        <input
          type="checkbox"
          v-model="props.flavor.checked"
          :id="flavor.id"
          @change="handleCheckboxChange(flavor.id)"
        />
        <p>
          {{ `${flavor.ja}(${flavor.en})` }}
        </p>
        <Collapsible.Trigger v-if="childFlavors.length > 0">
          <span class="icon is-small is-right">
            <i class="fas fa-angle-down" aria-hidden="true"></i>
          </span>
        </Collapsible.Trigger>
      </div>
      <Collapsible.Content>
        <FlavorItem
          v-for="childFlavor in childFlavors"
          :flavor="childFlavor"
          :flavorList="flavorList"
          :id="childFlavor.id"
        />
      </Collapsible.Content>
    </Collapsible.Root>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed, ref, inject } from 'vue'
import { Collapsible } from 'radix-vue/namespaced'
import type { FLAVOR_TYPE } from '@/utils/constants'
type FLAVOR_TYPE_OPTIONS = FLAVOR_TYPE & { checked: boolean }
const coffeeBean: {[key: string]: string | string[], flavors: string[]} = inject('coffeeBean')!
const selectedFlavors = coffeeBean.flavors

const open = ref<boolean>(false)
const props = defineProps({
  flavor: {
    type: Object as () => FLAVOR_TYPE_OPTIONS,
    required: true
  },
  flavorList: {
    type: Array as () => FLAVOR_TYPE_OPTIONS[],
    required: true
  }
})

const childFlavors = computed(() => {
  return props.flavorList.filter(f => f.parentId === props.flavor.id);
})

const handleCheckboxChange = (id: string) => {
  if (selectedFlavors.find(flavor => flavor === id)) {
    selectedFlavors.splice(selectedFlavors.indexOf(id), 1)
  } else {
    selectedFlavors.push(id)
  }
}
</script>
