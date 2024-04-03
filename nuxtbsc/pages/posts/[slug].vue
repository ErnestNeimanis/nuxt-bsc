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
    const headings = extractHeadings(post.value.content)
    heading.value = headings

    
})

function extractHeadings(htmlString) {
 
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');
  const headings = doc.querySelectorAll('h1, h2, h3, h4, h5, h6');
  const headingTexts = Array.from(headings).map(heading => heading.textContent.trim());
  return headingTexts 
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
