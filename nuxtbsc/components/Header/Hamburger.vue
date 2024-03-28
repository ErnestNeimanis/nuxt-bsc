<script setup lang="js">
import { watch, onMounted, nextTick, ref } from 'vue';
import { createPinia, setActivePinia } from 'pinia';

// Manually setting up Pinia (Note: This is usually not necessary in Nuxt 3)
const pinia = createPinia();
setActivePinia(pinia);

import { useSlideInMenu } from '../../stores/useSlideInMenu';

const slideInMenu = useSlideInMenu();

const active = ref(slideInMenu.isOpen);
const step1 = ref(false);
const step2 = ref(false);
const animationSpeed = 500;

function animateOpen() {

  step1.value = true;
  setTimeout(() => {
    step2.value = true;
  }, animationSpeed / 2);
}

function animateClose() {

  step2.value = false;
  setTimeout(() => {
    step1.value = false;
  }, animationSpeed / 2);
}

watch(() => slideInMenu.isOpen, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    nextTick(() => {
      newVal ? animateOpen() : animateClose();
    });
  }
});

onMounted(() => {
  nextTick(() => {
    active.value ? animateOpen() : animateClose();
  });
});

function toggleMenu() {
  slideInMenu.toggleMenu();
}
</script>

<template>
  <button class="p-3 cursor-pointer rounded-md bg-indigo-950" @click="toggleMenu">
    <div class="flex flex-col justify-evenly h-[30px] w-[30px]">
      <div :class="{ 'translate-y-2.5 rotate-45': step2, 'translate-y-2.5': step1, 'h-1/6': true }" class="w-full transition duration-500 bg-white"></div>
      <div :class="{ 'invisible': (active && step2) || (!active && step1), 'h-1/6': true }" class="w-full bg-white"></div>
      <div :class="{ '-translate-y-2 -rotate-45': step2, '-translate-y-2': step1, 'h-1/6': true }" class="w-full transition duration-500 bg-white"></div>
    </div>
  </button>

</template>

<style scoped>
/* Add your styles here */
</style>
