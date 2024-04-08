<script setup lang="js">
import {usePosts } from "~/stores/usePosts"
import {useHTMLContent} from "~/composables/useHTMLContent"
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

// const leftEdge = ref(true)
// const rightEdge = ref(false)


function startDragging(event) {
  isDragging.value = true;
  startPosition.value = event.type.includes('mouse') ? event.pageX : event.touches[0].pageX;

  lastPosition.value = startPosition.value;
  lastTime.value = performance.now();
  velocity.value = 0;
  
  // Add event listeners for mousemove and touchmove
  document.addEventListener('mousemove', dragging);
  document.addEventListener('touchmove', dragging);

}

function dragging(event) {

  if (!isDragging.value) return;
  const x = event.type.includes('mouse') ? event.pageX : event.touches[0].pageX;
  const delta = x - lastPosition.value;
  lastPosition.value = x;
  currentPosition.value += adjustWithinBounds(currentPosition.value,delta);
 
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

    currentPosition.value += adjustWithinBounds(currentPosition.value,inertiaFactor); // Adjust inertia factor here
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
  console.log("readjusting")
  const overflow = 20
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

function adjustWithinBounds(current, adjustment) {
  const overflow = 50

  const lowerBound = -(contentContainer.value.clientWidth - sliderContainer.value.clientWidth) -overflow
  const upperBound = 0 +overflow;
  

  let newValue = current + adjustment;
  newValue = Math.max(lowerBound, Math.min(upperBound, newValue));
  let adjustedAmount = newValue - current;
  return adjustedAmount;
}



onMounted(async() => {
 
})
</script>

<template>

  
   <div
    ref="sliderContainer"
    class="slider-container  bg-blue-100 w-full h-72   border-4 overflow-scroll"
    @mousedown="startDragging"
    @touchstart="startDragging"
    @mouseup="stopDragging"
    @mouseleave="stopDragging"
    @touchend="stopDragging"
  >
    <div
      ref="sliderContent"
      class="slider-content border-4 bg-black  "
      :style="{ transform: `translateX(${currentPosition}px)` }"
      style="width: max-content"
    >
    
    
         <div ref="contentContainer" class="flex flex-nowrap gap-5 h-72 "   >
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
  cursor: grab;
}
.slider-content {
  transition: transform 0.2s ease-out;
  will-change: transform;
}
</style>
