<script setup lang="js">
import {useNavLinks} from "@/composables/useNavLinks"
import { useSlideInMenu } from '../../stores/useSlideInMenu';

const slideIn = useSlideInMenu();
const nav = useNavLinks().navLinks;
const open = ref(false)

const containerAnimationClasses = ref(
    "hidden"
)

const menuAnimationClasses = ref(
    "translate-x-[100%] hidden"
    )

function openMenu(){
    const containerStep = ""

    const firstStep = "translate-x-[100%]"
    const secondStep = ""

     open.value = true;
     containerAnimationClasses.value = containerStep;
     menuAnimationClasses.value = firstStep

     setTimeout(() => {
        menuAnimationClasses.value = secondStep
     },1)
}
function closeMenu(){
    const containerStep = "hidden"

    const firstStep = "translate-x-[100%]"
    const secondStep = `${firstStep} hidden`

     open.value = false;
     containerAnimationClasses.value = containerStep;
     menuAnimationClasses.value = firstStep


     setTimeout(() => {
        menuAnimationClasses.value = secondStep
     },500)
}

onMounted(()=>{

})


watch(()=>slideIn.isOpen,()=>{
    return slideIn.isOpen ? openMenu() : closeMenu();
})
</script>
<template>
  <div
    class="h-screen w-screen bg-orange-500 transition-all duration-500 absolute top-0 z-[998]"
    :class="menuAnimationClasses"
  >

    <div class="mt-24">
      <ul class="flex flex-col gap-4">
        <li v-for="(link, index) in nav" :key="index">
          <div class="flex justify-center border-4">
            <NuxtLink :to="link.url">
              <div class="text-white" @click="slideIn.isOpen = false">
                <span>{{ link.title }}</span>
              </div>
            </NuxtLink>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
