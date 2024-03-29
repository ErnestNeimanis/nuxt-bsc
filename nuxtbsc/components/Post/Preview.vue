<script setup lang="js">
import axios from "axios";
const props = defineProps({
  post: {
    title: "",
    featuredImg: "",
    content: "",
  },
});

const post = props?.post;
</script>
<template>
  <div class=" " >
    <div v-if="props.post">
      <div class="">
        <h1>{{ post.title }}</h1>
      </div>
      <div class="flex justify-center">
        <img :src="post.featuredImg" alt="" />
      </div>
      <div>
        <div v-html="post.content"></div>
      </div>
    </div>
    <div v-else>
        post missing
    </div>
  </div>
</template>
