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

const content = ref("")
const postList = ref([])


async function getWp(){
 const category = "concerts"
   try {
    const response = await axios.get('https://public-api.wordpress.com/rest/v1.1/sites/groovediggers3.wordpress.com/posts/?category=concerts&page=1&number=10', {
      params: {
        category: category
      }
    });
    content.value= response.data

    // post.value.title = response.data.posts[0].title
    // post.value.featuredImg = response.data.posts[0].featured_image
    // post.value.content= response.data.posts[0].content


    console.log(post.value); // Log the posts array
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
}

async function getPage(){
  try {
    const response = await axios.get("https://public-api.wordpress.com/rest/v1.2/sites/groovediggers3.wordpress.com/");
    content.value = response.data
  } catch (error) {
    console.log(error)
  }
}

async function getPosts(){
   const response= await posts.get('concerts')
   // post.value = response[0]
   postList.value = response

}

async function load(){
  const response = await posts.nextPage()
  postList.value = [...postList.value, ...response]
}

async function getContentful(){

}

onMounted(async() => {
  // getPage()
 //getWp()
 getPosts()
})
</script>

<template>
  <div v-if="postList">
    <div v-for="post in postList" :key="post" class="px-8">
      <div class="my-4">
         <PostContent :post="post" />
      </div>
      <div class="border-4 border-black"></div>
     
    </div>
    <div class="h-12 bg-blue-500">
        <button class="border-4" @click="load">Load more</button>
     </div>
  </div>
</template>
