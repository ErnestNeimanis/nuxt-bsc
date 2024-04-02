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
  
  <div class="container flex flex-col w-full bg-stone-200 p-7
 
  ">
    <div class="image-container flex justify-center items-center     ">
 
        <img  :src="post.featuredImg" alt=""
      class="w-full h-full object-cover"
      >

    </div>
    <div class="flex justify-center items-center h-1/5 px-4 ">

         <h1 class="text-5xl text-center   whitespace-nowrap overflow-hidden overflow-ellipsis">
          {{post.title}}
        </h1>
    </div>
  </div>
</template>
<style scoped>

.container{

  aspect-ratio: 10 / 10;
  
}
.image-container{
  widows: full;
  height: 80%;


}
.title-container{
  
}

</style>