<script setup lang="js">
import { watch, onMounted, nextTick, ref } from 'vue';
import { useSlideInMenu } from '../../stores/useSlideInMenu';

// Assuming Pinia is correctly set up in your Nuxt app, you don't need to initialize it here

const slideIn = useSlideInMenu();

const active = ref(slideIn.isOpen);
const step1 = ref(false);
const step2 = ref(false);
const animationSpeed = 500;
let timeoutId = null; // Store the timeout ID for later reference

function clearAnimations() {
  clearTimeout(timeoutId); // Clear any existing animation timeout
  timeoutId = null;
}

function animateOpen() {
  clearAnimations(); // Ensure no other animations are running
  step1.value = true;
  timeoutId = setTimeout(() => {
    step2.value = true;
  }, animationSpeed / 2);
}

function animateClose() {
  clearAnimations(); // Ensure no other animations are running
  step2.value = false;
  timeoutId = setTimeout(() => {
    step1.value = false;
  }, animationSpeed / 2);
}

watch(() => slideIn.isOpen, (newVal) => {
  if (newVal) {
    animateOpen();
  } else {
    animateClose();
  }
});

onMounted(() => {
  active.value ? animateOpen() : animateClose();
});

function toggleMenu() {
  slideIn.toggleMenu();
}
</script>


<template>
  <button class="  p-3 cursor-pointer rounded-md bg-indigo-950" @click="toggleMenu">
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
