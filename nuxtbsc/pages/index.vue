<script setup lang="js">
import { useCounterStore } from '~/stores/counter'
import { useSlideInMenu } from '~/stores/useSlideInMenu'
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
  <div>
    aaaaaa
  </div>
</template>
