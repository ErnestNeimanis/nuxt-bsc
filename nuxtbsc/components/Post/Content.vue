<script setup lang="js">
import axios from "axios";
import { useHTMLContent }  from '~/composables/useHTMLContent'
const props = defineProps({
  post: Object
});

const html = useHTMLContent();

const h2 = ref([])

onMounted(async() => {
   h2.value = html.extractAll(props.post.content,'h2')
   props.post.content = html.removeFirst(props.post.content,'h2')
})


const post = props?.post;
</script>
<template>
  <div class="max-w-4xl mx-auto p-8">
    <div v-if="props.post" class="space-y-6">
      <h1 class="text-4xl text-center font-bold text-gray-900">{{ props.post.title }}</h1>
      <div class="text-xl text-gray-700" v-if="h2.length > 0">
        <h2 class="font-semibold text-center">{{ h2[0] }}</h2>
      </div>
      <div>
        {{props.post.category}}
      </div>
      <div class="flex justify-center">
        <img :src="props.post.featured_image" alt="" class="max-h-96 rounded-lg shadow-md"/>
      </div>
      <div v-html="props.post.content" class="prose max-w-none"></div>
    </div>
    <div v-else>
       <p class="text-gray-500">Loading post...</p>
    </div>
  </div>
</template>

