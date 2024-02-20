<template>
  <div>
    <Collapsible.Root v-model:open="open" >
      <div>
        <input
          type="checkbox"
          :value="props.flavor.checked"
          :checked="props.flavor.checked"
          :id="props.flavor.id"
          @change="props.handleInput(props.flavor.id)"
        />
        <p>
          {{ `${props.flavor.ja}(${props.flavor.en})` }}
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
          :flavorList="props.flavorList"
          :id="childFlavor.origin"
          :handleInput="props.handleInput"
        />
      </Collapsible.Content>
    </Collapsible.Root>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue'
import { Collapsible } from 'radix-vue/namespaced'

const open = ref<boolean>(false)
const props = defineProps({
  flavor: {
    type: Object as () => any,
    required: true
  },
  flavorList: {
    type: Array as () => any[],
    required: true
  },
  handleInput: {
    type: Function,
    required: true
  }
})

const childFlavors = ref<any[]>(props.flavorList.filter(f => f.parentId === props.flavor.id))
</script>
