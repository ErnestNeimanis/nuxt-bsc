<script setup lang="js">
import { ref } from 'vue';
import axios from 'axios';
import {Loader } from '@googlemaps/js-api-loader'

const form = ref({
  email: '',
  name: '',
  message: ''
});



const mapContainer = ref(null);
const loc = ref("")

const mapSrc = ref("");

onMounted(() => {

})


</script>
<template>
  <div class="flex flex-col">
    <div class="flex justify-center items-center w-full h-72">
      <div>
        <h1 class="text-5xl">Contact us</h1>
      </div>
    </div>

    <div class="flex flex-wrap  justify-around w-full ">
      <div
        class="flex flex-grow justify-center  min-w-[350px]   "
      >
        <ContactDataCard class="w-full bg-stone-500 min-w-[350px]" />
      </div>
      <div class="flex justify-center items-center flex-grow  min-w-[350px] ">
        <EmailForm class=" w-full" />
      </div>
    </div>

     <div class="flex flex-wrap  justify-around w-full border-4">
      <div
        class="flex flex-grow justify-center  min-w-[350px]  bg-slate-900 px-"
      >
       <AdressCard class="w-full h-full min-w-[350px]" />
      </div>
      <div class="flex justify-center items-center flex-grow p-12  min-w-[350px] bg-pink-400">
        <GoogleMap class="h-42   min-w-[350px]" />
      </div>
    </div>

 



    <!-- 
    <AddressCard />
    <SocialIcons class="" /> -->
  </div>
</template>