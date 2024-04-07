<script setup lang="js">
import axios from "axios"
import { useSlideInMenu } from '~/stores/useSlideInMenu'
import  {usePosts} from '~/stores/usePosts'

import {useWindowSize} from "@/composables/useWindowSize"
import {useInView} from "@/composables/useInView"
import {useScrollHandler} from "@/composables/useScrollHandler"


</script>

<template>
 <div>
    <Slider>
      <div class="flex justify-center">
          <div v-for="i in 20" :key="i" class="h-12 w-12 bg-blue-600">a</div>
      </div>
     
    </Slider>
 </div>
</template>
