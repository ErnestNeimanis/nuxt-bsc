<script setup lang="js">
import { defineProps } from 'vue';

const props = defineProps({
   post: {
    title: "",
    featuredImg: "",
    content: "",
  }
});

const post = props.post;
</script>

<template>
  
  <div class="flex flex-col  
     aspect-square
  ">
    <div class="flex justify-center items-center w h-4/5 h-96  ">
 
        <img  :src="post.featuredImg" alt=""
      class="w-full h-full object-cover"
      >

    </div>
    <div class="flex justify-center items-center h-1/5 px-4 bg-slate-500">

         <h1 class="text-5xl text-center bg-red-400   whitespace-nowrap overflow-hidden overflow-ellipsis">
          {{post.title}}
        </h1>
    </div>
  </div>
</template>
