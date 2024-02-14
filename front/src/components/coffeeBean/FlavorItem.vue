<template>
  <div>
    <Collapsible.Root v-model:open="open" >
      <div>
        <input
          type="checkbox"
          v-model="props.flavor.checked"
          :id="flavor.id"
          @change="handleCheckboxChange(flavor.origin)"
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
          :id="childFlavor.origin"
        />
      </Collapsible.Content>
    </Collapsible.Root>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed, ref, inject } from 'vue'
import { Collapsible } from 'radix-vue/namespaced'
const review: {[key: string]: string | string[], flavors: string[]} = inject('review')!
const selectedFlavors = review.flavors

const open = ref<boolean>(false)
const props = defineProps({
  flavor: {
    type: Object as () => any,
    required: true
  },
  flavorList: {
    type: Array as () => any[],
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
