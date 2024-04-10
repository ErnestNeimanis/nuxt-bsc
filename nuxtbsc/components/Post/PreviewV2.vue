<script setup lang="js">
import { defineProps } from 'vue';
import {useRouter} from 'vue-router'
import { formatDistanceToNow } from 'date-fns';
const props = defineProps({
   post: Object
});

const router = useRouter();
const post = props.post;

const formattedDate = computed(() => {
  return formatDistanceToNow(new Date(props.post.date), { addSuffix: true });
});

function toPost() {
  router.push(`/posts/${props.post.slug}`);
}
</script>
<template>
  <div class="flex flex-wrap justify-center bg-white shadow-xl rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
    <!-- Image Container -->
    <div @click="toPost" class="flex h-72 min-w-[400px] w-1/2">
      <img :src="post.featured_image" alt="" class="w-full h-full object-cover hover:opacity-95 transition-all duration-200">
    </div>

    <!-- Content Container -->
    <div class="flex flex-col h-72 min-w-[400px] w-1/2 p-6 justify-between bg-gradient-to-b from-gray-50 to-gray-100">
      <div>
        <h1 class="text-3xl font-semibold text-gray-800 mb-3">{{ post.title }}</h1>
      </div>
      <div v-html="post.excerpt" class="text-gray-700 text-base flex-grow mb-4"></div>
      <div class="flex justify-between items-center">
        <span class="text-sm text-gray-600">{{ formattedDate }}</span>
        <button @click="toPost" class="px-4 py-2 bg-blue-500 text-white font-semibold text-xs rounded hover:bg-blue-600 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
          Read more
        </button>
      </div>
    </div>
  </div>
</template>


<style scoped>
.ratio {
  aspect-ratio: 10 / 10;
}
.image-container {
}
.title-container {
}
</style>
