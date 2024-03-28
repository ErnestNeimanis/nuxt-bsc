<script setup lang="js">
import { useSlideInMenu } from '../../stores/useSlideInMenu';
import {useWindowSize} from "@/composables/useWindowSize"
const {largeWindow, mediumWindow, smallWindow} = useWindowSize();
const slideIn = useSlideInMenu();
</script>
<template>
    <div>

  
    <div v-if="!largeWindow" class="absolute top-4 right-2  z-[999] " >
        <HeaderHamburger class=""/>
     </div>
     <div class="w-screen">
        <HeaderSlideInMenu/>
     </div>
       </div>

 
</template>