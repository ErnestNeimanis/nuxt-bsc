<script setup lang="js">
import {usePosts } from "~/stores/usePosts"
import {useHTMLContent} from "~/composables/useHTMLContent"

defineExpose({
  moveLeft,
  moveRight,
  move
})

const posts = usePosts();
const html = useHTMLContent();
const imageList = ref([])

const contentContainer = ref(null)

const sliderContainer = ref(null);
const sliderContent = ref(null);
const isDragging = ref(false);
const startPosition = ref(0);
const currentPosition = ref(0);
const lastPosition = ref(0);
const velocity = ref(0);
const lastTime = ref(0);

const sliderElementOverflow = ref(50)
const scrollInterval = ref(null);

//smooth slide props
const transition = ref(false)
const transitionTimeout = ref(null)


function moveLeft(amount=1){
 if(notFilled()) return;
 addSmoothSlide();
 const distance = sliderContent.value.clientWidth*amount
 currentPosition.value += adjustWithinBounds(currentPosition.value,-distance);
}
function moveRight(amount = 1) {
  if (notFilled()) return;
  addSmoothSlide();
  const distance = sliderContent.value.clientWidth * amount;
  currentPosition.value += adjustWithinBounds(currentPosition.value, distance);
}
function move(amount=1){
   if(notFilled()) return;
    currentPosition.value += adjustWithinBounds(amount);
}


function notFilled(){
  return contentContainer.value.clientWidth < sliderContainer.value.clientWidth
}


const handleWheel = (event) => {
  if (event.deltaX > 0) {
    moveLeft(0.05)
  } else if (event.deltaX < 0) {
  moveRight(0.05);
  }
};

function addSmoothSlide(time=200 ){
  clearTimeout(transitionTimeout.value)
  transition.value = true
  transitionTimeout.value = setTimeout(() => {
  transition.value = false
  }, time);
}


function startDragging(event) {

  if(notFilled()){
    return
  }

  isDragging.value = true;
  startPosition.value = event.type.includes('mouse') ? event.pageX : event.touches[0].pageX;

  lastPosition.value = startPosition.value;
  lastTime.value = performance.now();
  velocity.value = 0;

  document.addEventListener('mousemove', dragging);
  document.addEventListener('touchmove', dragging);

}

function dragging(event) {

  if (!isDragging.value) return;
  const x = event.type.includes('mouse') ? event.pageX : event.touches[0].pageX;
  const delta = x - lastPosition.value;
  lastPosition.value = x;
  currentPosition.value += adjustWithinBounds(currentPosition.value,delta,sliderElementOverflow.value);

  // Calculate velocity for inertia
  const now = performance.now();
  const timeDelta = now - lastTime.value;
  velocity.value = delta / timeDelta;
  lastTime.value = now;
}

  const inertiaActive = ref(false)

function stopDragging() {

  if (!isDragging.value) return;

  isDragging.value = false;
  document.removeEventListener('mousemove', dragging);
  document.removeEventListener('touchmove', dragging);

  // Apply inertia

  const inertia = () => {
    inertiaActive.value = true;
    const inertiaFactor = velocity.value * 5

    currentPosition.value += adjustWithinBounds(currentPosition.value,inertiaFactor,sliderElementOverflow.value); // Adjust inertia factor here
    velocity.value *= 0.99; // Adjust friction here

    if(currentPosition.value >= 0 ||
    currentPosition.value <= -(contentContainer.value.clientWidth - sliderContainer.value.clientWidth)){
       readjustSlider();
      return;
    }

    if (Math.abs(velocity.value) > 0.01) {
      requestAnimationFrame(inertia);
    } else{
      inertiaActive.value = false;
    }
  };
  requestAnimationFrame(inertia);
  if(!inertiaActive.value){
    readjustSlider();
  }
}


function readjustSlider(){

  const overflow = sliderElementOverflow.value;
  const rightSide = -(contentContainer.value.clientWidth - sliderContainer.value.clientWidth)
  if(currentPosition.value < rightSide){
    currentPosition.value = rightSide;
    return
  }
  const leftSide = 0;
  if(currentPosition.value > leftSide ){
    currentPosition.value = 0;
  }
}

watch(inertiaActive,()=>{
 if(!inertiaActive.value){
    readjustSlider();
  }
})

function adjustWithinBounds(current, adjustment,overflow = 0) {

  const lowerBound = -(contentContainer.value.clientWidth - sliderContainer.value.clientWidth) -overflow
  const upperBound = 0 +overflow;


  let newValue = current + adjustment;
  newValue = Math.max(lowerBound, Math.min(upperBound, newValue));
  let adjustedAmount = newValue - current;
  return adjustedAmount;
}

watch(transition,()=>{
  console.log(transition.value)
})
</script>

<template>
  <div
    ref="sliderContainer"
    class="slider-container bg-blue-100 w-full border-4 overflow-scroll"
    @mousedown="startDragging"
    @touchstart="startDragging"
    @mouseup="stopDragging"
    @mouseleave="stopDragging"
    @touchend="stopDragging"
    @mousewheel="handleWheel"
  >
    <div
      ref="sliderContent"
      class="border-4 bg-black"
      :class="{'slider-transition-slow': transition, 'slider-transition-fast' : !transition}"
      :style="{ transform: `translateX(${currentPosition}px)` }"
      style="width: max-content"
    >
      <div ref="contentContainer" class="flex flex-nowrap gap-5">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ratio {
  aspect-ratio: 10 / 10;
}

.slider-container {
  overflow: hidden;
}
.slider-transition-slow {
  transition: transform 0.2s ease-out;
  will-change: transform;
}
.slider-transition-fast {
  transition: transform 0.05s ease-out;
  will-change: transform;
}
</style>
