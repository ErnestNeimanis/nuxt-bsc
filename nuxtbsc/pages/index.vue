<script setup lang="js">

import { useSlideInMenu } from '~/stores/useSlideInMenu'


import {useWindowSize} from "@/composables/useWindowSize"
import {useInView} from "@/composables/useInView"
import {useScrollHandler} from "@/composables/useScrollHandler"
 const { largeWindow,mediumWindow,smallWindow } = useWindowSize();
  const {create } = useScrollHandler();



onMounted(() => {
 
})
</script>

<template>
  <div>aa

  </div>
</template>
