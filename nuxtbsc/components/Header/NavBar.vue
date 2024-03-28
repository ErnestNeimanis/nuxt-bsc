<script setup lang="js">

import { useSlideInMenu } from '../../stores/useSlideInMenu';
import {useWindowSize} from "@/composables/useWindowSize"
const {largeWindow, mediumWindow, smallWindow} = useWindowSize();
const slideIn = useSlideInMenu();

</script>

<template>
<div class="bg-blue-600 h-24">

    <div v-if="largeWindow">
        <HeaderNavLinks class="text-white border "/>
     </div>
     <div v-else class="absolute top-4 right-2  z-[999] " >
        <HeaderHamburger class=""/>
     </div>
     
    
     <div class="">
        <HeaderSlideInMenu/>
     </div>

<div>

</div>
</div>


</template>