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
       <span class="loader">aaa</span>
      aaaaaaaaa
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

.loader {
        transform: rotateZ(45deg);
        perspective: 1000px;
        border-radius: 50%;
        width: 48px;
        height: 48px;
        color: #fff;
      }
        .loader:before,
        .loader:after {
          content: '';
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          width: inherit;
          height: inherit;
          border-radius: 50%;
          transform: rotateX(70deg);
          animation: 1s spin linear infinite;
        }
        .loader:after {
          color: #FF3D00;
          transform: rotateY(70deg);
          animation-delay: .4s;
        }

      @keyframes rotate {
        0% {
          transform: translate(-50%, -50%) rotateZ(0deg);
        }
        100% {
          transform: translate(-50%, -50%) rotateZ(360deg);
        }
      }

      @keyframes rotateccw {
        0% {
          transform: translate(-50%, -50%) rotate(0deg);
        }
        100% {
          transform: translate(-50%, -50%) rotate(-360deg);
        }
      }

      @keyframes spin {
        0%,
        100% {
          box-shadow: .2em 0px 0 0px currentcolor;
        }
        12% {
          box-shadow: .2em .2em 0 0 currentcolor;
        }
        25% {
          box-shadow: 0 .2em 0 0px currentcolor;
        }
        37% {
          box-shadow: -.2em .2em 0 0 currentcolor;
        }
        50% {
          box-shadow: -.2em 0 0 0 currentcolor;
        }
        62% {
          box-shadow: -.2em -.2em 0 0 currentcolor;
        }
        75% {
          box-shadow: 0px -.2em 0 0 currentcolor;
        }
        87% {
          box-shadow: .2em -.2em 0 0 currentcolor;
        }
      }
   
</style>