<script setup lang="js">



import { useSlideInMenu } from '../../stores/useSlideInMenu';

const slideInMenu = useSlideInMenu();

</script>

<template>
<div>
     
<HeaderNavLinks/>
<div class="flex justify-center items-center w-12 h-12">
<HeaderHamburger/>
</div>
<div>
{{slideInMenu.isOpen}}
</div>
</div>


</template>