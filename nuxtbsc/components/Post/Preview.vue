<script setup lang="js">
import { defineProps } from 'vue';

const props = defineProps({
   post: Object
});

const post = props.post;
</script>

<template>
  <div class="container flex flex-col w-full p-4 cursor-pointer">
    
    <div class="image-container flex justify-center items-center">
   
        <img :src="post.featured_image" alt="" class="w-full h-full object-cover" />
    
    </div>
    <div class="flex items-center h-1/5 px-4 border-b">
     <NuxtLink :to="`/posts/${post.slug}`">
      <h1 class="text-lg font-bold whitespace-nowrap overflow-hidden overflow-ellipsis">
        {{ post.title }}
      </h1>
         </NuxtLink>
    </div>
  </div>
</template>
<style scoped>
.container {
  aspect-ratio: 10 / 10;
}
.image-container {
  widows: full;
  height: 80%;
}
.title-container {
}
</style>
