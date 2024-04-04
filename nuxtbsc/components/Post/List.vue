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

const loader = ref(null);
const loadButton = ref(false)

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
    switchToLoader();
    loadButton.value = false;
    loaderInView.value = true;
    let loaded = await load();
    hasMore.value = loaded.length > 0
    while(loaderInView.value && hasMore.value){
     loaded = await load()
     hasMore.value = loaded.length > 0

    }

 })

 useNotInView(loader.value,()=>{
  loaderInView.value = false;
  loadButton.value = false;
 })
})

})

function switchToLoadButton(){
    setTimeout(() => {
    if(hasMore.value){
       loadButton.value = true;
    }
  }, 5000);
}

function switchToLoader(){
  loadButton.value = false;
}

watch(loaderInView,switchToLoadButton)
</script>
<template>
  <div v-if="postList">
    <div
      class="grid gap-12 my-4 px-4 grid-cols-1 sm:grid-cols-1 sm:px-8 md:grid-cols-2 md:px-12 lg:grid-cols-3 2xl:grid-cols-3"
    >
    <div v-for="post in postList" :key="post.title">
      
          <PostPreview :post="post" class="transition-all duration-300"/>
 
    </div>
     
    </div>

    <div v-if="hasMore" ref="loader" class="flex justify-center h-12">
      <div v-if="loadButton">
        <button
          class="border bg-blue-800 hover:bg-blue-500 text-white font-bold px-4 py-4 rounded-2xl cursor-pointer"
          @click="load"
        >
          Load more
        </button>
      </div>
      <div v-else class="loader"></div>
    </div>
  </div>
</template>
<style scoped>
.loader {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  position: relative;
  animation: rotate 1s linear infinite;
}
.loader::before,
.loader::after {
  content: "";
  box-sizing: border-box;
  position: absolute;
  inset: 0px;
  border-radius: 50%;
  border: 5px solid #0a08a8;
  animation: prixClipFix 2s linear infinite;
}
.loader::after {
  inset: 8px;
  transform: rotate3d(90, 90, 0, 180deg);
  border-color: #ff3d00;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes prixClipFix {
  0% {
    clip-path: polygon(50% 50%, 0 0, 0 0, 0 0, 0 0, 0 0);
  }
  50% {
    clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 0, 100% 0, 100% 0);
  }
  75%,
  100% {
    clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 100% 100%, 100% 100%);
  }
}
</style>
