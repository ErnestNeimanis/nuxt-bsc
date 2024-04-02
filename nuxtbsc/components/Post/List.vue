<script setup lang="js">
import axios from "axios"
import { useSlideInMenu } from '~/stores/useSlideInMenu'
import  {usePosts} from '~/stores/usePosts'
import { onMounted, nextTick } from 'vue';
import {useWindowSize} from "@/composables/useWindowSize"
import {useInView, useInView_v2, useNotInView} from "@/composables/useInView"
import {useScrollHandler} from "@/composables/useScrollHandler"

const props = defineProps({
    category:""
})


const {largeWindow,mediumWindow,smallWindow} = useWindowSize();
const {create } = useScrollHandler();
const posts = usePosts();
const postList = ref([])

const loader = ref(null)

const loaderInView = ref(true);
const hasMore = ref(true)



async function getPosts(){
   const response= await posts.get(props.category)
   postList.value = response
  hasMore.value = [...response].length > 0
}

async function load(){

  const response = await posts.nextPage()
  postList.value = [...postList.value, ...response]
  hasMore.value = [...response].length > 0
  return [...response];

}



onMounted(async() => {
 await getPosts()

nextTick(() =>{
 useInView(loader.value,async() =>{
    loaderInView.value = true;
    let loaded = await load();
    hasMore.value = loaded.length > 0
    while(loaderInView.value && hasMore.value){
      await load()
    }
 })

 useNotInView(loader.value,()=>{
  loaderInView.value = false;
 })
})
 
})



</script>
<template>
 
  <div v-if="postList">
    <div
      class="grid gap-12 my-4 px-4 grid-cols-1 sm:grid-cols-1 sm:px-8 md:grid-cols-2 md:px-12 lg:grid-cols-3 2xl:grid-cols-3"
    >
      <PostPreview
        v-for="post in postList"
        :key="post.title"
        :post="post"
        class="border-4 border-red-700 transition-all duration-300"
      />
    </div>
  
    <div v-if="hasMore"  ref="loader" class="flex justify-center h-12 ">
      <div class="loader"></div>
    </div>
  </div>
</template>
<style scoped>
.loader {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        position: relative;
        animation: rotate 1s linear infinite
      }
      .loader::before , .loader::after {
        content: "";
        box-sizing: border-box;
        position: absolute;
        inset: 0px;
        border-radius: 50%;
        border: 5px solid #0a08a8;
        animation: prixClipFix 2s linear infinite ;
      }
      .loader::after{
        inset: 8px;
        transform: rotate3d(90, 90, 0, 180deg );
        border-color: #FF3D00;
      }

      @keyframes rotate {
        0%   {transform: rotate(0deg)}
        100%   {transform: rotate(360deg)}
      }

      @keyframes prixClipFix {
          0%   {clip-path:polygon(50% 50%,0 0,0 0,0 0,0 0,0 0)}
          50%  {clip-path:polygon(50% 50%,0 0,100% 0,100% 0,100% 0,100% 0)}
          75%, 100%  {clip-path:polygon(50% 50%,0 0,100% 0,100% 100%,100% 100%,100% 100%)}
      }

</style>