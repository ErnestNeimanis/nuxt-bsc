<script setup lang="js">

import { useSlideInMenu } from '../../stores/useSlideInMenu';
import {useWindowSize} from "@/composables/useWindowSize"
const {largeWindow, mediumWindow, smallWindow} = useWindowSize();
const slideIn = useSlideInMenu();
</script>

<template>
  <div class="flex justify-start gap-56 px-2 items-end bg-blue-600 h-24">
    <div class="h-full  border-4 border-black" >
        <img class="max-h-full" src="@/assets/images/images.png" alt="">
    </div>
    <div v-if="largeWindow" class="flex justify-center items-end h-full borde">
      <HeaderNavLinks class="text-white border" />
    </div>
    
   
 





    <HeaderMobileMenu v-if="!largeWindow" />
  </div>
</template>
