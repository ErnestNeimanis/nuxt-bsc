<script setup lang="js">
import axios from "axios";
import { useHTMLContent }  from '~/composables/useHTMLContent'
import { ref, onMounted, computed } from 'vue';

const props = defineProps({
  post: Object
});

const html = useHTMLContent();

const h2 = ref([])

onMounted(async() => {
   h2.value = html.extractAll(props.post.content,'h2')
   props.post.content = html.removeFirst(props.post.content,'h2')
});

const formattedDate = computed(() => {
  if (!props.post.date) return '';
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return new Intl.DateTimeFormat('default', options).format(new Date(props.post.date));
});

const post = props?.post;
</script>

<template>
  <div class="">
    <div v-if="props.post" class="space-y-6 mt-12">
      <h1 class="text-4xl text-center font-bold text-gray-900">{{ props.post.title }}</h1>
      <!-- Displaying formatted date below the title -->
      <p class="text-center text-gray-500 text-sm mt-2">{{ formattedDate }}</p>
      <div class="text-xl text-gray-700" v-if="h2.length > 0">
        <h2 class="font-semibold text-center">{{ h2[0] }}</h2>
      </div>
      <div>
        {{props.post.category}}
      </div>
      <div class="flex justify-center px-9">
        <img :src="props.post.featured_image" alt="" class="rounded-lg w-full shadow-md"/>
      </div>
      <div class="flex justify-center">
        <div v-html="props.post.content" class="border-black max-w-4xl"></div>
      </div>
    </div>
    <div v-else>
       <p class="text-gray-500">Loading post...</p>
    </div>
  </div>
</template>


