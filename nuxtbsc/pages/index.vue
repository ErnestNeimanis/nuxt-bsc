<script setup lang="js">
import axios from "axios"
import { useSlideInMenu } from '~/stores/useSlideInMenu'
import  {usePosts} from '~/stores/usePosts'

import {useWindowSize} from "@/composables/useWindowSize"
import {useInView} from "@/composables/useInView"
import {useScrollHandler} from "@/composables/useScrollHandler"
const posts = usePosts();
const html = useHTMLContent();
const imageList = ref([])

const slider = ref(null)

onMounted(async() => {
    const response = await posts.getPost({ category:"galleries",slug:"my-test-post"});
    const images = html.extractImageUrls(response.content)
    imageList.value = [...imageList.value,...images];
    
    nextTick(()=>{

    })
})


</script>

<template>
 <div class="w-full max-w-full px-8">
    <Slider ref="slider" v-if="imageList.length > 0"  class="h-72 "> 

  <div v-for="image in imageList" :key="image" class="ratio  h-72  bg-blue-500"
          
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
            </div>

    </Slider>
    <div>
      <button @click="slider.moveRight(0.2)" class="border-4 p-4 ">click</button>
    </div>
 </div>
</template>
<style scoped>
.ratio {
  aspect-ratio: 10 / 10;
}
</style>