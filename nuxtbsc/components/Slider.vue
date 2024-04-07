<template>
  <div
    ref="sliderContainer"
    class="slider-container bg-blue-500"
    @mousedown="startDragging"
    @touchstart="startDragging"
    @mouseup="stopDragging"
    @mouseleave="stopDragging"
    @touchend="stopDragging"
  >
    <div
      ref="sliderContent"
      class="slider-content border-4 border-black"
      :style="{ transform: `translateX(${currentPosition}px)` }"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="js">


const sliderContainer = ref(null);
const sliderContent = ref(null);
const isDragging = ref(false);
const startPosition = ref(0);
const currentPosition = ref(0);
const lastPosition = ref(0);
const velocity = ref(0);
const lastTime = ref(0);

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
    currentPosition.value += velocity.value * 10; // Adjust inertia factor here
    velocity.value *= 0.95; // Adjust friction here
    if (Math.abs(velocity.value) > 0.01) {
      requestAnimationFrame(inertia);
    }
  };
  requestAnimationFrame(inertia);
}
</script>

<style scoped>
.slider-container {
  overflow: hidden;
  cursor: grab;
}
.slider-content {
  transition: transform 0.2s ease-out;
  will-change: transform;
}
</style>