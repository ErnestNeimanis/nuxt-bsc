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

const leftEdge = ref(0)
const rightEdge = ref(0)


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
  checkEdges()
  if (!isDragging.value) return;
  const x = event.type.includes('mouse') ? event.pageX : event.touches[0].pageX;
  const delta = x - lastPosition.value;
  lastPosition.value = x;
  currentPosition.value += delta;
 
  // Calculate velocity for inertia
  const now = performance.now();
  const timeDelta = now - lastTime.value;
  velocity.value = delta / timeDelta;
  lastTime.value = now;
}

function stopDragging() {
  if (!isDragging.value) return;
  isDragging.value = false;
  document.removeEventListener('mousemove', dragging);
  document.removeEventListener('touchmove', dragging);

  // Apply inertia
  const inertia = () => {
    currentPosition.value += velocity.value * 5; // Adjust inertia factor here
    velocity.value *= 0.95; // Adjust friction here
    if (Math.abs(velocity.value) > 0.01) {
      requestAnimationFrame(inertia);
    }
  };
  requestAnimationFrame(inertia);
}

function checkEdges() {
  const viewportCenter = window.innerWidth / 2;
  const containerRect = sliderContainer.value.getBoundingClientRect();
  const contentRect = contentContainer.value.getBoundingClientRect();

  const leftEdgeInView  = contentRect.left > containerRect.left;
  const rightEdgeInView = contentRect.right < containerRect.right;
  const contentW = sliderContainer.value.clientWidth
  const distance = contentRect.left + contentW;

  console.log(`leftEdege ${leftEdgeInView}`)
  console.log(`rightEdege ${rightEdgeInView}`)
 // console.log( `containerLeft ${containerRect.right}`)
  //console.log(`containerRectRLeft ${containerRect.left}`, `contentRectLeft ${contentRect.left}`)
 // console.log(`containerRectRight ${containerRect.right}`, `contentRectRight ${contentRect.right}`)
 // console.log(`contentW ${contentContainer.value.clientWidth}`)
 // console.log(`Left Edge Closer to Center By: ${leftEdgeComparison}, Right Edge Closer to Center By: ${rightEdgeComparison}`);
}


onMounted(async() => {
    const response = await posts.getPost({ category:"galleries",slug:"my-test-gallery"});
    const images = html.extractImageUrls(response.content)
    imageList.value = [...imageList.value,...images];
    

    nextTick(()=>{
      checkEdges();
    })
  
  

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
            <!-- <div v-for="image in imageList" :key="image" class="ratio flex-shrink-0  h-72  bg-blue-500"
          
            >
                <div class="w-full h-2/3 border-4">
                     <img :src="image" class="object-cover h-full w-full" alt="">
                </div>
                <div class="h-1/3 flex justify-center items-center ">
                    <div class="px-4 overflow-hidden overflow-ellipsis">
                        <span class="whitespace-nowrap ">
                            Some textssssss</span>
                    </div>
                </div>
            </div> -->
      
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
