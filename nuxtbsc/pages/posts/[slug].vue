<script setup lang="js">
import axios from "axios"
import {useRoute } from "vue-router"
import  {usePosts} from '~/stores/usePosts'
const route = useRoute();
const slug = ref(null)
const postsStore = usePosts();
const post = ref(null);
const heading = ref(null)
onMounted(async() =>{
    const rawPosts = toRaw(postsStore.posts)
    post.value = rawPosts.find((post) => post.slug === route.params.slug)
    if(!post.value){
    await postsStore.get("concerts")
    slug.value = route.params.slug
    post.value = await postsStore.getPost({category:'concerts',slug:slug.value})
    }
    const headings = extractHTMLContent(post.value.content,'h2')
    heading.value = headings

    
})

function extractHTMLContent(htmlString, tagName) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');
  const elements = doc.querySelectorAll(tagName); // Use the tagName parameter
  const elementsTexts = Array.from(elements).map(element => element.textContent.trim());
  return elementsTexts;
}
</script>
<template>
<div v-if="post">
   <div >
        {{heading}}
   </div>

 <PostContent :post="post"/>
</div>
   
</template>
