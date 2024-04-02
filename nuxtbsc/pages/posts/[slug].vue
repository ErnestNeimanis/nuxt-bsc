<script setup lang="js">
import axios from "axios"
import {useRoute } from "vue-router"
import  {usePosts} from '~/stores/usePosts'
const route = useRoute();
const slug = ref(null)
const postsStore = usePosts();
const post = ref(null);

onMounted(async() =>{
    await postsStore.get("concerts")
    slug.value = route.params.slug
    post.value = await postsStore.getPost({category:'concerts',slug:slug.value})
    
})


</script>
<template>
<div>
  
 <PostContent :post="post"/>
</div>
   
</template>
