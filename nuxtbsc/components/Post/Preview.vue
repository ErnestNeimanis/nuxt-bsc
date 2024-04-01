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
  
  <div class="container flex flex-col w-full bg-blue-500 border-4 border-yellow-600
 
  ">
    <div class="image-container flex justify-center items-center   bg-fuchsia-600  ">
 
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
<style scoped>

.container{

  aspect-ratio: 10 / 10;
  background-color: blue;
}
.image-container{
  widows: full;
  height: 80%;

  background-color: blue;
}
.title-container{
  
}

</style>