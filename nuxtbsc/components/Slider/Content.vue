<script setup lang="js">
import {usePosts } from "~/stores/usePosts"
import {useHTMLContent} from "~/composables/useHTMLContent"
const posts = usePosts();
const html = useHTMLContent();
const imageList = ref([])

const contentContainer = ref(null)

onMounted(async() => {
    const response = await posts.getPost({ category:"galleries",slug:"my-test-gallery"});
    const images = html.extractImageUrls(response.content)
    imageList.value = [...imageList.value,...images];


    nextTick(()=>{
       let w = contentContainer.value.clientWidth;
      console.log(`w ${w}`)
    })
  
  

})
</script>

<template>

  <div class="">
    <div class="w-full px-8">
      <Slider class="w-full h-72   border-4 ">
        <div ref="contentContainer" class="flex flex-nowrap gap-5 h-72 "   style="width: max-content">
          
            <div v-for="image in imageList" :key="image" class="ratio flex-shrink-0  h-72  bg-blue-500"
          
            >
                <div class="w-full h-2/3 border-4">
                     <img :src="image" class="object-cover h-full w-full" alt="">
                </div>
                <div class="h-1/3 flex justify-center items-center ">
                    <div class="px-4 overflow-hidden overflow-ellipsis">
                        <span class="whitespace-nowrap ">
                            Some textssssss</span>
                    </div>
                </div>
            </div>
        </div>
      </Slider>
    </div>
  </div>

</template>

<style scoped>
.ratio {
  aspect-ratio: 10 / 10;
}
</style>
