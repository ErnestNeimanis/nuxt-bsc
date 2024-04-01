<script setup lang="js">
import axios from "axios"
import { useSlideInMenu } from '~/stores/useSlideInMenu'
import  {usePosts} from '~/stores/usePosts'

import {useWindowSize} from "@/composables/useWindowSize"
import {useInView} from "@/composables/useInView"
import {useScrollHandler} from "@/composables/useScrollHandler"

const { largeWindow,mediumWindow,smallWindow } = useWindowSize();
const {create } = useScrollHandler();
const posts = usePosts();
const postList = ref([])

async function getPosts(){
   const response= await posts.get('concerts')
   // post.value = response[0]
   postList.value = response
  load()
  load()
}

async function load(){
  const response = await posts.nextPage()
  postList.value = [...postList.value, ...response]
}

async function getContentful(){

}

onMounted(async() => {

 getPosts()
})
</script>

<template>
  <div v-if="postList" >
    <div>
      aaaaaaaaaa
       <span>
        {{mediumWindow}}
        </span>
    </div>
    <div class="grid items-center flex-wrap gap-12  my-4"
      :class="{
      'grid-cols-3 px-12':largeWindow,
      'grid-cols-2 px-8':mediumWindow,
      'grid-cols-1 px-4':smallWindow}"
    >
   
         <PostPreview  v-for="post in postList" :key="post.title" :post="post"
          class=" a border-4 border-red-700 transition-all duration-300"
          />      

    </div>
   
    <div class="h-12">
      <div>
       
      </div>
        <button class="border-4" @click="load">Load more</button>
     </div>
  </div>
</template>
<style scoped>


.gr {
  display: grid;
  grid-template-columns: repeat(auto-fill);
 justify-items: center;
  
  }

   
</style>