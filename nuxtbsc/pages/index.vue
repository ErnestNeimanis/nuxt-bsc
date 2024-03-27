<script setup lang="js">
import { useCounterStore } from '~/stores/counter'
import { setActivePinia, createPinia } from 'pinia'
setActivePinia(createPinia())

import {useWindowSize} from "@/composables/useWindowSize"
import {useInView} from "@/composables/useInView"
import {useScrollHandler} from "@/composables/useScrollHandler"
 const { largeWindow,mediumWindow,smallWindow } = useWindowSize();
  const {create } = useScrollHandler();

const counter = useCounterStore()

onMounted(() => {
 
})
</script>

<template>
  <div>index

<div>
    <p>The count is: {{ counter.count }}</p>
    <button @click="counter.increment">Increment</button>
  </div>
<div>
  {{largeWindow}}
</div>
<div>
  
</div>
  </div>
</template>
